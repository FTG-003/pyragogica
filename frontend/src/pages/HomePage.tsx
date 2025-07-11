import React from 'react';
import { BookOpen, Brain, Users, Zap, ArrowRight, Star, Globe, Shield, Database, Layers, CheckCircle, Crown, Lock, Sparkles, Heart, Lightbulb, Target } from 'lucide-react';

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNavigateToLibrary = () => {
    if (onNavigate) {
      onNavigate('library');
    } else {
      window.location.hash = '#library';
    }
  };

  const handleNavigateToChatbot = () => {
    if (onNavigate) {
      onNavigate('chatbot');
    } else {
      window.location.hash = '#chatbot';
    }
  };

  const features = [
    {
      icon: Database,
      title: 'Dal Testo al Dialogo: L\'Intelligenza prende Forma',
      description: 'Indicizzazione e organizzazione intelligente di testi educativi e filosofici con sistema di categorizzazione avanzato.',
      stats: 'Contenuti Illimitati',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Brain,
      title: 'Chatbot Multi-Personalità RAG',
      description: 'Sistema di intelligenza artificiale con 4 personalità distinte: Accademico, Divulgatore, Critico e Filosofico per ogni stile di apprendimento.',
      stats: '4 Personalità AI',
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      icon: Crown,
      title: 'Contenuti Open & Premium',
      description: 'Distinzione intelligente tra risorse gratuite e premium con accesso libero o a pagamento per contenuti specifici.',
      stats: 'Accesso Flessibile',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Sparkles,
      title: 'Community "Very" Immersiva',
      description: 'Esperienza esclusiva per membri della community pyragogica con funzionalità avanzate di co-creazione cognitiva.',
      stats: 'Esperienza VIP',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const benefits = [
    { text: 'Accesso a contenuti peer-to-peer di qualità mondiale', icon: Globe },
    { text: 'Sistema RAG per sintesi e interrogazione intelligente', icon: Brain },
    { text: 'Distinzione chiara tra contenuti open e premium', icon: Shield },
    { text: 'Chatbot multi-personalità per ogni stile di apprendimento', icon: Users },
    { text: 'Hub interattivo per co-creazione cognitiva', icon: Lightbulb },
    { text: 'Community "Very" con accesso esclusivo', icon: Crown }
  ];

  const contentTypes = [
    {
      icon: BookOpen,
      title: 'Apprendimento Peer-to-Peer',
      description: 'Metodologie e pratiche collaborative',
      access: 'Open + Premium',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Etica AI',
      description: 'Principi e linee guida per AI responsabile',
      access: 'Open + Premium',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: 'Co-creazione Cognitiva',
      description: 'Tecniche di intelligenza collettiva',
      access: 'Premium + Very',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Filosofia Educativa',
      description: 'Fondamenti teorici e pratici',
      access: 'Open + Premium',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Dr.ssa Sofia Ricci',
      role: 'Esperta di Intelligenza Collettiva e Apprendimento Adattivo',
      content: 'Un ambiente dinamico che fonde l\'intelligenza artificiale con la saggezza collettiva per un\'esperienza di apprendimento senza precedenti',
      avatar: 'HR',
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      name: 'Dr.ssa Maria Rossi',
      role: 'Ricercatrice, Scienze dell\'Educazione',
      content: 'Il sistema RAG multi-personalità offre un\'esperienza di apprendimento completamente nuova e personalizzata.',
      avatar: 'MR',
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      name: 'Prof. Giovanni Bianchi',
      role: 'Esperto, Etica AI',
      content: 'Un esempio eccellente di come l\'AI possa essere utilizzata eticamente per democratizzare l\'accesso alla conoscenza.',
      avatar: 'GB',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="hero-modern relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Background gradients with improved positioning */}
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-orange-400 to-pink-500" style={{ filter: 'blur(40px)' }}></div>
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-purple-400 to-indigo-500" style={{ filter: 'blur(40px)', animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-emerald-400 to-teal-500" style={{ filter: 'blur(40px)', animationDelay: '4s' }}></div>
          
          {/* Sophisticated Particle System */}
          {/* Large floating elements */}
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/15 rounded-full float-particle" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white/20 rounded-full float-particle-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/25 rounded-full float-particle-fast" style={{ animationDelay: '4s' }}></div>
          
          {/* Medium particles with different shapes */}
          <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-lg float-particle" style={{ animationDelay: '1s', transform: 'rotate(45deg)' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-gradient-to-br from-purple-300/25 to-indigo-300/25 rounded-full float-particle-slow" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-2/3 left-1/5 w-3 h-3 bg-gradient-to-br from-emerald-300/35 to-teal-300/35 rounded-lg float-particle-fast" style={{ animationDelay: '5s', transform: 'rotate(30deg)' }}></div>
          
          {/* Small sparkle particles */}
          <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-white/40 rounded-full sparkle-effect" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/6 left-1/6 w-1.5 h-1.5 bg-white/35 rounded-full sparkle-effect" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-3/4 right-1/5 w-2.5 h-2.5 bg-white/30 rounded-full sparkle-effect" style={{ animationDelay: '4.5s' }}></div>
          
          {/* Organic shapes for more natural feel */}
          <div className="absolute top-1/5 left-2/3 w-4 h-6 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full float-particle" style={{ animationDelay: '1.5s', transform: 'rotate(15deg)' }}></div>
          <div className="absolute bottom-1/5 right-1/6 w-5 h-3 bg-gradient-to-br from-blue-300/25 to-cyan-300/25 rounded-full float-particle-slow" style={{ animationDelay: '3.5s', transform: 'rotate(-20deg)' }}></div>
          
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '100px 100px, 150px 150px'
            }}></div>
          </div>
        </div>
        
        <div className="container-modern hero-content relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/20 animate-scale-in mb-8 animate-color-pulse shadow-lg">
            <Star className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Hub di Conoscenza Interattiva</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{ 
              lineHeight: '1.1',
              paddingBottom: '0.2em',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}>
              Biblioteca Digitale
              <span className="block" style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '0.2em',
                lineHeight: '1.1',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}>
                Pyragogica
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ 
              animationDelay: '0.2s',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Un <strong className="text-orange-300 drop-shadow-sm">hub di conoscenza interattiva</strong> dove puoi dialogare direttamente con i testi sia liberi che premium — dedicati all'<strong className="text-pink-300 drop-shadow-sm">apprendimento peer-to-peer</strong>, 
              all'<strong className="text-purple-300 drop-shadow-sm">etica dell' IA</strong> e alla <strong className="text-emerald-300 drop-shadow-sm">co-creazione cognitiva</strong>.
              <br />
              <br />
              Il tutto potenziato da un sistema avanzato di <strong className="text-yellow-300 drop-shadow-sm">chatbot con RAG</strong>, per sintesi, domande e dialoghi personalizzati.
            </p>
            <br ></br>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={handleNavigateToLibrary}
              className="btn-modern btn-primary group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Database className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Esplora la Biblioteca</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleNavigateToChatbot}
              className="btn-modern btn-secondary group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
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
                <div key={index} className="card-modern p-8 animate-fade-in-up group hover-lift hover-glow cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                    <Icon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="status-indicator status-success group-hover:scale-105 transition-transform duration-300">
                    <Heart className="w-3 h-3 group-hover:animate-pulse" />
                    <span>{feature.stats}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="section-modern bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
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
                <div key={index} className="card-modern p-6 animate-fade-in-up hover:animate-color-pulse" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{type.description}</p>
                  <div className="flex items-center space-x-2">
                    {type.access.includes('Open') && (
                      <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-medium rounded-full border border-green-200">Open</span>
                    )}
                    {type.access.includes('Premium') && (
                      <span className="px-2 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs font-medium rounded-full border border-orange-200">Premium</span>
                    )}
                    {type.access.includes('Very') && (
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">Very</span>
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
                <Target className="w-4 h-4" />
                <span>Vantaggi Chiave</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Perché Scegliere Pyragogica</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="card-modern p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
              <h3 className="text-2xl font-bold mb-6 text-white">Capacità del Sistema</h3>
              <div className="grid-modern grid-2">
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">RAG</div>
                  <div className="opacity-90">Retrieval Augmented</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">4</div>
                  <div className="opacity-90">Personalità AI</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">∞</div>
                  <div className="opacity-90">Contenuti Scalabili</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="opacity-90">Disponibilità</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-modern bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
              <div key={index} className="card-modern p-8 animate-fade-in-up hover:animate-color-pulse" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
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
      <section className="section-modern bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Enhanced background particles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/8 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Sophisticated floating elements */}
          <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/20 rounded-full float-particle" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-white/15 rounded-full float-particle-slow" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-white/25 rounded-lg float-particle-fast" style={{ animationDelay: '1.5s', transform: 'rotate(45deg)' }}></div>
          
          {/* Gradient particles */}
          <div className="absolute top-1/3 left-1/6 w-3 h-3 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full sparkle-effect" style={{ animationDelay: '3.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-gradient-to-br from-cyan-300/25 to-blue-300/25 rounded-lg float-particle" style={{ animationDelay: '4.5s', transform: 'rotate(30deg)' }}></div>
          
          {/* Organic shapes */}
          <div className="absolute top-1/6 right-1/5 w-5 h-3 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full float-particle-slow" style={{ animationDelay: '0.8s', transform: 'rotate(-15deg)' }}></div>
          <div className="absolute bottom-1/6 left-1/3 w-4 h-6 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full float-particle-fast" style={{ animationDelay: '2.8s', transform: 'rotate(20deg)' }}></div>
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '120px 120px, 180px 180px'
            }}></div>
          </div>
        </div>
        
        <div className="container-modern text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-in-up" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            Inizia la Tua Esperienza di Apprendimento
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Accedi al hub di conoscenza interattiva e scopri il potere del chatbot RAG multi-personalità
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={handleNavigateToLibrary}
              className="btn-modern bg-white text-indigo-600 hover:bg-slate-100 shadow-xl cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Database className="w-6 h-6" />
              <span className="text-lg font-bold">Esplora Contenuti</span>
            </button>
            <button 
              onClick={handleNavigateToChatbot}
              className="btn-modern bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <Brain className="w-6 h-6" />
              <span className="text-lg font-bold">Prova il Chatbot RAG</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 opacity-80 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Contenuti Open & Premium</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">RAG Multi-Personalità</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">Community "Very"</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;