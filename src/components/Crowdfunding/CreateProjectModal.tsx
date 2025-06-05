
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '@/hooks/useCrowdfunding';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProjectFormData {
  title: string;
  description: string;
  goal_amount: string;
  token_type: 'VEX' | 'sVEX' | 'gVEX';
  end_date: string;
  category?: string;
  image_url?: string;
}

interface CreateProjectModalProps {
  trigger?: React.ReactNode;
}

const CreateProjectModal = ({ trigger }: CreateProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date>();
  const createProjectMutation = useCreateProject();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ProjectFormData>();

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer un projet",
          variant: "destructive"
        });
        return;
      }

      const projectData = {
        title: data.title,
        description: data.description,
        goal_amount: Number(data.goal_amount),
        token_type: data.token_type,
        end_date: data.end_date,
        category: data.category || undefined,
        image_url: data.image_url || undefined,
        status: 'active' as const,
        start_date: new Date().toISOString(),
        creator_id: user.id
      };

      createProjectMutation.mutate(projectData, {
        onSuccess: () => {
          setOpen(false);
          reset();
          setEndDate(undefined);
        }
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet",
        variant: "destructive"
      });
    }
  };

  const defaultTrigger = (
    <Button className="btn-gradient">
      <Plus className="w-4 h-4 mr-2" />
      Créer un projet
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="card-glass max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-secondary">Créer un nouveau projet</DialogTitle>
          <DialogDescription className="text-muted">
            Lancez votre campagne de crowdfunding avec des tokens VEX
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du projet *</Label>
              <Input
                id="title"
                {...register('title', { required: 'Le titre est requis' })}
                placeholder="Nom de votre projet"
                className="bg-tokenx-dark-light/50 border-tokenx-glass-border"
              />
              {errors.title && <p className="text-sm text-red-400">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="ex: Technologie, Art, Jeu..."
                className="bg-tokenx-dark-light/50 border-tokenx-glass-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'La description est requise' })}
              placeholder="Décrivez votre projet en détail..."
              rows={4}
              className="bg-tokenx-dark-light/50 border-tokenx-glass-border resize-none"
            />
            {errors.description && <p className="text-sm text-red-400">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goal_amount">Objectif de financement *</Label>
              <Input
                id="goal_amount"
                type="number"
                {...register('goal_amount', { 
                  required: 'L\'objectif est requis',
                  min: { value: 1, message: 'L\'objectif doit être supérieur à 0' }
                })}
                placeholder="1000"
                className="bg-tokenx-dark-light/50 border-tokenx-glass-border"
              />
              {errors.goal_amount && <p className="text-sm text-red-400">{errors.goal_amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="token_type">Type de token *</Label>
              <Select onValueChange={(value) => setValue('token_type', value as 'VEX' | 'sVEX' | 'gVEX')}>
                <SelectTrigger className="bg-tokenx-dark-light/50 border-tokenx-glass-border">
                  <SelectValue placeholder="Choisir un token" />
                </SelectTrigger>
                <SelectContent className="card-glass border-tokenx-glass-border">
                  <SelectItem value="VEX">VEX - Token principal</SelectItem>
                  <SelectItem value="sVEX">sVEX - Token de staking</SelectItem>
                  <SelectItem value="gVEX">gVEX - Token de gouvernance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date de fin *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-tokenx-dark-light/50 border-tokenx-glass-border hover:bg-tokenx-dark-light/70"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP', { locale: fr }) : 'Sélectionner une date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 card-glass border-tokenx-glass-border">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      if (date) {
                        setValue('end_date', date.toISOString());
                      }
                    }}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image du projet (URL)</Label>
              <Input
                id="image_url"
                {...register('image_url')}
                placeholder="https://exemple.com/image.jpg"
                className="bg-tokenx-dark-light/50 border-tokenx-glass-border"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-tokenx-glass-border hover:bg-tokenx-dark-light/30"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={createProjectMutation.isPending}
              className="btn-gradient"
            >
              {createProjectMutation.isPending ? 'Création...' : 'Créer le projet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
