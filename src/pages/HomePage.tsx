import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb, Database, Layers, Search, Infinity, Target, Sparkles, CheckCircle } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="hero-modern">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-cyan-400 to-blue-500" style={{ filter: 'blur(40px)' }}></div>
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-purple-400 to-pink-500" style={{ filter: 'blur(40px)', animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-yellow-400 to-orange-500" style={{ filter: 'blur(40px)', animationDelay: '4s' }}></div>
        </div>
        
        <div className="container-modern hero-content">
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20 animate-scale-in mb-8">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Biblioteca Digitale Infinitamente Scalabile</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main Title */}
          <div className="space-y-8">
            <h1 className="hero-title animate-fade-in-up">
              Biblioteca Digitale
              <span className="block text-gradient animate-pulse">
                Pyragogica
              </span>
            </h1>
            
            <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Una piattaforma <strong>infinitamente scalabile</strong> per risorse educative di qualità mondiale. 
              Il <strong>Manuale di Peeragogy</strong> è solo l'inizio del nostro viaggio verso l'eccellenza educativa.
            </p>
          </div>
          
          {/* Modern CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-modern btn-primary group">
              <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Esplora la Biblioteca</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="btn-modern btn-secondary group">
              <Brain className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Prova l'AI Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-modern">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="status-indicator status-info mb-6">
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

          <div className="grid-modern grid-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-modern p-8 animate-fade-in-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="status-indicator status-success">
                    <Infinity className="w-3 h-3" />
                    <span>{feature.stats}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-modern bg-slate-100">
        <div className="container-modern">
          <div className="grid-modern grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="status-indicator status-info mb-6">
                <Globe className="w-4 h-4" />
                <span>Vantaggi Chiave</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Perché Scegliere la Biblioteca Pyragogica</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card-modern p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
              <h3 className="text-2xl font-bold mb-6 text-white">Statistiche Impressionanti</h3>
              <div className="grid-modern grid-2">
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
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-modern">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="status-indicator status-success mb-6">
              <Users className="w-4 h-4" />
              <span>Testimonianze</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Cosa Dicono gli Esperti</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Testimonianze da educatori e ricercatori che credono nella scalabilità dell'educazione
            </p>
          </div>

          <div className="grid-modern grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-modern p-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-modern bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="container-modern text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Inizia il Tuo Viaggio nell'Apprendimento
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Esplora il Manuale di Peeragogy e scopri il futuro dell'apprendimento scalabile e collaborativo
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="btn-modern bg-white text-indigo-600 hover:bg-slate-100 shadow-xl">
              <Database className="w-6 h-6" />
              <span className="text-lg font-bold">Esplora la Biblioteca</span>
            </button>
            <button className="btn-modern bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600">
              <Brain className="w-6 h-6" />
              <span className="text-lg font-bold">Prova l'AI Assistant</span>
            </button>
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

export default HomePage;