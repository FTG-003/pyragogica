import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb, Database, Layers, Search, Infinity, Target, Sparkles, CheckCircle } from 'lucide-react';
import ModernButton from '../components/ui/ModernButton';
import ModernCard from '../components/ui/ModernCard';

const HomePage = () => {
  const features = [
    {
      icon: Database,
      title: 'Biblioteca Infinitamente Scalabile',
      description: 'Architettura modulare progettata per crescere da un singolo manuale a migliaia di risorse educative di qualità mondiale.',
      stats: '∞ Risorse'
    },
    {
      icon: Brain,
      title: 'AI Multi-Personalità',
      description: 'Sistema di intelligenza artificiale che si adatta a qualsiasi contenuto con personalità multiple per ogni stile di apprendimento.',
      stats: '4 Personalità'
    },
    {
      icon: Layers,
      title: 'Contenuti Strutturati',
      description: 'Sistema di categorizzazione avanzato con metadati ricchi, traduzioni multilingue e percorsi personalizzati.',
      stats: '6+ Categorie'
    },
    {
      icon: Zap,
      title: 'RAG Semantico',
      description: 'Sistema di retrieval intelligente che funziona con qualsiasi tipo di contenuto: manuali, guide, ricerche, video.',
      stats: '99.9% Uptime'
    }
  ];

  const benefits = [
    'Accesso democratico alla conoscenza di qualità',
    'Interfaccia moderna e intuitiva',
    'Sistema di ricerca semantica avanzata',
    'Supporto multilingue completo',
    'Architettura infinitamente scalabile',
    'Open source e trasparente'
  ];

  const testimonials = [
    {
      name: 'Howard Rheingold',
      role: 'Co-fondatore, Progetto Peeragogy',
      content: 'Una piattaforma che realizza la visione di una biblioteca digitale veramente collaborativa.',
      avatar: 'HR'
    },
    {
      name: 'Dr.ssa Maria Rossi',
      role: 'Ricercatrice, Scienze dell\'Educazione',
      content: 'L\'architettura modulare permette di integrare facilmente nuove metodologie educative.',
      avatar: 'MR'
    },
    {
      name: 'Prof. Giovanni Bianchi',
      role: 'Esperto, Etica AI',
      content: 'Un esempio eccellente di come l\'AI possa essere utilizzata responsabilmente nell\'educazione.',
      avatar: 'GB'
    }
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section - Rizzo Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-20 md:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-10 animate-pulse bg-gradient-to-br from-indigo-400 to-purple-500" style={{ filter: 'blur(40px)' }}></div>
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full opacity-10 animate-pulse bg-gradient-to-br from-purple-400 to-pink-500" style={{ filter: 'blur(40px)', animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full opacity-10 animate-pulse bg-gradient-to-br from-cyan-400 to-blue-500" style={{ filter: 'blur(40px)', animationDelay: '4s' }}></div>
        </div>
        
        <div className="container-modern relative z-10">
          {/* Modern Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-slate-700 text-sm font-semibold border border-slate-200/50 shadow-lg animate-scale-in">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Biblioteca Digitale Infinitamente Scalabile</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Main Title */}
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-tight animate-fade-in-up">
              Biblioteca Digitale
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Pyragogica
              </span>
            </h1>
            
            <p className="max-w-4xl mx-auto text-xl md:text-2xl text-slate-600 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Una piattaforma <strong className="text-slate-900">infinitamente scalabile</strong> per risorse educative di qualità mondiale. 
              Il <strong className="text-slate-900">Manuale di Peeragogy</strong> è solo l'inizio del nostro viaggio verso l'eccellenza educativa.
            </p>
          </div>
          
          {/* Modern CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <ModernButton
              variant="primary"
              size="lg"
              icon={<Database className="w-6 h-6" />}
              className="shadow-2xl"
            >
              Esplora la Biblioteca
            </ModernButton>
            
            <ModernButton
              variant="secondary"
              size="lg"
              icon={<Brain className="w-6 h-6" />}
            >
              Prova l'AI Assistant
            </ModernButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: '∞', label: 'Risorse Supportate', icon: Infinity },
              { value: '4', label: 'Personalità AI', icon: Brain },
              { value: '6+', label: 'Categorie', icon: Layers },
              { value: '99.9%', label: 'Uptime', icon: Target }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-indigo-600 mr-2" />
                    <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span>Tecnologie Avanzate</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Funzionalità per la Crescita Infinita
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ogni funzionalità è progettata per scalare da centinaia a milioni di utenti e risorse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ModernCard
                  key={index}
                  className="animate-fade-in-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                    <Infinity className="w-3 h-3" />
                    <span>{feature.stats}</span>
                  </div>
                </ModernCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="container-modern">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <Globe className="w-4 h-4" />
                <span>Vantaggi Chiave</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">
                Perché Scegliere la Biblioteca Pyragogica
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <ModernCard className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
              <h3 className="text-2xl font-bold mb-6 text-white">Statistiche Impressionanti</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">∞</div>
                  <div className="opacity-90">Risorse Supportate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">4</div>
                  <div className="opacity-90">Personalità AI</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">6+</div>
                  <div className="opacity-90">Categorie</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">99.9%</div>
                  <div className="opacity-90">Uptime</div>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              <span>Testimonianze</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Cosa Dicono gli Esperti
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Testimonianze da educatori e ricercatori che credono nella scalabilità dell'educazione
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ModernCard
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container-modern text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Inizia il Tuo Viaggio nell'Apprendimento
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Esplora il Manuale di Peeragogy e scopri il futuro dell'apprendimento scalabile e collaborativo
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <ModernButton
              variant="secondary"
              size="lg"
              icon={<Database className="w-6 h-6" />}
              className="bg-white text-indigo-600 hover:bg-slate-100 shadow-2xl"
            >
              Esplora la Biblioteca
            </ModernButton>
            <ModernButton
              variant="outline"
              size="lg"
              icon={<Brain className="w-6 h-6" />}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600"
            >
              Prova l'AI Assistant
            </ModernButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Infinitamente Scalabile</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-sm">Community Driven</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(HomePage);