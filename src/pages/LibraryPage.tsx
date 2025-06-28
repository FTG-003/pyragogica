import React, { useState } from 'react';
import { Search, Filter, BookOpen, Lock, Users, Star, Clock, ArrowRight, Download, Eye } from 'lucide-react';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'Tutti i Contenuti', count: 12 },
    { id: 'peeragogy', name: 'Peeragogy', count: 8 },
    { id: 'ai-ethics', name: 'Etica AI', count: 2 },
    { id: 'peer-learning', name: 'Peer Learning', count: 2 }
  ];

  const peeragogyHandbook = {
    id: 'peeragogy-handbook',
    title: 'The Peeragogy Handbook',
    subtitle: 'A comprehensive guide to peer learning and collaboration',
    authors: ['Howard Rheingold', 'Charles Jeffrey Danoff', 'Community Contributors'],
    category: 'peeragogy',
    type: 'free',
    version: '4.0',
    pages: 350,
    language: 'English/Italian',
    rating: 4.9,
    downloads: 15420,
    description: 'Il Peeragogy Handbook è una guida completa all\'apprendimento tra pari e alla collaborazione. Questo libro open source esplora come le persone possono imparare insieme in modo efficace, utilizzando tecnologie digitali e metodologie innovative.',
    chapters: [
      { id: 1, title: 'Introduction to Peeragogy', pages: '1-25', available: true },
      { id: 2, title: 'Motivation and Engagement', pages: '26-50', available: true },
      { id: 3, title: 'Peer Learning Patterns', pages: '51-85', available: true },
      { id: 4, title: 'Facilitation and Leadership', pages: '86-120', available: true },
      { id: 5, title: 'Assessment and Feedback', pages: '121-155', available: true },
      { id: 6, title: 'Technologies for Collaboration', pages: '156-190', available: true },
      { id: 7, title: 'Case Studies', pages: '191-225', available: true },
      { id: 8, title: 'Research and Theory', pages: '226-260', available: true },
      { id: 9, title: 'Future Directions', pages: '261-295', available: true },
      { id: 10, title: 'Resources and Tools', pages: '296-350', available: true }
    ],
    tags: ['peer learning', 'collaboration', 'education', 'open source', 'community'],
    lastUpdated: '2024-01-15'
  };

  const additionalContents = [
    {
      id: 2,
      title: 'Peer Learning in Digital Environments',
      author: 'Dr. Maria Rossi',
      category: 'peer-learning',
      type: 'free',
      duration: '45 min',
      rating: 4.8,
      participants: 1240,
      description: 'Una guida pratica per implementare metodologie di peer learning in ambienti digitali.',
      tags: ['digital learning', 'metodologie', 'pratica']
    },
    {
      id: 3,
      title: 'AI Ethics in Educational Technology',
      author: 'Prof. Giovanni Bianchi',
      category: 'ai-ethics',
      type: 'premium',
      duration: '2h 15min',
      rating: 4.9,
      participants: 856,
      description: 'Analisi approfondita delle implicazioni etiche dell\'AI nell\'educazione moderna.',
      tags: ['etica', 'AI', 'educazione', 'tecnologia']
    }
  ];

  const allContents = [peeragogyHandbook, ...additionalContents];

  const filteredContents = allContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'free':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'community':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'premium':
        return <Lock className="w-4 h-4" />;
      case 'community':
        return <Users className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  if (selectedContent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => setSelectedContent(null)}
          className="mb-8 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Torna alla biblioteca</span>
        </button>

        {/* Book Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeStyle(selectedContent.type)}`}>
                  {getTypeIcon(selectedContent.type)}
                  <span>Open Source</span>
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  v{selectedContent.version}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{selectedContent.title}</h1>
              <p className="text-xl text-slate-600 mb-4">{selectedContent.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                <span>di {selectedContent.authors.join(', ')}</span>
                <span>•</span>
                <span>{selectedContent.pages} pagine</span>
                <span>•</span>
                <span>{selectedContent.language}</span>
                <span>•</span>
                <span>Aggiornato: {selectedContent.lastUpdated}</span>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">{selectedContent.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedContent.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                  <Eye className="w-5 h-5" />
                  <span>Leggi Online</span>
                </button>
                <button className="inline-flex items-center space-x-2 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Statistiche</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{selectedContent.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Downloads</span>
                    <span className="font-semibold">{selectedContent.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Lingua</span>
                    <span className="font-semibold">{selectedContent.language}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Accesso Completo</h3>
                <p className="text-indigo-100 text-sm mb-4">
                  Questo contenuto è completamente gratuito e open source
                </p>
                <button className="w-full py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  Inizia a Leggere
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Indice dei Contenuti</h2>
          <div className="space-y-3">
            {selectedContent.chapters.map((chapter: any) => (
              <div key={chapter.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{chapter.title}</h3>
                  <p className="text-sm text-slate-600">Pagine {chapter.pages}</p>
                </div>
                <button className="inline-flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Leggi</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Biblioteca Digitale</h1>
        <p className="text-xl text-slate-600 mb-8">
          Esplora la nostra collezione curata di risorse educative per l'apprendimento peer-to-peer
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca contenuti, autori, argomenti..."
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Content - Peeragogy Handbook */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Contenuto in Evidenza</h2>
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Open Source
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  v4.0
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-4">{peeragogyHandbook.title}</h3>
              <p className="text-indigo-100 mb-6">{peeragogyHandbook.subtitle}</p>
              <div className="flex items-center space-x-6 text-sm mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{peeragogyHandbook.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>{peeragogyHandbook.downloads.toLocaleString()} downloads</span>
                </div>
                <div>
                  <span>{peeragogyHandbook.pages} pagine</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(peeragogyHandbook)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Esplora il Handbook</span>
              </button>
            </div>
            <div className="text-center">
              <div className="w-48 h-64 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto">
                <BookOpen className="w-24 h-24 text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredContents.slice(1).map((content) => (
          <div
            key={content.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeStyle(content.type)}`}>
                      {getTypeIcon(content.type)}
                      <span className="capitalize">{content.type === 'free' ? 'Gratuito' : content.type === 'premium' ? 'Premium' : 'Community'}</span>
                    </span>
                    {content.duration && (
                      <div className="flex items-center space-x-1 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{content.duration}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">di {content.author || content.authors?.join(', ')}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-4 leading-relaxed">
                {content.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {content.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{content.rating}</span>
                  </div>
                  {content.participants && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{content.participants.toLocaleString()} partecipanti</span>
                    </div>
                  )}
                </div>
                <button className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  <span>Accedi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="text-indigo-200">Contenuti Totali</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">10</div>
            <div className="text-indigo-200">Contenuti Gratuiti</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">8</div>
            <div className="text-indigo-200">Autori Attivi</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">15.4k</div>
            <div className="text-indigo-200">Downloads Totali</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;