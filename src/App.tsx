import React, { useState } from 'react';
import { BookOpen, Brain, Users, Menu, X, Sparkles, Database } from 'lucide-react';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', name: 'Home', icon: Sparkles },
    { id: 'library', name: 'Biblioteca Scalabile', icon: Database },
    { id: 'chatbot', name: 'AI Assistant', icon: Brain },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'library': return <LibraryPage />;
      case 'chatbot': return <ChatbotPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Biblioteca Pyragogica
                </h1>
                <p className="text-sm text-slate-500 font-medium">Infinitamente Scalabile</p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`group relative flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${
                      currentPage === item.id ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span>{item.name}</span>
                    {currentPage === item.id && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-xl"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200/50 py-6 bg-white/95 backdrop-blur-xl">
              <div className="space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-4 w-full px-6 py-4 rounded-2xl text-left transition-all duration-300 ${
                        currentPage === item.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
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

      {/* Enhanced Page Content */}
      <main className="relative">
        {renderPage()}
      </main>

      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="flex flex-col space-y-4">
          {/* Quick AI Assistant */}
          <button
            onClick={() => setCurrentPage('chatbot')}
            className="group w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          >
            <Brain className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          {/* Quick Library Access */}
          <button
            onClick={() => setCurrentPage('library')}
            className="group w-14 h-14 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          >
            <Database className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Scalability Indicator */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-600 font-medium">Biblioteca Scalabile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;