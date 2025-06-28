import React, { useState } from 'react';
import { Search, Filter, BookOpen, Lock, Users, Star, Clock, ArrowRight } from 'lucide-react';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tutti i Contenuti', count: 245 },
    { id: 'ai-ethics', name: 'Etica AI', count: 67 },
    { id: 'peer-learning', name: 'Peer Learning', count: 89 },
    { id: 'cognitive-creation', name: 'Co-creazione Cognitiva', count: 45 },
    { id: 'philosophy', name: 'Filosofia Educativa', count: 44 }
  ];

  const contents = [
    {
      id: 1,
      title: 'Fondamenti dell\'Apprendimento Peer-to-Peer',
      author: 'Dr. Maria Rossi',
      category: 'peer-learning',
      type: 'free',
      duration: '45 min',
      rating: 4.8,
      participants: 1240,
      description: 'Una guida completa ai principi fondamentali dell\'educazione orizzontale e collaborativa.',
      tags: ['pedagogia', 'collaborazione', 'metodi']
    },
    {
      id: 2,
      title: 'Etica nell\'Intelligenza Artificiale Educativa',
      author: 'Prof. Giovanni Bianchi',
      category: 'ai-ethics',
      type: 'premium',
      duration: '2h 15min',
      rating: 4.9,
      participants: 856,
      description: 'Analisi approfondita delle implicazioni etiche dell\'AI nell\'educazione moderna.',
      tags: ['etica', 'AI', 'responsabilità']
    },
    {
      id: 3,
      title: 'Workshop: Co-creazione di Conoscenza Digitale',
      author: 'Community Pyragogy',
      category: 'cognitive-creation',
      type: 'community',
      duration: '3h 30min',
      rating: 4.7,
      participants: 432,
      description: 'Sessione pratica per sviluppare progetti collaborativi di apprendimento.',
      tags: ['workshop', 'pratica', 'collaborazione']
    },
    {
      id: 4,
      title: 'Storia della Filosofia dell\'Educazione',
      author: 'Dr. Anna Verdi',
      category: 'philosophy',
      type: 'free',
      duration: '1h 20min',
      rating: 4.6,
      participants: 2100,
      description: 'Dalle origini classiche alle teorie contemporanee dell\'apprendimento.',
      tags: ['storia', 'filosofia', 'teoria']
    },
    {
      id: 5,
      title: 'RAG Systems in Educational Context',
      author: 'Tech Team Pyragogy',
      category: 'ai-ethics',
      type: 'premium',
      duration: '1h 45min',
      rating: 4.8,
      participants: 567,
      description: 'Implementazione pratica di sistemi RAG per l\'educazione personalizzata.',
      tags: ['RAG', 'tecnologia', 'implementazione']
    },
    {
      id: 6,
      title: 'Metodologie Attive per l\'Apprendimento Online',
      author: 'Dr. Luigi Neri',
      category: 'peer-learning',
      type: 'community',
      duration: '2h 5min',
      rating: 4.7,
      participants: 1876,
      description: 'Strategie innovative per coinvolgere studenti nell\'ambiente digitale.',
      tags: ['metodologie', 'online', 'engagement']
    }
  ];

  const filteredContents = contents.filter(content => {
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredContents.map((content) => (
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
                    <div className="flex items-center space-x-1 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{content.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">di {content.author}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-4 leading-relaxed">
                {content.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {content.tags.map((tag, index) => (
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
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{content.participants.toLocaleString()} partecipanti</span>
                  </div>
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
            <div className="text-3xl font-bold mb-2">245</div>
            <div className="text-indigo-200">Contenuti Totali</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">172</div>
            <div className="text-indigo-200">Contenuti Gratuiti</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">45</div>
            <div className="text-indigo-200">Autori Attivi</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">12.5k</div>
            <div className="text-indigo-200">Ore di Apprendimento</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;