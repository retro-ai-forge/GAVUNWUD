"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

type TwitterTweet = {
  id: string;
  username: string;
  name: string;
  text: string;
  photos?: Array<{ id: string; url: string }>;
  likes: number;
  retweets: number;
  replies: number;
  bookmarkCount: number;
  permanentUrl: string;
  timestamp: number;
  timeParsed: string;
}

type TwitterDataState = {
  tweets: TwitterTweet[];
  followerCount: number;
  discordMemberCount: number;
  telegramMemberCount: number;
  tweetUserAvatars?: Record<string, string>;
  isLoading: boolean;
  error: string | null;
}

type CommunityStat = {
  icon: string;
  count: number | string;
  label: string;
}

export default function CommunitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  // Initialize state with proper typing
  const [twitterData, setTwitterData] = useState<TwitterDataState>({
    tweets: [],
    followerCount: 0,
    discordMemberCount: 0,
    telegramMemberCount: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const twitterResponse = await fetch('/api/twitter-data')
        const twitterData = await twitterResponse.json()
        
        const communityResponse = await fetch('/api/community-stats')
        const communityData = await communityResponse.json()
        
        if (twitterData.error) {
          setTwitterData(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: twitterData.error 
          }))
          return
        }
        
        setTwitterData({
          tweets: twitterData.tweets || [],
          followerCount: twitterData.followerCount || 0,
          tweetUserAvatars: twitterData.tweetUserAvatars || {},
          discordMemberCount: (communityData?.discord?.memberCount) || 0,
          telegramMemberCount: (communityData?.telegram?.memberCount) || 0,
          isLoading: false,
          error: null
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        setTwitterData(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: "Failed to load data" 
        }))
      }
    }

    fetchData()
  }, [])

  const fallbackTweets = [
    {
      id: 1,
      username: "CryptoMemer",
      handle: "@cryptomemer",
      avatar: "/images/gavun-wud-black.png",
      content: "Just aped into $WUD and I'm already up 69%! This is the memecoin Polkadot deserves! 🚀🚀🚀",
      likes: 420,
      retweets: 69,
      replies: 24,
      date: "2024-01-01",
      hasImage: false,
      imageUrl: null,
    },
    {
      id: 2,
      username: "PolkadotMaxi",
      handle: "@dotmaxi",
      avatar: "/images/gavun-wud-black.png",
      content:
        "FlappyWUD is actually addictive. I've spent more time playing it than checking my portfolio today. Bullish on $WUD!",
      likes: 223,
      retweets: 42,
      replies: 12,
      date: "2024-01-01",
      hasImage: false,
      imageUrl: null,
    },
    {
      id: 3,
      username: "DeFiQueen",
      handle: "@defiqueen",
      avatar: "/images/gavun-wud-black.png",
      content:
        "The Gavun AI bot just roasted me for buying high and selling low. I've never been so entertained while losing money. $WUD is different.",
      likes: 512,
      retweets: 128,
      replies: 38,
      date: "2024-01-01",
      hasImage: false,
      imageUrl: null,
    },
    {
      id: 4,
      username: "AltcoinAnalyst",
      handle: "@altanalyst",
      avatar: "/images/gavun-wud-black.png",
      content: "My technical analysis shows $WUD forming a perfect meme pattern. Looking for a 10x from here within days.",
      likes: 387,
      retweets: 93,
      replies: 42,
      date: "2024-01-01",
      hasImage: false,
      imageUrl: null,
    },
    {
      id: 5,
      username: "DotEcosystem",
      handle: "@doteco",
      avatar: "/images/gavun-wud-black.png",
      content: "Can't believe how strong the $WUD community is. Most active Telegram I've seen in months!",
      likes: 198,
      retweets: 31,
      replies: 14,
      date: "2024-01-01",
      hasImage: false,
      imageUrl: null,
    },
    {
      id: 6,
      username: "MemeInvestor",
      handle: "@memeinvest",
      avatar: "/images/gavun-wud-black.png",
      content: "I've analyzed every Polkadot meme coin and $WUD has the best community, team transparency and dApp utility by far.",
      likes: 302,
      retweets: 57,
      replies: 21,
      date: "2024-01-01",
      hasImage: false,
      imageUrl: null,
    },
  ]

  const getRandomAvatar = () => {
    return "/images/gavun-wud-black.png";
  }

  const formatTweetDate = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  const tweetsToDisplay = twitterData.error || twitterData.isLoading || twitterData.tweets.length === 0 
    ? fallbackTweets 
    : twitterData.tweets.slice(0, 6).map(tweet => ({
        id: tweet.id,
        username: tweet.name || "Twitter User",
        handle: `@${tweet.username}`,
        avatar: tweet.username && twitterData.tweetUserAvatars?.[tweet.username] 
          ? twitterData.tweetUserAvatars[tweet.username]
          : tweet.photos && tweet.photos.length > 0 
            ? tweet.photos[0].url 
            : getRandomAvatar(),
        content: tweet.text || "",
        likes: tweet.likes || 0,
        retweets: tweet.retweets || 0,
        replies: tweet.replies || 0,
        tweetUrl: tweet.permanentUrl,
        date: formatTweetDate(tweet.timeParsed),
        hasImage: tweet.photos && tweet.photos.length > 0,
        imageUrl: tweet.photos && tweet.photos.length > 0 ? tweet.photos[0].url : null,
      }))

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M'
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    } else {
      return count.toString()
    }
  }

  const formatMetric = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M'
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    } else {
      return count.toString()
    }
  }

  const communityStats: CommunityStat[] = [
    {
      icon: "twitter",
      count: twitterData.followerCount ? formatFollowerCount(twitterData.followerCount) : '42K',
      label: "X Followers"
    },
    {
      icon: "message-circle",
      count: twitterData.telegramMemberCount ? formatFollowerCount(twitterData.telegramMemberCount) : "25.3K",
      label: "Telegram Members"
    },
    {
      icon: "message-square",
      count: twitterData.discordMemberCount ? formatFollowerCount(twitterData.discordMemberCount) : "18.7K",
      label: "Discord Members"
    }
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
            Community <span className="text-[#ff2e70]">Vibes</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the fastest growing community in the Polkadot ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {communityStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#ff2e70] transition-all duration-300 flex items-center space-x-4"
            >
              <div className="bg-[#ff2e70]/20 rounded-full p-3 flex-shrink-0">
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
                  className="text-[#ff2e70]"
                >
                  {stat.icon === "twitter" && (
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  )}
                  {stat.icon === "message-circle" && (
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  )}
                  {stat.icon === "message-square" && (
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  )}
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-2xl">{stat.count}</h4>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12 bg-black/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            WUD is a gateway into Web3. Our community is here to help anyone, from crypto-curious newcomers to full-on degens, learn the ropes while having fun.
            We believe the best way to understand Web3 is by doing: playing games, claiming airdrops, minting NFTs, and asking real questions in a space that welcomes curiosity. No gatekeeping. No pressure. Just vibes and learning by doing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-['Karantina',sans-serif]">
            What <span className="text-[#ff2e70]">People</span> Are Saying
          </h3>
          <div className="h-1 w-16 bg-[#ff2e70] mx-auto mt-3"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {tweetsToDisplay.slice(0, 3).map((tweet, index) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#ff2e70] transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={tweet.avatar || "/images/avatar-1.png"}
                      alt={tweet.username}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{tweet.username}</span>
                        <span className="text-gray-400 text-sm">{tweet.handle}</span>
                      </div>
                      {tweet.date && (
                        <span className="text-gray-400 text-xs">{tweet.date}</span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-200">{tweet.content}</p>
                    
                    {tweet.hasImage && tweet.imageUrl && (
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <Image
                          src={tweet.imageUrl}
                          alt="Tweet image"
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-[#ff2e70] transition-colors duration-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{formatMetric(tweet.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-[#ff2e70] transition-colors duration-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 1l4 4-4 4" />
                          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                          <path d="M7 23l-4-4 4-4" />
                          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                        <span>{formatMetric(tweet.retweets)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-[#ff2e70] transition-colors duration-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{formatMetric(tweet.replies)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {tweetsToDisplay.slice(3, 6).map((tweet, index) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#ff2e70] transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={tweet.avatar || "/images/avatar-1.png"}
                      alt={tweet.username}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{tweet.username}</span>
                        <span className="text-gray-400 text-sm">{tweet.handle}</span>
                      </div>
                      {tweet.date && (
                        <span className="text-gray-400 text-xs">{tweet.date}</span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-200">{tweet.content}</p>
                    
                    {tweet.hasImage && tweet.imageUrl && (
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <Image
                          src={tweet.imageUrl}
                          alt="Tweet image"
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-[#ff2e70] transition-colors duration-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{formatMetric(tweet.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-[#ff2e70] transition-colors duration-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 1l4 4-4 4" />
                          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                          <path d="M7 23l-4-4 4-4" />
                          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                        <span>{formatMetric(tweet.retweets)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-[#ff2e70] transition-colors duration-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{formatMetric(tweet.replies)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  )
}
