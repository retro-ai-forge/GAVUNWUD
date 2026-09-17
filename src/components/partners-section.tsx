"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const partners = [
    { name: "Hydration", logo: "/partners/Hydration.webp", description: "Fair launch via Omnipool + LP integrations" },
    { name: "OriginTrail", logo: "/partners/Origin_Trail.webp", description: "Knowledge Graph + AI integration for Gav AI" },
    { name: "Chaotic", logo: "/partners/White_Logos/chaotic_white.webp", description: "NFT marketplace for WUD collectibles and burn campaigns" },
    { name: "Tanssi Network", logo: "/partners/Tanssi.webp", description: "Cross-ecosystem campaigns and future appchain infrastructure" },
    { name: "Bifrost", logo: "/partners/Bifrost.webp", description: "Yield integrations and on-chain data bridges" },
    { name: "The Dots", logo: "/partners/The_Dots.webp", description: "Creative collaboration and cross-branding" },
    { name: "The Kusamarian", logo: "/partners/The_Kus.webp", description: "Media and NFT collaboration through Collectables by Kus" },
    { name: "AirLyft", logo: "/partners/AirLyft.webp", description: "Onboarding campaigns and incentive mechanics" },
    { name: "EasyA", logo: "/partners/EasyA.webp", description: "Web3 education + WUD gamification in hackathons" },
    { name: "Zeitgeist", logo: "/partners/Zeitgeist.webp", description: "Treasury Holder and $WUD supporter" },
    { name: "Unique Network", logo: "/partners/Unique.webp", description: "NFT infrastructure and potential collabs" },
    { name: "N3MUS", logo: "/partners/N3MUS.webp", description: "Gaming tournaments, community events, and cross-promo campaigns" },
    { name: "JAMTON", logo: "/partners/Jamton.webp", description: "Opening Flappy WUD to TON world" },
    { name: "PromoTeam", logo: "/partners/promoteam.webp", description: "Supporting WUD growth inside and outside of the ecosystem" },
    { name: "SubWallet", logo: "/partners/Subwallet.webp", description: "Easy to use mobile and desktop wallet + FlappyWUD app" },
    { name: "Nova Wallet", logo: "/partners/Nova_Wallet.webp", description: "Easy to use mobile wallet with 1 click swap + FlappyWUD app" },
    { name: "Talisman", logo: "/partners/Talisman.webp", description: "An Ethereum and Polkadot multi-chain wallet for web3 explorers" },
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
            WUD Only Rolls With the <span className="text-[#ff2e70]">Real Ones</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto mb-6"></div>
          <div className="text-xl text-gray-300 max-w-3xl mx-auto space-y-4">
            <p>
              WUD is proud to collaborate with some of the most innovative teams in the Polkadot ecosystem. These partnerships aren&apos;t just logos; they&apos;re real integrations, creative campaigns, and shared missions to onboard new users into Web3 through memes, games, NFTs, and AI.
            </p>
            <p>
              Whether it&apos;s launching NFT collections, powering the AI agent, or running high-impact campaigns, our partners help expand what WUD can do and amplify our reach across the ecosystem.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#ff2e70] transition-all duration-300 group"
            >
              <div className="h-16 mb-4 relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff2e70] transition-colors duration-300">
                {partner.name}
              </h3>
              <p className="text-gray-400">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-300 italic">
            &quot;We vibed with WUD because sometimes you need a little chaos to drive innovation.&quot;
          </p>
          <p className="text-[#ff2e70] mt-2">- Anonymous Partner</p>
        </motion.div>
      </div>
    </section>
  )
}