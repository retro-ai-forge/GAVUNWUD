import { NextResponse } from "next/server";

// WUD/DOT pool reserves, read straight off Hydration's own RPC.
//
// Dexscreener no longer indexes this pool and GeckoTerminal reports its
// liquidity as 0, so the reserves are read from the chain instead. The nodes
// answer plain HTTP JSON-RPC, so this needs no Substrate client library.

// Public Hydration nodes, fast tier first. Ported from
// TheWudlands-App/backend/data/hydration-rpc-endpoints.json, which ordered them
// by measured median storage-query latency.
const ENDPOINTS = [
  "https://subway.shellfish.hydration.cloud",
  "https://rpc-catfish-1.catfish.hydration.cloud",
  "https://rpc-catfish-2.catfish.hydration.cloud",
  "https://hydration-rpc.n.dwellir.com",
  "https://rpc.hydradx.cloud",
];

// Tokens.Accounts storage keys for the WUD LP account
// (0xb941ce…8995ce, the same "pair address" the price hook uses), shaped as
// twox128("Tokens") ++ twox128("Accounts") ++ blake2_128concat(account) ++
// twox64concat(assetId). Account and asset ids are fixed, so the keys are too.
// Regenerate with substrate-interface's generate_storage_hash if the LP account
// ever moves; a stale key reads as empty and the UI falls back to "n/a".
const STORAGE_KEYS = {
  wud: "0x99971b5749ac43e0235e41b0d37869188ee7418a6531173d60d1f6a82d8f4d51b5d133405c8139be53b2b4a695551b74b941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce50c48850d71a8e2895420f00",
  dot: "0x99971b5749ac43e0235e41b0d37869188ee7418a6531173d60d1f6a82d8f4d51b5d133405c8139be53b2b4a695551b74b941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce39b9d2792f8bd4c305000000",
} as const;

const DECIMALS = 10;
const REQUEST_TIMEOUT_MS = 8000;

// Sticky: a healthy node keeps serving, and the index only moves when one
// fails, so a dead node costs one request rather than one per call.
let endpointIndex = 0;

type Reserves = { wud: number; dot: number };

async function rpc(endpoint: string, key: string): Promise<string | null> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 1, jsonrpc: "2.0", method: "state_getStorage", params: [key] }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${endpoint} returned ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(`${endpoint}: ${json.error.message}`);
  return json.result ?? null;
}

// ORML Tokens balances are SCALE-encoded as three little-endian u128s:
// free, reserved, frozen. Only `free` is the pool's tradable reserve.
function decodeFree(raw: string | null): number {
  if (!raw || raw.length < 34) return 0;
  const bytes = raw.slice(2, 34).match(/../g) ?? [];
  const free = BigInt("0x" + bytes.reverse().join(""));
  return Number(free) / 10 ** DECIMALS;
}

async function fetchReserves(): Promise<Reserves> {
  let lastError: unknown;

  for (let attempt = 0; attempt < ENDPOINTS.length; attempt++) {
    const endpoint = ENDPOINTS[endpointIndex % ENDPOINTS.length];
    try {
      const [wud, dot] = await Promise.all([
        rpc(endpoint, STORAGE_KEYS.wud),
        rpc(endpoint, STORAGE_KEYS.dot),
      ]);
      return { wud: decodeFree(wud), dot: decodeFree(dot) };
    } catch (e) {
      lastError = e;
      endpointIndex = (endpointIndex + 1) % ENDPOINTS.length;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("All Hydration RPC endpoints failed");
}

export async function GET() {
  try {
    const reserves = await fetchReserves();
    return NextResponse.json(reserves, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to read Hydration LP reserves" },
      { status: 502 }
    );
  }
}
