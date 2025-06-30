import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, Clock, ArrowRight, Eye } from 'lucide-react';

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
      description: 'Traduzione italiana completa del Manuale di Peeragogy. Questa guida esplora come le persone possono imparare insieme utilizzando metodologie innovative e tecnologie digitali.',
      tags: ['peer learning', 'collaborative education', 'community building'],
      difficulty: 'intermediate',
      featured: true
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
      description: 'Una guida completa per educatori e istituzioni su come implementare l\'intelligenza artificiale nell\'educazione in modo etico e responsabile.',
      tags: ['AI ethics', 'responsible AI', 'education technology'],
      difficulty: 'intermediate',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Tutte', count: mockResources.length },
    { id: 'peer-learning', name: 'Peer Learning', count: 1 },
    { id: 'ai-education', name: 'AI Educazione', count: 1 }
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
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-16">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca Digitale Production-Ready</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900">Esplora la Conoscenza</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Una biblioteca digitale sicura e scalabile per risorse educative di alta qualità.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca risorse, autori, argomenti..."
              className="input-modern pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-6 h-6 text-slate-400" />
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-slate-100 text-slate-700 hover:scale-105'
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
            className="card-modern p-8 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border bg-emerald-100 text-emerald-800 border-emerald-200">
                    <BookOpen className="w-4 h-4" />
                    <span>Gratuito</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                  {resource.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-semibold">
                      ⭐
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-slate-600 font-medium">di {resource.authors.join(', ')}</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg line-clamp-3 mb-4">
              {resource.description}
            </p>

            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{resource.pages} pagine</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{resource.views > 1000 ? `${Math.round(resource.views/1000)}k` : resource.views}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{resource.rating}</span>
                </div>
              </div>
              <button className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                <span>Esplora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Library Stats */}
      <div className="mt-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
        <h3 className="text-3xl font-bold text-center mb-10">Statistiche della Biblioteca</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-3">
            <div className="text-4xl font-bold">4</div>
            <div className="text-indigo-200 font-medium">Risorse Totali</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">13</div>
            <div className="text-indigo-200 font-medium">Autori</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">990</div>
            <div className="text-indigo-200 font-medium">Pagine Totali</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">6</div>
            <div className="text-indigo-200 font-medium">Categorie</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;