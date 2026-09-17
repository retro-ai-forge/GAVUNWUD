// src/hooks/useDexScreenerPrice.ts
import { useEffect, useState } from "react"

type DexScreenerPair = {
  pairAddress: string
  priceUsd: string
  priceChange?: {
    h24?: string
  }
  url: string
  liquidity?: {
    usd?: string
    base?: string
    quote?: string
  }
  volume?: {
    h24?: string
  }
}

type PreisAsset = {
  assetId: number
  price: number
  change24h?: number
  volumeUsd24h?: number
}

type PriceData = {
  price: number
  change24h: number
  url: string
  liquidityUsd: number
  liquidityBase: number
  liquidityQuote: number
  volume24h: number
  fdv: number
  marketCap: number
  buys24h: number
  sells24h: number
  dataSource?: "dexscreener" | "preis"
}

const PAIR_ADDRESS = "0xb941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce"
const WUD_ASSET_ID = 1000085
export const HYDRATION_PRICE_URL = "https://hydration-preis.neckwork.net/1000085-10/4h"

// Dexscreener has stopped indexing this pool. hydration-preis.neckwork.net
// is a working public price feed for Hydration DEX assets used as a fallback;
// it doesn't expose pool liquidity, FDV, or market cap, only price/change/volume.
async function fetchFromPreis(): Promise<PriceData> {
  const res = await fetch("https://hydration-preis.neckwork.net/api/market-stats")
  if (!res.ok) throw new Error(`Failed to fetch preis market stats: ${res.status}`)
  const assets: PreisAsset[] = await res.json()
  const asset = assets.find((a) => a.assetId === WUD_ASSET_ID)
  if (!asset) throw new Error("WUD not found in preis market stats")

  return {
    price: asset.price,
    change24h: (asset.change24h ?? 0) * 100,
    url: HYDRATION_PRICE_URL,
    liquidityUsd: 0,
    liquidityBase: 0,
    liquidityQuote: 0,
    volume24h: asset.volumeUsd24h ?? 0,
    fdv: 0,
    marketCap: 0,
    buys24h: 0,
    sells24h: 0,
    dataSource: "preis"
  }
}

export function useDexScreenerPrice() {
  const [data, setData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchPrice() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch("https://api.dexscreener.com/latest/dex/search?q=WUD")
        const json = await res.json()
        const pair = json.pairs?.find((p: DexScreenerPair) => p.pairAddress === PAIR_ADDRESS)

        if (!pair) throw new Error("Pair not found")

        if (isMounted) {
          setData({
            price: Number(pair.priceUsd),
            change24h: Number(pair.priceChange?.h24 ?? 0),
            url: pair.url,
            liquidityUsd: Number(pair.liquidity?.usd ?? 0),
            liquidityBase: Number(pair.liquidity?.base ?? 0),
            liquidityQuote: Number(pair.liquidity?.quote ?? 0),
            volume24h: Number(pair.volume?.h24 ?? 0),
            fdv: Number(pair.fdv ?? 0),
            marketCap: Number(pair.marketCap ?? 0),
            buys24h: Number(pair.txns?.h24?.buys ?? 0),
            sells24h: Number(pair.txns?.h24?.sells ?? 0),
            dataSource: "dexscreener"
          })
        }
      } catch (e: unknown) {
        try {
          const preisData = await fetchFromPreis()
          if (isMounted) setData(preisData)
        } catch {
          if (isMounted) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred')
          }
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPrice()

    const interval = setInterval(fetchPrice, 30000) // refresh every 30s

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  return { data, loading, error }
}
