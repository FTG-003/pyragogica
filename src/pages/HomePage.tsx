import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb, Download, TrendingUp, Github, ExternalLink, Database, Layers, Search, Infinity, Target, BarChart } from 'lucide-react';

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

  const architectureHighlights = [
    {
      title: 'Gestione Contenuti Modulare',
      description: 'Sistema progettato per qualsiasi tipo di risorsa educativa',
      icon: Database,
      metric: '∞ Formati'
    },
    {
      title: 'Categorizzazione Intelligente',
      description: 'Tassonomia flessibile e tag semantici auto-espandenti',
      icon: Layers,
      metric: '6+ Categorie'
    },
    {
      title: 'Ricerca Semantica Avanzata',
      description: 'Trova contenuti correlati attraverso significato e contesto',
      icon: Search,
      metric: 'AI-Powered'
    },
    {
      title: 'Integrazione AI Universale',
      description: 'Ogni risorsa è potenziata dall\'intelligenza artificiale',
      icon: Brain,
      metric: 'RAG Completo'
    }
  ];

  const scalabilityMetrics = [
    { metric: 'Risorse Supportate', value: '∞', description: 'Nessun limite teorico alla crescita', icon: Infinity },
    { metric: 'Formati Contenuto', value: '10+', description: 'PDF, HTML, Video, Audio, Dataset...', icon: Layers },
    { metric: 'Lingue Supportate', value: 'Tutte', description: 'Sistema di traduzione AI integrato', icon: Globe },
    { metric: 'Categorie', value: 'Dinamiche', description: 'Tassonomia auto-espandente', icon: Target }
  ];

  const alphaTestHighlight = {
    title: 'Alpha Test: Manuale di Peeragogy',
    description: 'Il primo contenuto della nostra biblioteca scalabile',
    stats: {
      chapters: 14,
      pages: 350,
      authors: 7,
      translations: 'IT/EN'
    }
  };

  return (
    <div className="space-y-32 pb-20">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="text-center space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Biblioteca Digitale Infinitamente Scalabile</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Main Title - FIXED VISIBILITY AND SPACING */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Biblioteca Digitale
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Pyragogica
                </span>
              </h1>
              
              <p className="max-w-4xl mx-auto text-xl md:text-2xl text-white/80 leading-relaxed font-light mt-8">
                Una piattaforma <strong>infinitamente scalabile</strong> per risorse educative di qualità mondiale. 
                Il <strong>Manuale di Peeragogy</strong> è solo l'inizio del nostro viaggio.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <button className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25">
                <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Esplora la Biblioteca</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
              
              <button className="group inline-flex items-center space-x-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Architettura Open Source</span>
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Scalability Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
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
        </div>
      </section>

      {/* Alpha Test Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Alpha Test Content</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Il Primo Contenuto della Biblioteca
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Il Manuale di Peeragogy dimostra le capacità complete della nostra piattaforma scalabile
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                  Alpha Test
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                  Traduzione Completa
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-semibold">
                  ⭐ Primo Contenuto
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-4xl font-bold">{alphaTestHighlight.title}</h3>
                <p className="text-xl text-indigo-100 leading-relaxed">{alphaTestHighlight.description}</p>
                <p className="text-indigo-200 text-sm">
                  Dimostra: gestione contenuti complessi, traduzioni, metadati ricchi, navigazione capitoli
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{alphaTestHighlight.stats.chapters}</div>
                  <div className="text-indigo-200">Capitoli</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{alphaTestHighlight.stats.pages}</div>
                  <div className="text-indigo-200">Pagine</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{alphaTestHighlight.stats.authors}</div>
                  <div className="text-indigo-200">Autori</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{alphaTestHighlight.stats.translations}</div>
                  <div className="text-indigo-200">Lingue</div>
                </div>
              </div>
              
              <button className="group inline-flex items-center space-x-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Leggi il Manuale Alpha</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-64 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/20">
                <div className="text-center space-y-4">
                  <BookOpen className="w-32 h-32 text-white/60 mx-auto" />
                  <div className="text-white/80 font-semibold">Alpha Test Content</div>
                  <div className="text-white/60 text-sm">Primo di migliaia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            <Layers className="w-4 h-4" />
            <span>Architettura Scalabile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Progettata per Crescere Infinitamente
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Ogni componente è modulare e progettato per supportare la crescita da un singolo manuale a milioni di risorse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {architectureHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-slate-100"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative space-y-6">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {highlight.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-semibold text-indigo-700">
                      <BarChart className="w-4 h-4" />
                      <span>{highlight.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            <span>Tecnologie Scalabili</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Funzionalità per la Crescita Infinita
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Ogni funzionalità è progettata per scalare da centinaia a milioni di utenti e risorse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-slate-100"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
                    <Infinity className="w-4 h-4" />
                    <span>{feature.stats}</span>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Value Proposition */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0%2011.046-8.954%2020-20%2020s-20-8.954-20-20%208.954-20%2020-20%2020%208.954%2020%2020z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/20">
              <Globe className="w-4 h-4" />
              <span>Valori Fondamentali</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Principi per la Scalabilità Globale
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
              Ogni decisione architettonica è guidata da principi che garantiscono crescita sostenibile e accesso democratico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <div key={index} className="group text-center space-y-8">
                  <div className={`inline-flex p-6 bg-gradient-to-br ${prop.color} rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
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
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <Users className="w-4 h-4" />
            <span>Voci della Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Cosa Dicono gli Esperti
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Testimonianze da educatori, ricercatori e innovatori che credono nella scalabilità dell'educazione
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
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
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
      </section>

      {/* Enhanced CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Inizia il Viaggio nella Biblioteca Infinita
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Esplora il Manuale di Peeragogy e scopri il futuro dell'apprendimento scalabile e collaborativo
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <button className="group inline-flex items-center space-x-3 px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Esplora la Biblioteca</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group inline-flex items-center space-x-3 px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
                <Brain className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Prova l'AI Assistant</span>
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
      </section>
    </div>
  );
};

export default HomePage;