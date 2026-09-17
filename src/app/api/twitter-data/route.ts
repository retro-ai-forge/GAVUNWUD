import { NextResponse } from "next/server";
import { fetchTwitterData } from "@/utils/twitter";

export async function GET(request: Request) {
  try {
    const twitterData = await fetchTwitterData("gavunwud");
    
    if (twitterData.error) {
      return NextResponse.json(
        { error: twitterData.error },
        { status: 500 }
      );
    }
    
    // Return the data
    return NextResponse.json(twitterData);
  } catch (error: unknown) {
    console.error("Error in Twitter data API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Twitter data" },
      { status: 500 }
    );
  }
}
