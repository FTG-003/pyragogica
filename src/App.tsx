import React, { useState, Suspense, useEffect } from 'react';
import { BookOpen, Brain, Users, Menu, X, Sparkles, Database, Zap } from 'lucide-react';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useToast } from './components/ToastNotification';
import ModernButton from './components/ui/ModernButton';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LibraryPage = React.lazy(() => import('./pages/LibraryPage'));
const ChatbotPage = React.lazy(() => import('./pages/ChatbotPage'));

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Persist login in sessionStorage
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const { ToastContainer, success, error, info } = useToast();

  const navigation = [
    { id: 'home', name: 'Home', icon: Sparkles },
    { id: 'library', name: 'Biblioteca', icon: Database },
    { id: 'chatbot', name: 'AI Assistant', icon: Brain },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      sessionStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      if (password === 'Pippo') {
        setIsAuthenticated(true);
        success('Accesso riuscito!', 'Benvenuto nella Biblioteca Pyragogica!', 2000);
      } else {
        error('Password errata', 'Riprova con la password corretta.', 2500);
      }
      setLoginLoading(false);
    }, 700);
  };

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
      case 'home': 
        return <HomePage onNavigate={handlePageChange} />;
      case 'library': 
        return <LibraryPage />;
      case 'chatbot': 
        return <ChatbotPage />;
      default: 
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in-up">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full border-2 border-white/60">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-indigo-600 to-purple-600 mb-4">
              <span className="text-3xl font-bold text-white">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-gradient mb-2">Accesso Riservato</h2>
            <p className="text-slate-600 text-center">Inserisci la password per accedere alla Biblioteca Pyragogica</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none text-lg transition-all bg-white/80"
              placeholder="Password..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
              disabled={loginLoading}
            />
            <ModernButton
              type="submit"
              variant="primary"
              size="lg"
              loading={loginLoading}
              className="w-full"
              ariaLabel="Accedi"
            >
              Accedi
            </ModernButton>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50">
        <nav className="nav-modern">
          <div className="container-modern">
            <div className="flex justify-between items-center h-20">
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
                  <h1 className="text-2xl font-bold text-gradient">
                    Biblioteca Pyragogica
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">Interroga i Libri. Accendi il Sapere</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2">
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

        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;