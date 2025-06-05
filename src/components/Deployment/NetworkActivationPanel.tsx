
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  PlayCircle, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Network,
  Users,
  Activity
} from 'lucide-react';
import { networkActivationService } from '@/services/network-activation';
import { contractDeploymentService } from '@/services/contract-deployment';
import { useVeegoxChain } from '@/hooks/useVeegoxChain';
import { toast } from '@/hooks/use-toast';

const NetworkActivationPanel = () => {
  const [isActivating, setIsActivating] = useState(false);
  const [activationStep, setActivationStep] = useState<string>('');
  const [deployedContracts, setDeployedContracts] = useState<any[]>([]);
  const { chainConfig, networkStats } = useVeegoxChain();

  const handleNetworkActivation = async () => {
    if (!chainConfig) {
      toast({
        title: "Erreur",
        description: "Configuration de chaîne non trouvée",
        variant: "destructive"
      });
      return;
    }

    setIsActivating(true);
    
    try {
      // Step 1: Activate Network
      setActivationStep('Activation du réseau...');
      const activationResult = await networkActivationService.activateNetwork(chainConfig.chain_id);
      
      if (!activationResult.success) {
        throw new Error(activationResult.message);
      }

      // Step 2: Deploy Tokens
      setActivationStep('Déploiement des tokens...');
      const tokens = await contractDeploymentService.deployAllTokens(chainConfig.chain_id);
      
      // Step 3: Deploy DeFi Contracts
      setActivationStep('Déploiement des contrats DeFi...');
      const defiContracts = await contractDeploymentService.deployDeFiContracts(chainConfig.chain_id);
      
      const allContracts = [...tokens, ...defiContracts];
      setDeployedContracts(allContracts);

      // Step 4: Verify Contracts
      setActivationStep('Vérification des contrats...');
      for (const contract of allContracts) {
        await contractDeploymentService.verifyContract(contract.address);
      }

      // Create network activation alert
      await networkActivationService.createNetworkAlert(
        chainConfig.chain_id,
        'network_activation',
        'Réseau activé',
        `VeegoxChain a été activé avec succès avec ${allContracts.length} contrats déployés`,
        'info'
      );

      toast({
        title: "Activation réussie",
        description: `VeegoxChain activé avec ${allContracts.length} contrats déployés`
      });

    } catch (error) {
      console.error('Activation failed:', error);
      toast({
        title: "Échec de l'activation",
        description: error instanceof Error ? error.message : 'Erreur inconnue',
        variant: "destructive"
      });
    } finally {
      setIsActivating(false);
      setActivationStep('');
    }
  };

  const isNetworkActive = chainConfig?.network_status === 'active';

  return (
    <div className="space-y-6">
      {/* Network Status */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Statut du Réseau</span>
          </CardTitle>
          <CardDescription>
            État actuel de VeegoxChain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted">Statut:</span>
                <Badge variant={isNetworkActive ? 'default' : 'secondary'}>
                  {isNetworkActive ? 'Actif' : 'En attente'}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted">
                <span>Blocs: {networkStats.latestBlock}</span>
                <span>Validateurs: {networkStats.totalValidators}</span>
                <span>Transactions: {networkStats.totalTransactions}</span>
              </div>
            </div>
            <Button
              onClick={handleNetworkActivation}
              disabled={isActivating || isNetworkActive}
              className="btn-gradient"
            >
              {isActivating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {activationStep}
                </>
              ) : isNetworkActive ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Réseau Actif
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Activer le Réseau
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deployed Contracts */}
      {deployedContracts.length > 0 && (
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Contrats Déployés</span>
            </CardTitle>
            <CardDescription>
              Smart contracts récemment déployés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deployedContracts.map((contract, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-tokenx-dark-light/30">
                  <div>
                    <p className="font-medium text-secondary">{contract.name}</p>
                    <p className="text-xs text-muted font-mono">{contract.address}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      Block #{contract.deploymentBlock}
                    </Badge>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Network Alerts */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {isNetworkActive 
            ? "Le réseau VeegoxChain est maintenant actif et prêt à traiter les transactions."
            : "Cliquez sur 'Activer le Réseau' pour finaliser le déploiement de VeegoxChain."
          }
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkActivationPanel;
