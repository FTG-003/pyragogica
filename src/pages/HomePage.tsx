import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Database, Layers, CheckCircle, Crown, Lock, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNavigateToLibrary = () => {
    if (onNavigate) {
      onNavigate('library');
    } else {
      // Fallback per navigazione diretta
      window.location.hash = '#library';
    }
  };

  const handleNavigateToChatbot = () => {
    if (onNavigate) {
      onNavigate('chatbot');
    } else {
      // Fallback per navigazione diretta
      window.location.hash = '#chatbot';
    }
  };

  const features = [
    {
      icon: Database,
      title: 'Hub di Conoscenza Interattiva',
      description: 'Indicizzazione e organizzazione intelligente di testi educativi e filosofici con sistema di categorizzazione avanzato.',
      stats: 'Contenuti Illimitati'
    },
    {
      icon: Brain,
      title: 'Chatbot Multi-Personalità RAG',
      description: 'Sistema di intelligenza artificiale con 4 personalità distinte: Accademico, Divulgatore, Critico e Filosofico per ogni stile di apprendimento.',
      stats: '4 Personalità AI'
    },
    {
      icon: Crown,
      title: 'Contenuti Open & Premium',
      description: 'Distinzione intelligente tra risorse gratuite e premium con accesso libero o a pagamento per contenuti specifici.',
      stats: 'Accesso Flessibile'
    },
    {
      icon: Sparkles,
      title: 'Community "Very" Immersiva',
      description: 'Esperienza esclusiva per membri della community pyragogica con funzionalità avanzate di co-creazione cognitiva.',
      stats: 'Esperienza VIP'
    }
  ];

  const benefits = [
    'Accesso a contenuti peer-to-peer di qualità mondiale',
    'Sistema RAG per sintesi e interrogazione intelligente',
    'Distinzione chiara tra contenuti open e premium',
    'Chatbot multi-personalità per ogni stile di apprendimento',
    'Hub interattivo per co-creazione cognitiva',
    'Community "Very" con accesso esclusivo'
  ];

  const contentTypes = [
    {
      icon: BookOpen,
      title: 'Apprendimento Peer-to-Peer',
      description: 'Metodologie e pratiche collaborative',
      access: 'Open + Premium'
    },
    {
      icon: Shield,
      title: 'Etica AI',
      description: 'Principi e linee guida per AI responsabile',
      access: 'Open + Premium'
    },
    {
      icon: Brain,
      title: 'Co-creazione Cognitiva',
      description: 'Tecniche di intelligenza collettiva',
      access: 'Premium + Very'
    },
    {
      icon: Users,
      title: 'Filosofia Educativa',
      description: 'Fondamenti teorici e pratici',
      access: 'Open + Premium'
    }
  ];

  const testimonials = [
    {
      name: 'Howard Rheingold',
      role: 'Co-fondatore, Progetto Peeragogy',
      content: 'Una piattaforma che realizza la visione di una biblioteca digitale veramente collaborativa e interattiva.',
      avatar: 'HR'
    },
    {
      name: 'Dr.ssa Maria Rossi',
      role: 'Ricercatrice, Scienze dell\'Educazione',
      content: 'Il sistema RAG multi-personalità offre un\'esperienza di apprendimento completamente nuova e personalizzata.',
      avatar: 'MR'
    },
    {
      name: 'Prof. Giovanni Bianchi',
      role: 'Esperto, Etica AI',
      content: 'Un esempio eccellente di come l\'AI possa essere utilizzata eticamente per democratizzare l\'accesso alla conoscenza.',
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
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20 animate-scale-in mb-8">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Hub di Conoscenza Interattiva</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.85] animate-fade-in-up">
              Biblioteca Digitale
              <span className="block text-gradient animate-pulse" style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '0.1em' // Fix per lettere tagliate
              }}>
                Pyragogica
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Un <strong>hub di conoscenza interattiva</strong> dove contenuti liberi e premium relativi all'<strong>apprendimento peer-to-peer</strong>, 
              all'<strong>etica AI</strong> e alla <strong>co-creazione cognitiva</strong> possono essere consultati, acquistati, sintetizzati e 
              interrogati tramite un sistema di <strong>chatbot con RAG</strong>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={handleNavigateToLibrary}
              className="btn-modern btn-primary group cursor-pointer"
            >
              <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Esplora la Biblioteca</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleNavigateToChatbot}
              className="btn-modern btn-secondary group cursor-pointer"
            >
              <Brain className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Prova il Chatbot RAG</span>
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
              <span>Sistema RAG Avanzato</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Funzionalità del Sistema
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Un ecosistema completo per l'apprendimento collaborativo e la co-creazione cognitiva
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
                    <span>{feature.stats}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="section-modern bg-slate-100">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="status-indicator status-info mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Tipologie di Contenuto</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Aree di Conoscenza</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Contenuti specializzati organizzati per massimizzare l'apprendimento collaborativo
            </p>
          </div>

          <div className="grid-modern grid-4">
            {contentTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="card-modern p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{type.description}</p>
                  <div className="flex items-center space-x-2">
                    {type.access.includes('Open') && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Open</span>
                    )}
                    {type.access.includes('Premium') && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Premium</span>
                    )}
                    {type.access.includes('Very') && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Very</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-modern">
        <div className="container-modern">
          <div className="grid-modern grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="status-indicator status-info mb-6">
                <Globe className="w-4 h-4" />
                <span>Vantaggi Chiave</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Perché Scegliere Pyragogica</h2>
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
              <h3 className="text-2xl font-bold mb-6 text-white">Capacità del Sistema</h3>
              <div className="grid-modern grid-2">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">RAG</div>
                  <div className="opacity-90">Retrieval Augmented</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">4</div>
                  <div className="opacity-90">Personalità AI</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">∞</div>
                  <div className="opacity-90">Contenuti Scalabili</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="opacity-90">Disponibilità</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-modern bg-slate-100">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="status-indicator status-success mb-6">
              <Users className="w-4 h-4" />
              <span>Testimonianze</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Cosa Dicono gli Esperti</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Feedback da educatori e ricercatori che utilizzano il sistema RAG per l'apprendimento collaborativo
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
            Inizia la Tua Esperienza di Apprendimento
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Accedi al hub di conoscenza interattiva e scopri il potere del chatbot RAG multi-personalità
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleNavigateToLibrary}
              className="btn-modern bg-white text-indigo-600 hover:bg-slate-100 shadow-xl cursor-pointer"
            >
              <Database className="w-6 h-6" />
              <span className="text-lg font-bold">Esplora Contenuti</span>
            </button>
            <button 
              onClick={handleNavigateToChatbot}
              className="btn-modern bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 cursor-pointer"
            >
              <Brain className="w-6 h-6" />
              <span className="text-lg font-bold">Prova il Chatbot RAG</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Contenuti Open & Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="text-sm">RAG Multi-Personalità</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Community "Very"</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;