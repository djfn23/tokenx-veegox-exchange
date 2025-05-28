
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Mail, Phone, Search, HelpCircle } from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'Comment créer mon premier token sur TokenX ?',
      answer: 'Pour créer votre premier token, connectez votre wallet MetaMask, allez dans la section "Créer un Token", remplissez les informations requises (nom, symbole, supply) et cliquez sur "Déployer". Les frais de gas seront automatiquement calculés.'
    },
    {
      question: 'Quels sont les frais de transaction ?',
      answer: 'TokenX ne prend que 0.3% de commission sur les trades. Les frais de gas Ethereum sont variables selon la congestion du réseau. Nous affichons toujours une estimation avant la transaction.'
    },
    {
      question: 'Mon token est-il sécurisé ?',
      answer: 'Tous les smart contracts sont audités et open-source. Vos tokens sont déployés directement sur Ethereum via des contrats vérifiés. TokenX n\'a jamais accès à vos fonds privés.'
    },
    {
      question: 'Comment connecter mon wallet ?',
      answer: 'TokenX supporte MetaMask, WalletConnect et Coinbase Wallet. Cliquez sur "Connecter Wallet" et sélectionnez votre portefeuille préféré. Assurez-vous d\'être sur le réseau Ethereum.'
    },
    {
      question: 'Puis-je annuler une transaction ?',
      answer: 'Une fois qu\'une transaction est confirmée sur la blockchain, elle ne peut plus être annulée. Vous pouvez cependant accélérer ou remplacer une transaction en attente en augmentant les frais de gas.'
    },
    {
      question: 'Comment récupérer mes tokens perdus ?',
      answer: 'Si vous avez perdu l\'accès à votre wallet, TokenX ne peut pas récupérer vos fonds. Cependant, si vous avez votre phrase de récupération, vous pouvez restaurer votre wallet sur n\'importe quelle application compatible.'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Chat en Direct',
      description: 'Réponse immédiate 24h/7j',
      action: 'Démarrer le Chat',
      color: 'text-green-400'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Réponse sous 24h',
      action: 'support@tokenx.veegox.com',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      title: 'Support Téléphonique',
      description: 'Lun-Ven 9h-18h',
      action: '+33 1 23 45 67 89',
      color: 'text-purple-400'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-tokenx-purple to-tokenx-blue">
            Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Centre d'Aide TokenX
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions ou contactez notre équipe support
          </p>
        </div>

        {/* Search */}
        <Card className="card-gradient border border-gray-800/50 mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher dans la FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="card-gradient border border-gray-800/50 hover:border-gray-700 transition-colors">
              <CardHeader className="text-center">
                <method.icon className={`w-10 h-10 mx-auto mb-3 ${method.color}`} />
                <CardTitle className="text-white">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full btn-gradient">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="card-gradient border border-gray-800/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-tokenx-purple" />
              <CardTitle className="text-white">Questions Fréquentes</CardTitle>
            </div>
            <CardDescription>
              {filteredFaqs.length} question(s) trouvée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                  <AccordionTrigger className="text-left text-white hover:text-tokenx-purple">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Aucune question trouvée pour "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Voir toutes les questions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="card-gradient border border-gray-800/50 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Contactez-nous</CardTitle>
            <CardDescription>
              Une question spécifique ? Envoyez-nous un message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Votre nom"
                className="bg-gray-900 border-gray-700 text-white"
              />
              <Input
                placeholder="Votre email"
                type="email"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Input
              placeholder="Sujet"
              className="bg-gray-900 border-gray-700 text-white"
            />
            <Textarea
              placeholder="Décrivez votre problème..."
              className="bg-gray-900 border-gray-700 text-white min-h-[120px]"
            />
            <Button className="w-full btn-gradient">
              Envoyer le Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
