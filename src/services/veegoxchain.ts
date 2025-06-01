
import { supabase } from '@/integrations/supabase/client';

interface VeegoxChainConfig {
  name: string;
  chain_id: number;
  rpc_url: string;
  ws_url: string;
  explorer_url: string;
  symbol: string;
  block_time: number;
  is_active: boolean;
  is_testnet: boolean;
}

interface VeegoxBlock {
  block_number: number;
  block_hash: string;
  timestamp: number;
  validator: string;
  transaction_count: number;
  gas_used: number;
  gas_limit: number;
}

interface VeegoxTransaction {
  transaction_hash: string;
  from_address: string;
  to_address: string;
  value: string;
  gas_price: string;
  gas_used: number;
  status: string;
  block_number?: number;
}

export class VeegoxChainService {
  async getChainConfig(): Promise<VeegoxChainConfig | null> {
    try {
      const { data, error } = await supabase
        .from('veegoxchain_config')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching chain config:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getChainConfig:', error);
      return null;
    }
  }

  async getLatestBlocks(limit: number = 10): Promise<VeegoxBlock[]> {
    try {
      const { data, error } = await supabase
        .from('veegoxchain_blocks')
        .select('*')
        .order('block_number', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching blocks:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error in getLatestBlocks:', error);
      return [];
    }
  }

  async getLatestTransactions(limit: number = 20): Promise<VeegoxTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('veegoxchain_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching transactions:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error in getLatestTransactions:', error);
      return [];
    }
  }

  async getValidators(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('veegoxchain_validators')
        .select('*')
        .eq('is_active', true)
        .order('stake', { ascending: false });

      if (error) {
        console.error('Error fetching validators:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error in getValidators:', error);
      return [];
    }
  }

  async getNetworkStats() {
    try {
      // Get latest block
      const { data: latestBlock } = await supabase
        .from('veegoxchain_blocks')
        .select('block_number, transaction_count')
        .order('block_number', { ascending: false })
        .limit(1)
        .single();

      // Get total validators
      const { count: validatorCount } = await supabase
        .from('veegoxchain_validators')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      // Get total transactions today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: todayTxCount } = await supabase
        .from('veegoxchain_transactions')
        .select('*', { count: 'exact' })
        .gte('created_at', today.toISOString());

      return {
        latestBlock: latestBlock?.block_number || 0,
        totalValidators: validatorCount || 0,
        transactionsToday: todayTxCount || 0,
        totalTransactions: latestBlock?.transaction_count || 0
      };
    } catch (error) {
      console.error('Error getting network stats:', error);
      return {
        latestBlock: 0,
        totalValidators: 0,
        transactionsToday: 0,
        totalTransactions: 0
      };
    }
  }
}

export const veegoxChainService = new VeegoxChainService();
