import { Scraper, SearchMode, Tweet, Profile } from "agent-twitter-client";

let scraper: Scraper | null = null;
let isInitialized = false;

// Cache system
type TwitterCache = {
  data: TwitterData | null;
  timestamp: number;
};

let twitterCache: TwitterCache = {
  data: null,
  timestamp: 0
};

// Cache duration - 6 hours in milliseconds
const CACHE_DURATION = 6 * 60 * 60 * 1000;

export type EnhancedTweet = Tweet & {
  authorAvatar?: string;
};

export type TwitterData = {
  tweets?: Tweet[];
  followerCount?: number;
  tweetUserAvatars?: Record<string, string>; 
  error?: string;
};

type ExtendedProfile = Profile & {
  followers_count?: number;
  follower_count?: number;
};

// Initialize the scraper if needed
export async function getScraperInstance(): Promise<Scraper | null> {
  if (scraper && isInitialized) {
    return scraper;
  }

  const twitterUsername = process.env.TWITTER_USERNAME;
  const twitterPassword = process.env.TWITTER_PASSWORD;
  const twitterEmail = process.env.TWITTER_EMAIL;

  if (!twitterUsername || !twitterPassword) {
    console.error("Twitter credentials are not set");
    return null;
  }

  try {
    scraper = new Scraper();
    console.log("Attempting Twitter login...");
    await scraper.login(twitterUsername, twitterPassword, twitterEmail);
    const loggedIn = await scraper.isLoggedIn();
    
    if (loggedIn) {
      console.log("Successfully logged in to Twitter");
      isInitialized = true;
      return scraper;
    } else {
      console.error("Failed to log in to Twitter");
      return null;
    }
  } catch (error) {
    console.error("Error initializing Twitter scraper:", error);
    return null;
  }
}


export async function fetchTwitterData(handle: string = "gavunwud"): Promise<TwitterData> {
  const currentTime = Date.now();
  
  // Check if cache is valid
  if (
    twitterCache.data && 
    twitterCache.timestamp > 0 && 
    currentTime - twitterCache.timestamp < CACHE_DURATION
  ) {
    console.log("Using cached Twitter data");
    return twitterCache.data;
  }
  
  console.log("Cache expired or not set, fetching fresh Twitter data");
  
  try {
    const twitterScraper = await getScraperInstance();
    
    if (!twitterScraper) {
      return { error: "Failed to initialize Twitter client" };
    }

    const mentioningTweets: Tweet[] = [];
    const searchResultsGenerator = twitterScraper.searchTweets(
      '"$WUD"',
      10, 
      SearchMode.Top
    );

    for await (const tweet of searchResultsGenerator) {
      if (tweet) {
        mentioningTweets.push(tweet);
      }
      if (mentioningTweets.length >= 6) { 
          break;
      }
    }

    let followerCount: number | undefined = undefined;
    
    try {
      const profile: ExtendedProfile = await twitterScraper.getProfile(handle);
      if (profile && typeof profile.followersCount === 'number') {
        followerCount = profile.followersCount;
      } else {
        console.warn("Could not find 'followersCount' (or it's not a number) in profile object:", profile);
        if (profile && typeof profile.followers_count === 'number') {
            followerCount = profile.followers_count;
        } else if (profile && typeof profile.follower_count === 'number') {
            followerCount = profile.follower_count;
        }
      }
      console.log(`Follower count for ${handle}: ${followerCount}`);
    } catch (profileError) {
      console.error(`Error fetching profile for ${handle}:`, profileError);
    }

    const tweetUserAvatars: Record<string, string> = {};
    const uniqueUsernames = [...new Set(mentioningTweets.map(tweet => tweet.username).filter(Boolean))];
    
    for (const username of uniqueUsernames) {
      if (!username) continue;
      try {
        
        const userProfile = await twitterScraper.getProfile(username);
        if (userProfile) {
          if (userProfile.avatar) {
            tweetUserAvatars[username] = userProfile.avatar;
          }
        }
      } catch (error) {
        console.error(`Error fetching profile for ${username}:`, error);
      }
    }

    const result = { 
      tweets: mentioningTweets, 
      followerCount,
      tweetUserAvatars
    };
    
    // Update cache
    twitterCache = {
      data: result,
      timestamp: currentTime
    };
    
    return result;
  } catch (error: unknown) {
    console.error("Error fetching Twitter data:", error);
    
    if (scraper && isInitialized) {
      try {
        await scraper.logout();
        console.log("Logged out due to error.");
        isInitialized = false;
      } catch (logoutError) {
        console.error("Error during logout after an error:", logoutError);
      }
    }
    
    return { error: error instanceof Error ? error.message : "Failed to fetch Twitter data" };
  }
}

export async function cleanupTwitterResources() {
  if (scraper && isInitialized) {
    try {
      await scraper.logout();
      console.log("Twitter scraper logged out successfully");
      isInitialized = false;
      scraper = null;
    } catch (error) {
      console.error("Error logging out Twitter scraper:", error);
    }
  }
}
