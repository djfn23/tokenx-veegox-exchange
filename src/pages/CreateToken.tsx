
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const CreateToken = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '18',
    description: '',
    website: '',
    logo: ''
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateToken = async () => {
    if (!formData.name || !formData.symbol || !formData.totalSupply) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    // Simulation de création de token
    setTimeout(() => {
      setIsCreating(false);
      toast({
        title: "Token créé avec succès !",
        description: `${formData.name} (${formData.symbol}) a été déployé sur Ethereum`,
      });
      
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        totalSupply: '',
        decimals: '18',
        description: '',
        website: '',
        logo: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Créer Votre Token
          </h1>
          <p className="text-xl text-gray-300">
            Lancez votre token ERC-20 personnalisé sur la blockchain Ethereum
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Informations du Token</CardTitle>
                <CardDescription className="text-gray-400">
                  Configurez les paramètres de votre token
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nom du Token *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: VeegoxCoin"
                      className="bg-tokenx-dark border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="symbol" className="text-white">Symbole *</Label>
                    <Input
                      id="symbol"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleInputChange}
                      placeholder="Ex: VGX"
                      className="bg-tokenx-dark border-gray-700 text-white"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalSupply" className="text-white">Supply Totale *</Label>
                    <Input
                      id="totalSupply"
                      name="totalSupply"
                      type="number"
                      value={formData.totalSupply}
                      onChange={handleInputChange}
                      placeholder="1000000"
                      className="bg-tokenx-dark border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="decimals" className="text-white">Décimales</Label>
                    <Input
                      id="decimals"
                      name="decimals"
                      type="number"
                      value={formData.decimals}
                      onChange={handleInputChange}
                      className="bg-tokenx-dark border-gray-700 text-white"
                      min="0"
                      max="18"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre projet et l'utilité de votre token..."
                    className="bg-tokenx-dark border-gray-700 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">Site Web</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://votre-projet.com"
                    className="bg-tokenx-dark border-gray-700 text-white"
                  />
                </div>

                <Button
                  onClick={handleCreateToken}
                  disabled={isCreating}
                  className="w-full btn-gradient glow-effect text-lg py-3"
                >
                  {isCreating ? 'Création en cours...' : 'Créer le Token'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Estimation des Coûts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Déploiement</span>
                  <span className="text-white">~0.05 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Frais de réseau</span>
                  <span className="text-white">~0.01 ETH</span>
                </div>
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-tokenx-purple">~0.06 ETH</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Fonctionnalités Incluses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Standard ERC-20</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Mintable/Burnable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Pausable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Ownership Transfer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Audit de sécurité</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-sm">💡 Conseil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Assurez-vous d'avoir suffisamment d'ETH dans votre wallet pour couvrir les frais de déploiement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateToken;
