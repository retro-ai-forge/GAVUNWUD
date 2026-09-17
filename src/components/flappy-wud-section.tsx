"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"

interface FlappyWudStats {
  totalGames: string;
  highestScore: number;
  totalUniqueAddresses: string;
  activePlayers: number;
  surgeLevel: number;
}

export default function FlappyWudSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [stats, setStats] = useState<FlappyWudStats>({
    totalGames: "373,592",
    highestScore: 742,
    totalUniqueAddresses: "3,028",
    activePlayers: 0,
    surgeLevel: 0
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/flappywud-stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch FlappyWUD stats:", error)
      }
    }

    fetchStats()
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
            className="order-2 md:order-1"
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border-4 border-[#ff2e70] shadow-[0_0_30px_rgba(255,46,112,0.3)]">
              <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => window.open('https://flappywud.lol', '_blank')}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold px-8 py-6 rounded-lg text-lg"
                >
                  PLAY NOW
                </Button>
              </div>
              <div className="absolute inset-0 bg-[url('/images/flappy-wud-cover.png')] bg-cover bg-center"></div>
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-800 relative overflow-hidden group">
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Live</span>
                </div>
                <div className="text-2xl font-bold text-[#ff2e70]">{stats.activePlayers}</div>
                <div className="text-sm text-gray-400">Live Players</div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-[#ff2e70]">{stats.totalGames}</div>
                <div className="text-sm text-gray-400">Games Played</div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-[#ff2e70]">{stats.totalUniqueAddresses}</div>
                <div className="text-sm text-gray-400">Unique Players</div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-[#ff2e70]">{stats.highestScore}</div>
                <div className="text-sm text-gray-400">Highest Score</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-6">
              FlappyWUD <span className="text-[#ff2e70]">Game</span>
            </h2>

            <div className="h-1 w-20 bg-[#ff2e70] mb-8"></div>

            <h3 className="text-2xl font-bold mb-6">&quot;Tap to fly. Jeet to cry.&quot;</h3>

            <p className="text-gray-300 mb-6">
              FlappyWUD is a skill-based Web3 game that blends nostalgia with blockchain innovation. Players guide the Gavun WUD character through an increasingly difficult course, where performance, persistence, and timing matter.
            </p>
            <p className="text-gray-300 mb-6">
              FlappyWUD rewards players based on their on-chain WUD holdings, integrating token-based mechanics, dynamic airdrops, and NFT utility. Built for the crypto-native community, it&apos;s a lightweight, arcade experience where skill meets strategy, and WUD holders are truly empowered.
            </p>

            <h4 className="text-xl font-bold mb-4">Key Features:</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Integrated with SubWallet and NovaWallet</h4>
                  <p className="text-gray-300">
                    Seamless mobile play with your favorite Polkadot wallets.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Desktop Play Options</h4>
                  <p className="text-gray-300">
                    Also playable on desktop with Talisman or SubWallet.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">NFTs and Token-Based Airdrops/Powerups</h4>
                  <p className="text-gray-300">Score-based airdrops and powerups tied to holdings and NFTs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Official Recognition</h4>
                  <p className="text-gray-300">Featured on the official Polkadot website.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Competitive Gaming</h4>
                  <p className="text-gray-300">Leaderboards, events, and real rewards.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#ff2e70]/20 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">N3MUS Featured</h4>
                  <p className="text-gray-300">Featured on <a href="https://hub.n3mus.com/games/flappywud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">N3MUS</a></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-8">
              <Button
                size="lg"
                className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold px-6 py-5 rounded-lg w-full sm:w-auto"
                onClick={() => window.open('https://flappywud.lol', '_blank')}
              >
                PLAY NOW
              </Button>
              <a href="/flappywudgraypaper2.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-bold px-6 py-5 rounded-lg break-all w-full"
                >
                  GET THE FLAPPY WUD GRAY PAPER
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
