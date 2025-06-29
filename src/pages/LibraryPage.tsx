import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, BookOpen, Star, Eye, Heart, Download, ArrowRight, Clock, Users, Globe, Zap, Database, Layers, CheckCircle } from 'lucide-react';
import { allResources, categories, libraryStats, getResourcesByCategory, getFeaturedResources, searchResources, type Resource, type Chapter } from '../data/libraryContent';
import { useLibraryState } from '../hooks/useLibraryState';
import ResourceCard from '../components/ResourceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ModernButton from '../components/ui/ModernButton';
import ModernCard from '../components/ui/ModernCard';
import ModernInput from '../components/ui/ModernInput';
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

  // Memoized filtered resources for performance
  const filteredResources = useMemo(() => {
    if (searchTerm) {
      return searchResources(searchTerm);
    }
    return selectedCategory === 'all' ? allResources : getResourcesByCategory(selectedCategory);
  }, [searchTerm, selectedCategory]);

  const featuredResources = useMemo(() => getFeaturedResources(), []);

  const getIconComponent = useCallback((iconName: string) => {
    const icons: { [key: string]: any } = { Users, Globe, Database, Layers, Search };
    return icons[iconName] || BookOpen;
  }, []);

  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }, []);

  const handleResourceClick = useCallback((resource: Resource) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedContent(resource);
      setIsLoading(false);
      success('Risorsa caricata', `${resource.title} è ora disponibile per la lettura`);
    }, 500);
  }, [setIsLoading, setSelectedContent, success]);

  const handleChapterClick = useCallback((chapter: Chapter) => {
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
  }, [setIsLoading, setSelectedChapter, success, info]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const results = searchResources(value);
      info('Ricerca attiva', `Trovate ${results.length} risorse corrispondenti`);
    }
  }, [setSearchTerm, info]);

  // Chapter Reading View
  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container-modern py-12">
          {/* Modern Chapter Navigation */}
          <div className="flex items-center justify-between mb-8">
            <ModernButton
              variant="secondary"
              onClick={() => setSelectedChapter(null)}
              icon={<ArrowRight className="w-5 h-5 rotate-180" />}
              ariaLabel="Torna all'indice"
            >
              Torna all'indice
            </ModernButton>
            
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>Capitolo {selectedChapter.id} di {selectedContent?.chapters?.length || 0}</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selectedChapter.duration}</span>
              </div>
            </div>
          </div>

          {/* Modern Chapter Content */}
          <ModernCard className="max-w-4xl mx-auto" padding="lg">
            <article className="prose prose-lg prose-slate max-w-none">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="status-indicator status-info">
                    Capitolo {selectedChapter.id}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600">Pagine {selectedChapter.pages}</span>
                  {selectedChapter.originalTitle && (
                    <>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-600">"{selectedChapter.originalTitle}"</span>
                    </>
                  )}
                  <span className={`status-indicator ${getDifficultyColor(selectedChapter.difficulty || 'intermediate').replace('bg-', 'status-').replace('text-', '').replace('border-', '')}`}>
                    {selectedChapter.difficulty || 'intermediate'}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{selectedChapter.title}</h1>
                {selectedChapter.subtitle && (
                  <p className="text-xl text-slate-600 font-light">{selectedChapter.subtitle}</p>
                )}
                
                <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
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
              <ModernCard className="bg-indigo-50 border-l-4 border-indigo-500 mb-8">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">Riassunto del Capitolo</h3>
                <p className="text-indigo-800 leading-relaxed">{selectedChapter.summary}</p>
              </ModernCard>

              {/* Key Points */}
              <ModernCard className="bg-slate-50 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Punti Chiave</h3>
                <ul className="space-y-2">
                  {selectedChapter.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </ModernCard>

              {/* Tags */}
              {selectedChapter.tags && selectedChapter.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Tag</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedChapter.tags.map((tag: string, index: number) => (
                      <span key={index} className="status-indicator status-info">
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
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-3xl font-bold text-slate-900 mt-8 mb-4">{paragraph.substring(2)}</h1>;
                    }
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-3">{paragraph.substring(3)}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-bold text-slate-900 mt-4 mb-2">{paragraph.substring(4)}</h3>;
                    }
                    return <p key={index} className="text-lg leading-relaxed mb-4">{paragraph.trim()}</p>;
                  })}
                </div>
              )}

              {/* Chapter Navigation */}
              <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-200">
                {selectedChapter.id > 1 && (
                  <ModernButton
                    variant="secondary"
                    onClick={() => {
                      const prevChapter = selectedContent?.chapters?.find(ch => ch.id === selectedChapter.id - 1);
                      if (prevChapter) handleChapterClick(prevChapter);
                    }}
                    icon={<ArrowRight className="w-5 h-5 rotate-180" />}
                  >
                    Capitolo Precedente
                  </ModernButton>
                )}
                
                {selectedContent?.chapters && selectedChapter.id < selectedContent.chapters.length && (
                  <ModernButton
                    variant="primary"
                    onClick={() => {
                      const nextChapter = selectedContent?.chapters?.find(ch => ch.id === selectedChapter.id + 1);
                      if (nextChapter) handleChapterClick(nextChapter);
                    }}
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    className="ml-auto"
                  >
                    Capitolo Successivo
                  </ModernButton>
                )}
              </div>
            </article>
          </ModernCard>
        </div>
      </div>
    );
  }

  // Resource Detail View
  if (selectedContent) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container-modern py-12">
          {/* Back Button */}
          <ModernButton
            variant="secondary"
            onClick={() => setSelectedContent(null)}
            icon={<ArrowRight className="w-5 h-5 rotate-180" />}
            className="mb-8"
            ariaLabel="Torna alla biblioteca"
          >
            Torna alla biblioteca
          </ModernButton>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" text="Caricamento contenuto..." />
            </div>
          )}

          {!isLoading && (
            <>
              {/* Resource Header */}
              <ModernCard className="mb-10" padding="lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="status-indicator status-success">
                        <BookOpen className="w-4 h-4" />
                        Gratuito
                      </span>
                      {selectedContent.version && (
                        <span className="status-indicator status-info">
                          v{selectedContent.version}
                        </span>
                      )}
                      {selectedContent.featured && (
                        <span className="status-indicator" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', color: 'white', border: 'none' }}>
                          ⭐ In Evidenza
                        </span>
                      )}
                      <span className={`status-indicator ${getDifficultyColor(selectedContent.difficulty).replace('bg-', 'status-').replace('text-', '').replace('border-', '')}`}>
                        {selectedContent.difficulty}
                      </span>
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
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 leading-relaxed text-lg">{selectedContent.description}</p>

                    {/* Learning Outcomes */}
                    {selectedContent.learningOutcomes && selectedContent.learningOutcomes.length > 0 && (
                      <ModernCard className="bg-blue-50">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Obiettivi di Apprendimento</h3>
                        <ul className="space-y-2">
                          {selectedContent.learningOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-blue-800">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </ModernCard>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {selectedContent.tags.map((tag: string, index: number) => (
                        <span key={index} className="status-indicator status-info">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                      <ModernButton
                        variant="primary"
                        size="lg"
                        onClick={() => success('Lettura avviata', 'Buona lettura!')}
                        icon={<Eye className="w-6 h-6" />}
                      >
                        Leggi Online
                      </ModernButton>
                      <ModernButton
                        variant="secondary"
                        size="lg"
                        onClick={() => info('Download', 'Funzionalità di download in arrivo')}
                        icon={<Download className="w-6 h-6" />}
                      >
                        Download
                      </ModernButton>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-8">
                    {/* Stats Card */}
                    <ModernCard className="bg-gradient-to-br from-slate-50 to-slate-100">
                      <h3 className="font-bold text-slate-900 mb-6 text-xl">Statistiche</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Rating</span>
                          <div className="flex items-center gap-2">
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
                        {selectedContent.views && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 font-medium">Visualizzazioni</span>
                            <span className="font-bold text-lg">{selectedContent.views.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </ModernCard>

                    {/* Access Card */}
                    <ModernCard className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
                      <h3 className="font-bold mb-4 text-xl text-white">Accesso Gratuito</h3>
                      <p className="text-indigo-100 mb-6 leading-relaxed">
                        Questo contenuto è completamente gratuito e open source
                      </p>
                      <ModernButton
                        variant="secondary"
                        onClick={() => success('Accesso confermato', 'Puoi iniziare a leggere immediatamente')}
                        className="w-full bg-white text-indigo-600 hover:bg-slate-100"
                      >
                        Inizia a Leggere
                      </ModernButton>
                    </ModernCard>
                  </div>
                </div>
              </ModernCard>

              {/* Table of Contents */}
              {selectedContent.chapters && selectedContent.chapters.length > 0 && (
                <ModernCard padding="lg">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Indice dei Contenuti</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedContent.chapters.map((chapter: Chapter) => (
                      <ModernCard
                        key={chapter.id}
                        hover={chapter.available}
                        onClick={() => chapter.available && handleChapterClick(chapter)}
                        className={`${chapter.available ? 'cursor-pointer' : 'opacity-60'} border-2 border-slate-200 hover:border-indigo-300`}
                        ariaLabel={`${chapter.available ? 'Leggi' : 'Non disponibile'} ${chapter.title}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                                {chapter.title}
                              </h3>
                              {chapter.difficulty && (
                                <span className={`status-indicator ${getDifficultyColor(chapter.difficulty).replace('bg-', 'status-').replace('text-', '').replace('border-', '')}`}>
                                  {chapter.difficulty}
                                </span>
                              )}
                            </div>
                            {chapter.subtitle && (
                              <p className="text-slate-600 text-sm mt-1">{chapter.subtitle}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                              <span>Pagine {chapter.pages}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
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
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{chapter.summary}</p>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className={`bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ${
                            chapter.available ? 'w-full' : 'w-0 group-hover:w-1/4'
                          }`}></div>
                        </div>
                      </ModernCard>
                    ))}
                  </div>
                </ModernCard>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in-up">
      {/* Modern Header */}
      <div className="bg-gradient-to-br from-white via-slate-50 to-indigo-50 py-20">
        <div className="container-modern">
          <div className="text-center mb-12">
            <div className="status-indicator status-info mb-6">
              <BookOpen className="w-4 h-4" />
              Biblioteca Digitale Production-Ready
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Esplora la Conoscenza</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Una biblioteca digitale sicura e scalabile per risorse educative di alta qualità. 
              Backend protetto, autenticazione robusta, interfaccia accessibile.
            </p>
          </div>

          {/* Modern Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <ModernInput
                type="search"
                placeholder="Cerca risorse, autori, argomenti..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                size="lg"
                ariaLabel="Campo di ricerca"
              />
            </div>
            <div className="flex items-center gap-4">
              <Filter className="w-6 h-6 text-slate-400" />
              <div className="flex flex-wrap gap-3">
                <ModernButton
                  variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedCategory('all')}
                  size="md"
                >
                  Tutte ({allResources.length})
                </ModernButton>
                {categories.map(category => {
                  const IconComponent = getIconComponent(category.icon);
                  const resourceCount = getResourcesByCategory(category.id).length;
                  return (
                    <ModernButton
                      key={category.id}
                      variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                      onClick={() => setSelectedCategory(category.id)}
                      icon={<IconComponent className="w-4 h-4" />}
                      size="md"
                    >
                      {category.name} ({resourceCount})
                    </ModernButton>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-modern py-16">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Caricamento risorse..." variant="dots" />
          </div>
        )}

        {!isLoading && (
          <>
            {/* Featured Resources */}
            {selectedCategory === 'all' && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Risorse in Evidenza</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {featuredResources.map((resource) => (
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
        <ModernCard className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-0" padding="lg">
          <h3 className="text-3xl font-bold text-center mb-10 text-white">Statistiche della Biblioteca</h3>
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
        </ModernCard>
      </div>
    </div>
  );
};

export default React.memo(LibraryPage);