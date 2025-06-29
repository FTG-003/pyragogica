import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Lightbulb, Database, Layers, Search, Infinity, Target, Sparkles, CheckCircle, Award, TrendingUp, Heart } from 'lucide-react';
import ModernButton from '../components/ui/ModernButton';
import ModernCard from '../components/ui/ModernCard';

const HomePage = () => {
  const features = [
    {
      icon: Database,
      title: 'Biblioteca Infinitamente Scalabile',
      description: 'Architettura modulare progettata per crescere da un singolo manuale a migliaia di risorse educative di qualità mondiale.',
      stats: '∞ Risorse',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI Multi-Personalità',
      description: 'Sistema di intelligenza artificiale che si adatta a qualsiasi contenuto con personalità multiple per ogni stile di apprendimento.',
      stats: '4 Personalità',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Layers,
      title: 'Contenuti Strutturati',
      description: 'Sistema di categorizzazione avanzato con metadati ricchi, traduzioni multilingue e percorsi personalizzati.',
      stats: '6+ Categorie',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'RAG Semantico',
      description: 'Sistema di retrieval intelligente che funziona con qualsiasi tipo di contenuto: manuali, guide, ricerche, video.',
      stats: '99.9% Uptime',
      color: 'from-orange-500 to-red-500'
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
      avatar: 'HR',
      rating: 5
    },
    {
      name: 'Dr.ssa Maria Rossi',
      role: 'Ricercatrice, Scienze dell\'Educazione',
      content: 'L\'architettura modulare permette di integrare facilmente nuove metodologie educative.',
      avatar: 'MR',
      rating: 5
    },
    {
      name: 'Prof. Giovanni Bianchi',
      role: 'Esperto, Etica AI',
      content: 'Un esempio eccellente di come l\'AI possa essere utilizzata responsabilmente nell\'educazione.',
      avatar: 'GB',
      rating: 5
    }
  ];

  const stats = [
    { value: '∞', label: 'Risorse Supportate', icon: Infinity, color: 'text-blue-600' },
    { value: '4', label: 'Personalità AI', icon: Brain, color: 'text-purple-600' },
    { value: '6+', label: 'Categorie', icon: Layers, color: 'text-green-600' },
    { value: '99.9%', label: 'Uptime', icon: Target, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section Completamente Ridisegnata */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Animato */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-indigo-400 to-purple-500 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-purple-400 to-pink-500 blur-3xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-cyan-400 to-blue-500 blur-3xl" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container-modern relative z-10">
          {/* Badge Moderno */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-xl rounded-full text-slate-700 text-lg font-bold border-2 border-indigo-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="relative">
                <Star className="w-6 h-6 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 w-6 h-6 text-yellow-400 animate-ping">
                  <Star className="w-6 h-6" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Biblioteca Digitale Infinitamente Scalabile
              </span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>
          
          {/* Titolo Principale Drammatico */}
          <div className="text-center space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-none tracking-tight">
              <span className="block">Biblioteca</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Pyragogica
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-light text-slate-600 mt-4">
                Il Futuro dell'Apprendimento
              </span>
            </h1>
            
            <p className="max-w-5xl mx-auto text-2xl md:text-3xl text-slate-600 leading-relaxed font-light">
              Una piattaforma <strong className="text-slate-900 font-bold">rivoluzionaria</strong> per risorse educative di qualità mondiale. 
              Il <strong className="text-slate-900 font-bold">Manuale di Peeragogy</strong> è solo l'inizio del nostro viaggio verso 
              <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> l'eccellenza educativa infinita</strong>.
            </p>
          </div>
          
          {/* CTA Buttons Spettacolari */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <ModernButton
              variant="primary"
              size="lg"
              icon={<Database className="w-8 h-8" />}
              className="text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              🚀 Esplora la Biblioteca
            </ModernButton>
            
            <ModernButton
              variant="secondary"
              size="lg"
              icon={<Brain className="w-8 h-8" />}
              className="text-xl px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 border-2 border-indigo-300 hover:border-indigo-500"
            >
              🤖 Prova l'AI Assistant
            </ModernButton>
          </div>

          {/* Stats Animati */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-4 transform group-hover:scale-125 transition-all duration-500">
                    <div className="relative">
                      <Icon className={`w-8 h-8 ${stat.color} mr-3`} />
                      <div className="absolute inset-0 w-8 h-8 animate-ping opacity-30">
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-500">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-slate-600 font-bold text-lg group-hover:text-slate-900 transition-colors duration-500">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section Completamente Nuova */}
      <section className="py-32 bg-gradient-to-br from-white to-slate-100">
        <div className="container-modern">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-full text-lg font-bold mb-8 animate-bounce">
              <Zap className="w-6 h-6 animate-spin" />
              <span>Tecnologie Rivoluzionarie</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8">
              Funzionalità per la 
              <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Crescita Infinita
              </span>
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Ogni funzionalità è progettata per scalare da centinaia a <strong>milioni di utenti</strong> e risorse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ModernCard
                  key={index}
                  className="group hover:scale-110 transition-all duration-500 hover:shadow-3xl border-2 border-transparent hover:border-indigo-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-lg font-bold border-2 border-green-200 group-hover:scale-110 transition-all duration-500">
                    <Infinity className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>{feature.stats}</span>
                  </div>
                </ModernCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section Drammatica */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container-modern relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-lg font-bold mb-8">
                <Globe className="w-6 h-6 animate-pulse" />
                <span>Vantaggi Rivoluzionari</span>
              </div>
              <h2 className="text-5xl font-black mb-10 text-white">
                Perché Scegliere la 
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Biblioteca Pyragogica
                </span>
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-500">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl text-slate-200 group-hover:text-white transition-colors duration-500 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <ModernCard className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/30 text-white hover:scale-105 transition-all duration-500">
              <h3 className="text-3xl font-black mb-8 text-white">Statistiche Impressionanti</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center group">
                  <div className="text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">∞</div>
                  <div className="text-white/90 font-bold">Risorse Supportate</div>
                </div>
                <div className="text-center group">
                  <div className="text-6xl font-black mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">4</div>
                  <div className="text-white/90 font-bold">Personalità AI</div>
                </div>
                <div className="text-center group">
                  <div className="text-6xl font-black mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">6+</div>
                  <div className="text-white/90 font-bold">Categorie</div>
                </div>
                <div className="text-center group">
                  <div className="text-6xl font-black mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">99.9%</div>
                  <div className="text-white/90 font-bold">Uptime</div>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      </section>

      {/* Testimonials Spettacolari */}
      <section className="py-32 bg-gradient-to-br from-white to-indigo-50">
        <div className="container-modern">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 text-green-700 rounded-full text-lg font-bold mb-8">
              <Users className="w-6 h-6" />
              <span>Testimonianze Eccezionali</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Cosa Dicono gli 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Esperti Mondiali
              </span>
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Testimonianze da educatori e ricercatori che credono nella <strong>scalabilità infinita dell'educazione</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <ModernCard
                key={index}
                className="group hover:scale-110 transition-all duration-500 hover:shadow-3xl border-2 border-transparent hover:border-purple-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-slate-700 text-xl leading-relaxed italic mb-8 font-medium">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-xl group-hover:scale-125 transition-all duration-500">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">{testimonial.name}</div>
                    <div className="text-slate-600 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Finale Epica */}
      <section className="py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Animato */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-white to-yellow-300 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-cyan-300 to-white blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container-modern text-center text-white relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-8 text-white">
            Inizia il Tuo Viaggio
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              nell'Apprendimento Infinito
            </span>
          </h2>
          <p className="text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
            Esplora il <strong>Manuale di Peeragogy</strong> e scopri il futuro dell'apprendimento 
            <strong> scalabile, collaborativo e rivoluzionario</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <ModernButton
              variant="secondary"
              size="lg"
              icon={<Database className="w-8 h-8" />}
              className="text-2xl px-16 py-8 bg-white text-indigo-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 font-black"
            >
              🚀 Esplora la Biblioteca
            </ModernButton>
            <ModernButton
              variant="outline"
              size="lg"
              icon={<Brain className="w-8 h-8" />}
              className="text-2xl px-16 py-8 bg-transparent border-4 border-white text-white hover:bg-white hover:text-indigo-600 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 font-black"
            >
              🤖 Prova l'AI Assistant
            </ModernButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-80">
            <div className="flex items-center gap-3 group">
              <Shield className="w-8 h-8 group-hover:scale-125 transition-all duration-500" />
              <span className="text-xl font-bold">Infinitamente Scalabile</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Globe className="w-8 h-8 group-hover:scale-125 transition-all duration-500" />
              <span className="text-xl font-bold">Open Source</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Heart className="w-8 h-8 group-hover:scale-125 transition-all duration-500" />
              <span className="text-xl font-bold">Community Driven</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(HomePage);