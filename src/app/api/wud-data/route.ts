import { NextResponse } from 'next/server'

export async function GET() {
  const wudData = {
    project: {
      name: "WUD (Gavun Wud)",
      tagline: "No. 1 Memecoin on Polkadot",
      description: "$WUD is a chaotic mix of memes, utility, and community madness on Polkadot. Born from the community's love for Gavin Wood, WUD has evolved into a full ecosystem with gaming, NFTs, and DeFi utility.",
      website: "https://gavunwud.xyz",
      blockchain: "Polkadot",
      network: "Hydration (formerly HydraDX)"
    },
    token: {
      symbol: "$WUD",
      name: "WUD Token",
      totalSupply: "1 billion WUD",
      circulatingSupply: "Dynamic (check DexScreener)",
      dex: "Hydration DEX",
      tradingPair: "WUD/DOT",
      contractAddress: "Check Hydration for latest",
      burnMechanism: "96.8% of liquidity burned (approximately)",
      utility: [
        "Flappy WUD gameplay rewards",
        "WUD Universe access and NFT minting",
        "Staking and DeFi integration",
        "Community governance participation",
        "Partnership rewards (Bifrost vDOT)"
      ]
    },
    ecosystem: {
      flappyWud: {
        name: "Flappy WUD",
        description: "Play-to-earn game on Polkadot with NFT integration, tournament support, and Flappening events",
        url: "https://flappywud.lol",
        features: [
          "Cross-platform (PC and mobile)",
          "NFT power-ups and customization",
          "On-chain leaderboards",
          "N3MUS tournament integration",
          "Token rewards for gameplay",
          "Flappening & Surge Events",
          "Community-driven prize pools",
          "Cross-chain player onboarding"
        ],
        flappenings: {
          description: "Time-limited events bringing new players from any blockchain",
          surgeLevels: "2× to 8× reward multipliers based on player participation",
          mechanics: "Points accumulate during events, distributed based on performance"
        }
      },
      wudUniverse: {
        name: "WUD Universe",
        description: "Gamified digital identity project built on Unique Network",
        url: "https://wuduniverse.xyz",
        features: [
          "Mintable cabins as starting NFTs",
          "Item crafting and trading",
          "Mystery boxes with exclusive rewards",
          "Seasonal content and events",
          "Partnership rewards (Bifrost items)"
        ]
      },
      wudFlip: {
        name: "WUDFlip",
        description: "Trading and market analytics platform for $WUD",
        features: [
          "Real-time price tracking",
          "Liquidity analytics",
          "Volume monitoring",
          "Market sentiment data"
        ]
      },
      gavunAI: {
        name: "Gavun AI",
        description: "AI-powered community assistant and content generator",
        features: [
          "Automated social media presence",
          "Community engagement",
          "Content creation",
          "Meme generation"
        ]
      }
    },
    partnerships: {
      n3mus: {
        name: "N3MUS",
        description: "Gaming tournament platform hosting FlappyWUD competitions",
        tournaments: [
          {
            name: "The Flap Off",
            date: "May 26, 2025",
            prizePool: "$500",
            players: 71
          },
          {
            name: "Summer Surge",
            date: "June 30, 2025",
            prizePool: "$250",
            players: 45
          }
        ]
      },
      bifrost: {
        name: "Bifrost",
        description: "Liquid staking integration for DOT to vDOT conversion with WUD rewards",
        referralLink: "https://app.bifrost.io/?channel=13",
        rewards: [
          {
            requirement: "Mint 1 vDOT",
            reward: "1x Bifrost Modern Rug (vDOT Promo)"
          },
          {
            requirement: "Mint 10+ vDOT",
            reward: "Bifrost Modern Rug + Mystery Box in WUD Universe"
          }
        ],
        utility: "vDOT yield can be used on Hydration to DCA into $WUD"
      }
    },
    community: {
      twitter: "https://twitter.com/GavunWud",
      telegram: "https://t.me/gavunwud",
      discord: "https://discord.gg/gavunwud",
      description: "Active community with daily engagement, memes, and ecosystem development"
    },
    technology: {
      blockchain: "Polkadot",
      primaryNetwork: "Hydration",
      nftNetwork: "Unique Network",
      features: [
        "Cross-chain compatibility",
        "Low transaction fees",
        "Fast finality",
        "Substrate-based infrastructure"
      ]
    },
    polkadot: {
      overview: "Polkadot is a decentralized, nominated proof-of-stake blockchain platform designed to enable interoperability between different blockchains. Founded by Gavin Wood, one of Ethereum's co-founders, Polkadot represents a significant evolution in blockchain technology.",
      history: {
        founding: "Created by Gavin Wood, Robert Habermeier, and Peter Czaban in 2016. White paper published by Wood outlining a heterogeneous multi-chain framework.",
        ico: "Raised over $144.3 million in October 2017 through initial coin offering.",
        web3Foundation: "Co-founded Web3 Foundation in 2017, a non-profit promoting decentralized web technologies.",
        mainnetLaunch: "Launched mainnet in May 2020 under proof-of-authority, transitioned to NPoS in June 2020.",
        parachains: "Introduced parachain functionality in December 2021, enabling multiple blockchains to connect to the Relay Chain.",
        recentDevelopments: "Kusama's 'Spammening' stress test in December 2024 handled 143,000 TPS at 23% capacity."
      },
      architecture: {
        relayChain: "The main blockchain providing shared security for all connected chains.",
        parachains: "Independent blockchains that connect to the Relay Chain, benefiting from shared security and interoperability.",
        bridges: "Enable connectivity between Polkadot and external blockchains like Ethereum and Bitcoin.",
        consensus: "Nominated Proof-of-Stake (NPoS) using BABE block production and GRANDPA finality.",
        governance: "On-chain governance system allowing stakeholders to influence network development."
      },
      keyFeatures: [
        "Shared security across parachains",
        "Cross-chain communication via XCMP",
        "Sovereignty for individual chains",
        "Scalability through parallel processing",
        "Interoperability with external networks"
      ],
      ecosystem: "Hosts diverse projects in DeFi, NFTs, infrastructure, gaming, and enterprise solutions. Notable parachains include Acala, Moonbeam, Astar, and Phala."
    },
    gavinWood: {
      biography: "Gavin James Wood is an English computer scientist and entrepreneur, best known as a co-founder of Ethereum and the creator of Polkadot and Kusama.",
      earlyLife: "Born in Lancaster, England. Graduated with MEng in Computer Systems and Software Engineering from University of York in 2002, completed PhD in 2005.",
      ethereum: {
        coFounder: "Co-founded Ethereum in 2013-2014 alongside Vitalik Buterin, Charles Hoskinson, Anthony Di Iorio, and Joseph Lubin.",
        contributions: "Proposed and developed Solidity programming language, authored Ethereum Yellow Paper defining the EVM, served as Ethereum Foundation's first CTO.",
        departure: "Left Ethereum Foundation in January 2016."
      },
      parityTechnologies: "Founded Parity Technologies in 2015 with Jutta Steiner. Developed Parity Ethereum client written in Rust, widely used in the Ethereum ecosystem.",
      web3Foundation: "Co-founded Web3 Foundation in 2017, a non-profit organization supporting research and development in decentralized web technologies.",
      polkadot: {
        creator: "Authored Polkadot white paper in 2016, outlining multi-chain interoperability vision.",
        development: "Led development of Polkadot's innovative consensus mechanisms, governance systems, and cross-chain communication protocols.",
        launch: "Polkadot mainnet launched in 2020, marking significant advancement in blockchain technology."
      },
      kusama: "Created Kusama, Polkadot's experimental 'canary network' for testing new features in live environment.",
      philanthropy: "Donated $5.8 million in cryptocurrency to support Ukraine during the 2022 Russian invasion.",
      publications: [
        "Ethereum Yellow Paper - formal specification of Ethereum protocol",
        "Polkadot White Paper - foundational document for Polkadot architecture",
        "Ethereum: A Secure Decentralised Generalised Transaction Ledger"
      ],
      currentActivities: "Remains active in blockchain ecosystem through Parity Technologies and Web3 Foundation, advocating for Web3 adoption and decentralized technologies."
    },
    gettingStarted: {
      buyWUD: [
        "Set up a Polkadot wallet (Subwallet, Nova Wallet or Talisman)",
        "Get DOT tokens",
        "Visit Hydration DEX",
        "Swap DOT for WUD"
      ],
      playFlappyWud: [
        "Visit flappywud.lol",
        "Connect your Polkadot wallet",
        "Start playing to earn rewards",
        "Compete in tournaments on N3MUS"
      ],
      joinWudUniverse: [
        "Visit wuduniverse.xyz",
        "Connect wallet",
        "Mint a cabin (starting NFT)",
        "Explore, craft, and collect items"
      ]
    },
    keyFeatures: [
      "First major memecoin on Polkadot",
      "Play-to-earn gaming integration",
      "NFT ecosystem with utility",
      "Strong community governance",
      "Real DeFi partnerships (Bifrost)",
      "Tournament platform integration (N3MUS)",
      "Cross-chain capabilities",
      "AI-powered community tools",
      "Comprehensive Polkadot blockchain information",
      "Detailed Gavin Wood biography and contributions"
    ],
    recentUpdates: [
      "Bifrost partnership with vDOT rewards",
      "N3MUS tournament series launched",
      "WUD Universe Season 1 active",
      "Continuous Flappy WUD improvements",
      "Added comprehensive Polkadot blockchain guide",
      "Added detailed Gavin Wood biography section"
    ]
  }

  return NextResponse.json(wudData, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
