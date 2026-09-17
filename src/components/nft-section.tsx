"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { useBurnStats } from "@/hooks/useBurnStats"

export default function NftSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { data: burnStats, loading: burnStatsLoading } = useBurnStats()

  const nfts = [
    {
      id: 1,
      name: "OG WUD BURN NFTs 🔥🔥🔥🔥",
      image: "/images/OgBurnCollection.webp",
      rarity: "Epic",
      utility: "Multiple FlappyWUD Powerup Boosts",
      buttonText: "View Collection on Chaotic",
      link: "https://chaotic.art/ahp/collection/244"
    },
    { 
      id: 2, 
      name: "WUD Anniversary NFTs ⚡️⚡️⚡️⚡️", 
      image: "/images/HappyBdayCollection.webp", 
      rarity: "Legendary", 
      utility: "Increased Drop Rate in Flappy WUD",
      buttonText: "View Collection on Chaotic",
      link: "https://chaotic.art/ahp/collection/441"
    },
    { 
      id: 3, 
      name: "WUD UNIVERSE PLATFORM", 
      image: "/images/wudUniverseCollection.webp", 
      rarity: "Epic", 
      utility: "The ultimate dynamic NFT gaming platform powered by Polkadot and Unique Network.",
      buttonText: "Go to WUD Universe",
      link: "https://wuduniverse.xyz"
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 md:px-6 bg-black/90 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-4">
            NFTs <span className="text-[#ff2e70]">Collections</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Collect unique NFTs with real utility in the WUD ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`bg-black/60 backdrop-blur-sm rounded-xl border ${!nft.link ? 'border-gray-700' : 'border-gray-800 group hover:border-[#ff2e70]'} overflow-hidden transition-all duration-300 relative flex flex-col h-full`}
            >
              <div className="relative h-64 w-full flex-shrink-0">
                <Image
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  fill
                  className={`object-cover ${!nft.link ? 'grayscale' : 'transition-transform duration-500 group-hover:scale-110'}`}
                />
                <div className="absolute top-2 right-2 bg-[#ff2e70] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {nft.rarity}
                </div>
                
                {!nft.link && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-black/80 text-white font-bold py-2 px-4 rounded-lg border border-gray-700 rotate-12 transform scale-125 shadow-xl">
                      <span className="text-lg">COMING SOON</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                <div className="flex items-center space-x-2 mb-4 flex-grow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70] flex-shrink-0"
                  >
                    <path d="m9 12 2 2 4-4" />
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  </svg>
                  <span className="text-gray-300">{nft.utility}</span>
                </div>

                <div className="mt-auto">
                  {nft.link ? (
                    <Link href={nft.link} target="_blank" className="block w-full">
                      <Button className="w-full bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold">
                        {nft.buttonText || "View NFT"}
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      disabled 
                      className="w-full bg-gray-600 text-gray-300 cursor-not-allowed opacity-70 border border-gray-700"
                    >
                      {nft.buttonText || "View NFT"}
                      <span className="ml-2 text-xs">🔒</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">LP Burn Campaign</h3>
              <p className="text-gray-300 mb-6">
                Burned LP tokens campaign was a success!
              </p>
              <Link 
                href="https://flappywud-backend-production.up.railway.app/burn-leaderboard" 
                target="_blank" 
                className="inline-flex items-center text-[#ff2e70] hover:text-[#ff2e70]/80 mb-6"
              >
                <span>View original leaderboard</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total LP Shares burned:</span>
                  <div className="flex items-center">
                    {burnStatsLoading ? (
                      <div className="h-6 w-16 bg-gray-700 animate-pulse rounded"></div>
                    ) : (
                      <span className="text-xl font-bold text-[#ff2e70]">
                        {burnStats.lpSharesBurned.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">LP Burners:</span>
                  <div className="flex items-center">
                    {burnStatsLoading ? (
                      <div className="h-6 w-16 bg-gray-700 animate-pulse rounded"></div>
                    ) : (
                      <span className="text-xl font-bold text-[#ff2e70]">
                        {burnStats.lpBurners.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Burned at current value:</span>
                  <div className="flex items-center">
                    {burnStatsLoading ? (
                      <div className="h-6 w-16 bg-gray-700 animate-pulse rounded"></div>
                    ) : (
                      <span className="text-xl font-bold text-[#ff2e70]">
                        ${burnStats.totalBurnedUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                </div>
                
                {burnStats.lastUpdated && (
                  <div className="text-xs text-gray-500 text-right mt-2">
                    Updated: {burnStats.lastUpdated.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="relative h-full">
              <div className="absolute inset-0 rounded-lg flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/nfts1.webp" 
                  alt="Burn Logo"
                  fill
                  className="object-contain opacity-70"
                />

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
