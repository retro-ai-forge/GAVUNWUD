"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function VideoTutorialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 px-4 md:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern-bck.webp')] bg-repeat opacity-10"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-4">
            How To Buy <span className="text-[#ff2e70]">WUD</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-[0_0_20px_rgba(255,46,112,0.2)] flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Buy WUD on <span className="text-[#ff2e70]">Hydration DEX</span>
              </h3>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-[600px]">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <video 
                      className="w-full h-full object-cover" 
                      controls
                    >
                      <source src="/hydration-dex.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  onClick={() => window.open('https://app.hydration.net/trade/swap?assetIn=10&assetOut=1000085', '_blank')}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold rounded-lg"
                >
                  GO TO HYDRATION DEX
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-[0_0_20px_rgba(255,46,112,0.2)] flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Buy WUD on <span className="text-[#ff2e70]">Nova Wallet</span>
              </h3>
              <div className="flex-grow flex items-center justify-center">
                <div className="relative w-auto h-full max-h-[500px] flex items-center">
                  <div className="aspect-[9/16] h-full max-h-[500px] overflow-hidden rounded-lg mx-auto">
                    <video 
                      className="h-full w-auto object-contain" 
                      controls
                    >
                      <source src="/nova-wallet.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  onClick={() => window.open('https://novawallet.io/', '_blank')}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold rounded-lg"
                >
                  DOWNLOAD NOVA WALLET
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-[0_0_20px_rgba(255,46,112,0.2)] flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Buy WUD on <span className="text-[#ff2e70]">SubWallet</span>
              </h3>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-[600px]">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <video 
                      className="w-full h-full object-cover" 
                      controls
                    >
                      <source src="/SubWallet.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  onClick={() => window.open('https://www.subwallet.app/', '_blank')}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold rounded-lg"
                >
                  DOWNLOAD SUBWALLET
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-[0_0_20px_rgba(255,46,112,0.2)] flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Buy WUD on <span className="text-[#ff2e70]">Talisman Wallet</span>
              </h3>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-[600px]">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <video 
                      className="w-full h-full object-cover" 
                      controls
                    >
                      <source src="/Talisman.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  onClick={() => window.open('https://talisman.xyz/', '_blank')}
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold rounded-lg"
                >
                  DOWNLOAD TALISMAN
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
} 