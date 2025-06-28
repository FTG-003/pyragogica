import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb, Play, Download, TrendingUp, Github, ExternalLink } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Peeragogy Handbook Completo',
      description: 'La guida definitiva all\'apprendimento peer-to-peer con 14 capitoli dettagliati, esempi pratici e metodologie innovative.',
      color: 'from-blue-500 to-cyan-500',
      stats: '14 capitoli'
    },
    {
      icon: Brain,
      title: 'AI Multi-Personalità',
      description: 'Chatbot intelligente con personalità accademiche, divulgative e critiche per diverse modalità di apprendimento.',
      color: 'from-purple-500 to-pink-500',
      stats: '4 personalità'
    },
    {
      icon: Users,
      title: 'Community Pyragogica',
      description: 'Spazio collaborativo per co-creazione cognitiva e apprendimento reciproco tra pari, basato sui principi del handbook.',
      color: 'from-green-500 to-teal-500',
      stats: '1.2k+ membri'
    },
    {
      icon: Zap,
      title: 'RAG Avanzato',
      description: 'Sistema di retrieval intelligente che connette contenuti del handbook, conversazioni e conoscenze in tempo reale.',
      color: 'from-orange-500 to-red-500',
      stats: '99.9% uptime'
    }
  ];

  const valueProps = [
    {
      icon: Globe,
      title: 'Accesso Democratico',
      description: 'Tutto il Peeragogy Handbook è completamente gratuito e open source, seguendo i principi di condivisione della conoscenza',
      stats: '100% contenuti gratuiti',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Etica AI',
      description: 'Trasparenza algoritmica e rispetto della privacy nel processo educativo, in linea con i valori peeragogici',
      stats: '100% tracciabilità',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Lightbulb,
      title: 'Apprendimento Attivo',
      description: 'Metodologie innovative per co-creazione e sintesi personalizzata, direttamente dal Peeragogy Handbook',
      stats: '5x engagement',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Howard Rheingold',
      role: 'Co-founder, Peeragogy Project',
      content: 'La peeragogy rappresenta il futuro dell\'educazione: collaborativa, democratica e centrata sulla comunità.',
      avatar: 'HR'
    },
    {
      name: 'Charles Jeffrey Danoff',
      role: 'Co-author, Peeragogy Handbook',
      content: 'Questo progetto dimostra come l\'apprendimento peer-to-peer possa trasformare la conoscenza in azione.',
      avatar: 'CD'
    },
    {
      name: 'Paola Ricaurte',
      role: 'Researcher, Digital Pedagogy',
      content: 'Un esempio perfetto di come la tecnologia possa servire l\'educazione democratica e inclusiva.',
      avatar: 'PR'
    }
  ];

  const handbookHighlights = [
    {
      chapter: 'Introduction',
      description: 'Scopri i principi fondamentali della peeragogy',
      icon: BookOpen
    },
    {
      chapter: 'Patterns & Use Cases',
      description: 'Pattern ricorrenti e applicazioni pratiche',
      icon: Zap
    },
    {
      chapter: 'Technologies',
      description: 'Strumenti digitali per l\'apprendimento collaborativo',
      icon: Brain
    },
    {
      chapter: 'Assessment',
      description: 'Metodologie di valutazione peer-to-peer',
      icon: Users
    }
  ];

  return (
    <div className="space-y-32">
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
              <span>Basato sul Peeragogy Handbook v4.0</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Biblioteca Digitale
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Pyragogica
                </span>
              </h1>
              
              <p className="max-w-4xl mx-auto text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                La collezione completa del <strong>Peeragogy Handbook</strong> con AI etica e strumenti per 
                l'apprendimento peer-to-peer del futuro.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <button className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25">
                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Leggi il Handbook</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
              
              <button className="group inline-flex items-center space-x-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Repository GitHub</span>
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15.4k</div>
                <div className="text-white/70 font-medium">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">14</div>
                <div className="text-white/70 font-medium">Capitoli</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">350</div>
                <div className="text-white/70 font-medium">Pagine</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">8+</div>
                <div className="text-white/70 font-medium">Autori</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Handbook Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Peeragogy Handbook</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Contenuti Principali
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Esplora i capitoli chiave del Peeragogy Handbook, la guida definitiva all'apprendimento collaborativo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {handbookHighlights.map((highlight, index) => {
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
                      {highlight.chapter}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {highlight.description}
                    </p>
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
            <span>Funzionalità Innovative</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Tecnologie all'Avanguardia
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Un ecosistema completo per l'apprendimento collaborativo con AI etica e contenuti curati dal Peeragogy Handbook
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
                    <TrendingUp className="w-4 h-4" />
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
              <span>Valori Peeragogici</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Principi Fondamentali
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
              Basato sui valori del Peeragogy Handbook: democraticità, collaborazione e condivisione della conoscenza
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
            Cosa Dicono gli Autori
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Testimonianze dirette dai creatori del Peeragogy Handbook
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
              Inizia il Tuo Viaggio Peeragogico
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Accedi gratuitamente al Peeragogy Handbook completo e scopri il futuro dell'apprendimento collaborativo
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <button className="group inline-flex items-center space-x-3 px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Leggi Gratuitamente</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group inline-flex items-center space-x-3 px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
                <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Download PDF</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center justify-center space-x-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>100% Open Source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Creative Commons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Community Driven</span>
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