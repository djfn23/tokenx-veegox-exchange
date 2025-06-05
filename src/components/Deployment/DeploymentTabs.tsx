
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Network, Activity, Shield } from 'lucide-react';
import NetworkActivationPanel from './NetworkActivationPanel';
import DeploymentDashboard from './DeploymentDashboard';

const DeploymentTabs = () => {
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
                Centre de Déploiement
              </h1>
              <p className="text-xl text-muted">VeegoxChain & Smart Contracts</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="deployment" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deployment" className="flex items-center space-x-2">
              <Rocket className="w-4 h-4" />
              <span>Déploiement</span>
            </TabsTrigger>
            <TabsTrigger value="activation" className="flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>Activation</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Sécurité</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deployment" className="mt-8">
            <DeploymentDashboard />
          </TabsContent>

          <TabsContent value="activation" className="mt-8">
            <NetworkActivationPanel />
          </TabsContent>

          <TabsContent value="monitoring" className="mt-8">
            <div className="text-center py-12">
              <Activity className="w-16 h-16 mx-auto text-muted mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">Monitoring en cours de développement</h3>
              <p className="text-muted">Les outils de monitoring avancés seront bientôt disponibles.</p>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-8">
            <div className="text-center py-12">
              <Shield className="w-16 h-16 mx-auto text-muted mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">Outils de sécurité en cours de développement</h3>
              <p className="text-muted">Les audits de sécurité et outils de protection seront bientôt disponibles.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeploymentTabs;
