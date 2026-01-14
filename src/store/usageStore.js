/**
 * Usage Store Logic
 * Manages Free Tier vs Premium Enterprise status.
 * Uses LocalStorage to persist data (prevents refresh bypass).
 */

import { useState, useEffect } from 'react';
import { FREE_LIMIT } from '../utils/constants';

export const useUsageStore = () => {
  // 1. Initialize State from LocalStorage (or default to 0)
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('ppi_usage');
    return saved ? parseInt(saved, 10) : 0;
  });

  // 2. Check Premium Status
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('ppi_status') === 'premium';
  });

  // 3. Sync with LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ppi_usage', count.toString());
  }, [count]);

  useEffect(() => {
    if (isPremium) {
      localStorage.setItem('ppi_status', 'premium');
    }
  }, [isPremium]);

  // 4. Core Logic: Check if user can chat
  const incrementUsage = () => {
    if (isPremium) return true; // Unlimited for premium

    if (count < FREE_LIMIT) {
      setCount((prev) => prev + 1);
      return true; // Allowed
    }

    return false; // Blocked (Show Paywall)
  };

  // 5. Upgrade Action (Call this when payment succeeds)
  const upgradeToPremium = () => {
    setIsPremium(true);
    // Optional: Reset count or keep it for analytics
    console.log("System Upgraded to Enterprise Plan");
  };

  // 6. Reset (Useful for Demo/Testing)
  const resetUsage = () => {
    setCount(0);
    setIsPremium(false);
    localStorage.removeItem('ppi_usage');
    localStorage.removeItem('ppi_status');
    window.location.reload();
  };

  return {
    count,
    remaining: isPremium ? 'Unlimited' : Math.max(0, FREE_LIMIT - count),
    isPremium,
    limit: FREE_LIMIT,
    incrementUsage,
    upgradeToPremium,
    resetUsage
  };
};
