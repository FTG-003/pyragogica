import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, Clock, ArrowRight, Eye, Heart, Download, Users, Sparkles, X, ExternalLink, Github, Globe, FileText, ZoomIn, ZoomOut, AlertCircle, Upload } from 'lucide-react';

// Utility functions moved outside component scope
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

// PDF Viewer Component
const PDFViewer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}> = ({ isOpen, onClose, pdfUrl, title }) => {
  const [zoom, setZoom] = useState(100);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-600">Visualizzatore PDF</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all duration-300"
              title="Riduci zoom"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <span className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
              {zoom}%
            </span>
            
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all duration-300"
              title="Aumenta zoom"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <button
              onClick={onClose}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300"
              title="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="w-full h-full bg-slate-50 rounded-2xl overflow-auto">
            <iframe
              src={`${pdfUrl}#zoom=${zoom}`}
              className="w-full h-full border-0"
              title={title}
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Resource Detail Modal Component
const ResourceDetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  resource: any;
  onOpenPDF: () => void;
}> = ({ isOpen, onClose, resource, onOpenPDF }) => {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-lg ${getAccessStyle(resource.access)}`}>
                  <BookOpen className="w-4 h-4" />
                  <span className="capitalize">{resource.access === 'free' ? 'Gratuito' : resource.access}</span>
                </span>
                {resource.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{resource.title}</h2>
              <p className="text-lg text-slate-600 mb-4">{resource.subtitle}</p>
              <p className="text-slate-600">di {resource.authors.join(', ')}</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Descrizione</h3>
            <p className="text-slate-700 leading-relaxed text-lg">{resource.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Informazioni</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pagine:</span>
                    <span className="font-medium">{resource.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Lingua:</span>
                    <span className="font-medium">{resource.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Difficoltà:</span>
                    <span className="font-medium capitalize">{resource.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Valutazione:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{resource.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Statistiche</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Visualizzazioni:</span>
                    <span className="font-medium">{resource.views?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mi piace:</span>
                    <span className="font-medium">{resource.likes?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Download:</span>
                    <span className="font-medium">{resource.downloads?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h4 className="font-semibold text-slate-900 mb-3">Tag</h4>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-lg border border-purple-200 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenPDF}
              className="flex-1 inline-flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FileText className="w-5 h-5" />
              <span>Visualizza PDF</span>
            </button>
            
            {/* Download PDF Button */}
            <a
              href={resource.pdfUrl}
              download
              className="flex-1 inline-flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Scarica PDF</span>
            </a>
            
            {/* Repository Link */}
            {resource.id === '1' && (
              <a
                href="https://github.com/Peeragogy/Peeragogy.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Github className="w-5 h-5" />
                <span>Repository</span>
              </a>
            )}
            
            {/* Website Link */}
            {resource.id === '1' && (
              <a
                href="https://peeragogy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Globe className="w-5 h-5" />
                <span>Sito Web</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showResourceDetail, setShowResourceDetail] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const mockResources = [
    {
      id: '1',
      title: 'The Peeragogy Handbook',
      subtitle: 'A comprehensive guide to peer-to-peer learning',
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff', 'Paola Ricaurte', 'Charlotte Pierce', 'Lisa Snow Macdonald'],
      category: 'peer-learning',
      type: 'handbook',
      access: 'free',
      pages: 278,
      language: 'English',
      rating: 4.9,
      views: 45600,
      likes: 2340,
      downloads: 15420,
      description: 'The original Peeragogy Handbook Version 3.0 in English. This comprehensive guide explores peer learning and collaborative knowledge production, providing both theoretical foundations and practical techniques for implementing peeragogical approaches in various contexts. The handbook covers core principles, motivation, case studies, patterns, and practical implementation strategies.',
      tags: ['peer learning', 'collaborative education', 'community building', 'digital pedagogy', 'educational innovation', 'patterns', 'case studies'],
      difficulty: 'intermediate',
      featured: true,
      gradient: 'from-orange-500 to-pink-500',
      pdfUrl: '/resources/original-documents/pdf/peeragogy-handbook-v3.0-en.pdf'
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

  const handleResourceClick = (resource: any) => {
    setSelectedResource(resource);
    setShowResourceDetail(true);
  };

  const handleOpenPDF = () => {
    setShowResourceDetail(false);
    setShowPDFViewer(true);
  };

  const handleClosePDF = () => {
    setShowPDFViewer(false);
    setSelectedResource(null);
  };

  const handleCloseDetail = () => {
    setShowResourceDetail(false);
    setSelectedResource(null);
  };

  const handleDownloadClick = (e: React.MouseEvent, resource: any) => {
    e.stopPropagation(); // Prevent opening the modal
    if (resource.pdfUrl) {
      try {
        // Create download link
        const link = document.createElement('a');
        link.href = resource.pdfUrl;
        link.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download error:', error);
        window.open(resource.pdfUrl, '_blank');
      }
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
            onClick={() => handleResourceClick(resource)}
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
                <div 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-emerald-50 p-2 rounded-lg transition-colors duration-200"
                  onClick={(e) => handleDownloadClick(e, resource)}
                  title="Scarica PDF"
                >
                  <Download className="w-4 h-4 text-emerald-600 hover:text-emerald-700 transition-colors duration-200" />
                  <span className="font-semibold text-slate-700 hover:text-emerald-700 transition-colors duration-200">{resource.downloads}</span>
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

      {/* Resource Detail Modal */}
      <ResourceDetailModal
        isOpen={showResourceDetail}
        onClose={handleCloseDetail}
        resource={selectedResource}
        onOpenPDF={handleOpenPDF}
      />

      {/* PDF Viewer */}
      <PDFViewer
        isOpen={showPDFViewer}
        onClose={handleClosePDF}
        pdfUrl={selectedResource?.pdfUrl || ''}
        title={selectedResource?.title || ''}
      />
    </div>
  );
};

export default LibraryPage;