"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const faqItems = [
    {
      question: "Who's behind this?",
      answer:
        "Currently the team is composed of @AlexandruStefan and @alexislikeswud. However, there is an extended team of community members who help with everything, $WUD is community driven.",
    },
    {
      question: "How do I buy WUD?",
      answer:
        "You can buy WUD on Hydration DEX by connecting your Polkadot wallet (like Nova Wallet, Talisman or SubWallet) and swapping DOT for WUD. Check our 'Buy Now' button for a direct link.",
    },
    {
      question: "WEN CEX?",
      answer:
        "CEX Listing will come at 20M market cap. We will announce it on our social channels.",
    },
    {
      question: "What makes WUD different from other memecoins?",
      answer:
        "Unlike most memecoins, WUD offers actual utility through our FlappyWUD game, NFT ecosystem, and Gavun AI assistant. We're building a sustainable ecosystem, not just pumping a token.",
    },
    {
      question: "How do I earn from playing FlappyWUD?",
      answer:
        "Top players on the FlappyWUD leaderboard receive regular WUD token airdrops. Additionally, holding WUD NFTs gives you special abilities and advantages in the game, potentially increasing your score and rewards.",
    },
    {
      question: "Is the team doxxed?",
      answer:
        "Yes the team is doxxed. We're well-known in the Polkadot ecosystem and have built a reputation for delivering on our promises. Judge us by our actions, not our identities.",
    },

    {
      question: "How can I contribute to the WUD ecosystem?",
      answer:
        "Join our community on Telegram or Discord, raid X posts, spread the word, create and share memes, play FlappyWUD, and provide liquidity. We welcome all forms of contribution! \n There's also a suggestion box here: <a href='https://docs.google.com/forms/d/e/1FAIpQLSe9i6n16gSHqV7fCbWpBK6aL0kuOnAKTJ56BjVjHzAKhDKYwQ/viewform' target='_blank' rel='noopener noreferrer' class='text-[#ff2e70] hover:underline'>suggestion form</a>",
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 md:px-6 bg-black relative">
      <div className="absolute inset-0 bg-[url('/images/pattern-bck.webp')] bg-repeat opacity-10"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-4">
            <span className="text-[#ff2e70]">FAQ</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about WUD, in meme language but with clear answers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-bold text-lg hover:text-[#ff2e70] transition-colors duration-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            Still have questions? Join our{" "}
            <a href="https://t.me/gavunwud" className="text-[#ff2e70] hover:underline">
              Telegram
            </a>{" "}
            or{" "}
            <a href="https://discord.gg/4GE46uduFs" className="text-[#ff2e70] hover:underline">
              Discord
            </a>{" "}
            to chat with the community.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
