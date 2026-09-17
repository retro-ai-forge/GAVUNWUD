"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { name: "Telegram", url: "https://t.me/gavunwud", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )},
    { name: "Twitter", url: "https://twitter.com/gavunwud", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    )},
    { name: "Discord", url: "https://discord.gg/4GE46uduFs", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )},
  ]
  
  const quickLinks = [
    { name: "Home", url: "#hero" },
    { name: "About", url: "#whatIsWud" },
    { name: "Flappy Wud", url: "#flappyWud" },
    { name: "Gavun AI", url: "#gavunAi" },
    { name: "Tokenomics", url: "#tokenomics" },
    { name: "NFTs", url: "#nft" },
  ]

  return (
    <footer className="bg-black py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image 
                  src="/images/gavun-wud-black.png" 
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
            <div className="relative h-6 w-28">
              <Image 
                src="/images/powered-by-polkadot.webp" 
                alt="Powered by Polkadot" 
                fill 
                className="object-contain" 
              />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              $WUD is a chaotic mix of memes, utility, and community madness on Polkadot.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-center md:text-left">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-[#ff2e70] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social and CTA */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-[#ff2e70] text-white p-3 rounded-full transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <Button
              className="bg-[#ff2e70] hover:bg-[#ff2e70]/80 text-white font-bold w-full md:w-auto"
              onClick={() => window.open('https://app.hydration.net/trade/swap?assetIn=5&assetOut=1000085', '_blank')}
            >
              BUY $WUD
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Gavun WUD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 