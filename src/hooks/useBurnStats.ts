import { useEffect, useState } from "react"
import { useDexScreenerPrice } from "./useDexScreenerPrice"

type BurnStats = {
  lpSharesBurned: number
  lpBurners: number
  totalBurnedUsd: number
  lastUpdated: Date | null
  totalLpShares: number
  totalLiquidity: number
}

export function useBurnStats() {
  const { data: dexData, loading: dexLoading } = useDexScreenerPrice()
  const [data, setData] = useState<BurnStats>({
    lpSharesBurned: 219.3962,
    lpBurners: 156,
    totalBurnedUsd: 28048.39,
    lastUpdated: null,
    totalLpShares: 1052,
    totalLiquidity: 0
  })

  // Stamped after mount: rendering a locale date during SSR mismatches on hydration.
  useEffect(() => {
    setData((prev) => (prev.lastUpdated ? prev : { ...prev, lastUpdated: new Date() }))
  }, [])

  useEffect(() => {
    // liquidityUsd is only meaningful when sourced from Dexscreener directly;
    // fallback sources don't expose pool liquidity, so keep the defaults then.
    if (!dexData || dexData.dataSource !== "dexscreener" || !dexData.liquidityUsd) return

    console.log('Dex Data in useBurnStats:', dexData)
    
    // Calculate values
    const totalLpShares = 1052 // Total LP shares
    const totalBurned = 219.3962 // Burned LP shares (hardcoded since leaderboard API is broken)
    const totalBurns = 156 // Number of burners (hardcoded since leaderboard API is broken)
    
    const totalLiquidity = dexData.liquidityUsd // Total liquidity in USD (same as Tokenomics section)
    const lpShareValue = totalLiquidity / totalLpShares // Value per LP share
    
    console.log('Total Liquidity:', totalLiquidity)
    console.log('LP Share Value:', lpShareValue)
    
    const burnedUsdValue = totalBurned * lpShareValue // Calculate burned value based on shares
    
    console.log('Burned USD Value:', burnedUsdValue)
    
    setData({
      lpSharesBurned: totalBurned,
      lpBurners: totalBurns,
      totalBurnedUsd: burnedUsdValue,
      lastUpdated: new Date(),
      totalLpShares: totalLpShares,
      totalLiquidity: totalLiquidity
    })
  }, [dexData])

  return { data, loading: dexLoading, error: null, refetch: () => {} }
}
