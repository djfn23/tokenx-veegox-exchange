
import { supabase } from '@/integrations/supabase/client';

const ALCHEMY_API_KEY = 'demo'; // Sera remplacé par la vraie clé
const ALCHEMY_BASE_URL = 'https://eth-mainnet.g.alchemy.com/v2';

interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
  symbol: string;
  name: string;
  decimals: number;
}

interface AlchemyTokenBalancesResponse {
  address: string;
  tokenBalances: TokenBalance[];
}

export class AlchemyService {
  private apiKey: string;
  
  constructor(apiKey: string = ALCHEMY_API_KEY) {
    this.apiKey = apiKey;
  }

  async getTokenBalances(walletAddress: string): Promise<TokenBalance[]> {
    try {
      const response = await fetch(`${ALCHEMY_BASE_URL}/${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'alchemy_getTokenBalances',
          params: [walletAddress, 'erc20']
        })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('Alchemy API Error:', data.error);
        return [];
      }

      return data.result.tokenBalances || [];
    } catch (error) {
      console.error('Error fetching token balances:', error);
      return [];
    }
  }

  async getTransactionHistory(walletAddress: string): Promise<any[]> {
    try {
      const response = await fetch(`${ALCHEMY_BASE_URL}/${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'alchemy_getAssetTransfers',
          params: [{
            fromBlock: "0x0",
            toBlock: "latest",
            fromAddress: walletAddress,
            category: ["erc20", "external"]
          }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('Alchemy API Error:', data.error);
        return [];
      }

      return data.result.transfers || [];
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }

  async syncWalletData(walletAddress: string, userId: string) {
    try {
      console.log('Syncing wallet data for:', walletAddress);
      
      // Récupérer les balances depuis Alchemy
      const tokenBalances = await this.getTokenBalances(walletAddress);
      
      // Mapper les tokens Veegox
      const veegoxTokens = {
        'VEX': tokenBalances.find(token => token.symbol === 'VEX'),
        'sVEX': tokenBalances.find(token => token.symbol === 'sVEX'),
        'gVEX': tokenBalances.find(token => token.symbol === 'gVEX'),
      };

      // Synchroniser avec Supabase
      for (const [tokenType, tokenData] of Object.entries(veegoxTokens)) {
        if (tokenData) {
          const balance = parseFloat(tokenData.tokenBalance) / Math.pow(10, tokenData.decimals);
          
          await supabase
            .from('token_balances')
            .upsert({
              user_id: userId,
              wallet_address: walletAddress,
              token_type: tokenType as 'VEX' | 'sVEX' | 'gVEX',
              balance: balance,
              updated_at: new Date().toISOString()
            });
        }
      }

      // Récupérer l'historique des transactions
      const transactions = await this.getTransactionHistory(walletAddress);
      
      // Synchroniser les transactions avec Supabase
      for (const tx of transactions.slice(0, 50)) { // Limiter aux 50 dernières
        await supabase
          .from('blockchain_transactions')
          .upsert({
            user_id: userId,
            transaction_hash: tx.hash,
            from_address: tx.from,
            to_address: tx.to,
            amount: parseFloat(tx.value || '0'),
            transaction_type: 'transfer',
            status: 'confirmed',
            block_number: parseInt(tx.blockNum, 16),
            token_type: 'VEX' // Default, sera mis à jour selon le token
          });
      }

      console.log('Wallet data synchronized successfully');
    } catch (error) {
      console.error('Error syncing wallet data:', error);
      throw error;
    }
  }
}

export const alchemyService = new AlchemyService();
