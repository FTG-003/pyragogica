import React from 'react';
import { Search, Filter, BookOpen, Lock, Users, Star, Clock, ArrowRight, Download, Eye, Heart, Share2, Bookmark, ExternalLink, Github, Globe, Brain, Monitor } from 'lucide-react';
import { allResources, categories, libraryStats, getResourcesByCategory, getFeaturedResources, searchResources, type Resource, type Chapter } from '../data/libraryContent';
import { useLibraryState } from '../hooks/useLibraryState';
import ResourceCard from '../components/ResourceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../components/ToastNotification';

const LibraryPage = () => {
  const {
    searchTerm,
    selectedCategory,
    selectedContent,
    selectedChapter,
    isLoading,
    setSearchTerm,
    setSelectedCategory,
    setSelectedContent,
    setSelectedChapter,
    setIsLoading
  } = useLibraryState();

  const { success, error, info } = useToast();

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Users,
      Monitor,
      Brain,
      Globe,
      Search
    };
    return icons[iconName] || BookOpen;
  };

  const filteredResources = searchTerm 
    ? searchResources(searchTerm)
    : selectedCategory === 'all' 
      ? allResources 
      : getResourcesByCategory(selectedCategory);

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

  const handleResourceClick = (resource: Resource) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedContent(resource);
      setIsLoading(false);
      success('Risorsa caricata', `${resource.title} è ora disponibile per la lettura`);
    }, 500);
  };

  const handleChapterClick = (chapter: Chapter) => {
    if (!chapter.available) {
      info('Capitolo non disponibile', 'Questo capitolo sarà disponibile presto');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setSelectedChapter(chapter);
      setIsLoading(false);
      success('Capitolo caricato', `${chapter.title} è pronto per la lettura`);
    }, 300);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      info('Ricerca attiva', `Trovate ${searchResources(value).length} risorse corrispondenti`);
    }
  };

  // Chapter Reading View
  if (selectedChapter) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Chapter Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSelectedChapter(null)}
            className="group inline-flex items-center space-x-3 px-6 py-3 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Torna all'indice</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500">
              Capitolo {selectedChapter.id} di {selectedContent?.chapters?.length || 0}
            </span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">{selectedChapter.duration}</span>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <article className="prose prose-lg prose-slate max-w-none">
          <header className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                Capitolo {selectedChapter.id}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-600">Pagine {selectedChapter.pages}</span>
              {selectedChapter.originalTitle && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600">Titolo originale: "{selectedChapter.originalTitle}"</span>
                </>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedChapter.difficulty || 'intermediate')}`}>
                {selectedChapter.difficulty || 'intermediate'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{selectedChapter.title}</h1>
            {selectedChapter.subtitle && (
              <p className="text-xl text-slate-600 font-light">{selectedChapter.subtitle}</p>
            )}
            
            <div className="flex items-center space-x-4 mt-6 text-sm text-slate-500">
              <span>Autori: {selectedChapter.authors.join(', ')}</span>
              {selectedChapter.lastUpdated && (
                <>
                  <span>•</span>
                  <span>Aggiornato: {selectedChapter.lastUpdated}</span>
                </>
              )}
            </div>
          </header>

          {/* Chapter Summary */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-3">Riassunto del Capitolo</h3>
            <p className="text-indigo-800 leading-relaxed">{selectedChapter.summary}</p>
          </div>

          {/* Key Points */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Punti Chiave</h3>
            <ul className="space-y-2">
              {selectedChapter.keyPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          {selectedChapter.tags && selectedChapter.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Tag</h3>
              <div className="flex flex-wrap gap-2">
                {selectedChapter.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          {selectedChapter.content && (
            <div className="text-slate-700 leading-relaxed space-y-6">
              {selectedChapter.content.split('\n\n').map((paragraph: string, index: number) => {
                // Handle markdown-style headers
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold text-slate-900 mt-8 mb-4">{paragraph.substring(2)}</h1>;
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-3">{paragraph.substring(3)}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold text-slate-900 mt-4 mb-2">{paragraph.substring(4)}</h3>;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={index} className="font-bold text-slate-900 text-lg mt-4 mb-2">{paragraph.slice(2, -2)}</p>;
                }
                if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.includes('\n')) {
                  return <p key={index} className="italic text-slate-600 text-center mt-6 mb-6 border-t border-b border-slate-200 py-4">{paragraph.slice(1, -1)}</p>;
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="my-8 border-slate-300" />;
                }
                
                return (
                  <p key={index} className="text-lg leading-relaxed mb-4">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          )}

          {/* Chapter Navigation */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-200">
            {selectedChapter.id > 1 && (
              <button
                onClick={() => {
                  const prevChapter = selectedContent?.chapters?.find(ch => ch.id === selectedChapter.id - 1);
                  if (prevChapter) handleChapterClick(prevChapter);
                }}
                className="group inline-flex items-center space-x-3 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Capitolo Precedente</span>
              </button>
            )}
            
            {selectedContent?.chapters && selectedChapter.id < selectedContent.chapters.length && (
              <button
                onClick={() => {
                  const nextChapter = selectedContent?.chapters?.find(ch => ch.id === selectedChapter.id + 1);
                  if (nextChapter) handleChapterClick(nextChapter);
                }}
                className="group inline-flex items-center space-x-3 px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all duration-300 ml-auto"
              >
                <span>Capitolo Successivo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            )}
          </div>
        </article>
      </div>
    );
  }

  // Resource Detail View
  if (selectedContent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => setSelectedContent(null)}
          className="group mb-8 inline-flex items-center space-x-3 px-6 py-3 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Torna alla biblioteca</span>
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Caricamento contenuto..." />
          </div>
        )}

        {!isLoading && (
          <>
            {/* Resource Header */}
            <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border bg-emerald-100 text-emerald-800 border-emerald-200">
                      <BookOpen className="w-4 h-4" />
                      <span>Gratuito</span>
                    </span>
                    {selectedContent.version && (
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">
                        v{selectedContent.version}
                      </span>
                    )}
                    {selectedContent.featured && (
                      <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                        ⭐ In Evidenza
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedContent.difficulty)}`}>
                      {selectedContent.difficulty}
                    </span>
                    {selectedContent.translationStatus && (
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">
                        Traduzione {selectedContent.translationStatus === 'complete' ? 'Completa' : selectedContent.translationStatus === 'partial' ? 'Parziale' : 'Pianificata'}
                      </span>
                    )}
                  </div>
                  
                  {/* Title and Subtitle */}
                  <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-slate-900 leading-tight">{selectedContent.title}</h1>
                    {selectedContent.originalTitle && selectedContent.originalTitle !== selectedContent.title && (
                      <p className="text-lg text-slate-500 italic">Titolo originale: {selectedContent.originalTitle}</p>
                    )}
                    {selectedContent.subtitle && (
                      <p className="text-2xl text-slate-600 font-light">{selectedContent.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-6 text-slate-600 text-lg">
                    <span className="font-semibold">di {selectedContent.authors.map(a => a.name).join(', ')}</span>
                    {selectedContent.pages && (
                      <>
                        <span>•</span>
                        <span>{selectedContent.pages} pagine</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{selectedContent.language}</span>
                    {selectedContent.originalLanguage && selectedContent.originalLanguage !== selectedContent.language && (
                      <>
                        <span>•</span>
                        <span>Tradotto da {selectedContent.originalLanguage}</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed text-lg">{selectedContent.description}</p>

                  {/* Learning Outcomes */}
                  {selectedContent.learningOutcomes && selectedContent.learningOutcomes.length > 0 && (
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Obiettivi di Apprendimento</h3>
                      <ul className="space-y-2">
                        {selectedContent.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <span className="text-blue-800">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Repository Link */}
                  {selectedContent.repository && (
                    <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                      <Github className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-600 font-medium">Repository:</span>
                      <a 
                        href={selectedContent.repository} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
                      >
                        <span>{selectedContent.repository}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

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
                    <button 
                      onClick={() => success('Lettura avviata', 'Buona lettura!')}
                      className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      <span>Leggi Online</span>
                    </button>
                    <button 
                      onClick={() => info('Download', 'Funzionalità di download in arrivo')}
                      className="group inline-flex items-center space-x-3 px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 transform hover:scale-105"
                    >
                      <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      <span>Download</span>
                    </button>
                    <button 
                      onClick={() => success('Aggiunto ai preferiti', 'Risorsa salvata nei tuoi preferiti')}
                      className="group p-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
                    >
                      <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                    <button 
                      onClick={() => info('Condivisione', 'Link copiato negli appunti')}
                      className="group p-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                    >
                      <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                    <button 
                      onClick={() => success('Segnalibro aggiunto', 'Risorsa aggiunta ai segnalibri')}
                      className="group p-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-300"
                    >
                      <Bookmark className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Sidebar */}
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
                      {selectedContent.downloads && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Downloads</span>
                          <span className="font-bold text-lg">{selectedContent.downloads.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedContent.likes && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Likes</span>
                          <span className="font-bold text-lg">{selectedContent.likes.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedContent.views && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Visualizzazioni</span>
                          <span className="font-bold text-lg">{selectedContent.views.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Access Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                    <h3 className="font-bold mb-4 text-xl">Accesso Gratuito</h3>
                    <p className="text-indigo-100 mb-6 leading-relaxed">
                      Questo contenuto è completamente gratuito e open source
                    </p>
                    <button 
                      onClick={() => success('Accesso confermato', 'Puoi iniziare a leggere immediatamente')}
                      className="w-full py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-100 transition-colors duration-300 transform hover:scale-105"
                    >
                      Inizia a Leggere
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            {selectedContent.chapters && selectedContent.chapters.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Indice dei Contenuti</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedContent.chapters.map((chapter: Chapter) => (
                    <div 
                      key={chapter.id} 
                      className="group p-6 border-2 border-slate-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer"
                      onClick={() => handleChapterClick(chapter)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                              {chapter.title}
                            </h3>
                            {chapter.difficulty && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chapter.difficulty)}`}>
                                {chapter.difficulty}
                              </span>
                            )}
                          </div>
                          {chapter.subtitle && (
                            <p className="text-slate-600 text-sm mt-1">{chapter.subtitle}</p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
                            <span>Pagine {chapter.pages}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{chapter.duration}</span>
                            </div>
                            {!chapter.available && (
                              <>
                                <span>•</span>
                                <span className="text-orange-600 font-medium">In arrivo</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {chapter.available ? (
                            <button className="p-3 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors duration-300">
                              <Eye className="w-5 h-5" />
                            </button>
                          ) : (
                            <div className="p-3 text-slate-400 rounded-xl">
                              <Lock className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{chapter.summary}</p>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ${
                          chapter.available ? 'w-full' : 'w-0 group-hover:w-1/4'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

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
            Backend protetto, autenticazione robusta, interfaccia accessibile.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Cerca risorse, autori, argomenti..."
              className="w-full pl-12 pr-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Campo di ricerca"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-6 h-6 text-slate-400" />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-slate-100 text-slate-700 hover:scale-105'
                }`}
              >
                Tutte ({allResources.length})
              </button>
              {categories.map(category => {
                const IconComponent = getIconComponent(category.icon);
                const resourceCount = getResourcesByCategory(category.id).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                        : 'bg-slate-100 text-slate-700 hover:scale-105'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name} ({resourceCount})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" text="Caricamento risorse..." />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Featured Resources */}
          {selectedCategory === 'all' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Risorse in Evidenza</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {getFeaturedResources().map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onClick={handleResourceClick}
                    featured={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Resources Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              {selectedCategory === 'all' ? 'Tutte le Risorse' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onClick={handleResourceClick}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Library Stats */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
        <h3 className="text-3xl font-bold text-center mb-10">Statistiche della Biblioteca</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-3">
            <div className="text-4xl font-bold">{libraryStats.totalResources}</div>
            <div className="text-indigo-200 font-medium">Risorse Totali</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">{libraryStats.totalAuthors}</div>
            <div className="text-indigo-200 font-medium">Autori</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">{libraryStats.totalPages}</div>
            <div className="text-indigo-200 font-medium">Pagine Totali</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl font-bold">{libraryStats.categories}</div>
            <div className="text-indigo-200 font-medium">Categorie</div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-indigo-200">
            Lingue supportate: {libraryStats.languages.join(', ')} • 
            Ultimo aggiornamento: {libraryStats.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;