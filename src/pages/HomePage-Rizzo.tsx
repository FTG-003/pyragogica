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
    <div className="rizzo-animate-fade-in">
      {/* Navigation */}
      <nav className="rizzo-nav">
        <div className="rizzo-container">
          <div className="rizzo-nav-content">
            <a href="#" className="rizzo-nav-logo">
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Database className="w-6 h-6 text-white" />
              </div>
              Biblioteca Pyragogica
            </a>
            
            <div className="rizzo-nav-menu">
              <a href="#" className="rizzo-nav-link active">Home</a>
              <a href="#" className="rizzo-nav-link">Biblioteca</a>
              <a href="#" className="rizzo-nav-link">AI Assistant</a>
              <a href="#" className="rizzo-button rizzo-button-primary">
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="rizzo-hero">
        <div className="rizzo-container">
          <div className="rizzo-badge rizzo-badge-primary rizzo-mb-6">
            <Star className="w-4 h-4" />
            Biblioteca Digitale Infinitamente Scalabile
          </div>
          
          <h1 className="rizzo-hero-title">
            Il Futuro dell'Apprendimento Collaborativo
          </h1>
          
          <p className="rizzo-hero-subtitle">
            Una piattaforma infinitamente scalabile per risorse educative di qualità mondiale. 
            Il Manuale di Peeragogy è solo l'inizio del nostro viaggio verso l'eccellenza educativa.
          </p>
          
          <div className="rizzo-flex rizzo-items-center rizzo-justify-center rizzo-gap-4">
            <a href="#" className="rizzo-button rizzo-button-primary">
              <Database className="w-5 h-5" />
              Esplora la Biblioteca
            </a>
            <a href="#" className="rizzo-button rizzo-button-secondary">
              <Brain className="w-5 h-5" />
              Prova l'AI Assistant
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="rizzo-section">
        <div className="rizzo-container">
          <div className="rizzo-text-center rizzo-mb-8">
            <div className="rizzo-badge rizzo-badge-primary rizzo-mb-4">
              <Zap className="w-4 h-4" />
              Tecnologie Avanzate
            </div>
            <h2 className="rizzo-mb-4">Funzionalità per la Crescita Infinita</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
              Ogni funzionalità è progettata per scalare da centinaia a milioni di utenti e risorse
            </p>
          </div>

          <div className="rizzo-grid rizzo-grid-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="rizzo-card rizzo-animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="rizzo-mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>
                    {feature.title}
                  </h3>
                  <p className="rizzo-mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {feature.description}
                  </p>
                  <div className="rizzo-badge rizzo-badge-success">
                    <Infinity className="w-3 h-3" />
                    {feature.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="rizzo-section" style={{ background: 'var(--color-background-secondary)' }}>
        <div className="rizzo-container">
          <div className="rizzo-grid rizzo-grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="rizzo-badge rizzo-badge-primary rizzo-mb-4">
                <Globe className="w-4 h-4" />
                Vantaggi Chiave
              </div>
              <h2 className="rizzo-mb-6">Perché Scegliere la Biblioteca Pyragogica</h2>
              <div className="rizzo-grid" style={{ gap: 'var(--spacing-3)' }}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="rizzo-flex rizzo-items-center rizzo-gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-success)' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rizzo-card" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)', color: 'white' }}>
              <h3 className="rizzo-mb-4" style={{ color: 'white' }}>Statistiche Impressionanti</h3>
              <div className="rizzo-grid rizzo-grid-2" style={{ gap: 'var(--spacing-6)' }}>
                <div className="rizzo-text-center">
                  <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>∞</div>
                  <div style={{ opacity: 0.9 }}>Risorse Supportate</div>
                </div>
                <div className="rizzo-text-center">
                  <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>4</div>
                  <div style={{ opacity: 0.9 }}>Personalità AI</div>
                </div>
                <div className="rizzo-text-center">
                  <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>6+</div>
                  <div style={{ opacity: 0.9 }}>Categorie</div>
                </div>
                <div className="rizzo-text-center">
                  <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>99.9%</div>
                  <div style={{ opacity: 0.9 }}>Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="rizzo-section">
        <div className="rizzo-container">
          <div className="rizzo-text-center rizzo-mb-8">
            <div className="rizzo-badge rizzo-badge-primary rizzo-mb-4">
              <Users className="w-4 h-4" />
              Testimonianze
            </div>
            <h2 className="rizzo-mb-4">Cosa Dicono gli Esperti</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
              Testimonianze da educatori e ricercatori che credono nella scalabilità dell'educazione
            </p>
          </div>

          <div className="rizzo-grid rizzo-grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rizzo-card rizzo-animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="rizzo-flex rizzo-items-center rizzo-gap-1 rizzo-mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  ))}
                </div>
                <p className="rizzo-mb-6" style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </p>
                <div className="rizzo-flex rizzo-items-center rizzo-gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-sm)'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{testimonial.name}</div>
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rizzo-section" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)' }}>
        <div className="rizzo-container rizzo-text-center" style={{ color: 'white' }}>
          <h2 className="rizzo-mb-6" style={{ color: 'white' }}>
            Inizia il Tuo Viaggio nell'Apprendimento
          </h2>
          <p className="rizzo-mb-8" style={{ fontSize: 'var(--font-size-xl)', opacity: 0.9, maxWidth: '600px', margin: '0 auto var(--spacing-8)' }}>
            Esplora il Manuale di Peeragogy e scopri il futuro dell'apprendimento scalabile e collaborativo
          </p>
          
          <div className="rizzo-flex rizzo-items-center rizzo-justify-center rizzo-gap-4">
            <a href="#" className="rizzo-button" style={{ 
              background: 'white', 
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              <Database className="w-5 h-5" />
              Esplora la Biblioteca
            </a>
            <a href="#" className="rizzo-button" style={{ 
              background: 'transparent', 
              color: 'white',
              border: '2px solid white',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              <Brain className="w-5 h-5" />
              Prova l'AI Assistant
            </a>
          </div>

          <div className="rizzo-flex rizzo-items-center rizzo-justify-center rizzo-gap-8 rizzo-mt-8" style={{ opacity: 0.8 }}>
            <div className="rizzo-flex rizzo-items-center rizzo-gap-2">
              <Shield className="w-4 h-4" />
              <span style={{ fontSize: 'var(--font-size-sm)' }}>Infinitamente Scalabile</span>
            </div>
            <div className="rizzo-flex rizzo-items-center rizzo-gap-2">
              <Globe className="w-4 h-4" />
              <span style={{ fontSize: 'var(--font-size-sm)' }}>Open Source</span>
            </div>
            <div className="rizzo-flex rizzo-items-center rizzo-gap-2">
              <Star className="w-4 h-4" />
              <span style={{ fontSize: 'var(--font-size-sm)' }}>Community Driven</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;