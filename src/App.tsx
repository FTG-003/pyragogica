import React, { useState, Suspense } from 'react';
import { BookOpen, Brain, Database, Menu, X, Sparkles, Zap } from 'lucide-react';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useToast } from './components/ToastNotification';

// Lazy loading ottimizzato per performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LibraryPage = React.lazy(() => import('./pages/LibraryPage'));
const ChatbotPage = React.lazy(() => import('./pages/ChatbotPage'));

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ToastContainer, success, info } = useToast();

  const navigation = [
    { id: 'home', name: 'Home', icon: Sparkles },
    { id: 'library', name: 'Biblioteca', icon: Database },
    { id: 'chatbot', name: 'AI Assistant', icon: Brain },
  ];

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    
    const pageNames = {
      home: 'Homepage',
      library: 'Biblioteca Digitale',
      chatbot: 'AI Assistant'
    };
    
    info('Navigazione', `Caricamento ${pageNames[pageId as keyof typeof pageNames]}...`, 2000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'library': return <LibraryPage />;
      case 'chatbot': return <ChatbotPage />;
      default: return <HomePage />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Ottimizzata */}
        <nav className="bg-white/95 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo Moderno */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Database className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Biblioteca Pyragogica
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">Core System v2.0</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-100/80 min-h-[44px] ${
                        currentPage === item.id 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-600'
                      }`}
                      aria-label={`Naviga a ${item.name}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px]"
                  aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-slate-200/50 py-6 bg-white/95 backdrop-blur-xl">
                <div className="space-y-3">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-left transition-all duration-300 min-h-[44px] ${
                          currentPage === item.id
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                        aria-label={`Naviga a ${item.name}`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-semibold text-lg">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Page Content con Loading Ottimizzato */}
        <main className="relative">
          <Suspense 
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <LoadingSpinner 
                    size="lg" 
                    text="Caricamento sistema ottimizzato..."
                  />
                </div>
              </div>
            }
          >
            <ErrorBoundary>
              <div className="animate-fade-in-up">
                {renderPage()}
              </div>
            </ErrorBoundary>
          </Suspense>
        </main>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default React.memo(App);