
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { alchemyService } from '@/services/alchemy';

interface WalletData {
  balances: Record<string, number>;
  transactions: any[];
  isLoading: boolean;
  error: string | null;
}

export const useBlockchainData = (walletAddress: string | null, userId: string | null) => {
  const [walletData, setWalletData] = useState<WalletData>({
    balances: {},
    transactions: [],
    isLoading: false,
    error: null
  });

  // Récupérer les balances depuis Supabase
  const { data: balances, isLoading: balancesLoading } = useQuery({
    queryKey: ['token-balances', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('token_balances')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  // Récupérer les transactions depuis Supabase
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['blockchain-transactions', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('blockchain_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  // Fonction pour synchroniser les données
  const syncWalletData = async () => {
    if (!walletAddress || !userId) {
      setWalletData(prev => ({ ...prev, error: 'Wallet address or user ID missing' }));
      return;
    }

    setWalletData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await alchemyService.syncWalletData(walletAddress, userId);
      
      // Recharger les données après la synchronisation
      // Les queries se mettront à jour automatiquement grâce à React Query
      
      setWalletData(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error syncing wallet data:', error);
      setWalletData(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to sync wallet data' 
      }));
    }
  };

  // Transformer les balances en format utilisable
  useEffect(() => {
    if (balances) {
      const balanceMap = balances.reduce((acc, balance) => {
        acc[balance.token_type] = balance.balance;
        return acc;
      }, {} as Record<string, number>);

      setWalletData(prev => ({
        ...prev,
        balances: balanceMap,
        transactions: transactions || [],
        isLoading: balancesLoading || transactionsLoading
      }));
    }
  }, [balances, transactions, balancesLoading, transactionsLoading]);

  return {
    ...walletData,
    syncWalletData,
    refetch: () => {
      // Les queries React Query se rechargeront automatiquement
    }
  };
};
