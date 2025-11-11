'use client';

import { useState, useEffect, useCallback } from 'react';
import { BalanceResponse, IssuesResponse, Transaction } from '@/types/transaction';

interface UseSettlementDataResult {
  balance: number | null;
  issues: Transaction[];
  loading: boolean;
  refetch: () => void;
  error: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function useSettlementData(): UseSettlementDataResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [issues, setIssues] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [balanceResponse, issuesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/balance`),
        fetch(`${API_BASE_URL}/issues?page1&limit=10`),
      ]);

      const balanceData = await balanceResponse.json() as BalanceResponse;
      const issuesData = await issuesResponse.json() as IssuesResponse;

      setBalance(balanceData.data.balance);
      setIssues(issuesData.data.items || []);
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
    issues,
    loading,
    refetch: fetchData,
    error,
  };
}
