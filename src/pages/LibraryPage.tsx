import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, BookOpen, Star, Eye, Heart, Download, ArrowRight, Clock, Users, Globe, Zap, Database, Layers, CheckCircle, Sparkles, Award, TrendingUp, Infinity } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="container-modern py-12">
          {/* Modern Chapter Navigation */}
          <div className="flex items-center justify-between mb-8">
            <ModernButton
              variant="secondary"
              onClick={() => setSelectedChapter(null)}
              icon={<ArrowRight className="w-6 h-6 rotate-180" />}
              ariaLabel="Torna all'indice"
              className="text-xl px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
            >
              ← Torna all'Indice
            </ModernButton>
            
            <div className="flex items-center gap-6 text-lg text-slate-500 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
              <span className="font-bold">Capitolo {selectedChapter.id} di {selectedContent?.chapters?.length || 0}</span>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span className="font-semibold">{selectedChapter.duration}</span>
              </div>
            </div>
          </div>

          {/* Modern Chapter Content */}
          <ModernCard className="max-w-5xl mx-auto shadow-2xl border-2 border-indigo-200/50" padding="lg">
            <article className="prose prose-xl prose-slate max-w-none">
              <header className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-2xl text-lg font-bold border-2 border-indigo-200">
                    <Sparkles className="w-5 h-5" />
                    Capitolo {selectedChapter.id}
                  </span>
                  <span className="text-slate-500 text-2xl">•</span>
                  <span className="text-slate-600 text-xl font-semibold">Pagine {selectedChapter.pages}</span>
                  {selectedChapter.originalTitle && (
                    <>
                      <span className="text-slate-500 text-2xl">•</span>
                      <span className="text-slate-600 text-xl italic">"{selectedChapter.originalTitle}"</span>
                    </>
                  )}
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold border-2 ${getDifficultyColor(selectedChapter.difficulty || 'intermediate')}`}>
                    <Award className="w-4 h-4" />
                    {selectedChapter.difficulty || 'intermediate'}
                  </span>
                </div>
                
                <h1 className="text-6xl font-black text-slate-900 mb-6 leading-tight">{selectedChapter.title}</h1>
                {selectedChapter.subtitle && (
                  <p className="text-3xl text-slate-600 font-light leading-relaxed">{selectedChapter.subtitle}</p>
                )}
                
                <div className="flex items-center gap-6 mt-8 text-lg text-slate-500 bg-slate-50 px-6 py-4 rounded-2xl">
                  <span className="font-semibold">Autori: {selectedChapter.authors.join(', ')}</span>
                  {selectedChapter.lastUpdated && (
                    <>
                      <span>•</span>
                      <span>Aggiornato: {selectedChapter.lastUpdated}</span>
                    </>
                  )}
                </div>
              </header>

              {/* Chapter Summary */}
              <ModernCard className="bg-gradient-to-br from-indigo-50 to-purple-50 border-l-8 border-indigo-500 mb-12 shadow-xl">
                <h3 className="text-2xl font-black text-indigo-900 mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  Riassunto del Capitolo
                </h3>
                <p className="text-indigo-800 leading-relaxed text-xl">{selectedChapter.summary}</p>
              </ModernCard>

              {/* Key Points */}
              <ModernCard className="bg-gradient-to-br from-slate-50 to-slate-100 mb-12 shadow-xl">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  Punti Chiave
                </h3>
                <ul className="space-y-4">
                  {selectedChapter.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-500">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-700 text-xl leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </ModernCard>

              {/* Tags */}
              {selectedChapter.tags && selectedChapter.tags.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Tag</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedChapter.tags.map((tag: string, index: number) => (
                      <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-2xl text-lg font-bold border-2 border-blue-200 hover:scale-110 transition-all duration-300">
                        <Sparkles className="w-4 h-4" />
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Content */}
              {selectedChapter.content && (
                <div className="text-slate-700 leading-relaxed space-y-8 text-xl">
                  {selectedChapter.content.split('\n\n').map((paragraph: string, index: number) => {
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-5xl font-black text-slate-900 mt-12 mb-6">{paragraph.substring(2)}</h1>;
                    }
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-4xl font-black text-slate-900 mt-10 mb-5">{paragraph.substring(3)}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-3xl font-black text-slate-900 mt-8 mb-4">{paragraph.substring(4)}</h3>;
                    }
                    return <p key={index} className="text-xl leading-relaxed mb-6">{paragraph.trim()}</p>;
                  })}
                </div>
              )}

              {/* Chapter Navigation */}
              <div className="flex items-center justify-between mt-20 pt-10 border-t-4 border-slate-200">
                {selectedChapter.id > 1 && (
                  <ModernButton
                    variant="secondary"
                    onClick={() => {
                      const prevChapter = selectedContent?.chapters?.find(ch => ch.id === selectedChapter.id - 1);
                      if (prevChapter) handleChapterClick(prevChapter);
                    }}
                    icon={<ArrowRight className="w-6 h-6 rotate-180" />}
                    className="text-xl px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
                  >
                    ← Capitolo Precedente
                  </ModernButton>
                )}
                
                {selectedContent?.chapters && selectedChapter.id < selectedContent.chapters.length && (
                  <ModernButton
                    variant="primary"
                    onClick={() => {
                      const nextChapter = selectedContent?.chapters?.find(ch => ch.id === selectedChapter.id + 1);
                      if (nextChapter) handleChapterClick(nextChapter);
                    }}
                    icon={<ArrowRight className="w-6 h-6" />}
                    iconPosition="right"
                    className="ml-auto text-xl px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
                  >
                    Capitolo Successivo →
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="container-modern py-12">
          {/* Back Button */}
          <ModernButton
            variant="secondary"
            onClick={() => setSelectedContent(null)}
            icon={<ArrowRight className="w-6 h-6 rotate-180" />}
            className="mb-8 text-xl px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
            ariaLabel="Torna alla biblioteca"
          >
            ← Torna alla Biblioteca
          </ModernButton>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" text="Caricamento contenuto spettacolare..." />
            </div>
          )}

          {!isLoading && (
            <>
              {/* Resource Header */}
              <ModernCard className="mb-12 shadow-2xl border-2 border-indigo-200/50" padding="lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-10">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-2xl text-lg font-bold border-2 border-emerald-200">
                        <BookOpen className="w-5 h-5" />
                        🆓 Gratuito
                      </span>
                      {selectedContent.version && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-2xl text-lg font-bold border-2 border-blue-200">
                          v{selectedContent.version}
                        </span>
                      )}
                      {selectedContent.featured && (
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl text-lg font-bold shadow-xl">
                          ⭐ In Evidenza
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-lg font-bold border-2 ${getDifficultyColor(selectedContent.difficulty)}`}>
                        <Award className="w-4 h-4" />
                        {selectedContent.difficulty}
                      </span>
                    </div>
                    
                    {/* Title and Subtitle */}
                    <div className="space-y-6">
                      <h1 className="text-6xl font-black text-slate-900 leading-tight">{selectedContent.title}</h1>
                      {selectedContent.originalTitle && selectedContent.originalTitle !== selectedContent.title && (
                        <p className="text-2xl text-slate-500 italic">Titolo originale: {selectedContent.originalTitle}</p>
                      )}
                      {selectedContent.subtitle && (
                        <p className="text-3xl text-slate-600 font-light leading-relaxed">{selectedContent.subtitle}</p>
                      )}
                    </div>
                    
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-8 text-slate-600 text-xl bg-slate-50 px-6 py-4 rounded-2xl">
                      <span className="font-bold">di {selectedContent.authors.map(a => a.name).join(', ')}</span>
                      {selectedContent.pages && (
                        <>
                          <span>•</span>
                          <span className="font-semibold">{selectedContent.pages} pagine</span>
                        </>
                      )}
                      <span>•</span>
                      <span className="font-semibold">{selectedContent.language}</span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 leading-relaxed text-2xl">{selectedContent.description}</p>

                    {/* Learning Outcomes */}
                    {selectedContent.learningOutcomes && selectedContent.learningOutcomes.length > 0 && (
                      <ModernCard className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
                        <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
                          <TrendingUp className="w-6 h-6" />
                          Obiettivi di Apprendimento
                        </h3>
                        <ul className="space-y-4">
                          {selectedContent.learningOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-4 group">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-500">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-blue-800 text-xl">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </ModernCard>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {selectedContent.tags.map((tag: string, index: number) => (
                        <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-2xl text-lg font-bold border-2 border-indigo-200 hover:scale-110 transition-all duration-300">
                          <Sparkles className="w-4 h-4" />
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-6">
                      <ModernButton
                        variant="primary"
                        size="lg"
                        onClick={() => success('Lettura avviata', 'Buona lettura!')}
                        icon={<Eye className="w-8 h-8" />}
                        className="text-2xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500"
                      >
                        📖 Leggi Online
                      </ModernButton>
                      <ModernButton
                        variant="secondary"
                        size="lg"
                        onClick={() => info('Download', 'Funzionalità di download in arrivo')}
                        icon={<Download className="w-8 h-8" />}
                        className="text-2xl px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
                      >
                        💾 Download
                      </ModernButton>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-10">
                    {/* Stats Card */}
                    <ModernCard className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl">
                      <h3 className="font-black text-slate-900 mb-8 text-2xl flex items-center gap-3">
                        <TrendingUp className="w-6 h-6" />
                        Statistiche
                      </h3>
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-bold text-lg">Rating</span>
                          <div className="flex items-center gap-3">
                            <Star className="w-6 h-6 text-yellow-500 fill-current" />
                            <span className="font-black text-2xl">{selectedContent.rating}</span>
                          </div>
                        </div>
                        {selectedContent.downloads && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 font-bold text-lg">Downloads</span>
                            <span className="font-black text-2xl">{selectedContent.downloads.toLocaleString()}</span>
                          </div>
                        )}
                        {selectedContent.views && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 font-bold text-lg">Visualizzazioni</span>
                            <span className="font-black text-2xl">{selectedContent.views.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </ModernCard>

                    {/* Access Card */}
                    <ModernCard className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
                      <h3 className="font-black mb-6 text-2xl text-white flex items-center gap-3">
                        <Sparkles className="w-6 h-6" />
                        Accesso Gratuito
                      </h3>
                      <p className="text-indigo-100 mb-8 leading-relaxed text-xl">
                        Questo contenuto è completamente <strong>gratuito</strong> e <strong>open source</strong>
                      </p>
                      <ModernButton
                        variant="secondary"
                        onClick={() => success('Accesso confermato', 'Puoi iniziare a leggere immediatamente')}
                        className="w-full bg-white text-indigo-600 hover:bg-slate-100 text-xl py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                      >
                        🚀 Inizia a Leggere
                      </ModernButton>
                    </ModernCard>
                  </div>
                </div>
              </ModernCard>

              {/* Table of Contents */}
              {selectedContent.chapters && selectedContent.chapters.length > 0 && (
                <ModernCard padding="lg" className="shadow-2xl border-2 border-indigo-200/50">
                  <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                    Indice dei Contenuti
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedContent.chapters.map((chapter: Chapter) => (
                      <ModernCard
                        key={chapter.id}
                        hover={chapter.available}
                        onClick={() => chapter.available && handleChapterClick(chapter)}
                        className={`${chapter.available ? 'cursor-pointer hover:scale-105' : 'opacity-60'} border-4 border-slate-200 hover:border-indigo-300 shadow-xl hover:shadow-2xl transition-all duration-500`}
                        ariaLabel={`${chapter.available ? 'Leggi' : 'Non disponibile'} ${chapter.title}`}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h3 className="font-black text-slate-900 text-2xl group-hover:text-indigo-600 transition-colors duration-300">
                                {chapter.title}
                              </h3>
                              {chapter.difficulty && (
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl text-sm font-bold border-2 ${getDifficultyColor(chapter.difficulty)}`}>
                                  <Award className="w-3 h-3" />
                                  {chapter.difficulty}
                                </span>
                              )}
                            </div>
                            {chapter.subtitle && (
                              <p className="text-slate-600 text-lg mt-2">{chapter.subtitle}</p>
                            )}
                            <div className="flex items-center gap-6 text-lg text-slate-600 mt-3">
                              <span className="font-semibold">Pagine {chapter.pages}</span>
                              <span>•</span>
                              <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-semibold">{chapter.duration}</span>
                              </div>
                              {!chapter.available && (
                                <>
                                  <span>•</span>
                                  <span className="text-orange-600 font-bold">🚧 In arrivo</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">{chapter.summary}</p>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div className={`bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ${
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 animate-fade-in-up">
      {/* Modern Header Drammatico */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-32 relative overflow-hidden">
        {/* Background Animato */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-white to-yellow-300 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-cyan-300 to-white blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/20 backdrop-blur-xl rounded-full text-white text-xl font-bold mb-8 shadow-2xl">
              <BookOpen className="w-6 h-6 animate-pulse" />
              <span>Biblioteca Digitale Production-Ready</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
              Esplora la 
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Conoscenza Infinita
              </span>
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              Una biblioteca digitale <strong>sicura e scalabile</strong> per risorse educative di alta qualità. 
              Backend protetto, autenticazione robusta, interfaccia <strong>spettacolare</strong>.
            </p>
          </div>

          {/* Modern Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ModernInput
                type="search"
                placeholder="🔍 Cerca risorse, autori, argomenti..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                icon={<Search className="w-6 h-6" />}
                size="lg"
                ariaLabel="Campo di ricerca"
                className="text-xl py-6 shadow-2xl border-4 border-white/50 bg-white/90 backdrop-blur-xl"
              />
            </div>
            <div className="flex items-center gap-6">
              <Filter className="w-8 h-8 text-white" />
              <div className="flex flex-wrap gap-4">
                <ModernButton
                  variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedCategory('all')}
                  size="md"
                  className={`text-lg px-6 py-3 font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 ${
                    selectedCategory === 'all' 
                      ? 'bg-white text-indigo-600' 
                      : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/50'
                  }`}
                >
                  🌟 Tutte ({allResources.length})
                </ModernButton>
                {categories.map(category => {
                  const IconComponent = getIconComponent(category.icon);
                  const resourceCount = getResourcesByCategory(category.id).length;
                  return (
                    <ModernButton
                      key={category.id}
                      variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                      onClick={() => setSelectedCategory(category.id)}
                      icon={<IconComponent className="w-5 h-5" />}
                      size="md"
                      className={`text-lg px-6 py-3 font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 ${
                        selectedCategory === category.id 
                          ? 'bg-white text-indigo-600' 
                          : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/50'
                      }`}
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

      <div className="container-modern py-20">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-32">
            <LoadingSpinner size="lg" text="Caricamento risorse spettacolari..." variant="dots" />
          </div>
        )}

        {!isLoading && (
          <>
            {/* Featured Resources */}
            {selectedCategory === 'all' && (
              <div className="mb-20">
                <h2 className="text-5xl font-black text-slate-900 mb-12 text-center">
                  🌟 Risorse in 
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Evidenza
                  </span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
            <div className="mb-20">
              <h2 className="text-5xl font-black text-slate-900 mb-12 text-center">
                {selectedCategory === 'all' ? (
                  <>
                    📚 Tutte le 
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                      Risorse
                    </span>
                  </>
                ) : (
                  <>
                    📖 {categories.find(c => c.id === selectedCategory)?.name}
                  </>
                )}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
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

        {/* Library Stats Spettacolari */}
        <ModernCard className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white border-0 shadow-2xl" padding="lg">
          <h3 className="text-4xl font-black text-center mb-16 text-white flex items-center justify-center gap-4">
            <TrendingUp className="w-8 h-8" />
            Statistiche della Biblioteca
            <Infinity className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4 group">
              <div className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">
                {libraryStats.totalResources}
              </div>
              <div className="text-indigo-200 font-bold text-xl">Risorse Totali</div>
            </div>
            <div className="space-y-4 group">
              <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">
                {libraryStats.totalAuthors}
              </div>
              <div className="text-indigo-200 font-bold text-xl">Autori</div>
            </div>
            <div className="space-y-4 group">
              <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">
                {libraryStats.totalPages}
              </div>
              <div className="text-indigo-200 font-bold text-xl">Pagine Totali</div>
            </div>
            <div className="space-y-4 group">
              <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-500">
                {libraryStats.categories}
              </div>
              <div className="text-indigo-200 font-bold text-xl">Categorie</div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-indigo-200 text-xl">
              🌍 Lingue supportate: <strong>{libraryStats.languages.join(', ')}</strong> • 
              📅 Ultimo aggiornamento: <strong>{libraryStats.lastUpdated}</strong>
            </p>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default React.memo(LibraryPage);