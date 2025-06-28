import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Contenuti Curati',
      description: 'Biblioteca di risorse educative peer-to-peer, eticamente verificate e continuamente aggiornate.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI Multi-Personalità',
      description: 'Chatbot intelligente con personalità accademiche, divulgative e critiche per diverse modalità di apprendimento.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community Pyragogica',
      description: 'Spazio collaborativo per co-creazione cognitiva e apprendimento reciproco tra pari.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'RAG Avanzato',
      description: 'Sistema di retrieval intelligente che connette contenuti, conversazioni e conoscenze in tempo reale.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const valueProps = [
    {
      icon: Globe,
      title: 'Accesso Democratico',
      description: 'Conoscenza libera e premium bilanciata per sostenibilità e inclusività',
      stats: '70% contenuti gratuiti'
    },
    {
      icon: Shield,
      title: 'Etica AI',
      description: 'Trasparenza algoritmica e rispetto della privacy nel processo educativo',
      stats: '100% tracciabilità'
    },
    {
      icon: Lightbulb,
      title: 'Apprendimento Attivo',
      description: 'Metodologie innovative per co-creazione e sintesi personalizzata',
      stats: '5x engagement'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Innovazione nell'Educazione AI-Driven</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Biblioteca Digitale
              <span className="block bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Pyragogica
              </span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/80 leading-relaxed">
              Un hub di conoscenza interattiva dove contenuti educativi, AI etica e co-creazione cognitiva 
              si incontrano per trasformare l'apprendimento peer-to-peer.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
                <span>Esplora la Biblioteca</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                <Brain className="w-5 h-5" />
                <span>Prova l'AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Funzionalità Innovative
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Tecnologie all'avanguardia per un'esperienza educativa immersiva e personalizzata
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Valore per l'Ecosistema
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-300">
              Impatto misurabile su apprendimento, comunità e innovazione educativa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <div key={index} className="text-center space-y-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">{prop.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{prop.description}</p>
                    <div className="inline-flex px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-full text-lg">
                      {prop.stats}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto a Rivoluzionare l'Apprendimento?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti alla community pyragogica e sperimenta il futuro dell'educazione peer-to-peer
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-slate-100 transition-all transform hover:scale-105">
              <span>Inizia Gratuitamente</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-all">
              <Users className="w-5 h-5" />
              <span>Membership Very</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;