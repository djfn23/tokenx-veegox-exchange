
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProject } from '@/hooks/useCrowdfunding';
import { Plus } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  goal_amount: z.number().min(1, 'Le montant objectif doit être supérieur à 0'),
  token_type: z.enum(['VEX', 'sVEX', 'gVEX']),
  end_date: z.string().min(1, 'La date de fin est requise'),
  category: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal(''))
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface CreateProjectModalProps {
  trigger?: React.ReactNode;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ trigger }) => {
  const [open, setOpen] = React.useState(false);
  const createProjectMutation = useCreateProject();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      goal_amount: 0,
      token_type: 'VEX',
      end_date: '',
      category: '',
      image_url: ''
    }
  });

  const onSubmit = (data: ProjectFormData) => {
    const projectData = {
      ...data,
      goal_amount: Number(data.goal_amount),
      status: 'active' as const,
      start_date: new Date().toISOString(),
      image_url: data.image_url || undefined
    };

    createProjectMutation.mutate(projectData, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  const defaultTrigger = (
    <Button className="btn-gradient">
      <Plus className="w-4 h-4 mr-2" />
      Créer un Projet
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-tokenx-dark-card border-tokenx-glass-border">
        <DialogHeader>
          <DialogTitle className="text-secondary text-2xl">
            Créer un Projet de Crowdfunding
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body">Titre du Projet</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nom de votre projet"
                      className="bg-tokenx-dark-light border-tokenx-glass-border text-body"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre projet en détail..."
                      className="bg-tokenx-dark-light border-tokenx-glass-border text-body min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="goal_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-body">Montant Objectif</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="1000"
                        className="bg-tokenx-dark-light border-tokenx-glass-border text-body"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectItem value="VEX" className="text-body">VEX - Token Principal</SelectItem>
                        <SelectItem value="sVEX" className="text-body">sVEX - Token de Staking</SelectItem>
                        <SelectItem value="gVEX" className="text-body">gVEX - Token de Gouvernance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-body">Date de Fin</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        className="bg-tokenx-dark-light border-tokenx-glass-border text-body"
                        min={new Date().toISOString().split('T')[0]}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-body">Catégorie (Optionnel)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tech, Art, Gaming..."
                        className="bg-tokenx-dark-light border-tokenx-glass-border text-body"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-body">URL de l'Image (Optionnel)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg"
                      className="bg-tokenx-dark-light border-tokenx-glass-border text-body"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-subtle">
                    Ajoutez une image pour rendre votre projet plus attractif
                  </FormDescription>
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
                disabled={createProjectMutation.isPending}
              >
                {createProjectMutation.isPending ? 'Création...' : 'Créer le Projet'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
