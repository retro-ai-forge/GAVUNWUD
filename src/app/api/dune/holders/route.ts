import { NextResponse } from 'next/server';

// Define types for our data
type HolderTier = {
  tier: string;
  holderCount: number;
  holderPercentage: number;
  balance: number;
  supplyPercentage: number;
};

type SpecialAddress = {
  name: string;
  address: string;
  balance: number;
  supplyPercentage: number;
};

type CachedData = {
  tiers: HolderTier[];
  specialAddresses: SpecialAddress[];
  lastUpdated: string;
};

interface SubscanAsset {
  unique_id: string;
  balance: string;
  decimals: number;
}

interface DuneRow {
  tier: string;
  balance_sum: string;
  balance_sum_percentage: string;
  address_count: number;
  address_count_percentage: string;
}

const CACHE: {
  data: CachedData | null;
  lastUpdated: number;
} = {
  data: null,
  lastUpdated: 0
};

const CACHE_TTL = 6 * 60 * 60 * 1000; 

// Special addresses to track separately
const SPECIAL_ADDRESSES = [
  { name: "WUD LP", address: "7MnTh8N7p88jQURyvvvh5pZiV6DAMz8rywUokYqBmtHKw8AQ" },
  { name: "OG Dev Burn", address: "7LqVTFRP67f9P8jAQebpmeLRMgzKR1QQm2EMpjYDFagE2eGE" },
  { name: "Zeitgeist Treasury", address: "7LKyh69Xse5gC3ZgchJ95yFbMqm1K36EwEiJNvAjkdPoAoR5" },
  { name: "WUD Treasury", address: "7He7Gpyd6PooZoS2R4RxZTbcQ1uYy7vjyjDx5wEhZ23yJRWg" },
];

const wudUniqueId = "asset_registry/f68a68d6f6c10a5f66173d06e15cd6306da2c024";

const TOTAL_SUPPLY = 1_000_000_000_000;

class DuneClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getLatestResult({ queryId }: { queryId: number }) {
    const response = await fetch(`https://api.dune.com/api/v1/query/${queryId}/results`, {
      headers: {
        'x-dune-api-key': this.apiKey
      }
    });
    
    if (!response.ok) {
      throw new Error(`Dune API error: ${response.status}`);
    }
    
    return response.json();
  }
}

class SubscanClient {
  private apiKey: string;
  private wudUniqueId: string;
  
  constructor(apiKey: string, wudUniqueId: string) {
    this.apiKey = apiKey;
    this.wudUniqueId = wudUniqueId;
  }
  
  async getTokenBalance(address: string) {
    const response = await fetch('https://hydration.api.subscan.io/api/scan/account/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({
        address, 
      })
    });
    
    if (!response.ok) {
      throw new Error(`Subscan API error: ${response.status} for address ${address}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(`Subscan API error: ${data.message}`);
    }
    
    const builtinAssets = data.data?.builtin || [];
    const wudAsset = builtinAssets.find((asset: SubscanAsset) => asset.unique_id === this.wudUniqueId);
    
    if (!wudAsset) {
      return 0;
    }
    
    const balance = Number(wudAsset.balance) / Math.pow(10, Number(wudAsset.decimals));
    return balance;
  }
  
  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async getTokenBalancesWithRateLimit(addresses: string[], delayMs = 1000) {
    const results: Record<string, number> = {};
    
    for (const address of addresses) {
      try {
        const balance = await this.getTokenBalance(address);
        results[address] = balance;
        
        if (address !== addresses[addresses.length - 1]) {
          await this.sleep(delayMs);
        }
      } catch (error) {
        console.error(`Error fetching balance for ${address}:`, error);
        results[address] = 0; 
      }
    }
    
    return results;
  }
}

export async function GET() {
  try {
    const currentTime = Date.now();
    
    if (CACHE.data && (currentTime - CACHE.lastUpdated < CACHE_TTL)) {
      return NextResponse.json(CACHE.data);
    }

    // Fetch data from APIs
    const DUNE_API_KEY = process.env.DUNE_API_KEY;
    const SUBSCAN_API_KEY = process.env.SUBSCAN_API_KEY;
    
    if (!DUNE_API_KEY || !SUBSCAN_API_KEY) {
      throw new Error('API keys not configured');
    }

    const dune = new DuneClient(DUNE_API_KEY);
    const subscan = new SubscanClient(SUBSCAN_API_KEY, wudUniqueId);
    
    // Fetch holder data from Dune
    const { result: resultResult } = await dune.getLatestResult({
      queryId: 4470929
    });

    // Fetch special addresses balances
    const addressList = SPECIAL_ADDRESSES.map(addr => addr.address);
    const balanceMap = await subscan.getTokenBalancesWithRateLimit(addressList, 1000);
    
    // Process special addresses with percentages
    const specialAddressesWithBalances = SPECIAL_ADDRESSES.map(address => {
      const balance = balanceMap[address.address] || 0;
      const supplyPercentage = (balance / TOTAL_SUPPLY) * 100;
      
      return {
        ...address,
        balance,
        supplyPercentage
      };
    });
    
    // Categorize special addresses by tier
    const specialAddressByTier: Record<string, number> = {
      whale: 0,
      dolphin: 0,
      fish: 0,
      shrimp: 0
    };
    
    specialAddressesWithBalances.forEach(address => {
      const percentage = address.supplyPercentage;
      
      if (percentage >= 1) {
        specialAddressByTier.whale += address.balance;
      } else if (percentage >= 0.1) {
        specialAddressByTier.dolphin += address.balance;
      } else if (percentage >= 0.01) {
        specialAddressByTier.fish += address.balance;
      } else {
        specialAddressByTier.shrimp += address.balance;
      }
    });
    
    // Calculate tier percentages of special addresses
    const specialTierPercentages = {
      whale: (specialAddressByTier.whale / TOTAL_SUPPLY) * 100,
      dolphin: (specialAddressByTier.dolphin / TOTAL_SUPPLY) * 100,
      fish: (specialAddressByTier.fish / TOTAL_SUPPLY) * 100,
      shrimp: (specialAddressByTier.shrimp / TOTAL_SUPPLY) * 100
    };
    
    
    // Process the Dune data and adjust based on special addresses
    const tiers = resultResult.rows.map((row: DuneRow) => {
      const tierName = row.tier.toLowerCase();
      const tierBalance = Number(row.balance_sum) / 1e9;
      const tierPercentage = Number(row.balance_sum_percentage);
      
      // Determine which special address tier to subtract based on the Dune tier name
      let specialBalanceToSubtract = 0;
      let specialPercentageToSubtract = 0;
      
      if (tierName.includes('whale')) {
        specialBalanceToSubtract = specialAddressByTier.whale;
        specialPercentageToSubtract = specialTierPercentages.whale;
      } else if (tierName.includes('dolphin')) {
        specialBalanceToSubtract = specialAddressByTier.dolphin;
        specialPercentageToSubtract = specialTierPercentages.dolphin;
      } else if (tierName.includes('fish')) {
        specialBalanceToSubtract = specialAddressByTier.fish;
        specialPercentageToSubtract = specialTierPercentages.fish;
      } else if (tierName.includes('shrimp')) {
        specialBalanceToSubtract = specialAddressByTier.shrimp;
        specialPercentageToSubtract = specialTierPercentages.shrimp;
      }
      
      // Adjust the tier balance and percentage
      const adjustedBalance = Math.max(0, tierBalance - specialBalanceToSubtract);
      const adjustedPercentage = Math.max(0, tierPercentage - specialPercentageToSubtract);
      
      return {
        tier: row.tier,
        holderCount: row.address_count,
        holderPercentage: Number(row.address_count_percentage),
        balance: adjustedBalance,
        supplyPercentage: adjustedPercentage
      };
    });

    const processedData: CachedData = {
      tiers,
      specialAddresses: specialAddressesWithBalances,
      lastUpdated: new Date().toISOString()
    };

    // Update cache
    CACHE.data = processedData;
    CACHE.lastUpdated = currentTime;

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch holder distribution' },
      { status: 500 }
    );
  }
}
