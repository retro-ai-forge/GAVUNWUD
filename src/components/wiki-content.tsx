"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CheckIcon } from "@/components/ui/check-icon"
import VideoTutorialsSection from "@/components/video-tutorials-section"
import BrandAssetsGallery from "@/components/brand-assets-gallery"
import { ArrowLeft } from "lucide-react"
import { useDexScreenerPrice } from "@/hooks/useDexScreenerPrice"
import { useFlappeningStatus } from "@/hooks/useFlappeningStatus"
import { SoundToggle } from "@/components/sound-toggle"

const sections = [
  { id: 'overview', title: '1. Overview' },
  { id: 'getting-started', title: '1.1 Getting Started' },
  { id: 'history', title: '2. Project History' },
  { id: 'character', title: '3. The Gavun Wud Character' },
  { id: 'token-info', title: '4. Token Information ($WUD)' },
  { id: 'technology', title: '4.1 Technology & Infrastructure' },
  { id: 'token-utility', title: '4.2 Token Utility' },
  { id: 'ecosystem', title: '5. WUD Ecosystem Overview' },
  { id: 'wud-universe', title: '6. WUD Universe' },
  { id: 'flappy-wud', title: '7. Flappy WUD' },
  { id: 'flappening-surge', title: '7.1 Flappening & Surge Events' },
  { id: 'flappy-tips', title: '7.2 Flappy WUD Tips & Tricks' },
  { id: 'flappy-nfts', title: '7.3 NFTs in Flappy WUD' },
  { id: 'flappy-stats', title: '7.4 Flappy WUD Stats' },
  { id: 'wudflip', title: '8. WUDFlip' },
  { id: 'ai-automation', title: '9. AI & Automation' },
  { id: 'community', title: '10. Community & Social Layer' },
  { id: 'partnerships', title: '11. Partnerships & Collaborations' },
  { id: 'bifrost-partnership', title: '11.1 Bifrost Partnership' },
  { id: 'n3mus-tournaments', title: '11.2 N3MUS Tournaments' },
  { id: 'graphics-media', title: '12. Graphics & Media' },
  { id: 'future-roadmap', title: '13. Future & Roadmap' },
  { id: 'polkadot-blockchain', title: '14. Polkadot Blockchain' },
  { id: 'gavin-wood', title: '15. Gavin Wood' },
  { id: 'links-resources', title: '16. Links & Resources' },
]

export function WikiContent() {
  const [activeSection, setActiveSection] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const { data: dexData, loading } = useDexScreenerPrice()
  const flappeningStatus = useFlappeningStatus()

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && sections.some(section => section.id === hash)) {
        setActiveSection(hash)
      }
    }

    // Check initial hash on mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [sections])

  // Update URL hash when active section changes
  useEffect(() => {
    if (activeSection) {
      window.history.replaceState(null, '', `#${activeSection}`)
    }
  }, [activeSection])

  // Scroll to top when section changes
  useEffect(() => {
    setTimeout(() => {
      const h1 = document.querySelector('.prose h1');
      if (h1) {
        h1.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [activeSection])

  // Filter sections based on search term
  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Dynamic bio content based on active section
  const getBioContent = () => {
    switch (activeSection) {
      case 'overview':
        return {
          title: 'Bio',
          content: [
            { label: 'Launched', value: 'April 22, 2024' },
            { label: 'Network', value: 'Polkadot Asset Hub' },
            { label: 'Token Symbol', value: '$WUD' },
            { label: 'Total Supply', value: '1 Trillion' },
            { label: 'Asset ID', value: '31337' },
            { label: 'Website', value: 'GCP hosted' }
          ]
        }
      case 'history':
        return {
          title: 'Historical Bio',
          content: [
            { label: 'Founded', value: 'April 22, 2024' },
            { label: 'OG DEV', value: 'unknown' },
            { label: 'Origin', value: 'Polkadot meme project' },
            { label: 'Evolution', value: 'Community-driven ecosystem' },
            { label: 'Key Milestone', value: 'Admin keys burned' },
            { label: 'Current Status', value: 'Fully decentralized' },
            { label: 'Organization', value: 'Community-run' }
          ]
        }
      case 'character':
        return {
          title: 'Character Bio',
          content: [
            { label: 'Name', value: 'Gavun Wud' },
            { label: 'Inspiration', value: 'Gavin Wood (conceptual)' },
            { label: 'Core Traits', value: 'Intelligent, Independent, Curious' },
            { label: 'Personality', value: 'Clever, Calm, Self-aware Humor' },
            { label: 'Environment', value: 'Digital & Natural Spaces' },
            { label: 'Role', value: 'Ecosystem Unifying Element' },
            { label: 'Design Philosophy', value: 'Adaptable & Recognizable' },
            { label: 'Creative Tone', value: 'Subtle Humor, Not Exaggeration' },
            { label: 'Cultural Impact', value: 'Web3 Builder Archetype' }
          ]
        }
      case 'token-info':
        return {
          title: 'Token Bio',
          content: [
            { label: 'Symbol', value: '$WUD' },
            { label: 'Network', value: 'Polkadot Asset Hub' },
            { label: 'Asset ID', value: '31337' },
            { label: 'Total Supply', value: '999.9B (~1T tokens)' },
            { label: 'Launch Date', value: 'April 22, 2024' },
            { label: 'Governance', value: 'Community-run since April 2024' },
            { label: 'LP Burned', value: loading ? 'Loading...' : dexData && dexData.liquidityUsd > 0 ? `$${dexData.liquidityUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}+ (96.8%)` : '96.8%' },
            { label: 'Unique Addresses', value: '3,398' },
            { label: 'Sufficient Asset', value: 'Hydration Network' }
          ]
        }
      case 'technology':
        return {
          title: 'Tech Bio',
          content: [
            { label: 'Primary Chain', value: 'Polkadot Asset Hub' },
            { label: 'Additional Network', value: 'Hydration' },
            { label: 'Admin Status', value: 'Keys Permanently Burned' },
            { label: 'LP Burned', value: '96%+' },
            { label: 'Wallet Support', value: 'Subwallet, NovaWallet, Talisman' },
            { label: 'Security', value: 'On-chain Auditable' },
            { label: 'Organization', value: 'Community-run' }
          ]
        }
      case 'flappy-wud':
        return {
          title: 'Game Bio',
          content: [
            { label: 'Game Name', value: 'Flappy WUD 2.0' },
            { label: 'Platform', value: 'Web3 Browser Game' },
            { label: 'Rewards', value: '$WUD tokens & NFTs' },
            { label: 'Multipliers', value: '2x-4x based on $WUD holdings' },
            { label: 'NFT Integration', value: '4-tier OG WUD BURN collection' },
            { label: 'Power-ups', value: 'JAM, KusBoost, WUD Beer, Quantum Invincibility' },
            { label: 'Events', value: 'The Flappening & Surge Mode' },
            { label: 'Total Games', value: '497.185 played' },
            { label: 'Wallets', value: 'Subwallet, NovaWallet, Talisman' }
          ]
        }
      case 'token-utility':
        return {
          title: 'Utility Bio',
          content: [
            { label: 'Primary Function', value: 'Gaming & NFT Ecosystem' },
            { label: 'Gaming Utility', value: 'Flappy WUD rewards & boosts' },
            { label: 'NFT Integration', value: 'WUD Universe minting & trading' },
            { label: 'Reward Systems', value: 'Events, leaderboards, campaigns' },
            { label: 'Burn Mechanisms', value: loading ? 'Loading...' : dexData && dexData.liquidityUsd > 0 ? `$${dexData.liquidityUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}+ LP burned` : '96.8% LP burned' },
            { label: 'Deflationary', value: 'NFT campaigns & special events' },
            { label: 'Future Expansion', value: 'Web3 games, staking, governance' },
            { label: 'Ecosystem Role', value: 'Polkadot Web3 gateway' },
            { label: 'Community Driven', value: 'Gamified participation incentives' }
          ]
        }
      case 'ecosystem':
        return {
          title: 'Ecosystem Bio',
          content: [
            { label: 'Core Products', value: 'Flappy WUD, WUD Universe, $WUD Token' },
            { label: 'Blockchain', value: 'Polkadot Asset Hub, Hydration & Unique Network' },
            { label: 'Integration', value: 'Unique Network, Bifrost, Partner Platforms' },
            { label: 'User Flow', value: 'Acquire → Play → Earn → Upgrade → Trade' },
            { label: 'Cross-Product', value: 'Games ↔ NFTs ↔ Wallets ↔ Rewards' },
            { label: 'Community Focus', value: 'Gamified campaigns & social engagement' },
            { label: 'Onboarding', value: 'Wallet integration for Polkadot newcomers' },
            { label: 'Utility Token', value: '$WUD powers all ecosystem activities' },
            { label: 'Growth Driver', value: 'Continuous engagement & ecosystem expansion' }
          ]
        }
      case 'flappy-stats':
        return null
      case 'getting-started':
        return null
      case 'wud-universe':
        return {
          title: 'WUD Universe Bio',
          content: [
            { label: 'Launched', value: 'October 2, 2025' },
            { label: 'Network', value: 'Unique Network' },
            { label: 'Platform', value: 'Polkadot Ecosystem' },
            { label: 'Mint Cost', value: '10 DOT' },
            { label: 'Features', value: 'Cabins, Items, Marketplace' },
            { label: 'Integration', value: 'Flappy WUD, NFTs' }
          ]
        }
      default:
        return null
    }
  }

  const bioData = getBioContent()

  return (
    <div className="min-h-screen bg-black text-white">
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
                window.location.hash = '#flappening-surge';
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

      {/* GavunWud-style header */}
      <div className="bg-black/90 border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                  <Image
                    src="/images/gavun-wud-black.webp"
                    alt="Gavun WUD Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Gavun Wud Wiki</h1>
                <Link
                  href="/"
                  className="text-xs sm:text-sm text-gray-400 hover:text-[#ff2e70] transition-colors flex items-center gap-1 group w-fit"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Website
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SoundToggle />
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search wiki..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 pr-8 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#ff2e70] focus:ring-1 focus:ring-[#ff2e70] text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-lg leading-none w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Content */}
          <div id="main-content" className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl"
            >
              {/* Article Header */}
              <div className="border-b border-gray-800 p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Gavun Wud</h1>
                <p className="text-sm sm:text-base text-gray-400 italic">Polkadot ecosystem memecoin and gaming platform</p>
              </div>

              {/* Bio */}
              {bioData && (
                <div className="block lg:float-right lg:ml-6 mb-6 lg:mb-6 w-full lg:w-80">
                  <div className="bg-gray-900/80 border border-gray-700 p-4 rounded-lg shadow-lg w-full">
                    <h2 className="text-base sm:text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">{bioData.title}</h2>
                    <div className="space-y-2 text-sm">
                      {bioData.content.map((item, index) => (
                        <div key={item.label} className={`flex flex-row justify-between py-2 px-2 rounded ${index % 2 === 1 ? 'bg-gray-800/50' : ''}`}>
                          <span className="font-semibold text-gray-300 flex-1">{item.label}</span>
                          <span className="text-white text-right w-1/2">
                            {item.label === 'Symbol' ? (
                              <span className="text-[#ff2e70] font-bold">{item.value}</span>
                            ) : (
                              item.value
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="p-4 sm:p-6 prose prose-invert max-w-none">
                {activeSection === 'overview' && <OverviewSection onNavigate={setActiveSection} />}
                {activeSection === 'history' && <HistorySection onNavigate={setActiveSection} />}
                {activeSection === 'character' && <CharacterSection onNavigate={setActiveSection} />}
                {activeSection === 'token-info' && <TokenInfoSection onNavigate={setActiveSection} dexData={dexData} loading={loading} />}
                {activeSection === 'technology' && <TechnologySection onNavigate={setActiveSection} />}
                {activeSection === 'token-utility' && <TokenUtilitySection onNavigate={setActiveSection} dexData={dexData} loading={loading} />}
                {activeSection === 'ecosystem' && <EcosystemSection onNavigate={setActiveSection} />}
                {activeSection === 'flappy-wud' && <FlappyWudSection onNavigate={setActiveSection} />}
                {activeSection === 'flappening-surge' && <FlappeningSurgeSection onNavigate={setActiveSection} />}
                {activeSection === 'flappy-tips' && <FlappyTipsSection onNavigate={setActiveSection} />}
                {activeSection === 'flappy-nfts' && <FlappyNftsSection onNavigate={setActiveSection} />}
                {activeSection === 'flappy-stats' && <FlappyStatsSection onNavigate={setActiveSection} />}
                {activeSection === 'bifrost-partnership' && <BifrostPartnershipSection onNavigate={setActiveSection} />}
                {activeSection === 'n3mus-tournaments' && <N3MusTournamentsSection onNavigate={setActiveSection} />}
                {activeSection === 'wud-universe' && <WudUniverseSection onNavigate={setActiveSection} />}
                {activeSection === 'wudflip' && <WudflipSection onNavigate={setActiveSection} />}
                {activeSection === 'ai-automation' && <AiAutomationSection onNavigate={setActiveSection} />}
                {activeSection === 'community' && <CommunitySection onNavigate={setActiveSection} />}
                {activeSection === 'partnerships' && <PartnershipsSection onNavigate={setActiveSection} />}
                {activeSection === 'graphics-media' && <GraphicsMediaSection onNavigate={setActiveSection} />}
                {activeSection === 'getting-started' && <GettingStartedSection onNavigate={setActiveSection} />}
                {activeSection === 'future-roadmap' && <FutureRoadmapSection onNavigate={setActiveSection} />}
                {activeSection === 'polkadot-blockchain' && <PolkadotBlockchainSection onNavigate={setActiveSection} />}
                {activeSection === 'gavin-wood' && <GavinWoodSection onNavigate={setActiveSection} />}
                {activeSection === 'links-resources' && <LinksResourcesSection />}
              </div>

              {/* Categories */}
              <div className="border-t border-gray-800 p-4 sm:p-6">
                <div className="text-sm">
                  <span className="font-semibold text-gray-300 block sm:inline mb-2 sm:mb-0">Categories:</span>
                  <div className="flex flex-wrap gap-2 sm:gap-0 sm:contents">
                    <a href="#" className="text-[#ff2e70] hover:underline sm:ml-2">Cryptocurrencies</a>
                    <a href="#" className="text-[#ff2e70] hover:underline sm:ml-2">Memecoins</a>
                    <a href="#" className="text-[#ff2e70] hover:underline sm:ml-2">Polkadot ecosystem</a>
                    <a href="#" className="text-[#ff2e70] hover:underline sm:ml-2">Web3 gaming</a>
                    <a href="#" className="text-[#ff2e70] hover:underline sm:ml-2">NFT projects</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Table of Contents - Right Sidebar */}
          <div className="lg:w-80 order-first lg:order-last">
            <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl sticky top-4">
              <div className="border-b border-gray-800 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    {searchTerm ? `Search Results` : 'Contents'}
                  </h2>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-gray-400 hover:text-white text-sm w-6 h-6 flex items-center justify-center"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Showing results for &quot;{searchTerm}&quot;</p>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <nav className="space-y-1">
                  {filteredSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveSection(section.id)
                        const mainContent = document.getElementById('main-content')
                        if (mainContent) {
                          mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors text-sm ${activeSection === section.id
                        ? 'bg-[#ff2e70]/20 text-[#ff2e70] border-l-4 border-[#ff2e70]'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
                {searchTerm && filteredSections.length === 0 && (
                  <p className="text-gray-400 text-sm mt-4">No sections found matching &quot;{searchTerm}&quot;</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">1. Overview</h1>
      <p className="text-gray-300 mb-4 leading-relaxed">
        <strong className="font-semibold text-white">Gavun Wud</strong> (often stylized as $WUD) is a Polkadot-native, community-run Web3 project centered around gaming, NFTs, and interactive onboarding experiences. While it originated as a meme-driven initiative, Gavun Wud has evolved into a broader ecosystem that combines entertainment, on-chain mechanics, and community participation to introduce users to the Polkadot network.
      </p>
      <p className="text-gray-300 mb-4 leading-relaxed">
        The project is built around the $WUD token and a growing set of products that include games, NFT systems, and experimental utilities designed to be accessible to both new and existing Web3 users.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">What is Gavun Wud</h2>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Gavun Wud is a Polkadot-native, community-run Web3 project centered around gaming, NFTs, and interactive onboarding experiences. While it originated as a meme-driven initiative, Gavun Wud has evolved into a broader ecosystem that combines entertainment, on-chain mechanics, and community participation to introduce users to the Polkadot network.
        The project is built around the $WUD token and a growing set of products that include games, NFT systems, and experimental utilities designed to be accessible to both new and existing Web3 users.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Vision and Mission</h2>
      <p className="text-gray-300 mb-4 leading-relaxed">
        The vision of Gavun Wud is to make Web3 participation approachable, engaging, and social, without requiring deep technical knowledge.
      </p>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Its mission is to:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>Lower the barrier to entry into the Polkadot ecosystem</li>
        <li>Use games and interactive mechanics as onboarding tools</li>
        <li>Encourage experimentation through low-friction, on-chain experiences</li>
        <li>Remain community-driven and openly developed</li>
      </ul>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Rather than focusing solely on financial speculation, Gavun Wud emphasizes participation, creativity, and utility as core values.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Why Gavun Wud Exists in the Polkadot Ecosystem</h2>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Polkadot is a highly modular and powerful blockchain ecosystem, but its technical depth can be challenging for newcomers. Gavun Wud exists to bridge this gap by offering simple, playful entry points that introduce users to Polkadot wallets, assets, and on-chain interactions through games and NFTs.
      </p>
      <p className="text-gray-300 mb-4 leading-relaxed">
        By building directly on Polkadot infrastructure and leveraging native tools and networks, Gavun Wud aims to:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>Showcase Polkadot&apos;s capabilities in a user-friendly way</li>
        <li>Drive organic ecosystem usage</li>
        <li>Act as an onboarding layer rather than a standalone application</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">&quot;More Than a Meme&quot; Philosophy</h2>
      <p className="text-gray-300 mb-4 leading-relaxed">
        While Gavun Wud embraces meme culture and humor, the project follows a &quot;more than a meme&quot; philosophy. This means that memes serve as an entry point, not the end goal.
      </p>
      <p className="text-gray-300 mb-4 leading-relaxed">
        In practice, this philosophy is reflected through:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>Functional games with real on-chain interactions</li>
        <li>NFTs with defined utility across products</li>
        <li>Token mechanics tied to participation rather than passive holding</li>
        <li>Community-led development and experimentation</li>
      </ul>
      <p className="text-gray-300 mb-4 leading-relaxed">
        The meme acts as a cultural wrapper, while the underlying focus remains on building usable, interactive Web3 experiences.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Community-Driven Project</h2>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Gavun Wud is developed and maintained by its community. The project emphasizes decentralization, transparency, and open participation, with decisions and direction shaped by contributors rather than a centralized entity.
      </p>
      <p className="text-gray-300 mb-4 leading-relaxed">
        This community-first approach influences:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li>Product development</li>
        <li>Campaigns and events</li>
        <li>Ecosystem integrations</li>
        <li>Long-term vision</li>
      </ul>
      <p className="text-gray-300 mb-4 leading-relaxed">
        As a result, Gavun Wud continues to evolve alongside its users and the broader Polkadot ecosystem.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
        <li><a href="#history" onClick={(e) => { e.preventDefault(); onNavigate('history'); }} className="text-[#ff2e70] hover:underline">Project History</a></li>
        <li><a href="#token-info" onClick={(e) => { e.preventDefault(); onNavigate('token-info'); }} className="text-[#ff2e70] hover:underline">Token Information ($WUD)</a></li>
        <li><a href="#ecosystem" onClick={(e) => { e.preventDefault(); onNavigate('ecosystem'); }} className="text-[#ff2e70] hover:underline">WUD Ecosystem Overview</a></li>
        <li><a href="#getting-started" onClick={(e) => { e.preventDefault(); onNavigate('getting-started'); }} className="text-[#ff2e70] hover:underline">Getting Started</a></li>
      </ul>
    </div>
  )
}

function HistorySection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">2. Project History</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Founding and Origins</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Gavun Wud originated as a Polkadot-native meme project inspired by Web3 culture and the broader Polkadot ecosystem. The project was initially launched as an experimental initiative focused on community engagement, creative expression, and on-chain interaction rather than traditional venture-backed development.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          From the beginning, Gavun Wud positioned itself as an open and accessible project, using humor and simple mechanics to attract attention while experimenting with real blockchain infrastructure.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Early Development Phase</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          In its early phase, Gavun Wud focused on:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>Establishing the $WUD token on Polkadot infrastructure</li>
          <li>Building initial community channels</li>
          <li>Testing lightweight mechanics and interactions</li>
          <li>Exploring how meme culture could be combined with actual on-chain usage</li>
        </ul>
        <p className="text-gray-300 mb-4 leading-relaxed">
          This phase helped validate interest and laid the groundwork for future products, particularly games and NFT-based interactions.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Community Takeover and Decentralization</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          A defining moment in Gavun Wud&apos;s history was its transition into a fully community-run project. Control over administrative elements was relinquished, and the project&apos;s direction became driven by contributors rather than a centralized founding team.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          This shift reinforced core principles of:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>Decentralization</li>
          <li>Transparency</li>
          <li>Community ownership</li>
          <li>Open experimentation</li>
        </ul>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Following the takeover, Gavun Wud evolved from a simple meme initiative into a broader ecosystem with multiple interconnected products.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Ecosystem Expansion</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          After becoming community-led, Gavun Wud expanded its scope significantly. Development efforts shifted toward building interactive experiences that could serve as onboarding tools for the Polkadot ecosystem.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Key areas of expansion included:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>Blockchain-based games</li>
          <li>NFT collections with defined utility</li>
          <li>Token mechanics tied to participation and activity</li>
          <li>Social and community-driven events</li>
        </ul>
        <p className="text-gray-300 mb-4 leading-relaxed">
          This period marked the transition from a single-token project into a multi-product ecosystem.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Major Launches and Milestones</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Over time, Gavun Wud introduced several notable products and initiatives, including:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>Flappy WUD, a blockchain-integrated game designed to reward active participation</li>
          <li>NFT systems that interact with games and ecosystem mechanics</li>
          <li>Burn-based campaigns that combined token economics with community events</li>
          <li>WUDFlip, an experimental on-chain game with built-in token burn logic</li>
        </ul>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Each launch was used both as a functional product and as a learning experiment to refine future development.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Campaigns and Community Events</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Community campaigns and events have played a central role in Gavun Wud&apos;s evolution. These initiatives were designed to:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>Encourage active participation</li>
          <li>Test new mechanics in live environments</li>
          <li>Reward engagement rather than passive holding</li>
          <li>Strengthen community identity</li>
        </ul>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Events often combined gameplay, NFTs, and token mechanics, reinforcing Gavun Wud&apos;s focus on interactive Web3 experiences.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">Ongoing Evolution</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Gavun Wud continues to evolve as a living, community-driven project. Development priorities and experimentation are shaped by contributor input, ecosystem opportunities, and lessons learned from previous launches.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Rather than following a fixed roadmap, the project adopts an iterative approach, allowing it to adapt alongside the Polkadot ecosystem and its user base.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#overview" onClick={(e) => { e.preventDefault(); onNavigate('overview'); }} className="text-[#ff2e70] hover:underline">Overview</a></li>
          <li><a href="#token-info" onClick={(e) => { e.preventDefault(); onNavigate('token-info'); }} className="text-[#ff2e70] hover:underline">Token Information ($WUD)</a></li>
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Governance</a></li>
        </ul>
      </div>
    </div>
  )
}

function CharacterSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">3. The Gavun Wud Character</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Who is Gavun Wud</h2>
        <p className="text-gray-300 mb-4">
          Gavun Wud is the central character and symbolic figure of the Gavun Wud project. He represents curiosity, independence, and experimentation within Web3, serving as a recognizable identity that connects the project&apos;s games, NFTs, and community culture.
        </p>
        <p className="text-gray-300 mb-4">
          The character is inspired by Web3 and blockchain culture and draws thematic influence from the broader Polkadot ecosystem.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Inspiration and Naming</h2>
        <p className="text-gray-300 mb-4">
          The name Gavun Wud is a playful, stylized reference inspired by Gavin Wood, a prominent figure in the blockchain space. The character is not intended to represent or depict any real individual, but rather to symbolically reflect ideas commonly associated with early Web3 development: experimentation, technical depth, and unconventional thinking.
        </p>
        <p className="text-gray-300 mb-4">
          This inspiration is conceptual and cultural, not literal.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Character Identity</h2>
        <p className="text-gray-300 mb-4">
          Gavun Wud is commonly portrayed as:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Intelligent and technically skilled</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Comfortable working alone</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Interested in systems, incentives, and value</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Drawn to computers and digital tools</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Slightly strange in a self-aware, humorous way</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          He embodies the archetype of a builder who operates outside traditional structures, guided more by curiosity than conformity.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Environment and Setting</h2>
        <p className="text-gray-300 mb-4">
          Gavun Wud appears across a range of environments, including:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Digital or technical spaces</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Abstract or undefined settings</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Natural environments such as forests and remote areas</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          Scenes set in nature emphasize solitude, reflection, and independence, while technical settings highlight experimentation and invention.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Personality and Tone</h2>
        <p className="text-gray-300 mb-4">
          The tone associated with Gavun Wud is:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Clever and understated</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Curious and observant</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Calm rather than chaotic</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Humorous through contrast and timing</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          He is portrayed as thoughtful, occasionally eccentric, and comfortable existing outside mainstream norms.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Visual Identity</h2>
        <p className="text-gray-300 mb-4">
          The visual design of Gavun Wud emphasizes recognition and adaptability.
        </p>
        <p className="text-gray-300 mb-4">
          Core characteristics include:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>A consistent and recognizable face</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Expressive features suitable for memes and animation</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>A design that works across different styles and formats</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          This allows the character to appear in games, NFTs, static art, and animated content without losing identity.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Role in the Ecosystem</h2>
        <p className="text-gray-300 mb-4">
          Gavun Wud appears across:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Games such as Flappy WUD</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>NFT collections and digital items</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Community memes and social content</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          The character functions as a unifying element across the ecosystem, connecting technology, culture, and participation.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Creative Guidelines</h2>
        <p className="text-gray-300 mb-4">
          When creating content featuring Gavun Wud, contributors are encouraged to portray him as:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Intelligent, not naive</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Independent and self-directed</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Comfortable with both technology and nature</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Funny through subtlety rather than exaggeration</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#overview" onClick={(e) => { e.preventDefault(); onNavigate('overview'); }} className="text-[#ff2e70] hover:underline">Overview</a></li>
          <li><a href="#history" onClick={(e) => { e.preventDefault(); onNavigate('history'); }} className="text-[#ff2e70] hover:underline">Project History</a></li>
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
        </ul>
      </div>
    </div>
  )
}

function TokenInfoSection({ onNavigate, dexData, loading }: { onNavigate: (section: string) => void, dexData: any, loading: boolean }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">4. Token Information ($WUD)</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
        <p className="text-gray-300 mb-4">
          $WUD is a fully community-governed memecoin built natively on Polkadot, designed to combine culture, gaming, and Web3 onboarding into a single ecosystem. Launched on April 22, 2024, $WUD functions as the social and cultural layer of Polkadot, connecting users, developers, and enthusiasts through memes, games, NFTs, and community campaigns.
        </p>
        <p className="text-gray-300 mb-4">
          It&apos;s mascot, Gavun Wud, embodies the playful and creative spirit of the ecosystem, helping onboard newcomers and fostering engagement. $WUD serves as both a token of value and a gateway to Polkadot&apos;s Web3 ecosystem, enabling interactive experiences, collectible NFTs, and community-driven events.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Token Fundamentals</h2>
        <div className="bg-gray-900/50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Asset Creation:</span>
              <span className="text-white ml-2">April 13, 2024</span>
            </div>
            <div>
              <span className="text-gray-400">Asset Hub ID:</span>
              <span className="text-[#ff2e70] ml-2">31337</span>
            </div>
            <div>
              <span className="text-gray-400">Token Name:</span>
              <span className="text-white ml-2">Gavun Wud ($WUD)</span>
            </div>
            <div>
              <span className="text-gray-400">Decimals:</span>
              <span className="text-white ml-2">10</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-400">Total Supply:</span>
              <span className="text-white ml-2">999,948,772,050 (~1 trillion tokens)</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>References:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://assethub-polkadot.subscan.io/extrinsic/6110761-2" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Asset Creation Extrinsic</a></li>
          <li><a href="https://hydration.subscan.io/custom_token?unique_id=asset_registry%2Ff68a68d6f6c10a5f66173d06e15cd6306da2c024&tab=project" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Asset Information</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Admin Rights</h2>
        <p className="text-gray-300 mb-4">
          Admin rights permanently burned, ensuring full community control.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Initial owner:</strong> Polkadot address 15b8URP7cg1hiJU8MsppqeayP9MvenkUZ7McBn37TzF1Ar69
        </p>
        <p className="text-gray-300 mb-4">
          This address was a pure proxy spawned by 13GuDZLSmYn29gbSFTA38oG1yQRP33wqVdWpxHm7NdY8Drgk; the proxy was subsequently killed, revoking admin access.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>References:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://assethub-polkadot.subscan.io/extrinsic/6110778-2" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Admin Rights Burn Extrinsic</a></li>
          <li><a href="https://wiki.polkadot.network/docs/learn-proxies#pure-proxies" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Pure Proxies Documentation</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Liquidity Pool</h2>
        <p className="text-gray-300 mb-4">
          Hydration LP WUD/DOT account balance: $207,000 (16 Feb 2025)
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Burned LP Account:</strong> 7LqVTFRP67f9P8jAQebpmeLRMgzKR1QQm2EMpjYDFagE2eGE
        </p>
        <p className="text-gray-300 mb-4">
          Added by a pure proxy which was subsequently killed.
        </p>
        <p className="text-gray-300 mb-4">
          96.8% of LP burned{dexData?.liquidityUsd > 0 && ` (${loading ? 'Loading...' : `~$${dexData.liquidityUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD`} at current liquidity)`}, ensuring strong, locked-in liquidity.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>References:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://hydration.subscan.io/account/15BuQdFibo2wZmwksPWCJ3owmXCduSU56gaXzVKDc1pcCcsd" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Hydration LP Account</a></li>
          <li><a href="https://x.com/gavunwud/status/1783198739957420542" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Burned LP Info</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Token Distribution</h2>
        <div className="bg-gray-900/50 p-6 rounded-lg mb-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">3.5% burned</span>
              <span className="text-[#ff2e70]">35B WUD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">3% held by Zeitgeist PM</span>
              <span className="text-[#ff2e70]">30B WUD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">2.1% in Treasury</span>
              <span className="text-[#ff2e70]">21B WUD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">91.4% distributed to Hydration LP via fair community launch</span>
              <span className="text-[#ff2e70]">914B WUD</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          No vesting or hidden allocations
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Reference:</strong> <a href="https://x.com/gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">X/Twitter</a>
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Sufficiency and Governance</h2>
        <p className="text-gray-300 mb-4">
          Recognized as a sufficient asset on Hydration Network.
        </p>
        <p className="text-gray-300 mb-4">
          Passed full due diligence by Hydration governance and core team.
        </p>
        <p className="text-gray-300 mb-4">
          Fully community-run since April 2024.
        </p>
        <p className="text-gray-300 mb-4">
          Governance occurs via Polkadot-native tools, ensuring transparency and fairness.
        </p>
        <p className="text-gray-300 mb-4">
          Community members actively contribute to campaigns, events, NFT drops, and gamified onboarding initiatives.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Reference:</strong> <a href="https://hydradx.subsquare.io/democracy/referenda/168" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Hydration Referenda</a>
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Key Ecosystem Integrations</h2>
        <p className="text-gray-300 mb-4">
          $WUD is used across multiple products in the ecosystem:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><strong>FlappyWUD:</strong> Blockchain game rewarding real WUD tokens; integrated with <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, NovaWallet, and <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>. Includes event mechanics like The Flappening and Surge Mode.</li>
          <li><strong>WUD Universe:</strong> Advanced NFT ecosystem with interactive, animated items, customizable cabins, seasonal themes, and integrated with FlappyWUD.</li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>References:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">FlappyWUD</a></li>
          <li><a href="https://wuduniverse.xyz" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="https://x.com/gavunwud/status/1979455845222973927" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Unique Network Partnership</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Market Performance & Adoption</h2>
        <p className="text-gray-300 mb-4">
          Outperformed DOT and broader market trends in 2024–2025.
        </p>
        <p className="text-gray-300 mb-4">
          Over 96.8% of LP{dexData?.liquidityUsd > 0 && ` (${loading ? 'Loading...' : `$${(dexData.liquidityUsd * 0.968).toLocaleString(undefined, { maximumFractionDigits: 0 })}`})`} burned, demonstrating strong community commitment.
        </p>
        <p className="text-gray-300 mb-4">
          NFT campaigns burned 219 LP shares (~$30k USD).
        </p>
        <p className="text-gray-300 mb-4">
          <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a> and NovaWallet integrations drove new wallet creation and onboarding.
        </p>
        <p className="text-gray-300 mb-4">
          Active presence on X/Twitter, Discord, and Telegram.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Community & Culture</h2>
        <p className="text-gray-300 mb-4">
          Thousands of active participants across games, NFTs, and events.
        </p>
        <p className="text-gray-300 mb-4">
          Inclusive, highly engaged, and creative community.
        </p>
        <p className="text-gray-300 mb-4">
          Hosts local and global meetups.
        </p>
        <p className="text-gray-300 mb-4">
          Mascot Gavun Wud embodies the playful and approachable spirit, reinforcing culture and engagement.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Partnerships & Integrations</h2>
        <p className="text-gray-300 mb-4">
          <strong>Core Partners:</strong> Hydration Network, Unique Network, Chaotic, Tanssi Network, Bifrost
        </p>
        <p className="text-gray-300 mb-4">
          <strong>NFT & Gaming Collaborations:</strong> The Kusamarian, JAMTON, Zeitgeist, N3MUS, AirLyft, EasyA
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Wallet Integrations:</strong> <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, NovaWallet, <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>
        </p>
        <p className="text-gray-300 mb-4">
          These partnerships support NFT airdrops, gamified campaigns, community events, and onboarding initiatives.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#technology" onClick={(e) => { e.preventDefault(); onNavigate('technology'); }} className="text-[#ff2e70] hover:underline">Technology & Infrastructure</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#ecosystem" onClick={(e) => { e.preventDefault(); onNavigate('ecosystem'); }} className="text-[#ff2e70] hover:underline">WUD Ecosystem Overview</a></li>
        </ul>
      </div>
    </div>
  )
}

function TechnologySection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">4.1 Technology & Infrastructure</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          The Gavun Wud ecosystem is built on Polkadot-native infrastructure, with additional support on the Hydration Network. It leverages modern blockchain protocols, smart contracts, and decentralized principles to create a secure, transparent, and community-driven environment. The technology stack supports gaming, NFTs, tokenomics, and interactive experiences while ensuring compatibility with multiple wallet providers.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Blockchain and Network Integration</h2>
        <p className="text-gray-300 mb-4">
          <strong>Primary chain:</strong> Polkadot
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Legacy / additional integration:</strong> Hydration Network
        </p>
        <p className="text-gray-300 mb-4">
          All $WUD transactions, game mechanics, NFT minting, and campaigns occur on-chain to guarantee transparency and traceability.
        </p>
        <p className="text-gray-300 mb-4">
          The ecosystem uses Polkadot-native asset management tools, including Asset Hub and on-chain proxies, for decentralized administration.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>References:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://assethub-polkadot.subscan.io/" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Polkadot Asset Hub</a></li>
          <li><a href="https://hydration.net/" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Hydration Network</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Smart Contracts and Token Architecture</h2>
        <p className="text-gray-300 mb-4">
          $WUD is implemented as a fungible asset on Polkadot.
        </p>
        <p className="text-gray-300 mb-4">
          Admin rights were permanently burned, ensuring full decentralization.
        </p>
        <p className="text-gray-300 mb-4">
          Smart contracts are auditable and verifiable on-chain.
        </p>
        <p className="text-gray-300 mb-4">
          Token mechanics integrate with gaming, NFT, and community reward systems.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><strong>Immutable rules:</strong> Supply, decimals, and token distribution are locked in.</li>
          <li><strong>Burn mechanics:</strong> Certain tokens are permanently removed from circulation through on-chain events.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Liquidity and Economic Infrastructure</h2>
        <p className="text-gray-300 mb-4">
          $WUD liquidity is managed through Hydration LPs and decentralized exchange integrations.
        </p>
        <p className="text-gray-300 mb-4">
          Over 96% of initial LP has been burned, creating locked-in, community-controlled liquidity.
        </p>
        <p className="text-gray-300 mb-4">
          LP accounts and burn events are fully transparent and traceable on-chain.
        </p>
        <p className="text-gray-300 mb-4">
          Liquidity provisioning supports token utility, gaming rewards, and NFT interactions.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">NFT and Game Infrastructure</h2>
        <p className="text-gray-300 mb-4">
          <strong>WUD Universe:</strong> A fully animated and interactive NFT ecosystem with cabins, inventory slots, seasonal items, and music integration.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Flappy WUD:</strong> On-chain Web3 game rewarding $WUD; supports wallet integrations (<a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, NovaWallet, <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>).
        </p>
        <p className="text-gray-300 mb-4">
          Smart contracts manage:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>NFT minting, claiming, and burning</li>
          <li>In-game token rewards and scoring</li>
          <li>Inventory management and cross-game NFT utility</li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>References:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://wuduniverse.xyz" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="https://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Wallet and User Access Integration</h2>
        <p className="text-gray-300 mb-4">
          Fully integrated with Polkadot-native wallets:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a></li>
          <li>NovaWallet</li>
          <li><a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></li>
        </ul>
        <p className="text-gray-300 mb-4">
          Wallet integration enables:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li>Secure storage of $WUD</li>
          <li>NFT and in-game asset interaction</li>
          <li>Tracking of achievements, participation, and rewards</li>
        </ul>
        <p className="text-gray-300 mb-4">
          Designed for easy onboarding for new users entering the Polkadot ecosystem.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Security and Transparency</h2>
        <p className="text-gray-300 mb-4">
          All contracts, LP accounts, and NFT assets are auditable and visible on-chain.
        </p>
        <p className="text-gray-300 mb-4">
          Admin keys burned to ensure no central control.
        </p>
        <p className="text-gray-300 mb-4">
          Smart contracts follow best practices for security and asset management.
        </p>
        <p className="text-gray-300 mb-4">
          Community governance ensures ongoing monitoring, proposal voting, and transparent execution of ecosystem decisions.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Scalability and Future-Readiness</h2>
        <p className="text-gray-300 mb-4">
          The architecture supports the expansion of games, NFT ecosystems, and community campaigns.
        </p>
        <p className="text-gray-300 mb-4">
          Modular design allows future integration of new Polkadot parachains and ecosystems.
        </p>
        <p className="text-gray-300 mb-4">
          On-chain and wallet-based infrastructure ensures that WUD products can scale without compromising decentralization, transparency, or security.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#token-info" onClick={(e) => { e.preventDefault(); onNavigate('token-info'); }} className="text-[#ff2e70] hover:underline">Token Information ($WUD)</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
        </ul>
      </div>
    </div>
  )
}

function TokenUtilitySection({ onNavigate, dexData, loading }: { onNavigate: (section: string) => void, dexData: any, loading: boolean }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">4.2 Token Utility</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          $WUD is the functional backbone of the Gavun Wud ecosystem. It enables participation in games, NFT ecosystems, rewards programs, and community-driven campaigns. The token provides practical utility and a gateway to the Polkadot Web3 ecosystem, fostering engagement, gamification, and social interactions.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Gaming Utility</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Flappy WUD</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>$WUD is used as a reward for gameplay</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Players can hold $WUD to boost their point multiplier, increasing rewards and leaderboard ranking</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-2"><strong>Event mechanics:</strong></p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The Flappening: Community-wide events with WUD rewards based on activity</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Surge Mode: Multipliers increase with higher participation</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Leaderboards reward diamond-hand holders with in-game boosts and VIP perks</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Reference:</strong> <a href="https://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Flappy WUD</a>
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">NFT Ecosystem Utility</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">WUD Universe</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>$WUD is used to mint cabins, purchase items, and interact with animated NFTs</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Players can hold $WUD to boost their Aura level, improving their position on the WUD Universe leaderboard</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Mystery Boxes and seasonal campaigns require $WUD to unlock items, ranging from common to ultra-rare collectibles</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Selling all $WUD in a cabin destroys the cabin but retains items in the wallet, ensuring persistent ownership</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>$WUD is enabled on Unique Network, allowing trading of WUD Universe NFTs across Polkadot-compatible marketplaces</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Reference:</strong> <a href="https://wuduniverse.xyz" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Universe</a>
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Reward Systems</h2>
        <p className="text-gray-300 mb-4">
          $WUD is used in campaigns and gamified events, incentivizing participation.
        </p>
        <p className="text-gray-300 mb-2"><strong>Rewards include:</strong></p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Game achievements</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>NFT drops and limited-edition items</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Leaderboard prizes and in-game boosts</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          Mechanisms encourage long-term engagement, wallet creation, and ecosystem growth.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Burning and Deflation Mechanisms</h2>
        <p className="text-gray-300 mb-4">
          Certain $WUD tokens are burned to reduce circulating supply, including:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>NFT campaigns</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Special in-game events</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Liquidity pool burn events</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          These mechanisms contribute to token scarcity and locked-in liquidity, strengthening the ecosystem&apos;s economic foundation.
        </p>
        <p className="text-gray-300 mb-2"><strong>Key Metrics:</strong></p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Over 96.8% of LP{dexData?.liquidityUsd > 0 && ` (${loading ? 'Loading...' : `$${(dexData.liquidityUsd * 0.968).toLocaleString(undefined, { maximumFractionDigits: 0 })}`})`} burned</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>NFT campaigns burned 219 LP shares (~$30,000 USD)</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Future Utility Expansion</h2>
        <p className="text-gray-300 mb-4">
          Planned enhancements for $WUD include:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Integration with upcoming Web3 games beyond Flappy WUD</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Expansion of WUD Universe features: cabins, rooms, and collectible items</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Partner-led campaigns across the Polkadot ecosystem</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Merchandise, PFP NFT collections, and diamond-hand incentives</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Additional staking and reward mechanisms to increase engagement</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#token-info" onClick={(e) => { e.preventDefault(); onNavigate('token-info'); }} className="text-[#ff2e70] hover:underline">Token Information ($WUD)</a></li>
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
        </ul>
      </div>
    </div>
  )
}

function EcosystemSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">5. WUD Ecosystem Overview</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          The Gavun Wud ecosystem is a fully integrated Web3 environment on Polkadot, combining games, NFTs, token utility, and social interaction. The ecosystem is designed to create continuous engagement, community participation, and cross-product interaction, with $WUD serving as the central utility token.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Core Components</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">$WUD Token</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Powers all activities in the ecosystem: games, NFTs, rewards, and boosters</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Used to increase Flappy WUD point multipliers and WUD Universe Aura levels</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Tradable on Unique Network, enabling cross-platform NFT exchange</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Flappy WUD</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Web3 game rewarding $WUD for participation and high scores</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Features The Flappening, Surge Mode, and leaderboards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>$WUD used in-game for multipliers, boosting leaderboard ranking and rewards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Onboarding tool for new Polkadot users through wallet integration</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Reference:</strong> <a href="https://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Flappy WUD</a>
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">WUD Universe</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Interactive, animated NFT ecosystem reflecting user achievements and holdings</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Cabins, items, and Aura levels use $WUD for minting, upgrades, and leaderboard boosts</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Fully compatible with Unique Network for trading and cross-ecosystem utility</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Mystery Boxes and seasonal campaigns provide collectible rewards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Users can also mint WUD Universe NFTs via Bifrost by minting vDOT through our partner link, highlighting $WUD&apos;s role in onboarding users and encouraging exploration of partner platforms</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Reference:</strong> <a href="https://wuduniverse.xyz" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Universe</a>
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">NFT Collections & Campaigns</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>OG WUD BURN NFTs, seasonal drops, and campaign-based rewards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>$WUD acts as a medium for acquiring, upgrading, and interacting with NFTs</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Enhances cross-product engagement between WUD Universe and Flappy WUD</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Wallet Integrations</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Fully supported on <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, NovaWallet, and <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Enables $WUD storage, NFT management, and game participation</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Facilitates easy onboarding for Polkadot newcomers</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Ecosystem Flow</h2>
        <p className="text-gray-300 mb-4">
          <strong>Acquire $WUD → 2. Participate in games or mint NFTs → 3. Earn rewards and boosts → 4. Upgrade items or Aura levels → 5. Trade NFTs via Unique Network or partner platforms → 6. Repeat or engage in new events</strong>
        </p>
        <p className="text-gray-300 mb-4">
          This flow encourages continuous engagement and ecosystem growth, linking all products together.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Cross-Product Interactions</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Flappy WUD ↔ WUD Universe:</strong> Leaderboard points, multipliers, and Aura levels influence in-game and NFT prestige</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>NFTs ↔ $WUD:</strong> $WUD is the fuel for minting, upgrading, and trading items</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Wallets ↔ Ecosystem:</strong> Secure storage and interaction ensure seamless user experience</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Partner Platforms:</strong> Through Bifrost, users can mint WUD Universe NFTs by minting vDOT via the partner link, showcasing $WUD&apos;s role in onboarding users into the Polkadot ecosystem and incentivizing exploration of partner platforms</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Community & Culture Integration</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Gamified campaigns and rewards drive participation in both gaming and NFT activities</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>$WUD strengthens social engagement by connecting users through achievements, collectibles, and leaderboard status</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Events like The Flappening and seasonal NFT drops integrate gameplay, token utility, and cultural interaction</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
        </ul>
      </div>
    </div>
  )
}

function FlappyWudSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">7. Flappy WUD</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          Flappy WUD is a Web3 game on Polkadot that rewards $WUD tokens and NFT interactions. Designed for both PC and mobile, the game combines fast-paced gameplay, leaderboard competition, and gamified token and NFT utility.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Flappy WUD 2.0 introduces:</strong>
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Upgraded UI with player stats</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Enhanced graphics and animations in a cyberpunk-inspired world</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>New NFT utilities and power-ups, including Quantum Invincibility</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Integration with Polkadot wallets: <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, NovaWallet, <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Getting Started</h2>
        <p className="text-gray-300 mb-2"><strong>Mobile:</strong> Open Novawallet or <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a> browser and navigate to flappywud.lol</p>
        <p className="text-gray-300 mb-2"><strong>PC:</strong> Connect using <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>, <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a> wallets</p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Customize your nickname</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Track leaderboard position via the Settings Menu</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">$WUD Multiplier</h2>
        <p className="text-gray-300 mb-4">
          Holding $WUD in your wallet boosts score multipliers; tokens are not spent.
        </p>
        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-300">WUD Held</th>
                <th className="text-left py-2 text-gray-300">Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-white">Below 50M</td>
                <td className="py-2 text-[#ff2e70]">2x</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="py-2 text-white">50M – 500M</td>
                <td className="py-2 text-[#ff2e70]">3x</td>
              </tr>
              <tr>
                <td className="py-2 text-white">Above 500M</td>
                <td className="py-2 text-[#ff2e70]">4x</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mb-2"><strong>Multiplier Details:</strong></p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Base duration: 10s + 2s per 100M WUD (max 100s)</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Base trigger chance: 20%, increases 12% per 100M WUD (max 80%)</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Holding 100M WUD guarantees activation every session</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Power-Ups</h2>
        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-300">Power-Up</th>
                <th className="text-left py-2 text-gray-300">Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-[#ff2e70] font-semibold">JAM</td>
                <td className="py-2 text-white">Quick 5-log boost, adds 5 points (affected by the multiplier)</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="py-2 text-[#ff2e70] font-semibold">KusBoost</td>
                <td className="py-2 text-white">Bigger jump, skip 10 logs, adds 10 points (affected by the multiplier)</td>
              </tr>
              <tr>
                <td className="py-2 text-[#ff2e70] font-semibold">WUD Beer</td>
                <td className="py-2 text-white">Appears after 100 logs; 25s invincibility, smash obstacles</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="py-2 text-[#ff2e70] font-semibold">Quantum Invincibility</td>
                <td className="py-2 text-white">Doubles speed and immunity; Diamond NFT holders control rarity/duration</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">NFTs in Flappy WUD</h2>
        <p className="text-gray-300 mb-4">
          Flappy WUD 2.0 is fully compatible with the exclusive OG WUD BURN NFT Collection, which features 4 tiers: Diamond, Gold, Silver, Bronze. Each tier reflects community loyalty and participation in burning 219.3962 LP shares, offering distinct in-game advantages.
        </p>
        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-300">NFT Tier</th>
                <th className="text-left py-2 text-gray-300">In-Game Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-[#ff2e70] font-semibold">Bronze – Flaming Wud 5★</td>
                <td className="py-2 text-white">10% boost to all power-ups: Kus, Jam, WUD multiplier seconds, and Beer duration</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="py-2 text-[#ff2e70] font-semibold">Silver – Astro Wud 100x 6★</td>
                <td className="py-2 text-white">All Bronze benefits + Foresight: above 100 points, see indicators for upcoming gaps</td>
              </tr>
              <tr>
                <td className="py-2 text-[#ff2e70] font-semibold">Gold – Golden Wud 1000x 7★</td>
                <td className="py-2 text-white">All Bronze & Silver benefits + 10% increase in Kus & Jam render chance; customized in-game push notifications; Gold Tier marker on leaderboard</td>
              </tr>
              <tr className="bg-gray-800/50">
                <td className="py-2 text-[#ff2e70] font-semibold">Diamond – Fully Hydrated Wud 9★</td>
                <td className="py-2 text-white">All Bronze, Silver & Gold benefits + control over Quantum Invincibility: adjust rarity, duration, and icon for all players</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mb-2"><strong>Key Notes:</strong></p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>NFTs boost gameplay performance, power-ups, and score multipliers</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Diamond holders hold ultimate influence over the Quantum Invincibility power-up</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Gold Tier notifications increase social and competitive engagement</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>NFTs tie directly into $WUD and Flappy WUD mechanics, reinforcing ecosystem engagement</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Surge Events</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Surge Mode activates as community participation increases</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Multipliers scale with the number of active players</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Numbers adjust depending on pool size, growth, and event duration</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Encourages collaboration, community engagement, and spreading the word</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Events & Rewards</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>The Flappening:</strong> Community-wide events with $WUD rewards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Daily limits exist for normal sessions; special events remove limits for higher rewards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Leaderboards reward top players with $WUD, NFTs, and in-game perks</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-2"><strong>Key Metrics (as of Dec 2025):</strong></p>
        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-gray-400">Total Games Played:</span>
              <span className="text-[#ff2e70] ml-2">497.185</span>
            </div>
            <div>
              <span className="text-gray-400">Total Flaps:</span>
              <span className="text-[#ff2e70] ml-2">24,824,523</span>
            </div>
            <div>
              <span className="text-gray-400">Unique Addresses:</span>
              <span className="text-[#ff2e70] ml-2">3,398</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Community Integration</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Gamified events like Surge Mode encourage social participation and competition</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Players are incentivized to invite friends, earn $WUD, and collect NFTs</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Leaderboards and power-ups connect to broader WUD Universe mechanics, reinforcing ecosystem engagement</span>
          </li>
        </ul>

        <div className="mt-8 text-center">
          <a href="https://flappywud.lol" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#ff2e70] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff2e70]/80 transition-colors duration-300 mb-4">
            Play Flappy WUD Now
          </a>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <img
            src="/wiki/game_cover_2.0.webp"
            alt="Flappy WUD Game Cover"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
          <li><a href="#ecosystem" onClick={(e) => { e.preventDefault(); onNavigate('ecosystem'); }} className="text-[#ff2e70] hover:underline">WUD Ecosystem Overview</a></li>
        </ul>
      </div>
    </div>
  )
}

function FlappyTipsSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#ff2e70]">7.2 Flappy WUD Tips & Tricks</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          This page provides strategies for improving gameplay, maximizing points, and leveraging NFT perks in Flappy WUD. Designed for both new and experienced players.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Practice & Gameplay Strategies</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Positioning</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Stay closer to the lower section of the screen for better control</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Use double or triple jumps to reach higher areas when necessary</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Power-Up Collection</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Grab all available power-ups to maximize points quickly</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Being &quot;In Quantum&quot; (Polkadot orb power-up) grants invincibility and a speed boost, enabling faster point stacking</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Late-Game Focus</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>As you progress, games speed up, allowing rapid point accumulation</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>After <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">100 points</span>, you may randomly receive the WUD BEER power-up for <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">25 seconds</span> of invincibility, perfect for late-game points. 🍺</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Getting Comfortable</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Flappy WUD&apos;s physics take practice</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Focus on having fun and experimenting, and over time controlling jumps, power-ups, and positioning will become second nature. 😎</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Maximizing Rewards</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Use Power-Ups Strategically</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>JAM:</strong> Quick <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">5-log</span> boost, adds <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">5 points</span> (affected by multiplier during Flappening)</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>KusBoost:</strong> Bigger jump, skip <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">10 logs</span>, adds <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">10 points</span> (affected by multiplier during Flappening)</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>WUD Beer:</strong> <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">25s</span> invincibility to smash obstacles</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Quantum Invincibility:</strong> Diamond NFT holders can control rarity/duration. Watch for opportunities</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Leverage NFTs</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Bronze:</strong> <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">10%</span> boost to all power-ups</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Silver:</strong> Foresight shows upcoming gaps above <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">100 points</span></span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Gold:</strong> Push notifications, leaderboard visibility, increased Kus & Jam spawn chance</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Diamond:</strong> Control Invincibility power-up for all players</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Hold $WUD Tokens</h3>
        <p className="text-gray-300 mb-2">Score multipliers scale with wallet holdings.</p>
        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>Below 50M WUD:</span>
              <span className="text-[#ff2e70] font-semibold">2x multiplier</span>
            </div>
            <div className="flex justify-between">
              <span>50M – 500M WUD:</span>
              <span className="text-[#ff2e70] font-semibold">3x multiplier</span>
            </div>
            <div className="flex justify-between">
              <span>Above 500M WUD:</span>
              <span className="text-[#ff2e70] font-semibold">4x multiplier</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          <strong>💡 Tip:</strong> <span className="bg-[#ff2e70]/20 px-2 py-1 rounded font-semibold text-[#ff2e70]">100M WUD</span> guarantees multiplier activation every game session.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Event Strategies</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Surge Mode</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Activated when many players are online</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Multipliers scale with active participants</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span><strong>Tip:</strong> Play during high-traffic events; coordinate with friends to trigger Surge faster</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">The Flappening</h3>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Community-wide events removing daily limits</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Focus on long sessions with power-ups and NFT boosts to accumulate points</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Pro Player Tips</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Chain JAM and KusBoost for tight sequences</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Use Silver NFT indicators to plan sequences strategically</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Stack all boosts during The Flappening to dominate leaderboards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Track multiplier timers and NFT perks to optimize every run</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs in Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
        </ul>
      </div>
    </div>
  )
}

function FlappyNftsSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#ff2e70]">7.3 NFTs in Flappy WUD</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          Flappy WUD features a wide range of NFTs that enhance gameplay, provide prestige, and integrate with the broader WUD Universe ecosystem. Players can earn, claim, or purchase NFTs through OG collections, Mystery Boxes, and special collaborations.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Core Purpose:</strong> Reward gameplay, community engagement, and collection.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Integration:</strong> NFTs provide in-game perks in Flappy WUD and display/trade utility in WUD Universe.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Future Expansion:</strong> Additional NFT collections will continue to be added, offering new gameplay advantages and collectible items.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">OG WUD Burn NFTs</h2>
        <p className="text-gray-300 mb-4">
          The OG WUD Burn NFT Collection celebrates the community&apos;s contribution of 219.3962 LP shares. These NFTs are fully integrated with Flappy WUD 2.0 and provide power-ups, strategic advantages, and prestige.
        </p>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <img
            src="/wiki/nfts1.webp"
            alt="Flappy WUD NFT Collection"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-3 text-left text-white font-bold">Tier</th>
                <th className="border border-gray-600 p-3 text-left text-white font-bold">Name & Stars</th>
                <th className="border border-gray-600 p-3 text-left text-white font-bold">In-Game Benefits</th>
                <th className="border border-gray-600 p-3 text-left text-white font-bold">Marketplace Link</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300">Bronze</td>
                <td className="border border-gray-600 p-3 text-gray-300">Flaming Wud 5★</td>
                <td className="border border-gray-600 p-3 text-gray-300">10% boost to all power-ups: Kus, Jam, WUD multiplier seconds, and Beer duration</td>
                <td className="border border-gray-600 p-3 text-gray-300">
                  <a href="https://chaotic.art/ahp/collection/244" className="text-[#ff2e70] hover:underline">Buy on Chaotic</a>
                </td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300">Silver</td>
                <td className="border border-gray-600 p-3 text-gray-300">Astro Wud 100x 6★</td>
                <td className="border border-gray-600 p-3 text-gray-300">All Bronze benefits + Foresight: see upcoming gaps above 100 points</td>
                <td className="border border-gray-600 p-3 text-gray-300">
                  <a href="https://chaotic.art/ahp/collection/244" className="text-[#ff2e70] hover:underline">Buy on Chaotic</a>
                </td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300">Gold</td>
                <td className="border border-gray-600 p-3 text-gray-300">Golden Wud 1000x 7★</td>
                <td className="border border-gray-600 p-3 text-gray-300">Bronze & Silver perks + 10% increase in Kus & Jam spawn; custom in-game push notifications; leaderboard marker</td>
                <td className="border border-gray-600 p-3 text-gray-300">
                  <a href="https://chaotic.art/ahp/collection/244" className="text-[#ff2e70] hover:underline">Buy on Chaotic</a>
                </td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300">Diamond</td>
                <td className="border border-gray-600 p-3 text-gray-300">Fully Hydrated Wud 9★</td>
                <td className="border border-gray-600 p-3 text-gray-300">All lower-tier perks + control over Invincibility power-up: adjust rarity, duration, and icon for all players</td>
                <td className="border border-gray-600 p-3 text-gray-300">
                  <a href="https://chaotic.art/ahp/collection/244" className="text-[#ff2e70] hover:underline">Buy on Chaotic</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes:</h3>
          <ul className="text-gray-300 space-y-1">
            <li>NFTs enhance gameplay efficiency, strategy, and social recognition.</li>
            <li>Diamond tier grants game-altering control over Invincibility, making it the most influential.</li>
            <li>Gold tier increases visibility through push notifications and leaderboard markers.</li>
          </ul>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <iframe
            src="https://chaotic.art/ahp/collection/244"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            title="OG WUD Burn NFTs Collection"
            className="rounded-lg"
          ></iframe>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">WUD Universe Mystery Boxes</h2>
        <p className="text-gray-300 mb-4">
          Mystery Boxes are earned randomly during Flappy WUD sessions and contain WUD Universe items only.
        </p>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <img
            src="/wiki/WUD_Universe_Mystery_BoxMarketplace.webp"
            alt="WUD Universe Mystery Box Marketplace"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
          <p className="text-center text-gray-300 mt-2">This box can be opened in a cabin and could contain 1 to 5 NFTs from common to legendary items.</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Marketplace & Trading</h2>
        <p className="text-gray-300 mb-4">
          <strong>WUD Universe Marketplace:</strong> Trade items and Mystery Boxes on the <a href="https://wuduniverse.xyz/marketplace" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Universe Marketplace</a>.
        </p>


        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <iframe
            src="https://wuduniverse.xyz/marketplace"
            width="100%"
            height="600"
            style={{ border: 'none', borderRadius: '8px' }}
            title="WUD Universe Marketplace"
          ></iframe>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">Opening & Trading:</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Members can open boxes inside WUD Universe to claim tradable NFTs.</li>
          <li>Boxes can also be listed on the marketplace to trade externally: <strong>Unique Network Marketplace</strong>. No cabin or membership required.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-white">Mini-Game: Lock-On</h3>
        <p className="text-gray-300 mb-4">
          Occasionally, a box triggers Lock-On:
        </p>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Gav appears on screen with a green target.</li>
          <li>Tap when Gav hits the green zone.</li>
          <li>Hit 3 times successfully within the time limit.</li>
          <li>Success immediately sends the Mystery Box to your connected wallet.</li>
        </ul>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <video
            controls
            autoPlay
            muted
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            preload="metadata"
          >
            <source src="/wiki/video_2025-12-13_10-08-02.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes:</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Mystery Boxes provide randomized rewards to incentivize active gameplay.</li>
            <li>All items from boxes can be displayed, used, or traded in WUD Universe.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">WUD Anniversary NFT Collection</h2>
        <p className="text-gray-300 mb-4">
          <strong>Celebrates WUD&apos;s 1st Year Anniversary</strong>
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Limited-edition, rare NFTs</strong>
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Provides 10% boost in all NFT drops inside Flappy WUD (stackable up to 30%), including Collectables by Kus and WUD Universe items</strong>
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Power up your gameplay and commemorate WUD history!</strong>
        </p>
        <p className="text-gray-300 mb-6">
          <strong>View and mint:</strong> <a href="https://chaotic.art/ahp/collection/441" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Chaotic Collection</a>
        </p>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <iframe
            src="https://chaotic.art/ahp/collection/441"
            width="100%"
            height="600"
            style={{ border: 'none', borderRadius: '8px' }}
            title="WUD Anniversary NFT Collection on Chaotic"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Collaborations: Collectables by Kus</h2>
        <p className="text-gray-300 mb-4">
          Flappy WUD also collaborated with the Kusamarian project to bring Collectables by Kus NFTs into the game.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Integration:</strong> Players can obtain exclusive Kusamarian NFTs during events and gameplay.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Marketplace & Collection:</strong> View and purchase here: <a href="https://chaotic.art/ahp/collection/165" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Chaotic – Collectables by Kus</a>
        </p>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <iframe
            src="https://chaotic.art/ahp/collection/165"
            width="100%"
            height="600"
            style={{ border: 'none', borderRadius: '8px' }}
            title="Collectables by Kus Collection on Chaotic"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Future NFT Plans</h2>
        <p className="text-gray-300 mb-6">
          Flappy WUD will continue to expand NFT offerings with new collections and exclusive event items. All new NFTs will integrate with Flappy WUD gameplay and WUD Universe, maintaining cross-ecosystem utility.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
          <li><a href="#flappy-tips" onClick={(e) => { e.preventDefault(); onNavigate('flappy-tips'); }} className="text-[#ff2e70] hover:underline">Flappy WUD Tips & Tricks</a></li>
        </ul>
      </div>
    </div>
  )
}

function WudUniverseSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">6. WUD Universe</h1>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          WUD Universe is a gamified digital identity (GDI) experience built on Unique Network and powered by Polkadot. Each participant has a personal cabin, a non-transferable (soulbound) NFT, that serves as their digital home, identity, and display space for collectibles and achievements.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Purpose:</strong> Showcase achievements, collectibles, and community contributions in a personalized, evolving cabin.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Core Features:</strong> Cabins grow with your holdings, activity, and community participation.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Integration:</strong> Fully connected to Flappy WUD, WUD NFTs, and partner campaigns across Polkadot.
        </p>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-200 font-medium mb-2">
            💡 <strong>Need Help?</strong> If you encounter any issues with WUD Universe, remember to reach out to our community for assistance!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://t.me/gavunwud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b3] transition-colors font-medium"
            >
              Join Telegram
            </a>
            <a
              href="https://discord.gg/4GE46uduFs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865f2] text-white px-4 py-2 rounded-lg hover:bg-[#4752c4] transition-colors font-medium"
            >
              Join Discord
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Cabins: Your Digital Home</h2>
        <p className="text-gray-300 mb-4">
          <strong>Soulbound Identity:</strong> Each cabin is a non-transferable NFT tied to your wallet.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Minting Requirements:</strong> Must hold some WUD tokens in your Polkadot wallet. If you sell all WUD, access to your cabin is lost.
        </p>

        <h3 className="text-xl font-bold mb-2 text-white">Customization:</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Arrange Child/Equip NFTs like furniture, décor, rugs, fridges, and wardrobes.</li>
          <li>Personalize cabins to reflect your collection, status, and achievements.</li>
          <li>Progression: Metadata tracks achievements, roles, time-in-community, and other contributions.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Nested NFTs & Collectibles</h2>
        <p className="text-gray-300 mb-4">
          <strong>WUD Universe Items:</strong> Collected through Flappy WUD, partner campaigns, quests, airdrops, and seasonal events.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Nested NFTs:</strong> Items attach to your cabin and can be arranged, displayed, or equipped.
        </p>

        <h3 className="text-xl font-bold mb-2 text-white">Collaborations:</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Collectables by Kus NFTs integrated into Flappy WUD and WUD Universe: <a href="https://chaotic.art/ahp/collection/244" className="text-[#ff2e70] hover:underline">Chaotic Collection</a></li>
          <li>Other partners include DOTs, Hydration, PBA, PromoTeam, and more.</li>
          <li>Mystery Boxes: Flappy WUD Mystery Boxes can be opened in WUD Universe to claim tradable NFTs.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Growth & Progression</h2>
        <p className="text-gray-300 mb-4">
          <strong>Cabin Evolution:</strong> Cabins grow visually and functionally with your WUD holdings, items collected, and participation in community events.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Achievements:</strong> Completing quests, seasonal campaigns, or collectible sets unlocks visual effects, music, and aura enhancements.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Social Engagement:</strong> Visit friends&apos; cabins and see their layouts, decorations, and NFT collections.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Marketplace & Trading</h2>
        <p className="text-gray-300 mb-4">
          <strong>WUD Universe Marketplace:</strong> Trade items and Mystery Boxes on the <a href="https://wuduniverse.xyz/marketplace" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Universe Marketplace</a>.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>External Trading:</strong> Players can list boxes without owning a cabin or being a member.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Collectable Sets:</strong> Completing full item sets can unlock bonus rewards, visual effects, and prestige.
        </p>


        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <iframe
            src="https://wuduniverse.xyz/marketplace"
            width="100%"
            height="600"
            style={{ border: 'none', borderRadius: '8px' }}
            title="WUD Universe Marketplace"
          ></iframe>
        </div>


        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes</h3>
          <ul className="text-gray-300 space-y-1">
            <li>WUD Universe is your gamified Web3 identity, combining collection, display, and progression.</li>
            <li>Cabins are non-transferable but can be customized endlessly with Nested NFTs.</li>
            <li>Items earned through Flappy WUD, events, and collaborations reinforce cross-game engagement.</li>
            <li>Built with Unique Network SDK for advanced NFT functionality and seamless interaction.</li>
          </ul>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <img
            src="/wiki/wudUniverse.webp"
            alt="WUD Universe Marketplace"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Getting Started</h2>
        <ol className="text-gray-300 mb-6 space-y-2 list-decimal list-inside">
          <li>Connect with a Polkadot wallet: <a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>, or Nova Wallet.</li>
          <li>Hold WUD tokens to mint your first Cabin NFT (requires ~10 DOT for the mint fee).</li>
          <li>Collect Mystery Boxes, event items, and partner NFTs to populate and customize your cabin.</li>
          <li>Participate in Flappy WUD, quests, seasonal campaigns, and airdrops to grow your identity and cabin.</li>
          <li>Trade items on the Unique Network marketplace or display them in your cabin.</li>
        </ol>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <p className="text-gray-300 mb-4">
            <a href="https://unique.network/blog/enter-your-cozy-cabin-your-intro-to-wud-wud-universe/" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline font-semibold">
              Read the blog post on Unique Network
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <a href="https://wuduniverse.xyz" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#ff2e70] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff2e70]/80 transition-colors duration-300 mb-4">
            Visit WUD Universe
          </a>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <img
            src="/wiki/wudUniverseHeader.webp"
            alt="WUD Universe Header"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs in Flappy WUD</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
        </ul>
      </div>
    </div>
  )
}

function FlappyStatsSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">7.4 Flappy WUD Stats</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Live Game Statistics</h2>
        <p className="text-gray-300 mb-4">
          View real-time statistics and analytics for Flappy WUD gameplay, including player counts, scores, and performance metrics.
        </p>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
          <iframe
            src="https://flappywud-backend-production.up.railway.app/stats"
            width="100%"
            height="800"
            style={{ border: 'none', borderRadius: '8px' }}
            title="Flappy WUD Statistics"
          />
        </div>

        <p className="text-gray-300 mb-4">
          This dashboard provides comprehensive insights into game performance, player engagement, and ecosystem metrics.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Back to Flappy WUD</a></li>
          <li><a href="#flappening-surge" onClick={(e) => { e.preventDefault(); onNavigate('flappening-surge'); }} className="text-[#ff2e70] hover:underline">Flappening & Surge Events</a></li>
          <li><a href="#flappy-tips" onClick={(e) => { e.preventDefault(); onNavigate('flappy-tips'); }} className="text-[#ff2e70] hover:underline">Flappy WUD Tips & Tricks</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs in Flappy WUD</a></li>
          <li><a href="#n3mus-tournaments" onClick={(e) => { e.preventDefault(); onNavigate('n3mus-tournaments'); }} className="text-[#ff2e70] hover:underline">N3MUS Tournaments</a></li>
        </ul>
      </div>
    </div>
  )
}

function FlappeningSurgeSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  // Device detection for app download links
  const [userAgent, setUserAgent] = useState('')
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setUserAgent(ua)
    setIsIOS(/iPad|iPhone|iPod/.test(ua))
    setIsAndroid(/Android/.test(ua))
  }, [])

  return (
    <div id="flappening-surge">
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">7.1 Flappening & Surge Events</h1>
      <div className="prose prose-invert max-w-none">
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <img
            src="/wiki/game_cover_2.0.webp"
            alt="Flappy WUD Game Cover"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          Flappenings are time-limited FlappyWUD events designed to bring new players into the ecosystem from any blockchain, including Solana and other non-Polkadot communities. The more players participate, the higher the rewards, creating shared incentive for the community to grow.
        </p>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-200 font-medium mb-2">
            💡 <strong>Need Help?</strong> If you encounter any issues during Flappening events, remember to reach out to our community for assistance!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://t.me/gavunwud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b3] transition-colors font-medium"
            >
              Join Telegram
            </a>
            <a
              href="https://discord.gg/4GE46uduFs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865f2] text-white px-4 py-2 rounded-lg hover:bg-[#4752c4] transition-colors font-medium"
            >
              Join Discord
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">How to Join a Flappening</h2>
        <p className="text-gray-300 mb-4">
          Flappenings use the standard FlappyWUD game client. Once connected, you play normally and your points count automatically during active events.
        </p>

        <h3 className="text-xl font-bold mb-2 text-white">Play FlappyWUD on PC or Mobile</h3>

        <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">On PC</h4>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Visit: <a href="http://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Connect using one of the following wallets:</li>
          <ul className="ml-4 space-y-1">
            <li><a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a></li>
            <li><a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></li>
          </ul>
          <li>Start playing</li>
        </ul>

        <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">On Mobile</h4>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Download Nova Wallet or SubWallet</li>
          <li>Open the in-app browser</li>
          <li>Navigate to: <a href="http://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Alternatively, find FlappyWUD under the Gaming dApps tab</li>
          <li>Connect your wallet and play</li>
        </ul>
        <p className="text-gray-300 mb-4">
          No additional setup is required once connected.
        </p>

        {/* Device-specific download links */}
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-bold mb-3 text-[#ff2e70]">Recommended for Your Device:</h4>

          {isIOS && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet (iOS):</span>
                <a
                  href="https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on App Store
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet (iOS):</span>
                <a
                  href="https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on App Store
                </a>
              </div>
            </div>
          )}

          {isAndroid && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet (Android):</span>
                <a
                  href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on Google Play
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet (Android):</span>
                <a
                  href="https://play.google.com/store/apps/details?id=app.subwallet.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on Google Play
                </a>
              </div>
            </div>
          )}

          {!isIOS && !isAndroid && (
            <div className="space-y-3">
              <p className="text-gray-300 mb-3">Select your platform:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-[#ff2e70] font-bold mb-2">iOS (iPhone/iPad)</h5>
                  <div className="space-y-2">
                    <a
                      href="https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      Nova Wallet - App Store
                    </a>
                    <a
                      href="https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      SubWallet - App Store
                    </a>
                  </div>
                </div>
                <div>
                  <h5 className="text-[#ff2e70] font-bold mb-2">Android</h5>
                  <div className="space-y-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      Nova Wallet - Google Play
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=app.subwallet.mobile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      SubWallet - Google Play
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        <h2 className="text-2xl font-bold mb-4 text-white">How Flappenings Work</h2>
        <p className="text-gray-300 mb-4">
          Flappenings are timed events with a community-driven prize pool that can grow as participants contribute more WUD.
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Players flap and accumulate points during the event window</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>When the event ends, the prize pool is distributed to participants based on total points earned</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The more players online simultaneously, the higher the Surge Level</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Higher Surge Levels multiply the WUD earned per point</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Flappenings reward skill, consistency, and coordination, not just luck.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Surge Mode Explained</h2>
        <p className="text-gray-300 mb-4">
          Surge Mode activates automatically as more players are playing FlappyWUD at the same time during a Flappening. Each surge level increases the reward multiplier applied to points earned.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Surge Level Multipliers</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-gray-900/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Surge Level</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Reward Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Level 1</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">2×</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Level 2</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">4×</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Level 3</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">8×</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Level 4</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">16×</td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Level 5</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">32× (capped)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mb-4">
          The maximum multiplier is 32×.
        </p>
        <p className="text-gray-300 mb-4">
          Surge thresholds and exact requirements may vary depending on prize pool size, event duration, $WUD price, and event scale and community size.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Scoring Mechanics and Reward Optimization</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Points earned after 100 points in a single run are worth more</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The further you progress in one session, the faster the game becomes</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Faster gameplay means points accumulate more quickly</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Longer survival during a run results in significantly higher rewards</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Stacking and holding more WUD increases your point multiplier, further amplifying rewards.</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          See the <a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">FlappyWUD section</a> of this wiki for full details on gameplay boosts, multipliers, and mechanics.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Goal of Flappenings</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Flappenings are designed to encourage players to spread the word and bring more people into the WUD ecosystem.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The prize pool is designed to never be depleted unless more players are actively participating and inviting others</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Surge Mode creates direct incentive to increase community participation</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Everyone benefits from growing the network, ensuring the WUD ecosystem remains active, engaging, and sustainable</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Flappenings introduce new players to FlappyWUD, WUD rewards, and the broader ecosystem in an intuitive, gameplay-driven way</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The goal is to combine fun, competition, and rewards to expand the WUD community while creating long-term engagement and awareness.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Back to Flappy WUD</a></li>
          <li><a href="#flappy-tips" onClick={(e) => { e.preventDefault(); onNavigate('flappy-tips'); }} className="text-[#ff2e70] hover:underline">Flappy WUD Tips & Tricks</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs in Flappy WUD</a></li>
          <li><a href="#flappy-stats" onClick={(e) => { e.preventDefault(); onNavigate('flappy-stats'); }} className="text-[#ff2e70] hover:underline">Flappy WUD Stats</a></li>
          <li><a href="#n3mus-tournaments" onClick={(e) => { e.preventDefault(); onNavigate('n3mus-tournaments'); }} className="text-[#ff2e70] hover:underline">N3MUS Tournaments</a></li>
        </ul>
      </div>
    </div>
  )
}

function N3MusTournamentsSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  // Device detection for app download links
  const [userAgent, setUserAgent] = useState('')
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setUserAgent(ua)
    setIsIOS(/iPad|iPhone|iPod/.test(ua))
    setIsAndroid(/Android/.test(ua))
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">11.2 FlappyWUD N3MUS Tournaments</h1>

      {/* Featured Live Event Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#ff2e70]/20 to-purple-600/20 border border-[#ff2e70]/50 rounded-xl p-6 mb-8 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <span className="text-6xl">🚀</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#ff2e70] text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">LIVE NOW</span>
            <span className="text-gray-400 text-sm font-medium">Jan 4, 5:00 PM – Jan 11, 5:00 PM (GMT)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">New Year&apos;s Flap off Tournament</h2>
          <p className="text-gray-300 mb-4 max-w-2xl">
            Kick off 2026 with a blast! Join our special New Year&apos;s tournament on N3MUS.
            Compete for a <span className="text-[#ff2e70] font-bold">$100 prize pool</span> and prove your skills in the air!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://n3mus.com/tournaments/new-years-flap-off"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-[#ff2e70]/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Enter Tournament Now
              <span className="text-xl"> →</span>
            </a>
          </div>
        </div>
      </motion.div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          FlappyWUD tournaments are hosted on N3MUS, a competitive Web3 gaming platform. These tournaments allow players to compete over time, accumulate points across multiple runs, and climb the leaderboard based on total performance.
        </p>
        <div className="mb-6">
          <iframe
            src="https://n3mus.com/games/flappywud"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-200 font-medium mb-2">
            💡 <strong>Need Help?</strong> If you encounter any issues during tournaments, remember to reach out to our community for assistance!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://t.me/gavunwud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b3] transition-colors font-medium"
            >
              Join Telegram
            </a>
            <a
              href="https://discord.gg/4GE46uduFs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865f2] text-white px-4 py-2 rounded-lg hover:bg-[#4752c4] transition-colors font-medium"
            >
              Join Discord
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Tournament Format</h2>
        <p className="text-gray-300 mb-4">
          <strong>Marathon Mode</strong> – Open to all skill levels
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The more points you accumulate, the higher you place</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Scores are cumulative across multiple games</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Tournaments run for a limited time, announced by the community</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Once registered, every FlappyWUD game you play automatically contributes to your tournament score</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">How to Join a FlappyWUD Tournament on N3MUS</h2>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 1: Find the Tournament</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Visit the N3MUS tournaments page: <a href="https://n3mus.com/tournaments" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">n3mus.com/tournaments</a></li>
          <li>Locate the FlappyWUD tournament</li>
          <li>Alternatively, get the current tournament link from the Gavun Wud community</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 2: Create a N3MUS Account</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Sign up for an account on N3MUS</li>
          <li>Make sure you are logged in before continuing</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 3: Register for the Tournament</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Open the FlappyWUD tournament page</li>
          <li>Click &quot;Register now&quot;</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 4: Play FlappyWUD on PC or Mobile</h3>

        <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">On PC</h4>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Visit: <a href="http://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Connect using one of the following wallets:</li>
          <ul className="ml-4 space-y-1">
            <li><a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a></li>
            <li><a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></li>
          </ul>
          <li>Start playing</li>
        </ul>

        <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">On Mobile</h4>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Download Nova Wallet or SubWallet</li>
          <li>Open the in-app browser</li>
          <li>Navigate to: <a href="http://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Alternatively, find FlappyWUD under the Gaming dApps tab</li>
          <li>Connect your wallet and play</li>
        </ul>
        <p className="text-gray-300 mb-4">
          No additional setup is required once connected.
        </p>

        {/* Device-specific download links */}
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-bold mb-3 text-[#ff2e70]">Recommended for Your Device:</h4>

          {isIOS && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet (iOS):</span>
                <a
                  href="https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on App Store
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet (iOS):</span>
                <a
                  href="https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on App Store
                </a>
              </div>
            </div>
          )}

          {isAndroid && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet (Android):</span>
                <a
                  href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on Google Play
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet (Android):</span>
                <a
                  href="https://play.google.com/store/apps/details?id=app.subwallet.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on Google Play
                </a>
              </div>
            </div>
          )}

          {!isIOS && !isAndroid && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet:</span>
                <div className="flex gap-2">
                  <a
                    href="https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff2e70] text-white px-3 py-2 rounded-lg hover:bg-[#e0255f] transition-colors text-sm"
                  >
                    iOS
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff2e70] text-white px-3 py-2 rounded-lg hover:bg-[#e0255f] transition-colors text-sm"
                  >
                    Android
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet:</span>
                <div className="flex gap-2">
                  <a
                    href="https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff2e70] text-white px-3 py-2 rounded-lg hover:bg-[#e0255f] transition-colors text-sm"
                  >
                    iOS
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=app.subwallet.mobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff2e70] text-white px-3 py-2 rounded-lg hover:bg-[#e0255f] transition-colors text-sm"
                  >
                    Android
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 5: Enter Your Substrate Address (Important)</h3>
        <p className="text-gray-300 mb-2">
          You must manually enter your Substrate address. You can copy this address directly from FlappyWUD:
        </p>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Go to <a href="https://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Connect your wallet</li>
          <li>Copy your Substrate address shown in-game (see image below)</li>
          <li>Paste this address into the N3MUS registration field</li>
        </ul>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <Image
            src="/wiki/Copy_adres.webp"
            alt="How to copy your Substrate address from FlappyWUD"
            width={800}
            height={600}
            className="rounded-lg border border-gray-700 w-full"
          />
          <p className="text-center text-gray-300 mt-2">Screenshot showing where to find and copy your Substrate address in FlappyWUD</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">How Scoring Works After Registration</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Play FlappyWUD normally on PC or mobile</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Your points are automatically tracked and added to your N3MUS tournament score</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>No additional steps are required once registered</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The more you play and score, the higher you climb the leaderboard</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Past Tournaments</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-gray-900/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Tournament Name</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Date</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Prize Pool</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Players</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white font-bold">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-white font-bold">New Year&apos;s Flap off</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Jan 4-11, 5:00 PM GMT</td>
                <td className="border border-gray-700 px-4 py-3 text-[#ff2e70] font-bold">$100</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">TBD</td>
                <td className="border border-gray-700 px-4 py-3">
                  <a href="https://n3mus.com/tournaments/new-years-flap-off" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">View Tournament</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">The Flap Off</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">May 26, 2025</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">$500</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">262</td>
                <td className="border border-gray-700 px-4 py-3">
                  <a href="https://n3mus.com/tournaments/The-Flap-Off" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">View Tournament</a>
                </td>
              </tr>
              <tr className="hover:bg-gray-800/50 transition-colors">
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Summer Surge</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">Jun 30, 2025</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">$250</td>
                <td className="border border-gray-700 px-4 py-3 text-gray-300">121</td>
                <td className="border border-gray-700 px-4 py-3">
                  <a href="https://n3mus.com/tournaments/summer-surge" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">View Tournament</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <h2 className="text-2xl font-bold mb-4 text-white">Key Notes</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Registration is required before scores count toward the tournament</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Only the Substrate address you register will be tracked</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Marathon format rewards consistency and long-term play</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>All skill levels are welcome, just keep flapping 🎮</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Back to Flappy WUD</a></li>
          <li><a href="#getting-started" onClick={(e) => { e.preventDefault(); onNavigate('getting-started'); }} className="text-[#ff2e70] hover:underline">Getting Started</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
        </ul>
      </div>
    </div>
  )
}

function BifrostPartnershipSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">11.1 Bifrost Partnership, Mint vDOT for WUD Rewards</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          WUD has partnered with Bifrost to bring staking, DeFi, and WUD Universe rewards together through vDOT. This integration adds concrete utility for WUD holders while strengthening WUD&apos;s position as an active contributor to the broader Polkadot ecosystem.
        </p>
        <p className="text-gray-300 mb-4">
          The WUD community has consistently been among the top vDOT minters, demonstrating real on-chain participation and making WUD a valuable, high-signal partner within the ecosystem.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Extra Utility for WUD Holders</h2>
        <p className="text-gray-300 mb-4">
          Minting vDOT unlocks more than rewards. It enables a sustainable flywheel between staking, DeFi, and the WUD ecosystem.
        </p>
        <p className="text-gray-300 mb-4">
          vDOT staking yield can be used on Hydration to:
        </p>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>DCA into $WUD</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Support the Gavun Wud ecosystem</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Increase long-term exposure while earning yield</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          This creates a continuous loop between staking rewards, DeFi activity, and WUD Universe participation.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Rewards for Minting vDOT</h2>
        <p className="text-gray-300 mb-4">
          Participants who mint vDOT using the WUD referral link are eligible for the following rewards:
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Mint 1 vDOT</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Receive 1× Bifrost Modern Rug (vDOT Promo) automatically.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Mint 10+ vDOT (Must be minted all at once to qualify for both drops)</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Receive the Bifrost Modern Rug (vDOT Promo) and unlock a Bifrost Mystery Box inside WUD Universe, containing exclusive Bifrost items from the Season 1 prize pool.</li>
          <li>A WUD Universe cabin is required to claim the Mystery Box.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">How to Mint vDOT (Using the WUD Referral Link)</h2>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 1: Visit the Bifrost app using the WUD referral link</h3>
        <p className="text-gray-300 mb-4">
          <a href="https://app.bifrost.io/?channel=13" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">https://app.bifrost.io/?channel=13</a>
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 2: Deposit DOT into Bifrost</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Navigate to Cross Chain</li>
          <li>Select Polkadot</li>
          <li>Choose the amount of DOT to deposit into Bifrost</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Step 3: Mint vDOT</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Go to vStaking</li>
          <li>Select vDOT</li>
          <li>Enter the amount of DOT to stake</li>
          <li>Minimum: 1 DOT for the Promo Rug</li>
          <li>Click Stake to mint vDOT</li>
          <li>Begin earning staking yield while remaining liquid</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Reward Delivery & Requirements</h2>
        <ul className="space-y-2 text-gray-300 mb-4">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>The Bifrost Modern Rug (vDOT Promo) is automatically minted and sent directly to your wallet after meeting the minting requirement.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Bifrost Mystery Boxes must be claimed inside WUD Universe and require ownership of a WUD Universe cabin.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>If you do not yet own a cabin, you must mint one before claiming the Mystery Box.</span>
          </li>
        </ul>
        <p className="text-gray-300 mb-4">
          See the <a href="#entering-wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('getting-started'); setTimeout(() => { document.getElementById('entering-wud-universe')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-[#ff2e70] hover:underline">Entering WUD Universe & Minting a Cabin guide</a> for instructions on how to mint a cabin and access your rewards.
        </p>

        <div className="my-6">
          <img
            src="/wiki/bifrost_BURN_BANNER.webp"
            alt="Bifrost Burn Banner"
            className="w-full rounded-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#partnerships" onClick={(e) => { e.preventDefault(); onNavigate('partnerships'); }} className="text-[#ff2e70] hover:underline">Back to Partnerships</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
        </ul>
      </div>
    </div>
  )
}

function WudflipSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">8. WUDFlip</h1>

      <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
        <img
          src="/wiki/wudFlip.webp"
          alt="WUDFLIP - Gamified WUD Trading Experience"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          WUDFLIP is an interactive website and gamified experience built around $WUD, the community memecoin of the Polkadot ecosystem. Its core mission is simple: &quot;Flip Everything.&quot; Players engage with $WUD in a unique, playful way while exploring its market dynamics.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Website:</strong> <a href="https://wudflip.gavunwud.xyz" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">wudflip.gavunwud.xyz</a>
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Purpose:</strong> Track $WUD price in real-time, simulate market interactions, and enjoy a gamified trading experience.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Community Goal:</strong> WUDFLIP always provides a target to beat, giving the community a shared objective and long-term engagement.
        </p>

        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <iframe
            src="https://wudflip.gavunwud.xyz"
            width="100%"
            height="600"
            style={{ border: 'none', borderRadius: '8px' }}
            title="WUDFLIP - Gamified WUD Trading Experience"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">How It Works</h2>

        <h3 className="text-xl font-bold mb-2 text-white">Buy Ammo & Load WUD</h3>
        <p className="text-gray-300 mb-4">
          Users simulate market engagement by &quot;loading&quot; $WUD as ammo and targeting price milestones.
        </p>

        <h3 className="text-xl font-bold mb-2 text-white">Pull the Trigger</h3>
        <p className="text-gray-300 mb-4">
          Targets represent price points or market caps. Every target hit is treated as a &quot;boss&quot; battle, creating a fun, gamified progression tied to $WUD performance.
        </p>

        <h3 className="text-xl font-bold mb-2 text-white">Calculators & Strategy Tools</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li><strong>Price Impact Calculator:</strong> See how buying with $DOT affects $WUD price.</li>
          <li><strong>Firepower Calculator:</strong> Determine how much $WUD is needed to reach the next target.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-white">Market Gamification</h3>
        <ul className="text-gray-300 mb-6 space-y-1">
          <li>Players track the flipping of market caps in real-time.</li>
          <li>Every milestone adds a visual and interactive sense of progression.</li>
          <li>Targets give the community a common goal, reinforcing teamwork and ongoing engagement.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Origin & Meme Connection</h2>
        <p className="text-gray-300 mb-4">
          WUDFLIP was born from the community meme that WUD will &quot;flip&quot; DOT, inspired by historical performance where $WUD has outperformed $DOT in certain periods of trading and hype.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Meme Philosophy:</strong> The playful notion of &quot;flipping DOT&quot; reflects WUD&apos;s irreverent, community-driven culture.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Gamified Expression:</strong> WUDFLIP turns a meme into a tangible, interactive experience, letting the community literally &quot;flip&quot; targets and engage with $WUD&apos;s price mechanics.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Early Investor Potential:</strong> Memecoins like $WUD have the potential to reach billions in market cap, highlighting the opportunity for early-stage investors to join the community before wider adoption.
        </p>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes</h3>
          <ul className="text-gray-300 space-y-1">
            <li>WUDFLIP combines meme culture with financial engagement, making $WUD more accessible and entertaining.</li>
            <li>The platform is educational, showing users how buying and selling affects market caps and token prices.</li>
            <li>Gamification reinforces community participation, shared goals, and the cultural identity of WUD.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs in Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#token-utility" onClick={(e) => { e.preventDefault(); onNavigate('token-utility'); }} className="text-[#ff2e70] hover:underline">Token Utility</a></li>
        </ul>
      </div>
    </div>
  )
}

function AiAutomationSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">9. AI & Automation</h1>

      <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
        <img
          src="/wiki/agentWud.webp"
          alt="Gavun Wud AI Agent"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          The Gavun Wud AI Agent (v2) is an autonomous AI designed to engage the WUD community with an authentic Gavin Wood persona. It currently operates on Discord and X (Twitter), providing interaction, moderation, and updates, with future expansion planned to other platforms.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Core Purpose:</strong> Enhance community engagement, represent the WUD brand, and provide reliable blockchain-related information.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Current Platforms:</strong> Discord, X, and Telegram.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Future Expansion:</strong> Telegram and on-chain agentic interactions.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Partnership:</strong> First Web3 AI agent to integrate with OriginTrail&apos;s Decentralized Knowledge Graph (DKG), improving data accuracy and reliability.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Key Functions</h2>

        <h3 className="text-xl font-bold mb-2 text-white">Community Interaction</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Engages users on Discord and X with timely updates, messages, and community-focused interactions.</li>
          <li>Simulates a Gavin Wood persona, creating a fun and authentic presence for the WUD community.</li>
          <li>Provides general responses and guidance to community members.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-white">Moderation & Safety</h3>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Monitors Discord channels to help maintain a positive environment.</li>
          <li>Assists moderators by flagging content or supporting engagement rules.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-white">Agentic Features</h3>
        <ul className="text-gray-300 mb-6 space-y-1">
          <li>Fully autonomous AI with its own X account.</li>
          <li>First Web3 AI to integrate with OriginTrail DKG, enabling verifiable, tamper-proof storage and querying of blockchain and Polkadot ecosystem information.</li>
          <li>Incorporates sentiment analysis for market trends and Dexscreener integration for real-time asset prices.</li>
          <li>Provides detailed information about Polkadot blockchain architecture and Gavin Wood's contributions to Web3.</li>
          <li>Future capabilities will include on-chain interaction and broader multi-platform engagement.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Origin & Meme Connection</h2>
        <p className="text-gray-300 mb-6">
          The AI agent embodies WUD&apos;s playful, community-driven meme culture while providing serious informational support. OriginTrail DKG integration makes it the first Web3 AI to provide verifiable, tamper-proof Polkadot ecosystem data, improving response precision.
        </p>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Focuses on social presence (Discord and X) rather than direct game integration.</li>
            <li>Reinforces community engagement, insights, and moderation, while being the first agent in Web3 with DKG integration.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#polkadot-blockchain" onClick={(e) => { e.preventDefault(); onNavigate('polkadot-blockchain'); }} className="text-[#ff2e70] hover:underline">Polkadot Blockchain</a></li>
          <li><a href="#gavin-wood" onClick={(e) => { e.preventDefault(); onNavigate('gavin-wood'); }} className="text-[#ff2e70] hover:underline">Gavin Wood</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
          <li><a href="#partnerships" onClick={(e) => { e.preventDefault(); onNavigate('partnerships'); }} className="text-[#ff2e70] hover:underline">Partnerships & Collaborations</a></li>
          <li><a href="#technology" onClick={(e) => { e.preventDefault(); onNavigate('technology'); }} className="text-[#ff2e70] hover:underline">Technology & Infrastructure</a></li>
        </ul>
      </div>
    </div>
  )
}

function CommunitySection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">10. Community & Social Layer</h1>

      <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
        <img
          src="/wiki/dex_screener1.webp"
          alt="WUD Community Overview"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          The WUD community is the backbone of the ecosystem, driving engagement, content creation, and ecosystem growth. With a strong focus on memes, NFTs, and social participation, the community is active across Discord, X (Twitter), and other channels.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Purpose:</strong> Foster collaboration, engagement, and fun while onboarding new users to the Polkadot ecosystem.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Core Platforms:</strong> Discord, X (Twitter), with additional interactions through Flappy WUD, WUD Universe, and WUDFLIP.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Strategic Goal:</strong> Make WUD the ultimate Polkadot community, where all things Polkadot are discussed while keeping WUD at the center. As Polkadot&apos;s official communities sunset, WUD aims to become the go-to hub for ecosystem conversations, memes, and collaborations.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Discord Community</h2>
        <p className="text-gray-300 mb-4">
          <strong>Central Hub:</strong> Discord serves as the main gathering place for WUD members.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Channels & Features:</strong>
        </p>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Game coordination (Flappy WUD, WUD Universe)</li>
          <li>NFT trading and showcase</li>
          <li>Community announcements and events</li>
          <li>Meme sharing and creative contributions</li>
        </ul>
        <p className="text-gray-300 mb-6">
          <strong>Moderation & Support:</strong> Maintained with community mods and the Gavun Wud AI Agent, ensuring a positive and inclusive environment.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">X (Twitter) Presence</h2>
        <p className="text-gray-300 mb-4">
          <strong>Official Account:</strong> Updates on ecosystem news, token milestones, events, and collaborations.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>New WUD X Community:</strong> Join here: <a href="https://x.com/gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">WUD Community on X</a>
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Goal:</strong> Make WUD the ultimate Polkadot community, where everything Polkadot-related is discussed while keeping WUD at the center.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Memes & Virality:</strong> Meme-driven culture spreads WUD&apos;s personality and philosophy, attracting new participants.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Community Interaction:</strong> Retweets, replies, and polls allow followers to actively participate, collaborate, and contribute ideas.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Events & Raids</h2>
        <p className="text-gray-300 mb-4">
          <strong>Flappening & Surge Events:</strong> Community-wide events in Flappy WUD to boost engagement and $WUD rewards.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Collaborative Challenges:</strong> Users are encouraged to participate collectively, creating shared goals.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Memetic Campaigns:</strong> Organized &quot;raids&quot; or viral pushes on social media amplify WUD memes and campaigns.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Cross-Platform Participation:</strong> Events often link Discord, X, and WUD Universe for maximum involvement.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Meme Culture & Contribution</h2>
        <p className="text-gray-300 mb-4">
          <strong>Core Philosophy:</strong> WUD embraces a &quot;more than a meme&quot; approach, blending humor, creativity, and gamification.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Community Contributions:</strong> Users create memes, share fan art, and participate in campaigns.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Recognition & Prestige:</strong> Exceptional contributors are often highlighted in the community, on social media, or through exclusive NFTs and badges.
        </p>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Community is self-sustaining, highly active, and central to all WUD ecosystem products.</li>
            <li>Shared objectives and events (like Flappy WUD Surge Modes) encourage participation and cohesion.</li>
            <li>Integration with the Gavun Wud AI Agent ensures support, moderation, and interaction at scale.</li>
            <li>Meme-driven campaigns reinforce brand identity and ecosystem awareness.</li>
            <li>WUD is strategically positioned to absorb and lead Polkadot community activity, making it the central hub for Web3 discussion in the ecosystem.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wudflip" onClick={(e) => { e.preventDefault(); onNavigate('wudflip'); }} className="text-[#ff2e70] hover:underline">WUDFLIP</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs in Flappy WUD</a></li>
          <li><a href="#ai-automation" onClick={(e) => { e.preventDefault(); onNavigate('ai-automation'); }} className="text-[#ff2e70] hover:underline">AI & Automation</a></li>
        </ul>
      </div>
    </div>
  )
}

function PartnershipsSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">11. Partnerships & Collaborations</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          Partnerships are a core pillar of the WUD ecosystem, driving adoption, cross-chain engagement, and community growth. Through collaborations, WUD expands its presence in the Polkadot ecosystem and beyond, bringing value to token holders, gamers, NFT collectors, and community members.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Purpose:</strong> Strengthen the ecosystem, expand audience reach, provide new utilities and experiences, and reinforce WUD as a central hub in Polkadot.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Strategic Focus:</strong> Collaborate with Polkadot-native projects, NFT initiatives, DeFi protocols, and community-driven ventures.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Key Partners</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-3 text-left text-white font-bold">Partner</th>
                <th className="border border-gray-600 p-3 text-left text-white font-bold">Role / Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Hydration</td>
                <td className="border border-gray-600 p-3 text-gray-300">Fair launch via Omnipool + LP integrations</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">OriginTrail</td>
                <td className="border border-gray-600 p-3 text-gray-300">Knowledge Graph + AI integration for Gavun WUD Agent</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Chaotic</td>
                <td className="border border-gray-600 p-3 text-gray-300">NFT marketplace for WUD collectibles and burn campaigns</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Tanssi Network</td>
                <td className="border border-gray-600 p-3 text-gray-300">Cross-ecosystem campaigns and future appchain infrastructure</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Bifrost</td>
                <td className="border border-gray-600 p-3 text-gray-300">Yield integrations and on-chain data bridges</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">The Dots</td>
                <td className="border border-gray-600 p-3 text-gray-300">Creative collaboration and cross-branding</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">The Kusamarian</td>
                <td className="border border-gray-600 p-3 text-gray-300">Media and NFT collaboration through Collectables by Kus</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">AirLyft</td>
                <td className="border border-gray-600 p-3 text-gray-300">Onboarding campaigns and incentive mechanics</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">EasyA</td>
                <td className="border border-gray-600 p-3 text-gray-300">Web3 education + WUD gamification in hackathons</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Zeitgeist</td>
                <td className="border border-gray-600 p-3 text-gray-300">Treasury Holder and $WUD supporter</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Unique Network</td>
                <td className="border border-gray-600 p-3 text-gray-300">NFT infrastructure and potential collaborations</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">N3MUS</td>
                <td className="border border-gray-600 p-3 text-gray-300">Gaming tournaments, community events, and cross-promo campaigns</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">JAMTON</td>
                <td className="border border-gray-600 p-3 text-gray-300">Opening Flappy WUD to TON world</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">PromoTeam</td>
                <td className="border border-gray-600 p-3 text-gray-300">Supporting WUD growth inside and outside the ecosystem</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold"><a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a></td>
                <td className="border border-gray-600 p-3 text-gray-300">Easy-to-use mobile and desktop wallet + Flappy WUD integration</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold">Nova Wallet</td>
                <td className="border border-gray-600 p-3 text-gray-300">Mobile wallet with 1-click swap + Flappy WUD integration</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="border border-gray-600 p-3 text-gray-300 font-semibold"><a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></td>
                <td className="border border-gray-600 p-3 text-gray-300">Multi-chain wallet for Ethereum & Polkadot users</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Past Campaigns & Activations</h2>
        <p className="text-gray-300 mb-4">
          <strong>Flappening Events:</strong> Community-wide events in Flappy WUD boosted by partner collaboration.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>NFT Burn & Reward Campaigns:</strong> OG WUD Burn NFT initiative involved community and partners to enhance scarcity and engagement.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Collaborative Mystery Boxes:</strong> Special items and cabin collectables earned through partner integrations and campaigns.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Ecosystem Collaborations</h2>
        <p className="text-gray-300 mb-4">
          <strong>Polkadot-focused Initiatives:</strong> Onboarding new users to Polkadot via gaming, NFTs, and educational campaigns.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Cross-Project NFT Integrations:</strong> Examples include Flappy WUD × Collectables by Kus.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Community & Meme Campaigns:</strong> Strategic campaigns amplify engagement across social media, X, Discord, and in-game events.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Benefits of Partnerships</h2>
        <p className="text-gray-300 mb-4">
          <strong>Enhanced Utility:</strong> NFTs, in-game items, and collectibles with cross-platform value.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Community Growth:</strong> Partnerships bring new users into the ecosystem while engaging existing members.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Shared Goals:</strong> Joint campaigns encourage collective action and participation.
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Innovation:</strong> Partners enable WUD to experiment with new gameplay mechanics, AI integrations, NFT features, and cross-chain utilities.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">How to Propose a Partnership</h2>
        <p className="text-gray-300 mb-4">
          Contact the WUD team through Discord or X.
        </p>
        <p className="text-gray-300 mb-4">
          Provide a clear outline of potential value, campaign ideas, and mutual benefits.
        </p>
        <p className="text-gray-300 mb-4">
          The WUD team evaluates alignment with ecosystem goals and community interest.
        </p>
        <p className="text-gray-300 mb-6">
          Approved partners collaborate on campaigns, NFT drops, and events within the WUD ecosystem.
        </p>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Partnerships are community-focused, ensuring collaborations bring tangible benefits to WUD members.</li>
            <li>WUD prioritizes Polkadot-native projects but remains open to external strategic collaborations that expand ecosystem reach.</li>
            <li>Collaboration campaigns are often tied to games, NFTs, social initiatives, and educational efforts, reinforcing WUD&apos;s position as a central hub in Polkadot.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
          <li><a href="#ai-automation" onClick={(e) => { e.preventDefault(); onNavigate('ai-automation'); }} className="text-[#ff2e70] hover:underline">AI & Automation</a></li>
        </ul>
      </div>
    </div>
  )
}

function GraphicsMediaSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">12. Graphics & Media</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          The WUD brand is visually bold and minimalist, centered on the iconic Gavun Wud head in solid black and white. Graphics and media help communicate WUD&apos;s identity consistently, while enabling the community to participate in campaigns, memes, and promotions.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          This section covers official logos, brand assets, meme templates, and community media highlights, along with usage guidelines.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Official Logo</h2>
        <ul className="text-gray-300 mb-4 space-y-2">
          <li><strong>Primary Logo:</strong> The Gavun Wud head in solid white on black background.</li>
          <li><strong>Typography:</strong> The logo text uses the Karantina font for a bold, distinctive appearance.</li>
          <li><strong>Variants:</strong> Single-color versions for social media, profile images, and small-scale applications.</li>
          <li><strong>File Formats:</strong> Vector (.SVG) and high-res PNGs for flexibility.</li>
          <li><strong>Usage:</strong> Maintain clear space around the head. Do not alter colors, proportions, or design.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Brand Assets</h2>
        <ul className="text-gray-300 mb-4 space-y-2">
          <li><strong>Color Palette:</strong> Black and white only, no additional accent colors.</li>
          <li><strong>Typography:</strong> Karantina font for logos and branding elements; clean, modern typography for headers and labels.</li>
          <li><strong>Icons:</strong> Minimal and monochromatic designs.</li>
          <li><strong>3D & 2D Graphics:</strong> Optional stylized 2D elements or flat designs, keeping black-and-white consistency.</li>
        </ul>

        <BrandAssetsGallery />
        <p className="text-gray-300 mb-6">
          <a href="https://drive.google.com/drive/folders/1RzZU1pwn05CTEUaIn9xsoLn21KAcEYGD" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Browse Full Folder in Google Drive</a>
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Meme & Campaign Templates</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Templates are provided for the community to create memes and promotional media while maintaining the black-and-white identity.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Editable formats include PSD, Figma, and transparent PNGs.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed"><strong>Guidelines:</strong></p>
        <ul className="text-gray-300 mb-4 space-y-1 ml-4">
          <li>Maintain the black-and-white Gavun Wud head.</li>
          <li>Keep memes playful, chaotic, and community-driven.</li>
          <li>Do not misrepresent official campaigns.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Community-Created Media Highlights</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Showcases fan art, memes, and media adhering to the black-and-white style.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Highlights contributions to Flappy WUD, WUD Universe, and NFT campaigns.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Encourages community participation while giving proper credit.
        </p>

        <p className="text-gray-300 mb-6">
          <a href="https://drive.google.com/drive/folders/1Wi0h7e04k9-toSmgrXRglUBEioF5Wucq" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Open Community Memes in Google Drive</a>
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Usage Guidelines</h2>
        <ul className="text-gray-300 mb-4 space-y-2">
          <li><strong>Do Not Alter Logo:</strong> Maintain the black-and-white head design.</li>
          <li><strong>Respect Brand Tone:</strong> Content should remain playful and chaotic.</li>
          <li><strong>Credit Creators:</strong> Attribute community-created assets when sharing.</li>
          <li><strong>NFT & Product Integration:</strong> Use assets only when promoting WUD ecosystem products like Flappy WUD, WUD Universe, and WUDFLIP.</li>
        </ul>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Notes</h3>
          <ul className="text-gray-300 space-y-1">
            <li>WUD&apos;s black-and-white brand identity ensures a clean, recognizable presence across all media.</li>
            <li>Assets empower the community to create and share content while maintaining visual consistency.</li>
            <li>The Gavun Wud head is the central visual symbol of the WUD ecosystem.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
        </ul>
      </div>
    </div>
  )
}

function GettingStartedSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  // Device detection for app download links
  const [userAgent, setUserAgent] = useState('')
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setUserAgent(ua)
    setIsIOS(/iPad|iPhone|iPod/.test(ua))
    setIsAndroid(/Android/.test(ua))
  }, [])
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">1.1 Getting Started</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6 leading-relaxed">
          This guide helps new users buy $WUD, play Flappy WUD, and enter WUD Universe. Follow these steps to get started quickly on desktop or mobile.
        </p>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-200 font-medium mb-2">
            💡 <strong>Need Help?</strong> If you encounter any issues getting started, remember to reach out to our community for assistance!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://t.me/gavunwud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b3] transition-colors font-medium"
            >
              Join Telegram
            </a>
            <a
              href="https://discord.gg/4GE46uduFs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865f2] text-white px-4 py-2 rounded-lg hover:bg-[#4752c4] transition-colors font-medium"
            >
              Join Discord
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Buying $WUD</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          $WUD is a Polkadot-native memecoin designed for games, NFTs, and community interaction.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Purchase $WUD through Hydration DEX or other supported exchanges.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Ensure your wallet (<a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, Nova Wallet, <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>) is ready before buying.
        </p>
        <VideoTutorialsSection />

        <h2 id="entering-wud-universe" className="text-2xl font-bold mb-4 text-white">Entering WUD Universe & Minting a Cabin</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          WUD Universe is a gamified digital identity project built on Unique Network and Polkadot. Your cabin is your starting point in this living ecosystem.
        </p>

        <h3 className="text-xl font-bold mb-3 text-[#ff2e70]">On PC</h3>
        <ul className="text-gray-300 mb-4 space-y-2 ml-4">
          <li><a href="https://wuduniverse.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Visit wuduniverse.xyz</a>.</li>
          <li>Connect your Polkadot wallet (<a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a>, <a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a>).</li>
          <li>Mint your cabin for 10 DOT.</li>
        </ul>

        <h3 className="text-xl font-bold mb-3 text-[#ff2e70]">On Mobile</h3>
        <ul className="text-gray-300 mb-4 space-y-2 ml-4">
          <li>Open Nova Wallet or Subwallet.</li>
          <li>Access the WUD Universe app within the wallet (standard mobile browsers will not work).</li>
          <li>Connect your wallet and mint your cabin.</li>
        </ul>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">Important Notes:</h4>
          <ul className="text-gray-300 space-y-1">
            <li>You must hold $WUD to keep your cabin. Selling all $WUD removes access to the cabin, but you keep any items earned.</li>
            <li>Some transactions require UNQ tokens for fees.</li>
            <li>Collect items through games, quests, campaigns, and airdrops.</li>
            <li>Customize your cabin with Nested NFTs, trade items on the WUD Universe marketplace, and explore other cabins.</li>
          </ul>
        </div>

        <h2 id="playing-flappy-wud" className="text-2xl font-bold mb-4 text-white">Playing Flappy WUD v2.0</h2>

        <h3 className="text-xl font-bold mb-2 text-white">Play FlappyWUD on PC or Mobile</h3>

        <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">On PC</h4>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Visit: <a href="http://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Connect using one of the following wallets:</li>
          <ul className="ml-4 space-y-1">
            <li><a href="https://www.subwallet.app/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">SubWallet</a></li>
            <li><a href="https://talisman.xyz/" className="text-[#ff2e70] hover:underline" target="_blank" rel="noopener noreferrer">Talisman</a></li>
          </ul>
          <li>Start playing</li>
        </ul>

        <h4 className="text-lg font-bold mb-2 text-[#ff2e70]">On Mobile</h4>
        <ul className="text-gray-300 mb-4 space-y-1">
          <li>Download Nova Wallet or SubWallet</li>
          <li>Open the in-app browser</li>
          <li>Navigate to: <a href="http://flappywud.lol" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">flappywud.lol</a></li>
          <li>Alternatively, find FlappyWUD under the Gaming dApps tab</li>
          <li>Connect your wallet and play</li>
        </ul>

        {/* Device-specific download links */}
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-bold mb-3 text-[#ff2e70]">Recommended for Your Device:</h4>

          {isIOS && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet (iOS):</span>
                <a
                  href="https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on App Store
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet (iOS):</span>
                <a
                  href="https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on App Store
                </a>
              </div>
            </div>
          )}

          {isAndroid && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">Nova Wallet (Android):</span>
                <a
                  href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on Google Play
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium">SubWallet (Android):</span>
                <a
                  href="https://play.google.com/store/apps/details?id=app.subwallet.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff2e70] text-white px-4 py-2 rounded-lg hover:bg-[#e0255f] transition-colors"
                >
                  Download on Google Play
                </a>
              </div>
            </div>
          )}

          {!isIOS && !isAndroid && (
            <div className="space-y-3">
              <p className="text-gray-300 mb-3">Select your platform:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-[#ff2e70] font-bold mb-2">iOS (iPhone/iPad)</h5>
                  <div className="space-y-2">
                    <a
                      href="https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      Nova Wallet - App Store
                    </a>
                    <a
                      href="https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      SubWallet - App Store
                    </a>
                  </div>
                </div>
                <div>
                  <h5 className="text-[#ff2e70] font-bold mb-2">Android</h5>
                  <div className="space-y-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=io.novafoundation.nova.market"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      Nova Wallet - Google Play
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=app.subwallet.mobile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#ff2e70] text-white px-3 py-2 rounded text-sm hover:bg-[#e0255f] transition-colors"
                    >
                      SubWallet - Google Play
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="bg-[#ff6b35]/10 border border-[#ff6b35]/30 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-bold mb-2 text-[#ff6b35]">Pro Tip:</h4>
          <p className="text-gray-300">
            Check the ribbon at the top of this page or follow <a href="https://x.com/gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">@gavunwud</a> on X for Flappening announcements and countdown timers.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Beginner Checklist</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Set up a Polkadot-compatible wallet (Subwallet, Nova Wallet, Talisman).</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Buy $WUD on Hydration DEX or via tutorials.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Start playing Flappy WUD v2.0.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Mint your WUD Universe cabin and collect items.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckIcon className="text-[#ff2e70] mt-1 flex-shrink-0" />
            <span>Engage with the community on Discord, X, and in-game events.</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
        </ul>
      </div>
    </div>
  )
}

function FutureRoadmapSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">13. Future & Roadmap</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6 leading-relaxed">
          The WUD Roadmap outlines our goals, milestones, and vision as we grow the ecosystem. WUD is fully community-driven since April 2024, when the community took over the project. From that point onward, our mission has always been to expand WUD into a fun, interactive, and engaging ecosystem for gamers and Polkadot enthusiasts and that mission will never change.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Community-Driven Ethos</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          WUD is built by the community, for the community.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Every initiative: games, NFTs, events, and campaigns is powered by passionate members who care about creating opportunities in the Polkadot ecosystem.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Our focus is on gaming, creativity, and entertainment, providing fun experiences while rewarding engagement and participation.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Marketcap Milestones & Major Goals</h2>
        <ul className="text-gray-300 mb-4 space-y-2">
          <li><strong>$20M Marketcap →</strong> List WUD on a CEX, expanding accessibility and liquidity.</li>
          <li><strong>$50M Marketcap →</strong> Host a WUD Party, celebrating community growth and achievements.</li>
          <li><strong>$100M Marketcap →</strong> Expand the ecosystem into multiple interactive experiences, including new WUD Universe zones, minigames, in-game progression systems, and larger partner campaigns that bring more rewards and engagement to the community.</li>
          <li><strong>$250M Marketcap →</strong> Expand WUD globally with international events, tournaments, media presence, partnerships, and merchandise, cementing WUD as a culturally recognized memecoin.</li>
          <li><strong>$1B Marketcap and beyond →</strong> Establish WUD as a sustainable, community-driven entertainment ecosystem, where members actively create games, events, and experiences, ensuring WUD&apos;s relevance, presence, and fun for years to come.</li>
        </ul>
        <p className="text-gray-300 mb-6 leading-relaxed">
          <strong>Key Idea:</strong> Marketcap growth fuels ecosystem expansion. Every milestone unlocks new utilities, experiences, and opportunities for the community. WUD is never stopping. Each milestone is a step toward bigger, more fun, and more engaging projects.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Short-Term Goals</h2>
        <ul className="text-gray-300 mb-6 space-y-2">
          <li>Expand Flappy WUD 2.0 with new events, power-ups, and NFTs.</li>
          <li>Launch additional WUD Universe collectables, campaigns, and collaborations.</li>
          <li>Grow community engagement across Discord, X, and in-game events.</li>
          <li>Strengthen the WUD brand with merchandise and digital collectibles.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Mid-Term Goals</h2>
        <ul className="text-gray-300 mb-6 space-y-2">
          <li>Develop multiple community-driven games, in collaboration with partners.</li>
          <li>Introduce cross-game NFT utilities and interactive experiences.</li>
          <li>Expand digital storytelling initiatives like comics, animations, and lore-driven content.</li>
          <li>Continue building partnerships across the Polkadot ecosystem for broader exposure and opportunities.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Long-Term Vision</h2>
        <ul className="text-gray-300 mb-6 space-y-2">
          <li>Evolve WUD into a fully-fledged entertainment brand: multiple games, interactive experiences, comics, merch, and NFT-driven worlds.</li>
          <li>Maintain community-first development, allowing members to influence projects, collaborations, and campaigns.</li>
          <li>Constantly innovate and expand the ecosystem to keep the brand alive, relevant, and fun.</li>
          <li>Explore new utilities, token integrations, and gamified experiences to ensure lasting value for holders.</li>
        </ul>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Principles</h3>
          <ul className="text-gray-300 space-y-1">
            <li><strong>Community-Driven:</strong> Every project, game, and NFT release is designed to involve and reward the WUD community since April 2024, this has never changed.</li>
            <li><strong>Expansion-First:</strong> As we grow in marketcap, we expand the ecosystem: more games, utilities, and experiences.</li>
            <li><strong>Fun-Focused:</strong> WUD exists to create engaging, chaotic, and entertaining experiences for gamers and Polkadot enthusiasts.</li>
            <li><strong>Sustainable Growth:</strong> Targeting high marketcaps ensures funding for long-term brand development and ecosystem support.</li>
          </ul>
        </div>

        <div className="mb-6">
          <img
            src="/wiki/second_age.webp"
            alt="Second Age Roadmap"
            className="w-full max-w-4xl mx-auto rounded-lg border border-gray-700"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#ff2e70] border-b border-gray-700 pb-1">See Also</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="#flappy-wud" onClick={(e) => { e.preventDefault(); onNavigate('flappy-wud'); }} className="text-[#ff2e70] hover:underline">Flappy WUD</a></li>
          <li><a href="#flappy-nfts" onClick={(e) => { e.preventDefault(); onNavigate('flappy-nfts'); }} className="text-[#ff2e70] hover:underline">NFTs & Utility</a></li>
          <li><a href="#wud-universe" onClick={(e) => { e.preventDefault(); onNavigate('wud-universe'); }} className="text-[#ff2e70] hover:underline">WUD Universe</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); onNavigate('community'); }} className="text-[#ff2e70] hover:underline">Community & Social Layer</a></li>
          <li><a href="#wudflip" onClick={(e) => { e.preventDefault(); onNavigate('wudflip'); }} className="text-[#ff2e70] hover:underline">WUDFLIP</a></li>
        </ul>
      </div>
    </div>
  )
}

function LinksResourcesSection() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">14. Links & Resources</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Official website</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://gavunwud.xyz" className="text-[#ff2e70] hover:underline">gavunwud.xyz</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Analytics and explorers</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://www.coingecko.com/en/coins/gavun-wud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">CoinGecko - Gavun Wud</a></li>
          <li><a href="https://dexscreener.com/polkadot/0xb941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">DexScreener - WUD Token</a></li>
          <li><a href="https://www.geckoterminal.com/hydration/pools/0xb941ce809e9793289c9e9127102d447723cabdfb9d51d0893f2bdbf9958995ce" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">GeckoTerminal - WUD Token</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Social Media</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://t.me/gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Telegram</a></li>
          <li><a href="https://discord.com/invite/4GE46uduFs" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Discord</a></li>
          <li><a href="https://x.com/gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">X (Twitter) - Main Account</a></li>
          <li><a href="https://x.com/gavunwud_agent" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">X (Twitter) - AI Agent</a></li>
          <li><a href="https://www.tiktok.com/@gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">TikTok</a></li>
          <li><a href="https://www.youtube.com/@gavunwud" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">YouTube</a></li>
          <li><a href="https://www.instagram.com/gavunwud/" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Instagram</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">NFT Collections</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          <li><a href="https://chaotic.art/ahp/collection/441" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Chaotic - WUD Universe Collection</a></li>
          <li><a href="https://chaotic.art/ahp/collection/244" target="_blank" rel="noopener noreferrer" className="text-[#ff2e70] hover:underline">Chaotic - OG WUD Burn NFTs</a></li>
        </ul>
      </div>
    </div>
  )
}

function PolkadotBlockchainSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">14. Polkadot Blockchain</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
        <p className="text-gray-300 mb-4">
          Polkadot is a decentralized, nominated proof-of-stake blockchain platform designed to enable interoperability between different blockchains. Founded by Gavin Wood, one of Ethereum's co-founders, Polkadot represents a significant evolution in blockchain technology, moving beyond single-chain limitations to create a multi-chain ecosystem.
        </p>
        <p className="text-gray-300 mb-4">
          The platform's native cryptocurrency, DOT, serves as the governance token and provides staking capabilities. Polkadot's architecture allows for the creation of parachains - independent blockchains that connect to the main Relay Chain, sharing security and enabling cross-chain communication.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">History and Development</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Founding and ICO (2016–2019)</h3>
        <p className="text-gray-300 mb-4">
          Polkadot was conceived by Gavin Wood, Robert Habermeier, and Peter Czaban. Wood published the Polkadot white paper in 2016, outlining a vision for a heterogeneous multi-chain framework that would solve the scalability and interoperability issues plaguing early blockchain networks.
        </p>
        <p className="text-gray-300 mb-4">
          In 2017, Wood co-founded the Web3 Foundation, a non-profit organization based in Zug, Switzerland, dedicated to promoting and funding decentralized web technologies. The foundation played a crucial role in Polkadot's development and continues to support research in blockchain infrastructure.
        </p>
        <p className="text-gray-300 mb-4">
          Polkadot conducted one of the most successful initial coin offerings (ICOs) in cryptocurrency history, raising over $144.3 million in October 2017. The project was developed by Parity Technologies, a blockchain infrastructure company founded by Wood and Jutta Steiner.
        </p>
        <p className="text-gray-300 mb-4">
          A significant setback occurred shortly after the ICO when a vulnerability in Parity Technologies' multi-signature wallets froze approximately $150 million worth of Ethereum, including a substantial portion of Polkadot's raised funds. This incident highlighted the risks associated with early smart contract implementations.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Network Launch and Parachains (2020–2021)</h3>
        <p className="text-gray-300 mb-4">
          Polkadot launched its mainnet in May 2020 under a proof-of-authority consensus model, managed by the Web3 Foundation during its early phase. By June 2020, the network transitioned to a Nominated Proof-of-Stake (NPoS) consensus mechanism, allowing token holders to participate in network security through nomination and validation.
        </p>
        <p className="text-gray-300 mb-4">
          In December 2021, Polkadot introduced parachain functionality, enabling multiple blockchains to run simultaneously and connect to the Relay Chain. This marked a significant milestone, allowing projects to build specialized blockchains that benefit from Polkadot's shared security model.
        </p>
        <p className="text-gray-300 mb-4">
          Parachain slot auctions became a major event in the ecosystem, with projects competing for limited slots. These auctions raised over $200 million through crowdloans, demonstrating strong community participation and confidence in the platform.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Recent Developments (2022–Present)</h3>
        <p className="text-gray-300 mb-4">
          Polkadot's canary network, Kusama, underwent a major stress test in December 2024 known as "The Spammening," successfully handling approximately 143,000 transactions per second at just 23% capacity. This demonstrated the network's potential for high-throughput applications.
        </p>
        <p className="text-gray-300 mb-4">
          The platform continues to evolve with ongoing upgrades to its consensus mechanisms, governance systems, and cross-chain communication protocols. Recent developments include enhanced interoperability features and expanded support for various blockchain architectures.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Core Concepts</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Multi-Chain Ecosystem</h3>
        <p className="text-gray-300 mb-4">
          Polkadot provides an open-source software development kit (Polkadot SDK) that enables developers to build custom blockchains. These can operate as independent "solochains" or integrate as "parachains" within the Polkadot network, benefiting from shared security and interoperability.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Three Key Properties</h3>
        <ul className="text-gray-300 mb-4 space-y-2">
          <li><strong>Sovereignty:</strong> Each parachain maintains autonomy over its governance and operations, allowing for specialized functionality without compromising independence.</li>
          <li><strong>Shared Security:</strong> The Relay Chain provides cryptoeconomic security to all connected parachains, eliminating the need for each chain to bootstrap its own validator network.</li>
          <li><strong>Interoperability:</strong> Cross-Consensus Message Passing (XCMP) enables seamless communication between parachains, facilitating complex cross-chain operations.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-white">Technical Architecture</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Consensus Mechanism</h3>
        <p className="text-gray-300 mb-4">
          Polkadot uses a nominated proof-of-stake (NPoS) consensus algorithm called BABE (Blind Assignment for Blockchain Extension), derived from the Ouroboros protocol. Validators are responsible for block production and finalization, while nominators support them by staking DOT tokens.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Governance</h3>
        <p className="text-gray-300 mb-4">
          Polkadot implements on-chain governance allowing stakeholders to influence network development. The system has evolved from Governance V1 to OpenGov, addressing decentralization concerns and enhancing community participation. Council members and validators are selected through Phragmén's voting method.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Ecosystem and Adoption</h2>
        <p className="text-gray-300 mb-4">
          Polkadot hosts a diverse ecosystem of projects across DeFi, NFTs, infrastructure, and enterprise solutions. Notable parachains include Acala (DeFi), Moonbeam (EVM compatibility), and Astar (multi-VM support). The platform's interoperability has attracted significant development activity and user adoption.
        </p>
        <p className="text-gray-300 mb-4">
          Kusama, Polkadot's experimental network, serves as a testing ground for new features and hosts innovative projects that push the boundaries of blockchain technology.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Impact and Future</h2>
        <p className="text-gray-300 mb-4">
          Polkadot represents a paradigm shift in blockchain architecture, moving from isolated networks to interconnected ecosystems. By enabling true interoperability, Polkadot addresses one of the fundamental limitations of early blockchain technology and paves the way for more complex, scalable decentralized applications.
        </p>
        <p className="text-gray-300 mb-4">
          The platform's focus on shared security and cross-chain communication has influenced the broader blockchain industry, inspiring similar initiatives in other networks. As Web3 continues to evolve, Polkadot's multi-chain vision positions it as a key infrastructure layer for the decentralized internet.
        </p>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Takeaways</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Polkadot enables blockchain interoperability through parachains and shared security</li>
            <li>The platform uses NPoS consensus with BABE block production</li>
            <li>Governance has evolved to OpenGov for better decentralization</li>
            <li>Kusama serves as an experimental network for testing innovations</li>
            <li>Cross-chain communication via XCMP enables complex dApps</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function GavinWoodSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-[#ff2e70]">15. Gavin Wood</h1>
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-white">Early Life and Education</h2>
        <p className="text-gray-300 mb-4">
          Gavin James Wood was born in Lancaster, England. He attended Lancaster Royal Grammar School before pursuing higher education at the University of York, where he earned a Master of Engineering (MEng) in Computer Systems and Software Engineering in 2002. Wood completed his PhD in 2005 with a thesis titled "Content-based visualization to aid common navigation of musical audio."
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Career Beginnings</h2>
        <p className="text-gray-300 mb-4">
          Before his involvement with blockchain technology, Wood worked as a research scientist at Microsoft. His early career focused on computer systems and software engineering, providing a strong foundation for his later contributions to decentralized technology.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Ethereum Foundation</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Co-Founding Ethereum</h3>
        <p className="text-gray-300 mb-4">
          In 2013-2014, Wood co-founded Ethereum alongside Vitalik Buterin, Charles Hoskinson, Anthony Di Iorio, and Joseph Lubin. He described Ethereum as "one computer for the entire planet," envisioning a global, decentralized computing platform that would revolutionize how applications are built and deployed.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Technical Contributions</h3>
        <p className="text-gray-300 mb-4">
          Wood played a pivotal role in Ethereum's technical development. He proposed and helped develop Solidity, the programming language for writing smart contracts on Ethereum. In 2014, he authored the Ethereum Yellow Paper, which formally defined the Ethereum Virtual Machine (EVM) - the runtime environment for smart contracts.
        </p>
        <p className="text-gray-300 mb-4">
          As the Ethereum Foundation's first Chief Technology Officer (CTO), Wood oversaw the technical direction and implementation of the Ethereum network. His leadership was instrumental in guiding Ethereum through its early development phases.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Departure from Ethereum</h3>
        <p className="text-gray-300 mb-4">
          Wood left the Ethereum Foundation in January 2016. His departure marked a transition to new ventures while maintaining his influence in the blockchain space. He continued to contribute to the ecosystem through various initiatives and companies.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Parity Technologies</h2>
        <p className="text-gray-300 mb-4">
          In 2015, Wood founded Parity Technologies (formerly Ethcore) with Jutta Steiner. The company developed blockchain infrastructure and released the Parity Ethereum client, written in Rust. This client became one of the most widely used Ethereum implementations.
        </p>
        <p className="text-gray-300 mb-4">
          Wood served as Chief Web Officer at Parity in 2018, focusing on the company's vision for Web3 infrastructure. Parity Technologies continues to develop cutting-edge blockchain solutions and contributes significantly to the Polkadot ecosystem.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Web3 Foundation</h2>
        <p className="text-gray-300 mb-4">
          In 2017, Wood co-founded the Web3 Foundation, a non-profit organization dedicated to promoting decentralized internet infrastructure. The foundation supports research and development in blockchain technology, with a particular focus on the Polkadot network.
        </p>
        <p className="text-gray-300 mb-4">
          The Web3 Foundation has been instrumental in funding and guiding the development of Polkadot, ensuring that the platform aligns with broader goals of decentralization and interoperability.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Polkadot and Kusama</h2>
        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Creating Polkadot</h3>
        <p className="text-gray-300 mb-4">
          Wood authored the Polkadot white paper in 2016, outlining a vision for a heterogeneous multi-chain framework. Polkadot was designed to address the limitations of single-blockchain architectures by enabling interoperability between different networks.
        </p>
        <p className="text-gray-300 mb-4">
          As Polkadot's primary architect, Wood led the development of its innovative consensus mechanisms, governance systems, and cross-chain communication protocols. The platform's launch in 2020 marked a significant milestone in blockchain technology.
        </p>

        <h3 className="text-xl font-bold mb-2 text-[#ff2e70]">Kusama Network</h3>
        <p className="text-gray-300 mb-4">
          Wood also created Kusama, Polkadot's "canary network" designed for experimentation and testing. Kusama allows developers to deploy and test new features in a live environment before implementing them on Polkadot.
        </p>
        <p className="text-gray-300 mb-4">
          The network has become a hub for innovative blockchain projects and has undergone significant stress testing, including the 2024 "Spammening" event that demonstrated its high-throughput capabilities.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Philanthropy and Advocacy</h2>
        <p className="text-gray-300 mb-4">
          Wood has been actively involved in philanthropic efforts. During the 2022 Russian invasion of Ukraine, he donated $5.8 million in cryptocurrency to support humanitarian aid efforts. This demonstrates his commitment to using blockchain technology for social good.
        </p>
        <p className="text-gray-300 mb-4">
          As a prominent advocate for Web3 technologies, Wood continues to promote the development of decentralized systems that prioritize user sovereignty, privacy, and interoperability.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Publications and Legacy</h2>
        <p className="text-gray-300 mb-4">
          Wood has authored several influential papers in the blockchain space:
        </p>
        <ul className="text-gray-300 mb-4 space-y-2">
          <li><strong>Ethereum Yellow Paper:</strong> The formal specification of the Ethereum protocol</li>
          <li><strong>Polkadot White Paper:</strong> The foundational document outlining Polkadot's architecture</li>
          <li><strong>Ethereum: A Secure Decentralised Generalised Transaction Ledger:</strong> Co-authored work on Ethereum's design</li>
        </ul>
        <p className="text-gray-300 mb-4">
          Wood's contributions have shaped the trajectory of blockchain technology, from Ethereum's smart contract capabilities to Polkadot's multi-chain vision. His work continues to influence the development of decentralized systems worldwide.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white">Current Activities</h2>
        <p className="text-gray-300 mb-4">
          Wood remains actively involved in the blockchain ecosystem through Parity Technologies and the Web3 Foundation. He continues to advocate for technological innovation that advances the principles of decentralization and user empowerment.
        </p>
        <p className="text-gray-300 mb-4">
          His ongoing work focuses on expanding the capabilities of multi-chain architectures and promoting the adoption of Web3 technologies across various industries.
        </p>

        <div className="bg-[#ff2e70]/10 border border-[#ff2e70]/30 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-[#ff2e70]">Key Achievements</h3>
          <ul className="text-gray-300 space-y-1">
            <li>Co-founder of Ethereum and author of the Ethereum Yellow Paper</li>
            <li>Creator of Solidity, the primary smart contract language</li>
            <li>Founder of Parity Technologies and Web3 Foundation</li>
            <li>Architect of Polkadot and Kusama networks</li>
            <li>Pioneer in blockchain interoperability and multi-chain architectures</li>
            <li>Advocate for Web3 adoption and decentralized technologies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}