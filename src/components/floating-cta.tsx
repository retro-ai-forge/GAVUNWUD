"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const showThreshold = 500

      if (scrollY > showThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-md border-t border-gray-800 hidden md:block"
        >
          <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">Ready to join the $WUD movement in Polkadot?</h3>
              {/* <p className="text-gray-300">Get in early before it's too late!</p> */}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
            <Button 
                size="lg" 
                className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold"
                onClick={() => window.open('https://app.hydration.net/trade/swap?assetIn=5&assetOut=1000085', '_blank')}>
                BUY $WUD
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-bold"
                onClick={() => window.open('https://t.me/gavunwud', '_blank')}
              >
                JOIN TELEGRAM
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-bold"
                onClick={() => window.open('https://discord.gg/4GE46uduFs', '_blank')}
              >
                JOIN DISCORD
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white hover:bg-white/10 font-bold"
                onClick={() => window.open('https://flappywud.lol', '_blank')}
              >
                PLAY FLAPPYWUD
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
