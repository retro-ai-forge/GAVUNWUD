"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useDexScreenerPrice, HYDRATION_PRICE_URL } from "@/hooks/useDexScreenerPrice"
import { useFlappeningStatus } from "@/hooks/useFlappeningStatus"
import { SoundToggle } from "@/components/sound-toggle"

const GECKOTERMINAL_URL = "https://www.geckoterminal.com/hydration/pools/0xb941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce"

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { data, loading, error } = useDexScreenerPrice()
  const flappeningStatus = useFlappeningStatus()
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const showThreshold = 300

      if (scrollY > showThreshold) {
        setIsNavVisible(true)
      } else {
        setIsNavVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)

    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'whatIsWud', label: 'About' },
    { id: 'flappyWud', label: 'Flappy Wud' },
    { id: 'gavunAi', label: 'Gavun AI' },
    { id: 'tokenomics', label: 'Tokenomics' },
    { id: 'nft', label: 'NFTs' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'partners', label: 'Partners' },
    { id: 'community', label: 'Community' },
    { id: 'faq', label: 'FAQ' },
    { id: 'wiki', label: 'Wiki', isExternal: true }
  ]

  return (
    <>
      <AnimatePresence>
        {isNavVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-black/80 backdrop-blur-md border-b border-gray-800"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 md:h-10 md:w-10">
                    <Image
                      src="/images/gavun-wud-black.webp"
                      alt="Gavun WUD Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-base md:text-lg font-bold">
                    <span className="text-white">gavunwud</span>
                    <span className="text-[#ff2e70]">.xyz</span>
                  </div>
                  <SoundToggle className="hidden md:flex" />
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {navLinks.map(link => (
                  link.isExternal ? (
                    <Link
                      key={link.id}
                      href="/wiki"
                      className="text-white hover:text-[#ff2e70] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-white hover:text-[#ff2e70] transition-colors"
                    >
                      {link.label}
                    </button>
                  )
                ))}
              </nav>

              <div className="md:hidden flex items-center gap-2">
                <SoundToggle />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#ff2e70] text-[#ff2e70]"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md md:hidden flex flex-col"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <Image
                      src="/images/gavun-wud-black.webp"
                      alt="Gavun WUD Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xl font-bold">
                    <span className="text-white">gavunwud</span>
                    <span className="text-[#ff2e70]">.xyz</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#ff2e70] text-[#ff2e70]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>

              <motion.div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                <motion.nav className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    link.isExternal ? (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link
                          href="/wiki"
                          className="text-white hover:text-[#ff2e70] transition-colors py-3 text-xl font-medium text-center block"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => scrollToSection(link.id)}
                        className="text-white hover:text-[#ff2e70] transition-colors py-3 text-xl font-medium text-center border-b border-gray-800"
                      >
                        {link.label}
                      </motion.button>
                    )
                  ))}
                </motion.nav>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="mt-6"
              >
                <Button
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold py-3 rounded-lg text-lg w-full"
                  onClick={() => {
                    window.open('https://app.hydration.net/trade/swap?assetIn=5&assetOut=1000085', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  BUY $WUD
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flappening Ribbon */}
      <AnimatePresence>
        {(flappeningStatus.isPlanned || flappeningStatus.isActive) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden text-white text-center py-3 px-4 cursor-pointer ${flappeningStatus.isActive
                ? 'bg-[#ff2e70] hover:bg-[#ff2e70]/80'
                : 'bg-[#ff6b35] hover:bg-[#ff6b35]/80'
              }`}
            onClick={() => {
              if (flappeningStatus.isActive) {
                window.open('/wiki#flappening-surge', '_blank');
              } else if (flappeningStatus.isPlanned) {
                window.open('https://x.com/gavunwud/status/2006768272000114858', '_blank');
              }
            }}
          >
            <div className="container mx-auto">
              {flappeningStatus.isPlanned ? (
                <div className="flex items-center justify-center gap-2 text-sm font-bold">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-lg"
                  >
                    🪂
                  </motion.div>
                  <span>
                    HAPPY 2026 WUDDIES – BIG WUD AIRDROP EVENT!
                    {flappeningStatus.timeUntilStart && (
                      <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs font-mono">
                        STARTS IN {flappeningStatus.timeUntilStart}
                      </span>
                    )}
                  </span>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="text-lg"
                  >
                    🪂
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm font-bold">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-lg"
                  >
                    🚀
                  </motion.div>
                  <span>
                    NEW YEAR 2026 FLAPPENING ACTIVE!
                    <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                      {flappeningStatus.multiplier}× REWARDS
                    </span>
                    {flappeningStatus.timeUntilEnd && (
                      <span className="ml-2 bg-black/30 px-2 py-1 rounded-full text-xs font-mono">
                        {flappeningStatus.timeUntilEnd} LEFT
                      </span>
                    )}
                  </span>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="text-lg"
                  >
                    🚀
                  </motion.div>
                </div>
              )}
              {/* Ribbon effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen flex flex-col overflow-hidden pt-3 pb-6 md:py-6 px-4 md:px-6 bg-black">
        <div className="container mx-auto z-40">
          <div className="flex items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative h-9 w-9 md:h-16 md:w-16">
                <Image
                  src="/images/gavun-wud-black.webp"
                  alt="Gavun WUD Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-lg md:text-xl font-bold">
                <span className="text-white">gavunwud</span>
                <span className="text-[#ff2e70]">.xyz</span>
              </div>
              <SoundToggle className="hidden md:flex mr-4" />
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center gap-6 text-sm font-medium"
            >
              {navLinks.map(link => (
                link.isExternal ? (
                  <Link
                    key={link.id}
                    href="/wiki"
                    className="text-white hover:text-[#ff2e70] transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-white hover:text-[#ff2e70] transition-colors"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:hidden flex items-center gap-2"
            >
              <SoundToggle />
              <Button
                variant="outline"
                size="sm"
                className="border-[#ff2e70] text-[#ff2e70]"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-[105%] h-[105%] md:w-[100%] md:h-[100%] lg:w-[95%] lg:h-[95%]"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Image
                  src="/images/gavun-lambo.webp"
                  alt="Gavun with Lambo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-20 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-bck.webp')] bg-repeat"></div>
        </div>

        <div className="container mx-auto relative z-30 flex-1 flex items-center mt-6 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-start space-y-6"
            >
              <div className="flex items-center space-x-2">
                <div className="h-1 w-12 bg-[#ff2e70]"></div>
                <span className="text-[#ff2e70] font-bold">$WUD ON POLKADOT</span>
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-bold font-['Karantina',sans-serif] leading-tight">
                  JAM gud. Polkadut gud.
                </h1>
                <p className="mt-2 text-2xl md:text-3xl font-bold font-['Karantina',sans-serif] text-gray-200 leading-tight">
                  Me eenvunt JUM tuh mak Polkadut gud agan
                </p>
                <p className="mt-2 text-lg md:text-xl font-['Karantina',sans-serif] text-[#ff2e70]">
                  — Gavun Wud, Fownder of Polkadut 🍺
                </p>
              </div>

              <p className="text-xl text-gray-300">
                Polkadot native memecoin making Polkadot good. Full degen. Full onchain. No VC. Only vibes.
              </p>

              <div className="flex flex-col gap-4 mt-8 w-full">
                <Button
                  size="lg"
                  className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold px-8 py-6 rounded-lg text-lg w-full sm:w-auto transform hover:scale-105 transition-transform shadow-lg shadow-[#ff2e70]/20"
                  onClick={() => window.open('https://app.hydration.net/trade/swap?assetIn=5&assetOut=1000085', '_blank')}
                >
                  BUY $WUD ON HYDRATION DEX
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-3 w-full">
                  <Button
                    variant="outline"
                    className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-medium px-4 py-3 rounded-lg text-sm w-full h-auto whitespace-normal leading-tight"
                    onClick={() => window.open('https://www.coingecko.com/en/coins/gavun-wud', '_blank')}
                  >
                    TRACK ON COINGECKO
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-medium px-4 py-3 rounded-lg text-sm w-full h-auto whitespace-normal leading-tight"
                    onClick={() => window.open(HYDRATION_PRICE_URL, '_blank')}
                  >
                    HYDRATION PRICE
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-medium px-4 py-3 rounded-lg text-sm w-full h-auto whitespace-normal leading-tight"
                    onClick={() => window.open('https://www.geckoterminal.com/hydration/pools/0xb941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce', '_blank')}
                  >
                    VIEW GECKOTERMINAL
                  </Button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <Button
                    variant="outline"
                    className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-medium px-4 py-3 rounded-lg text-sm w-full h-auto whitespace-normal leading-tight"
                    onClick={() => window.open('https://t.me/gavunwud', '_blank')}
                  >
                    JOIN TELEGRAM
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#ff2e70] text-[#ff2e70] hover:bg-[#ff2e70]/10 font-medium px-4 py-3 rounded-lg text-sm w-full h-auto whitespace-normal leading-tight"
                    onClick={() => window.open('https://discord.gg/4GE46uduFs', '_blank')}
                  >
                    JOIN DISCORD
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-6 bg-black/80 backdrop-blur-md rounded-lg border border-gray-800 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-500 font-bold uppercase">LIVE PRICE</span>
                  {data?.dataSource === "preis" && (
                    <a
                      href="https://hydration-preis.neckwork.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-500 ml-2 hover:underline"
                    >
                      (via hydration-preis.neckwork.net)
                    </a>
                  )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {loading ? "Loading..." : error ? "Price data unavailable" : `$${data?.price.toFixed(8)}`}
                    </div>

                    <div className={`text-lg font-medium ${data?.change24h && data.change24h > 0 ? "text-green-500" : data?.change24h ? "text-red-500" : "text-gray-400"}`}>
                      {loading
                        ? ""
                        : error
                          ? "Unable to fetch price data"
                          : `${data?.change24h && data.change24h > 0 ? "+" : ""}${data?.change24h?.toFixed(2)}% (24h)`}
                    </div>
                  </div>

                  {data && (
                    <div className="text-base text-gray-200 mt-4 md:mt-0 md:text-right space-y-2 font-medium">
                      <div className="flex flex-col gap-2">
                        <div className="text-[#ff2e70] hover:text-[#ff2e70]/80 transition-colors">
                          <a href={data.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start md:justify-end gap-1">
                            {data.dataSource === "dexscreener" ? "View on Dexscreener" : "View on Hydration Price"}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mt-0.5">
                              <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                              <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                            </svg>
                          </a>
                        </div>
                        {data.dataSource === "dexscreener" && (
                          <div className="text-[#ff2e70] hover:text-[#ff2e70]/80 transition-colors">
                            <a href={GECKOTERMINAL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start md:justify-end gap-1">
                              View on GeckoTerminal
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mt-0.5">
                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                      {data.liquidityUsd > 0 ? (
                        <div>Liquidity: <span className="font-bold">${Math.round(data.liquidityUsd).toLocaleString()}</span></div>
                      ) : (
                        <div>Liquidity: <span className="font-bold text-gray-400">Unavailable</span></div>
                      )}
                      {data.volume24h > 0 && (
                        <div>24h Volume: <span className="font-bold">${Math.round(data.volume24h).toLocaleString()}</span></div>
                      )}
                      {data.marketCap > 0 && (
                        <div>Market Cap: <span className="font-bold">${Math.round(data.marketCap).toLocaleString()}</span></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
              }}
              className="relative hidden md:block"
            >
              <div className="flex flex-col items-center gap-4 relative h-[460px] w-[400px] mx-auto">
                <div className="relative h-[400px] w-[400px]">
                  <Image src="/images/gavun-wud-logo.webp" alt="Gavun WUD Logo" fill className="object-contain" priority />
                </div>
                <div className="relative h-12 w-48">
                  <Image
                    src="/images/powered-by-polkadot.webp"
                    alt="Powered by Polkadot"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
