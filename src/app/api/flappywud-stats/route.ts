import { NextResponse } from "next/server";
import { fetchFlappyWudStats } from "@/utils/flappywudbackend";

type FlappyWudStats = {
  totalGames: string;
  highestScore: number;
  totalUniqueAddresses: string;
  activePlayers: number;
  surgeLevel: number;
};

export async function GET() {
  try {
    const stats: FlappyWudStats = await fetchFlappyWudStats();

    return NextResponse.json(stats);
  } catch (error: unknown) {
    console.error("Error in FlappyWUD stats API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch FlappyWUD stats" },
      { status: 500 }
    );
  }
} 