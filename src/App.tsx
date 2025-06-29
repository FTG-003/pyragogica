import React, { useState, Suspense } from 'react';
import { BookOpen, Brain, Users, Menu, X, Sparkles, Database, Zap } from 'lucide-react';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useToast } from './components/ToastNotification';

// Lazy loading delle pagine principali
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LibraryPage = React.lazy(() => import('./pages/LibraryPage'));
const ChatbotPage = React.lazy(() => import('./pages/ChatbotPage'));

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ToastContainer, success, error, info } = useToast();

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
        {/* Modern Navigation */}
        <nav className="nav-modern">
          <div className="container-modern">
            <div className="flex justify-between items-center h-20">
              {/* Modern Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                       style={{
                         background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                       }}>
                    <Database className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                       style={{
                         background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
                       }}>
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">
                    Biblioteca Pyragogica
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">Modern Interface</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
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
                        className={`flex items-center space-x-4 w-full px-6 py-4 rounded-2xl text-left transition-all duration-300 min-h-[44px] ${
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

        {/* Page Content with Modern Loading */}
        <main className="relative">
          <Suspense 
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                       style={{
                         background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                       }}>
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <LoadingSpinner 
                    size="lg" 
                    text="Preparazione dell'interfaccia moderna..."
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

        {/* Toast Notifications Container */}
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;