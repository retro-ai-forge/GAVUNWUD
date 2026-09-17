"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@/components/ui/check-icon"
import { motion, useInView } from "framer-motion"
import { useSound } from "@/components/sound-provider"

// The cabin is cross-origin, so its background music can't be muted through the
// DOM. Withholding the autoplay permission stops it starting in the first place.
const CABIN_PERMISSIONS = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

export default function WudUniverseSection() {
  const { muted } = useSound()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [currentCabin, setCurrentCabin] = useState(1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToPrevCabin = () => {
    setCurrentCabin(prev => prev <= 1 ? 50 : prev - 1)
    resetAutoRotation()
  }

  const goToNextCabin = () => {
    setCurrentCabin(prev => prev >= 50 ? 1 : prev + 1)
    resetAutoRotation()
  }

  const resetAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentCabin(prev => prev >= 50 ? 1 : prev + 1)
    }, 15000)
  }

  useEffect(() => {
    resetAutoRotation()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section ref={ref} className="py-20 px-4 md:px-6 bg-black/90 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-6">
              WUD<span className="text-[#ff2e70]">universe</span>
            </h2>

            <div className="h-1 w-20 bg-[#ff2e70] mb-8"></div>

            <h3 className="text-2xl font-bold mb-6">WUD Universe: Your Gamified Web3 Identity</h3>
            
            <p className="text-gray-300 mb-6">
              WUD Universe is a community-driven, gamified digital identity (GDI) built on Unique Network and powered by Polkadot. Since October 2025, the WUD community has shaped this ecosystem into a living, evolving space where achievements, collectibles, and participation all matter.
            </p>
            <p className="text-gray-300 mb-6">
              Every participant receives a personal cabin, a soulbound NFT tied to their wallet, that acts as a home for your collectibles, achievements, and community contributions. Cabins grow and evolve over time based on your WUD holdings, activity, and engagement, reflecting your journey and status in the community.
            </p>
            
            <h4 className="text-xl font-bold mb-4">Key Features</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <CheckIcon className="text-[#ff2e70]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Soulbound Cabins</h4>
                  <p className="text-gray-300">
                    Each cabin is non-transferable and tied to your wallet, acting as a personal digital home and identity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <CheckIcon className="text-[#ff2e70]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Nested NFTs & Collectibles</h4>
                  <p className="text-gray-300">
                    Earn items through Flappy WUD, campaigns, quests, airdrops, and partner collaborations, and display or equip them in your cabin.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <CheckIcon className="text-[#ff2e70]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Cabin Evolution & Aura</h4>
                  <p className="text-gray-300">
                    Cabins visually and functionally evolve with participation, WUD holdings, and achievements, unlocking aura effects that appear on community leaderboards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <CheckIcon className="text-[#ff2e70]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Community Interaction</h4>
                  <p className="text-gray-300">
                    Visit friends' cabins to explore their collections, layouts, and aura, fostering social engagement and recognition.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <CheckIcon className="text-[#ff2e70]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Marketplace & Trading</h4>
                  <p className="text-gray-300">
                    Trade Mystery Boxes, items, and collectibles on the Unique Network Marketplace, or showcase them inside your cabin for prestige.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8">
              <Button
                size="lg"
                className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold px-6 py-5 rounded-lg w-full sm:w-auto"
                onClick={() => window.open('https://wuduniverse.xyz/', '_blank')}
              >
                EXPLORE WUD UNIVERSE
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-2 md:order-2"
          >
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden border-4 border-[#ff2e70] shadow-[0_0_30px_rgba(255,46,112,0.3)]">
              <iframe
                key={muted ? "muted" : "unmuted"}
                src={`https://wuduniverse.xyz/cabin/${currentCabin}?hideUI=true&muted=true`}
                className="w-full h-full"
                title={`WUDuniverse Cabin ${currentCabin}`}
                allow={muted ? CABIN_PERMISSIONS : `autoplay; ${CABIN_PERMISSIONS}`}
                allowFullScreen
              />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  onClick={goToPrevCabin}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold"
                  size="sm"
                >
                  ← Prev
                </Button>
                <Button
                  onClick={goToNextCabin}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold"
                  size="sm"
                >
                  Next →
                </Button>
              </div>
              <div className="border border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-bold px-6 py-5 rounded-lg text-center">
                Cabin #{currentCabin}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

