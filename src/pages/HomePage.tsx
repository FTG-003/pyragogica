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
      {/* Hero Section Ridimensionata */}
      <section className="relative overflow-hidden py-16 md:py-20"> {/* Reduced from py-20 md:py-32 */}
        {/* Background Animato */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-indigo-400 to-purple-500 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-purple-400 to-pink-500 blur-3xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 rounded-full opacity-20 animate-pulse bg-gradient-to-br from-cyan-400 to-blue-500 blur-3xl" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container-modern relative z-10">
          {/* Badge Moderno */}
          <div className="text-center mb-6 animate-fade-in-up"> {/* Reduced margin */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full text-slate-700 text-base font-bold border-2 border-indigo-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced text size */}
              <div className="relative">
                <Star className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} /> {/* Reduced icon size */}
                <div className="absolute inset-0 w-5 h-5 text-yellow-400 animate-ping">
                  <Star className="w-5 h-5" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Biblioteca Digitale Infinitamente Scalabile
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div> {/* Reduced dot size */}
            </div>
          </div>
          
          {/* Titolo Principale Ridimensionato */}
          <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}> {/* Reduced space */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes and fixed line-height */}
              <span className="block">Biblioteca</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Pyragogica
              </span>
              <span className="block text-xl md:text-3xl lg:text-4xl font-light text-slate-600 mt-3"> {/* Reduced sizes */}
                Il Futuro dell'Apprendimento
              </span>
            </h1>
            
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed font-light"> {/* Reduced from text-2xl md:text-3xl */}
              Una piattaforma <strong className="text-slate-900 font-bold">rivoluzionaria</strong> per risorse educative di qualità mondiale. 
              Il <strong className="text-slate-900 font-bold">Manuale di Peeragogy</strong> è solo l'inizio del nostro viaggio verso 
              <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> l'eccellenza educativa infinita</strong>.
            </p>
          </div>
          
          {/* CTA Buttons Ridimensionati */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}> {/* Reduced gap and margin */}
            <ModernButton
              variant="primary"
              size="lg"
              icon={<Database className="w-6 h-6" />} {/* Reduced icon size */}
              className="text-lg px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" /* Reduced text and padding */
            >
              🚀 Esplora la Biblioteca
            </ModernButton>
            
            <ModernButton
              variant="secondary"
              size="lg"
              icon={<Brain className="w-6 h-6" />}
              className="text-lg px-10 py-5 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 border-2 border-indigo-300 hover:border-indigo-500"
            >
              🤖 Prova l'AI Assistant
            </ModernButton>
          </div>

          {/* Stats Animati Ridimensionati */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}> {/* Reduced gap and margin */}
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-3 transform group-hover:scale-125 transition-all duration-500"> {/* Reduced margin */}
                    <div className="relative">
                      <Icon className={`w-6 h-6 ${stat.color} mr-2`} /> {/* Reduced icon size */}
                      <div className="absolute inset-0 w-6 h-6 animate-ping opacity-30">
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes */}
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-slate-600 font-bold text-sm group-hover:text-slate-900 transition-colors duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced text size */}
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section Ridimensionata */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-100"> {/* Reduced from py-32 */}
        <div className="container-modern">
          <div className="text-center mb-16"> {/* Reduced margin */}
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-base font-bold mb-6 animate-bounce" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes */}
              <Zap className="w-5 h-5 animate-spin" />
              <span>Tecnologie Rivoluzionarie</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-5xl md:text-6xl */}
              Funzionalità per la 
              <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Crescita Infinita
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"> {/* Reduced from text-2xl */}
              Ogni funzionalità è progettata per scalare da centinaia a <strong>milioni di utenti</strong> e risorse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Reduced gap */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ModernCard
                  key={index}
                  className="group hover:scale-110 transition-all duration-500 hover:shadow-3xl border-2 border-transparent hover:border-indigo-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl`}> {/* Reduced sizes */}
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-2xl */}
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-base"> {/* Reduced from text-lg */}
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-bold border-2 border-green-200 group-hover:scale-110 transition-all duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes */}
                    <Infinity className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>{feature.stats}</span>
                  </div>
                </ModernCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section Ridimensionata */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden"> {/* Reduced from py-32 */}
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container-modern relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> {/* Reduced gap */}
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-base font-bold mb-6" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes */}
                <Globe className="w-5 h-5 animate-pulse" />
                <span>Vantaggi Rivoluzionari</span>
              </div>
              <h2 className="text-3xl font-black mb-8 text-white" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-5xl */}
                Perché Scegliere la 
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Biblioteca Pyragogica
                </span>
              </h2>
              <div className="space-y-4"> {/* Reduced space */}
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 group"> {/* Reduced gap */}
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-500"> {/* Reduced size */}
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-slate-200 group-hover:text-white transition-colors duration-500 font-medium" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-xl */}
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <ModernCard className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/30 text-white hover:scale-105 transition-all duration-500">
              <h3 className="text-2xl font-black mb-6 text-white" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}>Statistiche Impressionanti</h3> {/* Reduced from text-3xl */}
              <div className="grid grid-cols-2 gap-6"> {/* Reduced gap */}
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}>∞</div> {/* Reduced from text-6xl */}
                  <div className="text-white/90 font-bold text-sm">Risorse Supportate</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}>4</div>
                  <div className="text-white/90 font-bold text-sm">Personalità AI</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}>6+</div>
                  <div className="text-white/90 font-bold text-sm">Categorie</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}>99.9%</div>
                  <div className="text-white/90 font-bold text-sm">Uptime</div>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      </section>

      {/* Testimonials Ridimensionati */}
      <section className="py-20 bg-gradient-to-br from-white to-indigo-50"> {/* Reduced from py-32 */}
        <div className="container-modern">
          <div className="text-center mb-16"> {/* Reduced margin */}
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-green-100 text-green-700 rounded-full text-base font-bold mb-6" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes */}
              <Users className="w-5 h-5" />
              <span>Testimonianze Eccezionali</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-5xl */}
              Cosa Dicono gli 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Esperti Mondiali
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"> {/* Reduced from text-2xl */}
              Testimonianze da educatori e ricercatori che credono nella <strong>scalabilità infinita dell'educazione</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Reduced gap */}
            {testimonials.map((testimonial, index) => (
              <ModernCard
                key={index}
                className="group hover:scale-110 transition-all duration-500 hover:shadow-3xl border-2 border-transparent hover:border-purple-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-1 mb-4"> {/* Reduced gap and margin */}
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed italic mb-6 font-medium" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-xl */}
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-base group-hover:scale-125 transition-all duration-500" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced sizes */}
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-base" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}>{testimonial.name}</div> {/* Reduced from text-lg */}
                    <div className="text-slate-600 font-medium text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Finale Ridimensionata */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden"> {/* Reduced from py-32 */}
        {/* Background Animato */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-white to-yellow-300 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-cyan-300 to-white blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container-modern text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-white" style={{ lineHeight: '1.3', paddingBottom: '0.1em' }}> {/* Reduced from text-6xl md:text-7xl */}
            Inizia il Tuo Viaggio
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              nell'Apprendimento Infinito
            </span>
          </h2>
          <p className="text-lg mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed font-light"> {/* Reduced from text-2xl and margin */}
            Esplora il <strong>Manuale di Peeragogy</strong> e scopri il futuro dell'apprendimento 
            <strong> scalabile, collaborativo e rivoluzionario</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"> {/* Reduced gap and margin */}
            <ModernButton
              variant="secondary"
              size="lg"
              icon={<Database className="w-6 h-6" />}
              className="text-lg px-12 py-6 bg-white text-indigo-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 font-black" /* Reduced sizes */
            >
              🚀 Esplora la Biblioteca
            </ModernButton>
            <ModernButton
              variant="outline"
              size="lg"
              icon={<Brain className="w-6 h-6" />}
              className="text-lg px-12 py-6 bg-transparent border-4 border-white text-white hover:bg-white hover:text-indigo-600 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 font-black"
            >
              🤖 Prova l'AI Assistant
            </ModernButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80"> {/* Reduced gap */}
            <div className="flex items-center gap-2 group"> {/* Reduced gap */}
              <Shield className="w-6 h-6 group-hover:scale-125 transition-all duration-500" />
              <span className="text-lg font-bold">Infinitamente Scalabile</span> {/* Reduced from text-xl */}
            </div>
            <div className="flex items-center gap-2 group">
              <Globe className="w-6 h-6 group-hover:scale-125 transition-all duration-500" />
              <span className="text-lg font-bold">Open Source</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Heart className="w-6 h-6 group-hover:scale-125 transition-all duration-500" />
              <span className="text-lg font-bold">Community Driven</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(HomePage);