
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CrowdfundingProject {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  token_type: 'VEX' | 'sVEX' | 'gVEX';
  start_date: string;
  end_date: string;
  status: 'active' | 'funded' | 'failed' | 'cancelled';
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface CrowdfundingContribution {
  id: string;
  project_id: string;
  contributor_id: string;
  amount: number;
  token_type: 'VEX' | 'sVEX' | 'gVEX';
  transaction_hash?: string;
  created_at: string;
}

export const useCrowdfundingProjects = () => {
  return useQuery({
    queryKey: ['crowdfunding-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crowdfunding_projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CrowdfundingProject[];
    }
  });
};

export const useCrowdfundingProject = (projectId: string) => {
  return useQuery({
    queryKey: ['crowdfunding-project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crowdfunding_projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return data as CrowdfundingProject;
    },
    enabled: !!projectId
  });
};

export const useProjectContributions = (projectId: string) => {
  return useQuery({
    queryKey: ['project-contributions', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crowdfunding_contributions')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CrowdfundingContribution[];
    },
    enabled: !!projectId
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (project: Omit<CrowdfundingProject, 'id' | 'current_amount' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('crowdfunding_projects')
        .insert({
          ...project,
          creator_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crowdfunding-projects'] });
      toast({
        title: "Projet créé",
        description: "Votre projet de crowdfunding a été créé avec succès"
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet",
        variant: "destructive"
      });
      console.error('Error creating project:', error);
    }
  });
};

export const useContributeToProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ projectId, amount, tokenType }: {
      projectId: string;
      amount: number;
      tokenType: 'VEX' | 'sVEX' | 'gVEX';
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check user balance first
      const { data: balance } = await supabase
        .from('token_balances')
        .select('balance')
        .eq('user_id', user.id)
        .eq('token_type', tokenType)
        .single();

      if (!balance || balance.balance < amount) {
        throw new Error('Solde insuffisant');
      }

      // Create contribution
      const { data, error } = await supabase
        .from('crowdfunding_contributions')
        .insert({
          project_id: projectId,
          contributor_id: user.id,
          amount,
          token_type: tokenType
        })
        .select()
        .single();
      
      if (error) throw error;

      // Update user balance
      await supabase.rpc('update_token_balance', {
        p_user_id: user.id,
        p_wallet_address: 'crowdfunding',
        p_token_type: tokenType,
        p_amount: amount,
        p_operation: 'subtract'
      });

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['crowdfunding-projects'] });
      queryClient.invalidateQueries({ queryKey: ['crowdfunding-project', variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ['project-contributions', variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ['token-balances'] });
      toast({
        title: "Contribution réussie",
        description: "Votre contribution a été ajoutée au projet"
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de contribuer au projet",
        variant: "destructive"
      });
      console.error('Error contributing to project:', error);
    }
  });
};
