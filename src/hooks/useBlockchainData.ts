
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { alchemyService } from '@/services/alchemy';
import { veegoxChainService } from '@/services/veegoxchain';

interface WalletData {
  balances: Record<string, number>;
  transactions: any[];
  veegoxStats: any;
  isLoading: boolean;
  error: string | null;
}

export const useBlockchainData = (walletAddress: string | null, userId: string | null) => {
  const [walletData, setWalletData] = useState<WalletData>({
    balances: {},
    transactions: [],
    veegoxStats: null,
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

  // Récupérer les statistiques VeegoxChain
  const { data: veegoxStats, isLoading: statsLoading } = useQuery({
    queryKey: ['veegoxchain-user-stats', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      // Récupérer les statistiques réseau
      const networkStats = await veegoxChainService.getNetworkStats();
      
      // Récupérer les transactions de l'utilisateur sur VeegoxChain
      const { data: userTxCount } = await supabase
        .from('veegoxchain_transactions')
        .select('transaction_hash', { count: 'exact' })
        .or(`from_address.eq.${walletAddress},to_address.eq.${walletAddress}`);
      
      return {
        ...networkStats,
        userTransactions: userTxCount || 0
      };
    },
    enabled: !!userId && !!walletAddress
  });

  // Fonction pour synchroniser les données
  const syncWalletData = async () => {
    if (!walletAddress || !userId) {
      setWalletData(prev => ({ ...prev, error: 'Wallet address or user ID missing' }));
      return;
    }

    setWalletData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Synchroniser avec Alchemy
      await alchemyService.syncWalletData(walletAddress, userId);
      
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
        veegoxStats: veegoxStats,
        isLoading: balancesLoading || transactionsLoading || statsLoading
      }));
    }
  }, [balances, transactions, veegoxStats, balancesLoading, transactionsLoading, statsLoading]);

  return {
    ...walletData,
    syncWalletData,
    refetch: () => {
      // Les queries React Query se rechargeront automatiquement
    }
  };
};
