'use client';

import { useState, useEffect, useCallback } from 'react';
import { BalanceResponse, IssuesResponse } from '@/types/transaction';

interface UseSettlementDataResult {
  balance: number | null;
  issues: IssuesResponse['data'];
  loading: boolean;
  refetchIssues: (page?: number, limit?: number) => void;
  refetchBalance: () => void;
  error: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function useSettlementData(): UseSettlementDataResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [issues, setIssues] = useState<IssuesResponse['data']>({
    items: [],
    pagination: {
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const balanceResponse = await fetch(`${API_BASE_URL}/balance`).then(res => res.json() as Promise<BalanceResponse>);

      setBalance(balanceResponse.data.balance);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error occurred while fetching balance data');
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchIssues = useCallback(async (page?: number, limit?: number) => {
    setLoading(true);
    setError(null);

    try {
      const issuesResponse = await fetch(`${API_BASE_URL}/issues?page=${page}&limit=${limit}`).then(res => res.json() as Promise<IssuesResponse>);
      setIssues(issuesResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error occurred while fetching issues data');
    } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchBalance();
    fetchIssues();
  }, [fetchBalance, fetchIssues]);

  return {
    balance,
    issues,
    loading,
    refetchIssues: (page?: number, limit?: number) => fetchIssues(page, limit),
    refetchBalance: fetchBalance,
    error,
  };
}
