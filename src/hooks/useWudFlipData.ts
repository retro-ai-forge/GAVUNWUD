import { useEffect, useState } from "react"

type WudFlipData = {
  price: number
  marketCap: number
  supply: number
  totalValueLocked: number
  wudPoolBalance: number
  dotPoolBalance: number
  lastUpdated: Date
}

// Cache system with 10 minute TTL
const CACHE: {
  data: WudFlipData | null
  lastUpdated: number
} = {
  data: null,
  lastUpdated: 0
}

const CACHE_TTL = 10 * 60 * 1000 

export function useWudFlipData() {
  const [data, setData] = useState<WudFlipData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchWudData() {
    setLoading(true)
    setError(null)
    
    try {
      // Check cache first
      const currentTime = Date.now()
      if (CACHE.data && (currentTime - CACHE.lastUpdated < CACHE_TTL)) {
        setData(CACHE.data)
        return
      }
      
      const response = await fetch('https://wudflip.gavunwud.xyz/api/all-data')
      const json = await response.json()
      
      const wudData: WudFlipData = {
        price: json.wud.price,
        marketCap: json.wud.marketCap,
        supply: json.wud.supply,
        totalValueLocked: json.wud.totalValueLocked,
        wudPoolBalance: json.wud.wudPoolBalance,
        dotPoolBalance: json.wud.dotPoolBalance,
        lastUpdated: new Date()
      }
      
      CACHE.data = wudData
      CACHE.lastUpdated = currentTime
      
      setData(wudData)
    } catch (err) {
      console.error('Error fetching WUD data:', err)
      setError("Failed to fetch WUD data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    
    async function initialFetch() {
      if (!isMounted) return
      await fetchWudData()
    }

    initialFetch()
    
    const intervalId = setInterval(() => {
      if (isMounted) fetchWudData()
    }, 1 * 60 * 1000)
    
    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

  return { data, loading, error, refetch: fetchWudData }
}