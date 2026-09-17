import { useState, useEffect } from 'react';

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

type HolderDistribution = {
  tiers: HolderTier[];
  specialAddresses: SpecialAddress[];
  lastUpdated: string;
};

export function useHolderDistribution() {
  const [distribution, setDistribution] = useState<HolderDistribution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchDistribution() {
      try {
        setLoading(true);
        const response = await fetch('/api/dune/holders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch holder distribution');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setDistribution(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDistribution();

    return () => {
      isMounted = false;
    };
  }, []);

  return { distribution, loading, error };
}
