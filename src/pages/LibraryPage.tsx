import React, { useState } from 'react';
import { Search, Filter, BookOpen, Lock, Users, Star, Clock, ArrowRight, Download, Eye, Play, Heart, Share2, Bookmark } from 'lucide-react';

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'Tutti i Contenuti', count: 12, color: 'bg-slate-100 text-slate-700' },
    { id: 'peeragogy', name: 'Peeragogy', count: 8, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'ai-ethics', name: 'Etica AI', count: 2, color: 'bg-purple-100 text-purple-700' },
    { id: 'peer-learning', name: 'Peer Learning', count: 2, color: 'bg-green-100 text-green-700' }
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
    likes: 2340,
    bookmarks: 890,
    description: 'Il Peeragogy Handbook è una guida completa all\'apprendimento tra pari e alla collaborazione. Questo libro open source esplora come le persone possono imparare insieme in modo efficace, utilizzando tecnologie digitali e metodologie innovative.',
    chapters: [
      { id: 1, title: 'Introduction to Peeragogy', pages: '1-25', available: true, duration: '45 min' },
      { id: 2, title: 'Motivation and Engagement', pages: '26-50', available: true, duration: '38 min' },
      { id: 3, title: 'Peer Learning Patterns', pages: '51-85', available: true, duration: '52 min' },
      { id: 4, title: 'Facilitation and Leadership', pages: '86-120', available: true, duration: '41 min' },
      { id: 5, title: 'Assessment and Feedback', pages: '121-155', available: true, duration: '36 min' },
      { id: 6, title: 'Technologies for Collaboration', pages: '156-190', available: true, duration: '48 min' },
      { id: 7, title: 'Case Studies', pages: '191-225', available: true, duration: '44 min' },
      { id: 8, title: 'Research and Theory', pages: '226-260', available: true, duration: '39 min' },
      { id: 9, title: 'Future Directions', pages: '261-295', available: true, duration: '33 min' },
      { id: 10, title: 'Resources and Tools', pages: '296-350', available: true, duration: '42 min' }
    ],
    tags: ['peer learning', 'collaboration', 'education', 'open source', 'community'],
    lastUpdated: '2024-01-15',
    featured: true
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
      likes: 456,
      bookmarks: 234,
      description: 'Una guida pratica per implementare metodologie di peer learning in ambienti digitali.',
      tags: ['digital learning', 'metodologie', 'pratica'],
      featured: false
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
      likes: 678,
      bookmarks: 345,
      description: 'Analisi approfondita delle implicazioni etiche dell\'AI nell\'educazione moderna.',
      tags: ['etica', 'AI', 'educazione', 'tecnologia'],
      featured: false
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
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
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
        {/* Enhanced Back Button */}
        <button
          onClick={() => setSelectedContent(null)}
          className="group mb-8 inline-flex items-center space-x-3 px-6 py-3 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Torna alla biblioteca</span>
        </button>

        {/* Enhanced Book Header */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border ${getTypeStyle(selectedContent.type)}`}>
                  {getTypeIcon(selectedContent.type)}
                  <span>Open Source</span>
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">
                  v{selectedContent.version}
                </span>
                {selectedContent.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                    ⭐ Featured
                  </span>
                )}
              </div>
              
              {/* Title and Subtitle */}
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-slate-900 leading-tight">{selectedContent.title}</h1>
                <p className="text-2xl text-slate-600 font-light">{selectedContent.subtitle}</p>
              </div>
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-slate-600 text-lg">
                <span className="font-semibold">di {selectedContent.authors.join(', ')}</span>
                <span>•</span>
                <span>{selectedContent.pages} pagine</span>
                <span>•</span>
                <span>{selectedContent.language}</span>
                <span>•</span>
                <span>Aggiornato: {selectedContent.lastUpdated}</span>
              </div>

              {/* Description */}
              <p className="text-slate-700 leading-relaxed text-lg">{selectedContent.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {selectedContent.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-200 transition-colors duration-200">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Leggi Online</span>
                </button>
                <button className="group inline-flex items-center space-x-3 px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 transform hover:scale-105">
                  <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Download PDF</span>
                </button>
                <button className="group p-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300">
                  <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
                <button className="group p-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                  <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
                <button className="group p-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-300">
                  <Bookmark className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-6 text-xl">Statistiche</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Rating</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">{selectedContent.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Downloads</span>
                    <span className="font-bold text-lg">{selectedContent.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Likes</span>
                    <span className="font-bold text-lg">{selectedContent.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Bookmarks</span>
                    <span className="font-bold text-lg">{selectedContent.bookmarks.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Access Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="font-bold mb-4 text-xl">Accesso Completo</h3>
                <p className="text-indigo-100 mb-6 leading-relaxed">
                  Questo contenuto è completamente gratuito e open source
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-100 transition-colors duration-300 transform hover:scale-105">
                  Inizia a Leggere
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table of Contents */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Indice dei Contenuti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedContent.chapters.map((chapter: any) => (
              <div key={chapter.id} className="group p-6 border-2 border-slate-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                      {chapter.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
                      <span>Pagine {chapter.pages}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{chapter.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-3 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors duration-300">
                      <Play className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors duration-300">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header */}
      <div className="mb-16">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca Digitale</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900">Esplora la Conoscenza</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Scopri la nostra collezione curata di risorse educative per l'apprendimento peer-to-peer
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca contenuti, autori, argomenti..."
              className="w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
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
                      : `${category.color} hover:scale-105`
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Featured Content */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Contenuto in Evidenza</h2>
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                  Open Source
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                  v{peeragogyHandbook.version}
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-semibold">
                  ⭐ Featured
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-4xl font-bold">{peeragogyHandbook.title}</h3>
                <p className="text-xl text-indigo-100 leading-relaxed">{peeragogyHandbook.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{peeragogyHandbook.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">{peeragogyHandbook.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">{peeragogyHandbook.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">{peeragogyHandbook.pages} pagine</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedContent(peeragogyHandbook)}
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Esplora il Handbook</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-64 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/20">
                <BookOpen className="w-32 h-32 text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {filteredContents.slice(1).map((content) => (
          <div
            key={content.id}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 transform hover:-translate-y-2"
          >
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border ${getTypeStyle(content.type)}`}>
                      {getTypeIcon(content.type)}
                      <span className="capitalize">{content.type === 'free' ? 'Gratuito' : content.type === 'premium' ? 'Premium' : 'Community'}</span>
                    </span>
                    {content.duration && (
                      <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{content.duration}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {content.title}
                  </h3>
                  <p className="text-slate-600 font-medium">di {content.author || content.authors?.join(', ')}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-lg">
                {content.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{content.rating}</span>
                  </div>
                  {content.participants && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">{content.participants.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span className="font-semibold">{content.likes}</span>
                  </div>
                </div>
                <button className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  <span>Accedi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
        <h3 className="text-3xl font-bold text-center mb-10">Statistiche della Biblioteca</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-3">
            <div className="text-4xl font-bold">12</div>
            <div className="text-indigo-200 font-medium">Contenuti Totali</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">10</div>
            <div className="text-indigo-200 font-medium">Contenuti Gratuiti</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">8</div>
            <div className="text-indigo-200 font-medium">Autori Attivi</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">15.4k</div>
            <div className="text-indigo-200 font-medium">Downloads Totali</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;