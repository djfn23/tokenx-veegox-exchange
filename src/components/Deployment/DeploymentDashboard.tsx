
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Rocket, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Network, 
  Code, 
  Shield, 
  Activity,
  Server,
  Database
} from 'lucide-react';
import { BlockchainDeploymentService, testnetConfig, mainnetConfig } from '@/services/blockchain-deployment';
import { toast } from '@/hooks/use-toast';

interface DeploymentStatus {
  step: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  message: string;
}

const DeploymentDashboard = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStatus[]>([
    { step: 'blockchain', status: 'pending', progress: 0, message: 'Initialisation de VeegoxChain' },
    { step: 'validators', status: 'pending', progress: 0, message: 'Déploiement des validateurs' },
    { step: 'contracts', status: 'pending', progress: 0, message: 'Déploiement des smart contracts' },
    { step: 'verification', status: 'pending', progress: 0, message: 'Vérification des contrats' },
    { step: 'monitoring', status: 'pending', progress: 0, message: 'Configuration du monitoring' }
  ]);
  const [selectedNetwork, setSelectedNetwork] = useState<'testnet' | 'mainnet'>('testnet');

  const updateStepStatus = (stepName: string, status: DeploymentStatus['status'], progress: number, message: string) => {
    setDeploymentSteps(prev => prev.map(step => 
      step.step === stepName 
        ? { ...step, status, progress, message }
        : step
    ));
  };

  const deployBlockchain = async () => {
    setIsDeploying(true);
    const config = selectedNetwork === 'testnet' ? testnetConfig : mainnetConfig;
    const deploymentService = new BlockchainDeploymentService(config);

    try {
      // Step 1: Deploy VeegoxChain
      updateStepStatus('blockchain', 'running', 20, 'Initialisation de la blockchain...');
      await deploymentService.deployVeegoxChain();
      updateStepStatus('blockchain', 'completed', 100, 'VeegoxChain déployée avec succès');

      // Step 2: Deploy Validators
      updateStepStatus('validators', 'running', 30, 'Configuration des validateurs...');
      await deploymentService.deployValidators();
      updateStepStatus('validators', 'completed', 100, 'Validateurs configurés');

      // Step 3: Deploy Smart Contracts
      updateStepStatus('contracts', 'running', 50, 'Déploiement des smart contracts...');
      const deployments = await deploymentService.deploySmartContracts();
      updateStepStatus('contracts', 'completed', 100, `${deployments.length} contrats déployés`);

      // Step 4: Verify Contracts
      updateStepStatus('verification', 'running', 80, 'Vérification des contrats...');
      await deploymentService.verifyContracts(deployments);
      updateStepStatus('verification', 'completed', 100, 'Contrats vérifiés');

      // Step 5: Setup Monitoring
      updateStepStatus('monitoring', 'running', 90, 'Configuration du monitoring...');
      await deploymentService.setupMonitoring();
      updateStepStatus('monitoring', 'completed', 100, 'Monitoring configuré');

      toast({
        title: "Déploiement réussi",
        description: `VeegoxChain et les smart contracts ont été déployés sur ${selectedNetwork}`
      });

    } catch (error) {
      console.error('Deployment failed:', error);
      const currentStep = deploymentSteps.find(step => step.status === 'running');
      if (currentStep) {
        updateStepStatus(currentStep.step, 'failed', 0, 'Échec du déploiement');
      }
      
      toast({
        title: "Échec du déploiement",
        description: "Une erreur s'est produite pendant le déploiement",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const getStepIcon = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const overallProgress = deploymentSteps.reduce((sum, step) => sum + step.progress, 0) / deploymentSteps.length;

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-tokenx">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-tokenx-purple to-tokenx-blue rounded-2xl flex items-center justify-center shadow-glow">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-primary text-glow mb-2">
                Déploiement Blockchain
              </h1>
              <p className="text-xl text-muted">VeegoxChain & Smart Contracts</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deployment Controls */}
          <div className="lg:col-span-1">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="w-5 h-5" />
                  <span>Configuration</span>
                </CardTitle>
                <CardDescription>
                  Sélectionnez le réseau et lancez le déploiement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-secondary mb-2 block">
                    Réseau cible
                  </label>
                  <Tabs value={selectedNetwork} onValueChange={(value) => setSelectedNetwork(value as 'testnet' | 'mainnet')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="testnet">Testnet</TabsTrigger>
                      <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {selectedNetwork === 'mainnet' 
                      ? 'Attention: Déploiement en production avec de vrais fonds!'
                      : 'Déploiement sur le réseau de test pour les validations'
                    }
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression globale</span>
                    <span>{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>

                <Button 
                  onClick={deployBlockchain}
                  disabled={isDeploying}
                  className="w-full btn-gradient"
                  size="lg"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Déploiement en cours...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Lancer le déploiement
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Deployment Steps */}
          <div className="lg:col-span-2">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Étapes de déploiement</span>
                </CardTitle>
                <CardDescription>
                  Suivi en temps réel du processus de déploiement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deploymentSteps.map((step, index) => (
                    <div key={step.step} className="flex items-center space-x-4 p-4 rounded-lg bg-tokenx-dark-light/30">
                      <div className="flex-shrink-0">
                        {getStepIcon(step.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-secondary">
                            {step.message}
                          </p>
                          <Badge variant={
                            step.status === 'completed' ? 'default' :
                            step.status === 'running' ? 'secondary' :
                            step.status === 'failed' ? 'destructive' : 'outline'
                          }>
                            {step.status === 'completed' ? 'Terminé' :
                             step.status === 'running' ? 'En cours' :
                             step.status === 'failed' ? 'Échec' : 'En attente'}
                          </Badge>
                        </div>
                        {step.status === 'running' && (
                          <Progress value={step.progress} className="h-1 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Network Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="card-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blockchain</CardTitle>
              <Server className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">VeegoxChain</div>
              <p className="text-xs text-muted">
                {selectedNetwork === 'testnet' ? 'Chain ID: 123456789' : 'Chain ID: 987654321'}
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
              <Code className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">7</div>
              <p className="text-xs text-muted">
                Contrats à déployer
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sécurité</CardTitle>
              <Shield className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">Multi-Sig</div>
              <p className="text-xs text-muted">
                Portefeuilles sécurisés
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDashboard;
