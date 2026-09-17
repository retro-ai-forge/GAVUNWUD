import { Metadata } from 'next'
import { WikiContent } from '@/components/wiki-content'

export const metadata: Metadata = {
  title: 'Wiki | WUD Memecoin - Complete Guide to $WUD Ecosystem',
  description: 'Comprehensive wiki covering WUD token, Flappy WUD game, WUD Universe, partnerships, tokenomics, and the complete Polkadot memecoin ecosystem.',
  keywords: 'WUD wiki, WUD documentation, Flappy WUD guide, WUD Universe, WUD tokenomics, Polkadot memecoin guide, Bifrost partnership, N3MUS tournaments',
  openGraph: {
    title: 'Wiki | WUD Memecoin - Complete Guide',
    description: 'Everything you need to know about $WUD, Flappy WUD, WUD Universe, and the WUD ecosystem on Polkadot.',
    url: 'https://gavunwud.xyz/wiki',
    siteName: 'WUD Memecoin',
    images: [
      {
        url: 'https://gavunwud.xyz/wud_preview.png',
        width: 1200,
        height: 630,
        alt: 'WUD Wiki',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wiki | WUD Memecoin',
    description: 'Complete guide to the WUD ecosystem on Polkadot',
    images: ['https://gavunwud.xyz/wud_preview.png'],
  },
}

export default function WikiPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <WikiContent />
    </main>
  )
}