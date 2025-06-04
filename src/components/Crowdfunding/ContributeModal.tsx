
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContributeToProject } from '@/hooks/useCrowdfunding';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Coins } from 'lucide-react';

const contributeSchema = z.object({
  amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
  token_type: z.enum(['VEX', 'sVEX', 'gVEX'])
});

type ContributeFormData = z.infer<typeof contributeSchema>;

interface ContributeModalProps {
  projectId: string;
  projectTitle: string;
  trigger?: React.ReactNode;
}

const ContributeModal: React.FC<ContributeModalProps> = ({ projectId, projectTitle, trigger }) => {
  const [open, setOpen] = React.useState(false);
  const contributeToProjectMutation = useContributeToProject();

  const form = useForm<ContributeFormData>({
    resolver: zodResolver(contributeSchema),
    defaultValues: {
      amount: 0,
      token_type: 'VEX'
    }
  });

  const watchedTokenType = form.watch('token_type');

  // Fetch user balances
  const { data: userBalances } = useQuery({
    queryKey: ['token-balances'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('token_balances')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    }
  });

  const getTokenBalance = (tokenType: string) => {
    const balance = userBalances?.find(b => b.token_type === tokenType);
    return balance?.balance || 0;
  };

  const onSubmit = (data: ContributeFormData) => {
    contributeToProjectMutation.mutate({
      projectId,
      amount: Number(data.amount),
      tokenType: data.token_type
    }, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  const defaultTrigger = (
    <Button className="btn-gradient">
      <Coins className="w-4 h-4 mr-2" />
      Contribuer
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-tokenx-dark-card border-tokenx-glass-border">
        <DialogHeader>
          <DialogTitle className="text-secondary text-xl">
            Contribuer au Projet
          </DialogTitle>
          <p className="text-muted text-sm">
            {projectTitle}
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="token_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body">Type de Token</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-tokenx-dark-light border-tokenx-glass-border text-body">
                        <SelectValue placeholder="Sélectionnez un token" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-tokenx-dark-card border-tokenx-glass-border">
                      <SelectItem value="VEX" className="text-body">
                        VEX - Solde: {getTokenBalance('VEX').toLocaleString()}
                      </SelectItem>
                      <SelectItem value="sVEX" className="text-body">
                        sVEX - Solde: {getTokenBalance('sVEX').toLocaleString()}
                      </SelectItem>
                      <SelectItem value="gVEX" className="text-body">
                        gVEX - Solde: {getTokenBalance('gVEX').toLocaleString()}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body">Montant à Contribuer</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="100"
                      className="bg-tokenx-dark-light border-tokenx-glass-border text-body"
                      max={getTokenBalance(watchedTokenType)}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <div className="text-sm text-muted mt-1">
                    Solde disponible: {getTokenBalance(watchedTokenType).toLocaleString()} {watchedTokenType}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="flex-1 border-tokenx-glass-border text-muted hover:bg-tokenx-dark-light"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="flex-1 btn-gradient"
                disabled={contributeToProjectMutation.isPending || getTokenBalance(watchedTokenType) === 0}
              >
                {contributeToProjectMutation.isPending ? 'Contribution...' : 'Contribuer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContributeModal;
