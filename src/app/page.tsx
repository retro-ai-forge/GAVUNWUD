import HeroSection from "@/components/hero-section"
import WhatIsWud from "@/components/what-is-wud"
import FlappyWudSection from "@/components/flappy-wud-section"
import GavunAiSection from "@/components/gavun-ai-section"
import WudUniverseSection from "@/components/wud-universe-section"
import PartnersSection from "@/components/partners-section"
import TokenomicsSection from "@/components/tokenomics-section"
import NftSection from "@/components/nft-section"
import CommunitySection from "@/components/community-section"
import FaqSection from "@/components/faq-section"
import VideoTutorialsSection from "@/components/video-tutorials-section"
import FloatingCta from "@/components/floating-cta"
import Footer from "@/components/footer"
import JsonLd from "@/components/json-ld"

const organizationData = {
  name: "WUD Memecoin",
  url: "https://gavunwud.xyz",
  logo: "https://gavunwud.xyz/logo.png",
  sameAs: [
    "https://twitter.com/gavunwud",
    "https://t.me/gavunwud",
    "https://discord.gg/gavunwud"
  ],
  description: "$WUD is a chaotic mix of memes, utility, and community madness on Polkadot."
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <JsonLd type="Organization" data={organizationData} />
      <JsonLd type="WebSite" data={{
        name: "WUD Memecoin",
        url: "https://gavunwud.xyz",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://gavunwud.xyz/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }} />
      <div id="hero"><HeroSection /></div>
      <div id="whatIsWud"><WhatIsWud /></div>
      <div id="flappyWud"><FlappyWudSection /></div>
      <div id="gavunAi"><GavunAiSection /></div>
      <div id="wudUniverse"><WudUniverseSection /></div>
      <div id="tokenomics"><TokenomicsSection /></div>
      <div id="nft"><NftSection /></div>
      <div id="tutorials"><VideoTutorialsSection /></div>
      <div id="partners"><PartnersSection /></div>
      {/* <div id="community"><CommunitySection /></div> */}
      <div id="faq"><FaqSection /></div>
      <FloatingCta />
      <Footer />
    </main>
  )
}