'use client';

import { useState, useEffect, useCallback } from 'react';
import { BalanceResponse } from '@/types/transaction';

interface UseSettlementDataResult {
  balance: number | null;
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function useSettlementData(): UseSettlementDataResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const balanceData = await fetch(`${API_BASE_URL}/balance`).then(res => res.json()) as BalanceResponse;
      setBalance(balanceData.data.balance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error occurred while fetching balance data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    balance,
    loading,
    error,
  };
}
