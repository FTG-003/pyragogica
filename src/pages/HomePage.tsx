import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb, Download, TrendingUp, Github, ExternalLink, Database, Layers, Search, Infinity, Target, BarChart, Sparkles } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Database,
      title: 'Biblioteca Infinitamente Scalabile',
      description: 'Architettura modulare progettata per crescere da un singolo manuale a migliaia di risorse educative di qualità mondiale.',
      color: 'from-blue-500 to-cyan-500',
      stats: '∞ Risorse Supportate'
    },
    {
      icon: Brain,
      title: 'AI Multi-Personalità Adattiva',
      description: 'Sistema di intelligenza artificiale che si adatta a qualsiasi contenuto della biblioteca, con personalità multiple per ogni stile di apprendimento.',
      color: 'from-purple-500 to-pink-500',
      stats: '4+ Personalità AI'
    },
    {
      icon: Layers,
      title: 'Contenuti Strutturati e Interconnessi',
      description: 'Sistema di categorizzazione avanzato con metadati ricchi, traduzioni multilingue e percorsi di apprendimento personalizzati.',
      color: 'from-green-500 to-teal-500',
      stats: '6+ Categorie Espandibili'
    },
    {
      icon: Zap,
      title: 'RAG Universale e Semantico',
      description: 'Sistema di retrieval intelligente che funziona con qualsiasi tipo di contenuto: manuali, guide, ricerche, video, dataset.',
      color: 'from-orange-500 to-red-500',
      stats: '99.9% Uptime Garantito'
    }
  ];

  const valueProps = [
    {
      icon: Globe,
      title: 'Accesso Democratico Globale',
      description: 'Piattaforma open source progettata per rendere la conoscenza di qualità accessibile a tutti, ovunque nel mondo, in qualsiasi lingua',
      stats: '100% Open Source',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Etica AI e Privacy by Design',
      description: 'Trasparenza algoritmica e rispetto della privacy in ogni interazione, seguendo i più alti standard etici internazionali',
      stats: '100% Tracciabilità',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Lightbulb,
      title: 'Apprendimento Modulare Interconnesso',
      description: 'Ogni risorsa è progettata per integrarsi perfettamente con le altre, creando percorsi di apprendimento coerenti e personalizzati',
      stats: 'Integrazione Totale',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Howard Rheingold',
      role: 'Co-fondatore, Progetto Peeragogy',
      content: 'Una piattaforma che realizza la visione di una biblioteca digitale veramente collaborativa e infinitamente scalabile.',
      avatar: 'HR'
    },
    {
      name: 'Dr.ssa Maria Rossi',
      role: 'Ricercatrice, Scienze dell\'Educazione',
      content: 'L\'architettura modulare permette di integrare facilmente nuove ricerche e metodologie educative senza limiti.',
      avatar: 'MR'
    },
    {
      name: 'Prof. Giovanni Bianchi',
      role: 'Esperto, Etica AI',
      content: 'Un esempio eccellente di come l\'AI possa essere utilizzata responsabilmente nell\'educazione su scala globale.',
      avatar: 'GB'
    }
  ];

  const scalabilityMetrics = [
    { metric: 'Risorse Supportate', value: '∞', description: 'Nessun limite teorico alla crescita', icon: Infinity },
    { metric: 'Formati Contenuto', value: '10+', description: 'PDF, HTML, Video, Audio, Dataset...', icon: Layers },
    { metric: 'Lingue Supportate', value: 'Tutte', description: 'Sistema di traduzione AI integrato', icon: Globe },
    { metric: 'Categorie', value: 'Dinamiche', description: 'Tassonomia auto-espandente', icon: Target }
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Modern Hero Section */}
      <section className="hero-modern">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 animate-pulse"
               style={{
                 background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                 filter: 'blur(40px)'
               }}></div>
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full opacity-20 animate-pulse"
               style={{
                 background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                 filter: 'blur(40px)',
                 animationDelay: '2s'
               }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full opacity-20 animate-pulse"
               style={{
                 background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                 filter: 'blur(40px)',
                 animationDelay: '4s'
               }}></div>
        </div>
        
        <div className="container-modern hero-content">
          {/* Modern Badge */}
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20 animate-scale-in">
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
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-primary group">
              <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Esplora la Biblioteca</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="btn-secondary group">
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Architettura Open Source</span>
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Scalability Metrics */}
          <div className="grid-4 pt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {scalabilityMetrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Icon className="w-8 h-8 text-cyan-400 mr-2" />
                    <div className="text-3xl md:text-4xl font-bold text-white">{item.value}</div>
                  </div>
                  <div className="text-white/70 font-medium">{item.metric}</div>
                  <div className="text-white/50 text-sm mt-1">{item.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="section-modern">
        <div className="container-modern">
          <div className="text-center space-y-6 mb-20">
            <div className="status-indicator status-info">
              <Zap className="w-4 h-4" />
              <span>Tecnologie Scalabili</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Funzionalità per la Crescita Infinita
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ogni funzionalità è progettata per scalare da centinaia a milioni di utenti e risorse
            </p>
          </div>

          <div className="grid-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="resource-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                       style={{
                         background: `linear-gradient(135deg, ${feature.color.split(' ')[0].replace('from-', '#')} 0%, ${feature.color.split(' ')[2].replace('to-', '#')} 100%)`
                       }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="resource-title group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="status-indicator status-info">
                      <Infinity className="w-4 h-4" />
                      <span>{feature.stats}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Value Proposition */}
      <section className="relative overflow-hidden">
        <div className="hero-modern">
          <div className="container-modern section-modern">
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/20">
                <Globe className="w-4 h-4" />
                <span>Valori Fondamentali</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Principi per la Scalabilità Globale
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Ogni decisione architettonica è guidata da principi che garantiscono crescita sostenibile e accesso democratico
              </p>
            </div>

            <div className="grid-3">
              {valueProps.map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <div key={index} className="group text-center space-y-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className={`inline-flex p-6 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                         style={{
                           background: `linear-gradient(135deg, ${prop.color.split(' ')[0].replace('from-', '#')} 0%, ${prop.color.split(' ')[2].replace('to-', '#')} 100%)`
                         }}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {prop.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        {prop.description}
                      </p>
                      <div className="inline-flex px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-2xl text-xl shadow-lg">
                        {prop.stats}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Testimonials */}
      <section className="section-modern">
        <div className="container-modern">
          <div className="text-center space-y-6 mb-20">
            <div className="status-indicator status-success">
              <Users className="w-4 h-4" />
              <span>Voci della Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Cosa Dicono gli Esperti
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Testimonianze da educatori, ricercatori e innovatori che credono nella scalabilità dell'educazione
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-modern p-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                         style={{
                           background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                         }}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.name}</div>
                      <div className="text-slate-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="section-modern">
        <div className="container-modern">
          <div className="relative rounded-3xl p-12 text-center text-white overflow-hidden shadow-modern"
               style={{
                 background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)'
               }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                   }}></div>
            </div>
            
            <div className="relative space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Inizia il Viaggio nella Biblioteca Infinita
              </h2>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Esplora il Manuale di Peeragogy e scopri il futuro dell'apprendimento scalabile e collaborativo
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                <button className="btn-modern bg-white text-indigo-600 hover:bg-slate-100 shadow-2xl group">
                  <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg font-bold">Esplora la Biblioteca</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="btn-modern border-2 border-white text-white hover:bg-white hover:text-indigo-600 group">
                  <Brain className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg font-bold">Prova l'AI Assistant</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center space-x-8 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Infinitamente Scalabile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Open Source</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Community Driven</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Infinity className="w-5 h-5" />
                    <span>Crescita Illimitata</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;