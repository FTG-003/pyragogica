import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, User, Settings, Menu, X, MessageCircle, Zap } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('socratic');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const personalities = [
    { id: 'academic', name: 'Accademico', emoji: '🎓', description: 'Rigoroso e metodico' },
    { id: 'socratic', name: 'Socratico', emoji: '🤔', description: 'Conversazionale e guidante' },
    { id: 'critical', name: 'Critico', emoji: '🧠', description: 'Analitico e questionante' },
    { id: 'divulgative', name: 'Divulgatore', emoji: '💡', description: 'Semplice e coinvolgente' }
  ];

  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      role: 'system',
      content: `🤖 **Benvenuto nel Sistema RAG Pyragogico!**

**🎯 Sistema di Testing Completo** - Configurazione API personalizzabile

**Vector Store:** ✅ Simulazione locale con contenuti reali del Peeragogy Handbook
**Status:** Pronto per la configurazione

**Per iniziare:**
1. 🔧 Configura la tua API key
2. 🎭 Seleziona una personalità AI
3. 💬 Inizia a chattare!

Il sistema utilizzerà i contenuti reali del Peeragogy Handbook per rispondere alle tue domande! 📚`,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Grazie per la tua domanda! Come ${personalities.find(p => p.id === selectedPersonality)?.name}, posso aiutarti a esplorare i concetti del Peeragogy Handbook. La tua domanda "${inputValue}" è molto interessante e merita un'analisi approfondita.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getCurrentPersonality = () => {
    return personalities.find(p => p.id === selectedPersonality) || personalities[0];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
          <Brain className="w-4 h-4" />
          <span>Sistema RAG Production-Ready</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6">AI Assistant Pyragogico</h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Sistema RAG con personalità multiple basato sul <strong>Peeragogy Handbook completo</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getCurrentPersonality().emoji}</span>
              <span className="font-semibold">{getCurrentPersonality().name}</span>
            </div>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <div className={`lg:col-span-1 space-y-6 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="card-modern p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Personalità AI</h3>
            <div className="space-y-3">
              {personalities.map((personality) => (
                <button
                  key={personality.id}
                  onClick={() => {
                    setSelectedPersonality(personality.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedPersonality === personality.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{personality.emoji}</span>
                    <h4 className="font-bold">{personality.name}</h4>
                  </div>
                  <p className="text-sm opacity-90">{personality.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card-modern p-6">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Stato Sistema</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Vector Store Attivo</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-slate-600">API da Configurare</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="chat-container">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="flex items-center space-x-4">
                <div className="relative p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                  <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
                      RAG System • {getCurrentPersonality().name}
                    </h3>
                    <span className="text-xl sm:text-2xl">{getCurrentPersonality().emoji}</span>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base">
                    {getCurrentPersonality().description}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 sm:space-x-4 max-w-full ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 sm:p-3 rounded-2xl shadow-lg ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                        : message.role === 'system'
                        ? 'bg-gradient-to-r from-slate-400 to-slate-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : message.role === 'system' ? (
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    <div className={`message-bubble ${
                      message.role === 'user' 
                        ? 'message-user' 
                        : message.role === 'system'
                        ? 'message-system'
                        : 'message-assistant'
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.slice(2, -2)}</h3>;
                          }
                          if (line.startsWith('🤖') || line.startsWith('🎯') || line.startsWith('📚')) {
                            return <p key={index} className="font-semibold text-base mb-2">{line}</p>;
                          }
                          return line.trim() ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-4 max-w-full">
                    <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="message-bubble message-assistant">
                      <LoadingSpinner size="sm" text="Generando risposta..." />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-area">
              <div className="flex space-x-3 sm:space-x-4">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={`Chiedi qualcosa a ${getCurrentPersonality().name}...`}
                  className="flex-1 input-modern"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="btn-modern btn-primary"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Invia</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;