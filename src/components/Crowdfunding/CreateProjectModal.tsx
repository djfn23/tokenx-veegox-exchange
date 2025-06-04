
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
import { Plus, Coins } from 'lucide-react';

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
      image_url: data.image_url || undefined,
      creator_id: 'temp-user-id' // TODO: Replace with actual user ID from auth
    };

    createProjectMutation.mutate(projectData, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  const defaultTrigger = (
    <Button className="btn-gradient hover-lift group">
      <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
      <Coins className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
      Créer un Projet
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] card-glass border-tokenx-glass-border backdrop-blur-xl">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-tokenx-purple to-tokenx-blue flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-secondary text-2xl font-bold">
                Créer un Projet de Crowdfunding
              </DialogTitle>
              <p className="text-muted text-sm">Financez votre projet avec les tokens de la communauté</p>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body flex items-center space-x-2">
                        <span>Titre du Projet</span>
                        <div className="w-1 h-1 bg-tokenx-purple rounded-full"></div>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nom de votre projet"
                          className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body focus:border-tokenx-purple transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body flex items-center space-x-2">
                        <span>Description</span>
                        <div className="w-1 h-1 bg-tokenx-blue rounded-full"></div>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre projet en détail..."
                          className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body min-h-[120px] focus:border-tokenx-purple transition-colors resize-none"
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
                name="goal_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-body">Montant Objectif</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="number"
                          placeholder="1000"
                          className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body pl-10 focus:border-tokenx-purple transition-colors"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-tokenx-purple" />
                      </div>
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
                        <SelectTrigger className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body focus:border-tokenx-purple transition-colors">
                          <SelectValue placeholder="Sélectionnez un token" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="card-glass border-tokenx-glass-border">
                        <SelectItem value="VEX" className="text-body hover:bg-tokenx-glass focus:bg-tokenx-glass">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-tokenx-purple rounded-full"></div>
                            <span>VEX - Token Principal</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="sVEX" className="text-body hover:bg-tokenx-glass focus:bg-tokenx-glass">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-tokenx-blue rounded-full"></div>
                            <span>sVEX - Token de Staking</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="gVEX" className="text-body hover:bg-tokenx-glass focus:bg-tokenx-glass">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-tokenx-accent rounded-full"></div>
                            <span>gVEX - Token de Gouvernance</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-body">Date de Fin</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body focus:border-tokenx-purple transition-colors"
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
                        className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body focus:border-tokenx-purple transition-colors"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body">URL de l'Image (Optionnel)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg"
                          className="bg-tokenx-dark-light/50 border-tokenx-glass-border text-body focus:border-tokenx-purple transition-colors"
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
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-tokenx-glass-border">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="flex-1 border-tokenx-glass-border text-muted hover:bg-tokenx-glass hover:text-body transition-all duration-300"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="flex-1 btn-gradient hover-lift group"
                disabled={createProjectMutation.isPending}
              >
                <span className="flex items-center space-x-2">
                  {createProjectMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Création...</span>
                    </>
                  ) : (
                    <>
                      <Coins className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Créer le Projet</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
