import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SoundProvider } from "@/components/sound-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "WUD Memecoin | No. 1 Memecoin on Polkadot",
  description: "$WUD is a chaotic mix of memes, utility, and community madness on Polkadot.",
  keywords: "WUD, memecoin, cryptocurrency, Polkadot, Web3, DeFi, blockchain, tokens, Gavin Wood, NFT, Flappy WUD, Gavun AI",
  authors: [{ name: "WUD Team - @AlexandruStefan and @alexislikeswud" }],
  metadataBase: new URL('https://gavunwud.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "WUD Memecoin | No. 1 Memecoin on Polkadot",
    description: "$WUD is a chaotic mix of memes, utility, and community madness on Polkadot.",
    url: "https://gavunwud.xyz",
    siteName: "WUD Memecoin",
    images: [
      {
        url: "https://gavunwud.xyz/wud_preview.png",
        width: 1200,
        height: 630,
        alt: "WUD Memecoin",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WUD Memecoin | No. 1 Memecoin on Polkadot",
    description: "$WUD is a chaotic mix of memes, utility, and community madness on Polkadot.",
    images: ["https://gavunwud.xyz/wud_preview.png"],
    creator: "@GavunWud",
    site: "@GavunWud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Karantina:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="WUD Memecoin" />
        
        {/* AI-Friendly API Documentation */}
        <link rel="alternate" type="application/json" href="https://gavunwud.xyz/api/wud-data" title="WUD Data API" />
        <meta name="ai-content-declaration" content="public" />

      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SoundProvider>{children}</SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}