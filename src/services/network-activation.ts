
import { supabase } from '@/integrations/supabase/client';
import { veegoxChainService } from './veegoxchain';

export interface NetworkActivationResult {
  success: boolean;
  message: string;
  blockNumber?: number;
  validators?: number;
}

export class NetworkActivationService {
  async activateNetwork(chainId: number): Promise<NetworkActivationResult> {
    try {
      console.log('Activating VeegoxChain network...');
      
      // 1. Update network status to active
      const { error: configError } = await supabase
        .from('veegoxchain_config')
        .update({ 
          network_status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('chain_id', chainId);

      if (configError) {
        throw new Error(`Failed to update network status: ${configError.message}`);
      }

      // 2. Generate initial blocks with transactions
      await this.generateInitialBlocks(chainId);

      // 3. Create sample transactions
      await this.createSampleTransactions(chainId);

      // 4. Update validator metrics
      await this.updateValidatorMetrics(chainId);

      const networkStats = await veegoxChainService.getNetworkStats();

      return {
        success: true,
        message: 'VeegoxChain network activated successfully',
        blockNumber: networkStats.latestBlock,
        validators: networkStats.totalValidators
      };

    } catch (error) {
      console.error('Error activating network:', error);
      return {
        success: false,
        message: `Failed to activate network: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private async generateInitialBlocks(chainId: number): Promise<void> {
    console.log('Generating initial blocks...');
    
    const validators = await this.getActiveValidators(chainId);
    if (validators.length === 0) {
      throw new Error('No active validators found');
    }

    // Generate 10 initial blocks
    for (let i = 1; i <= 10; i++) {
      const validator = validators[i % validators.length];
      const block = {
        block_number: i,
        block_hash: this.generateBlockHash(i),
        parent_hash: i === 1 ? '0x0000000000000000000000000000000000000000000000000000000000000000' : this.generateBlockHash(i - 1),
        timestamp: Math.floor(Date.now() / 1000) - (10 - i) * 5, // 5 seconds apart
        validator: validator.validator_address,
        transaction_count: Math.floor(Math.random() * 5) + 1,
        gas_used: Math.floor(Math.random() * 1000000) + 100000,
        gas_limit: 30000000,
        chain_id: chainId
      };

      await supabase.from('veegoxchain_blocks').insert(block);
      await this.delay(200); // Small delay between blocks
    }
  }

  private async createSampleTransactions(chainId: number): Promise<void> {
    console.log('Creating sample transactions...');
    
    const sampleTransactions = [
      {
        transaction_hash: this.generateTxHash(),
        from_address: '0x742d35Cc7234C4E0B9C8D4aA0b84E9D3f4B5F6E7',
        to_address: '0x853e46Dd8345D5F1C9D5E5aA1c95F0E4f5C6G7H8',
        value: '1000000000000000000', // 1 VEX
        gas_price: '20000000000',
        gas_used: 21000,
        status: 'success',
        block_number: Math.floor(Math.random() * 10) + 1,
        chain_id: chainId
      },
      {
        transaction_hash: this.generateTxHash(),
        from_address: '0x853e46Dd8345D5F1C9D5E5aA1c95F0E4f5C6G7H8',
        to_address: '0x964f57Ee9456E6G2D0E6F6bb2d06G1F5g6D7H8I9',
        value: '500000000000000000', // 0.5 VEX
        gas_price: '20000000000',
        gas_used: 21000,
        status: 'success',
        block_number: Math.floor(Math.random() * 10) + 1,
        chain_id: chainId
      },
      {
        transaction_hash: this.generateTxHash(),
        from_address: '0x964f57Ee9456E6G2D0E6F6bb2d06G1F5g6D7H8I9',
        to_address: '0x742d35Cc7234C4E0B9C8D4aA0b84E9D3f4B5F6E7',
        value: '2000000000000000000', // 2 VEX
        gas_price: '25000000000',
        gas_used: 21000,
        status: 'success',
        block_number: Math.floor(Math.random() * 10) + 1,
        chain_id: chainId
      }
    ];

    for (const tx of sampleTransactions) {
      await supabase.from('veegoxchain_transactions').insert(tx);
    }
  }

  private async updateValidatorMetrics(chainId: number): Promise<void> {
    console.log('Updating validator metrics...');
    
    const validators = await this.getActiveValidators(chainId);
    
    for (const validator of validators) {
      const blocksProposed = Math.floor(Math.random() * 5) + 1;
      const rewardsEarned = blocksProposed * 2.5; // 2.5 VEX per block
      
      await supabase
        .from('veegoxchain_validators')
        .update({
          blocks_proposed: blocksProposed,
          rewards_earned: rewardsEarned,
          last_block_proposed: Math.floor(Math.random() * 10) + 1,
          last_active_at: new Date().toISOString(),
          uptime: 100.0
        })
        .eq('validator_address', validator.validator_address);
    }
  }

  private async getActiveValidators(chainId: number) {
    const { data, error } = await supabase
      .from('veegoxchain_validators')
      .select('*')
      .eq('chain_id', chainId)
      .eq('is_active', true);

    if (error) {
      throw new Error(`Failed to get validators: ${error.message}`);
    }

    return data || [];
  }

  private generateBlockHash(blockNumber: number): string {
    return `0x${blockNumber.toString().padStart(2, '0')}${Math.random().toString(16).substr(2, 62)}`;
  }

  private generateTxHash(): string {
    return `0x${Math.random().toString(16).substr(2, 64)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createNetworkAlert(chainId: number, type: string, title: string, description: string, severity: 'info' | 'warning' | 'error' = 'info') {
    const alert = {
      chain_id: chainId,
      alert_type: type,
      title,
      description,
      severity,
      resolved: false,
      alert_data: {
        timestamp: new Date().toISOString(),
        automated: true
      }
    };

    await supabase.from('veegoxchain_alerts').insert(alert);
  }
}

export const networkActivationService = new NetworkActivationService();
