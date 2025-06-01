
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { veegoxChainService } from '@/services/veegoxchain';

export const useVeegoxChain = () => {
  // Configuration de la chaîne
  const { data: chainConfig, isLoading: configLoading } = useQuery({
    queryKey: ['veegoxchain-config'],
    queryFn: () => veegoxChainService.getChainConfig(),
    refetchInterval: 30000 // Rafraîchir toutes les 30 secondes
  });

  // Derniers blocs
  const { data: latestBlocks, isLoading: blocksLoading } = useQuery({
    queryKey: ['veegoxchain-blocks'],
    queryFn: () => veegoxChainService.getLatestBlocks(10),
    refetchInterval: 5000 // Rafraîchir toutes les 5 secondes
  });

  // Dernières transactions
  const { data: latestTransactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['veegoxchain-transactions'],
    queryFn: () => veegoxChainService.getLatestTransactions(20),
    refetchInterval: 5000
  });

  // Validateurs
  const { data: validators, isLoading: validatorsLoading } = useQuery({
    queryKey: ['veegoxchain-validators'],
    queryFn: () => veegoxChainService.getValidators(),
    refetchInterval: 60000 // Rafraîchir toutes les minutes
  });

  // Statistiques réseau
  const { data: networkStats, isLoading: statsLoading } = useQuery({
    queryKey: ['veegoxchain-stats'],
    queryFn: () => veegoxChainService.getNetworkStats(),
    refetchInterval: 10000 // Rafraîchir toutes les 10 secondes
  });

  return {
    chainConfig,
    latestBlocks: latestBlocks || [],
    latestTransactions: latestTransactions || [],
    validators: validators || [],
    networkStats: networkStats || {
      latestBlock: 0,
      totalValidators: 0,
      transactionsToday: 0,
      totalTransactions: 0
    },
    isLoading: configLoading || blocksLoading || transactionsLoading || validatorsLoading || statsLoading
  };
};
