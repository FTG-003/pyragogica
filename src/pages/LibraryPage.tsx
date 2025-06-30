import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, Clock, ArrowRight, Eye, Heart, Download, Users, Sparkles } from 'lucide-react';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockResources = [
    {
      id: '1',
      title: 'Manuale di Peeragogy',
      subtitle: 'Guida completa all\'apprendimento peer-to-peer',
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff'],
      category: 'peer-learning',
      type: 'handbook',
      access: 'free',
      pages: 350,
      language: 'Italiano',
      rating: 4.9,
      views: 45600,
      likes: 2340,
      downloads: 15420,
      description: 'Traduzione italiana completa del Manuale di Peeragogy. Questa guida esplora come le persone possono imparare insieme utilizzando metodologie innovative e tecnologie digitali.',
      tags: ['peer learning', 'collaborative education', 'community building'],
      difficulty: 'intermediate',
      featured: true,
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      id: '2',
      title: 'Guida all\'Etica AI nell\'Educazione',
      subtitle: 'Principi e pratiche per un uso responsabile dell\'intelligenza artificiale',
      authors: ['Prof. Giovanni Bianchi'],
      category: 'ai-education',
      type: 'guide',
      access: 'free',
      pages: 120,
      language: 'Italiano',
      rating: 4.8,
      views: 12400,
      likes: 567,
      downloads: 3200,
      description: 'Una guida completa per educatori e istituzioni su come implementare l\'intelligenza artificiale nell\'educazione in modo etico e responsabile.',
      tags: ['AI ethics', 'responsible AI', 'education technology'],
      difficulty: 'intermediate',
      featured: false,
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: '3',
      title: 'Co-creazione Cognitiva Avanzata',
      subtitle: 'Tecniche di intelligenza collettiva per l\'innovazione',
      authors: ['Dr.ssa Maria Rossi', 'Team Pyragogica'],
      category: 'cognitive-creation',
      type: 'research',
      access: 'premium',
      pages: 200,
      language: 'Italiano',
      rating: 4.9,
      views: 8900,
      likes: 423,
      downloads: 1200,
      description: 'Ricerca avanzata sulle metodologie di co-creazione cognitiva e intelligenza collettiva per l\'innovazione educativa.',
      tags: ['cognitive creation', 'collective intelligence', 'innovation'],
      difficulty: 'advanced',
      featured: true,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tutte', count: mockResources.length, color: 'from-slate-500 to-gray-500' },
    { id: 'peer-learning', name: 'Peer Learning', count: 1, color: 'from-orange-500 to-pink-500' },
    { id: 'ai-education', name: 'AI Educazione', count: 1, color: 'from-purple-500 to-indigo-500' },
    { id: 'cognitive-creation', name: 'Co-creazione', count: 1, color: 'from-emerald-500 to-teal-500' }
  ];

  const filteredResources = searchTerm 
    ? mockResources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : selectedCategory === 'all' 
      ? mockResources 
      : mockResources.filter(resource => resource.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300';
      case 'intermediate':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-300';
      case 'advanced':
        return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300';
    }
  };

  const getAccessStyle = (access: string) => {
    switch (access) {
      case 'free':
        return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-300';
      case 'premium':
        return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-300';
      case 'very':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-16">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 rounded-full text-sm font-semibold border-2 border-orange-200 shadow-lg">
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca Digitale Colorata</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900">Esplora la Conoscenza</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Una biblioteca digitale vibrante e interattiva per risorse educative di alta qualità.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-orange-400" />
            <input
              type="text"
              placeholder="Cerca risorse, autori, argomenti..."
              className="input-modern pl-12 border-2 border-orange-200 focus:border-orange-500 focus:ring-orange-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-6 h-6 text-purple-400" />
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border-2 shadow-lg ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-xl transform scale-105`
                      : 'bg-white text-slate-700 border-slate-200 hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="card-modern p-8 group cursor-pointer hover:animate-color-pulse"
          >
            {/* Header with badges */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-lg ${getAccessStyle(resource.access)}`}>
                    <BookOpen className="w-4 h-4" />
                    <span className="capitalize">{resource.access === 'free' ? 'Gratuito' : resource.access}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border-2 shadow-md ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                  {resource.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-semibold shadow-lg animate-pulse">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                  {resource.title}
                </h3>
                <p className="text-slate-600 font-medium">di {resource.authors.join(', ')}</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg line-clamp-3 mb-4">
              {resource.description}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-medium">{resource.pages} pagine</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                <Eye className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">{resource.views > 1000 ? `${Math.round(resource.views/1000)}k` : resource.views}</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 rounded-full border border-pink-200">
                <Heart className="w-4 h-4 text-pink-600" />
                <span className="text-pink-700 font-medium">{resource.likes}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-lg hover:from-purple-200 hover:to-pink-200 transition-all duration-200 border border-purple-200 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-gradient-to-r from-orange-200 to-pink-200">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-slate-700">{resource.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-700">{resource.downloads}</span>
                </div>
              </div>
              <button className={`group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${resource.gradient} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                <span>Esplora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Library Stats */}
      <div className="mt-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
        <h3 className="text-3xl font-bold text-center mb-10">Statistiche della Biblioteca Colorata</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold">4</div>
            <div className="text-indigo-200 font-medium">Risorse Totali</div>
          </div>
          <div className="space-y-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold">13</div>
            <div className="text-indigo-200 font-medium">Autori</div>
          </div>
          <div className="space-y-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold">990</div>
            <div className="text-indigo-200 font-medium">Pagine Totali</div>
          </div>
          <div className="space-y-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold">6</div>
            <div className="text-indigo-200 font-medium">Categorie</div>
          </div>
        </div>
        
        {/* Additional colorful stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold mb-2">67K+</div>
            <div className="text-orange-200 font-medium">Visualizzazioni Totali</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold mb-2">3.3K+</div>
            <div className="text-emerald-200 font-medium">Mi Piace</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold mb-2">19.8K+</div>
            <div className="text-purple-200 font-medium">Download</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;