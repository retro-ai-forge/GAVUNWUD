"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function WhatIsWud() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

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
            What is <span className="text-[#ff2e70]">WUD</span>?
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-start space-x-4 mb-8">
            <div className="bg-[#ff2e70] rounded-full p-2 mt-1 flex-shrink-0">
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
                className="text-white"
              >
                <path d="M12 2v1" />
                <path d="M12 21v1" />
                <path d="m4.93 4.93-.7-.7" />
                <path d="m19.07 19.07 .7.7" />
                <path d="M2 12h1" />
                <path d="M21 12h1" />
                <path d="m4.93 19.07 -.7.7" />
                <path d="m19.07 4.93 .7-.7" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Polkadot-native memecoin with a purpose</h3>
              <p className="text-gray-300">
                $WUD launched on April 22nd, 2024, Gavin Wood&apos;s birthday, as a tribute to the founder of Polkadot, Ethereum, and Web3. It quickly evolved into a full-blown community-powered movement.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start space-x-4 mb-8">
            <div className="bg-[#ff2e70] rounded-full p-2 mt-1 flex-shrink-0">
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
                className="text-white"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" x2="12" y1="22" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Token Information</h3>
              <div className="grid grid-cols-2 gap-3 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Asset Hub ID</span>
                  <a href="https://assethub-polkadot.subscan.io/assets/31337" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">31337</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Name</span>
                  <span className="text-gray-200">Gavun Wud</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Decimals</span>
                  <span className="text-gray-200">10</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Supply</span>
                  <span className="text-gray-200">1 Trillion</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start space-x-4 mb-8">
            <div className="bg-[#ff2e70] rounded-full p-2 mt-1 flex-shrink-0">
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
                className="text-white"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Truly Community-Owned</h3>
              <p className="text-gray-300">
                The token was fairly launched with 1000 DOT of liquidity on Hydration&apos;s Omnipool at block 4961930. Just two days later, on April 24th, all <a href="https://assethub-polkadot.subscan.io/extrinsic/6110778-2" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">admin rights were burned</a>, making WUD fully decentralized and owned by its holders.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-2xl font-bold font-['Karantina',sans-serif] text-[#ff2e70]">
              &quot;WUD has become a symbol of what&apos;s possible when memes, creativity, and blockchain collide.&quot;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
