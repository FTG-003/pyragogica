import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, User, BookOpen, Lightbulb, MessageCircle, Zap, Sparkles, Bot, Play, Settings, Key, Database, AlertCircle, CheckCircle, Loader, ExternalLink, Copy, Eye, EyeOff, Wifi, WifiOff, RotateCcw, Trash2 } from 'lucide-react';
import { ragService, PERSONALITIES, API_PROVIDERS, type ChatMessage, type PersonalityConfig, type RetrievedSource } from '../services/ragService';
import { useToast } from '../components/ToastNotification';
import LoadingSpinner from '../components/LoadingSpinner';

// Componente per renderizzare il markdown
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    // Dividi il testo in righe
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={partIndex} className="font-bold">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Code blocks
      if (line.startsWith('`') && line.endsWith('`')) {
        return (
          <code key={index} className="bg-slate-100 px-2 py-1 rounded text-sm font-mono block my-2">
            {line.slice(1, -1)}
          </code>
        );
      }
      
      // Inline code
      if (line.includes('`')) {
        const parts = line.split(/(`[^`]+`)/g);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={partIndex} className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Bullet points
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-1">
            <span className="text-indigo-500 mt-1">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular paragraphs
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return <div className="prose prose-sm max-w-none">{renderContent(content)}</div>;
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: '🤖 **Benvenuto nel Sistema RAG Pyragogico!**\n\n**Vector Store Attivo:** Pinecone con Peeragogy Handbook completo\n**Status:** Pronto per la configurazione\n\n**Per iniziare:**\n1. 🔧 Configura la tua API key con `/login demo pyragogica2025`\n2. 🎭 Seleziona una personalità AI\n3. 💬 Inizia a chattare!\n\n**Comandi utili:**\n• `/help` - Guida completa\n• `/status` - Verifica sistema\n• `/backend_info` - Info sul backend sicuro\n\nIl sistema utilizzerà i contenuti reali del Peeragogy Handbook per rispondere alle tue domande! 📚',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('socratic');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState({ configured: false, provider: '', model: '' });
  const [vectorStoreStatus, setVectorStoreStatus] = useState(true);
  const [showApiConfig, setShowApiConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { success, error, info } = useToast();

  useEffect(() => {
    checkApiStatus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkApiStatus = () => {
    const status = ragService.getAPIStatus();
    setApiStatus(status);
  };

  const resetChat = () => {
    const confirmReset = window.confirm('Sei sicuro di voler azzerare la conversazione? Tutti i messaggi verranno eliminati.');
    
    if (confirmReset) {
      setMessages([
        {
          id: '1',
          role: 'system',
          content: '🔄 **Chat Azzerata!**\n\n**Sistema RAG Pyragogico** pronto per una nuova conversazione.\n\n**Personalità Attiva:** ' + getCurrentPersonality().name + ' ' + getCurrentPersonality().emoji + '\n**Vector Store:** Pinecone con Peeragogy Handbook\n**API Status:** ' + (apiStatus.configured ? '✅ Configurata' : '⚠️ Da configurare') + '\n\nPuoi iniziare con una nuova domanda o cambiare personalità! 🚀',
          timestamp: new Date()
        }
      ]);
      setInputValue('');
      setIsTyping(false);
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      success('Chat azzerata', 'Conversazione resettata con successo');
    }
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

    try {
      const commandResult = ragService.parseCommand(inputValue);
      
      if (commandResult.isCommand) {
        const response = await ragService.handleCommand(
          commandResult.command!,
          commandResult.args || []
        );
        
        const systemMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, systemMessage]);
        checkApiStatus();
        
        // Show appropriate toast based on command
        if (commandResult.command === 'login') {
          if (response.includes('✅')) {
            success('Login effettuato', 'Sistema RAG ora operativo');
          } else {
            error('Login fallito', 'Verifica le credenziali');
          }
        }
      } else {
        if (!apiStatus.configured) {
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: '⚠️ **Autenticazione richiesta**\n\nPer utilizzare il sistema RAG, devi prima effettuare il login.\n\n**Login rapido:**\n`/login demo pyragogica2025`\n\n**Vector Store:** ✅ Pinecone attivo con Peeragogy Handbook\n**Autenticazione:** ❌ Richiesta per accesso AI',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          error('Autenticazione richiesta', 'Effettua il login per continuare');
        } else {
          const result = await ragService.generateResponse(
            inputValue,
            selectedPersonality,
            messages.filter(m => m.role !== 'system')
          );

          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: result.response,
            personality: selectedPersonality,
            timestamp: new Date(),
            sources: result.sources,
            tokens: result.tokens
          };

          setMessages(prev => [...prev, assistantMessage]);
          success('Risposta generata', 'Basata sui contenuti del Peeragogy Handbook');
        }
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ **Errore Sistema RAG**\n\n${error instanceof Error ? error.message : 'Errore sconosciuto'}\n\n**Possibili soluzioni:**\n• Verifica la configurazione con \`/status\`\n• Effettua il login con \`/login demo pyragogica2025\`\n• Riprova con una domanda diversa`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      error('Errore sistema', error instanceof Error ? error.message : 'Errore sconosciuto');
    } finally {
      setIsTyping(false);
    }
  };

  const getCurrentPersonality = (): PersonalityConfig => {
    return PERSONALITIES.find(p => p.id === selectedPersonality) || PERSONALITIES[0];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    info('Copiato', 'Testo copiato negli appunti');
  };

  const handlePersonalityChange = (personalityId: string) => {
    const oldPersonality = getCurrentPersonality();
    setSelectedPersonality(personalityId);
    const newPersonality = PERSONALITIES.find(p => p.id === personalityId);
    
    if (newPersonality && oldPersonality.id !== personalityId) {
      const changeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'system',
        content: `🎭 **Personalità cambiata!**\n\n**Da:** ${oldPersonality.name} ${oldPersonality.emoji} → **A:** ${newPersonality.name} ${newPersonality.emoji}\n\n**Nuovo stile:** ${newPersonality.description}\n\nLe prossime risposte seguiranno questo approccio. La conversazione precedente rimane invariata.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, changeMessage]);
      info('Personalità cambiata', `Ora attiva: ${newPersonality.name} ${newPersonality.emoji}`);
    }
  };

  const quickPrompts = [
    "Spiegami i principi fondamentali della peeragogy",
    "Come posso implementare l'apprendimento peer-to-peer?",
    "Quali sono i pattern ricorrenti nella peeragogy?",
    "Come gestire i conflitti in un gruppo di apprendimento?",
    "Che ruolo ha la motivazione nell'apprendimento collaborativo?",
    "Come creare spazi sicuri per l'apprendimento?",
    "Quali tecnologie supportano la peeragogy?"
  ];

  const commandExamples = [
    "/login demo pyragogica2025",
    "/status",
    "/help",
    "/personalities",
    "/backend_info"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
          <Brain className="w-4 h-4" />
          <span>Sistema RAG Production-Ready con Backend Sicuro</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">AI Assistant Pyragogico</h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Sistema RAG (Retrieval-Augmented Generation) con personalità multiple basato sul <strong>Peeragogy Handbook completo</strong>. 
          Backend sicuro con autenticazione, rate limiting e gestione protetta delle API key.
        </p>
        
        {/* System Status */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
            <Database className="w-4 h-4 text-green-600" />
            <span className="text-green-800 font-semibold">Vector Store Pinecone</span>
            <Wifi className="w-4 h-4 text-green-600" />
          </div>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border ${
            apiStatus.configured 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-orange-50 border-orange-200 text-orange-800'
          }`}>
            <Key className="w-4 h-4" />
            <span className="font-semibold">
              {apiStatus.configured ? 'Autenticato' : 'Login Richiesto'}
            </span>
          </div>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
            <Settings className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-semibold">Backend Sicuro</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Stato Sistema RAG</h3>
              <button
                onClick={() => setShowApiConfig(!showApiConfig)}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                aria-label="Configurazioni"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Auth Status */}
              <div className="flex items-center space-x-3">
                {apiStatus.configured ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">
                    {apiStatus.configured ? 'Autenticato' : 'Login Richiesto'}
                  </div>
                  {apiStatus.configured && (
                    <div className="text-xs text-slate-600">
                      Backend sicuro • Token valido
                    </div>
                  )}
                </div>
              </div>
              
              {/* Vector Store Status */}
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">Vector Store Pinecone</div>
                  <div className="text-xs text-slate-600">Peeragogy Handbook • Attivo</div>
                </div>
              </div>

              {/* RAG Status */}
              <div className="flex items-center space-x-3">
                {apiStatus.configured ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">
                    Sistema RAG {apiStatus.configured ? 'Operativo' : 'In Attesa'}
                  </div>
                  <div className="text-xs text-slate-600">
                    {apiStatus.configured ? 'Pronto per query' : 'Effettua login per iniziare'}
                  </div>
                </div>
              </div>
            </div>

            {!apiStatus.configured && (
              <button
                onClick={() => setInputValue('/login demo pyragogica2025')}
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Login Demo
              </button>
            )}
          </div>

          {/* Enhanced Personality Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Personalità AI</h3>
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Attiva</span>
              </div>
            </div>
            <div className="space-y-3">
              {PERSONALITIES.map((personality) => (
                <button
                  key={personality.id}
                  onClick={() => handlePersonalityChange(personality.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedPersonality === personality.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg ring-4 ring-indigo-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-2 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{personality.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold flex items-center space-x-2">
                        <span>{personality.name}</span>
                        {selectedPersonality === personality.id && (
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">ATTIVA</span>
                        )}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{personality.description}</p>
                  <div className="text-xs opacity-75">
                    Temp: {personality.temperature} • Max: {personality.maxTokens} token
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Domande sul Peeragogy Handbook</h4>
            <div className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(prompt)}
                  className="w-full p-3 text-left text-sm text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-300 border border-slate-200 hover:border-indigo-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Command Examples */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Comandi Sistema</h4>
            <div className="space-y-2">
              {commandExamples.map((command, index) => (
                <div key={index} className="group flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
                  <code className="flex-1 text-xs text-slate-700 font-mono">{command}</code>
                  <button
                    onClick={() => copyToClipboard(command)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-all duration-300"
                    aria-label="Copia comando"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-xl h-[800px] flex flex-col border border-slate-200">
            {/* Enhanced Chat Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className="relative p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-slate-900 text-xl">
                      RAG System • {getCurrentPersonality().name}
                    </h3>
                    <span className="text-2xl">{getCurrentPersonality().emoji}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      PRODUCTION
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {getCurrentPersonality().description} • Backend sicuro attivo
                  </p>
                </div>
                
                <button
                  onClick={resetChat}
                  className="group p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-red-200"
                  title="Reset Chat - Azzera conversazione"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Enhanced Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-slate-50/50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-4 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-3 rounded-2xl shadow-lg ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                        : message.role === 'system'
                        ? 'bg-gradient-to-r from-slate-400 to-slate-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : message.role === 'system' ? (
                        <Settings className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`p-6 rounded-3xl shadow-lg max-w-3xl ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                        : message.role === 'system'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-white text-slate-900 border border-slate-200'
                    }`}>
                      {/* Render content with markdown support */}
                      <MarkdownRenderer content={message.content} />
                      
                      {/* Sources from Vector Store */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <h5 className="text-sm font-semibold text-slate-600 mb-2 flex items-center">
                            <Database className="w-4 h-4 mr-2" />
                            📚 Fonti dal Vector Store:
                          </h5>
                          <div className="space-y-2">
                            {message.sources.map((source: RetrievedSource, index: number) => (
                              <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-slate-900">{source.title}</span>
                                  <span className="text-xs text-slate-500">
                                    {Math.round(source.similarity * 100)}% rilevanza
                                  </span>
                                </div>
                                <div className="text-xs text-slate-600">
                                  {source.chapter} • {source.metadata.author} • Pag. {source.metadata.page}
                                </div>
                                {source.metadata.section && (
                                  <div className="text-xs text-slate-500 mt-1">
                                    Sezione: {source.metadata.section}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Token Usage */}
                      {message.tokens && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>Input: {message.tokens.input} tokens</span>
                            <span>Output: {message.tokens.output} tokens</span>
                            <span>Costo: ~${message.tokens.cost.toFixed(4)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-4 max-w-4xl">
                    <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="p-6 rounded-3xl shadow-lg bg-white border border-slate-200">
                      <LoadingSpinner size="sm" text="Interrogando vector store..." />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <div className="p-6 border-t border-slate-200 bg-white rounded-b-3xl">
              <div className="flex space-x-4">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={apiStatus.configured 
                    ? `Chiedi qualcosa sul Peeragogy Handbook a ${getCurrentPersonality().name} o usa un comando (/help)...`
                    : 'Effettua il login con /login demo pyragogica2025...'
                  }
                  className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                
                <button
                  onClick={resetChat}
                  disabled={isTyping}
                  className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 flex items-center space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Reset Chat"
                  aria-label="Reset chat"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isTyping ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Invia</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced RAG System Visualization */}
      <div className="mt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl p-10 text-white shadow-2xl">
        <h3 className="text-3xl font-bold mb-8 text-center">Sistema RAG Production-Ready</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Database className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">1. Vector Store</h4>
              <p className="text-slate-300 text-sm">Peeragogy Handbook completo indicizzato in Pinecone con embedding semantici</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">2. Backend Sicuro</h4>
              <p className="text-slate-300 text-sm">Proxy protetto per API AI con autenticazione, rate limiting e logging</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">3. AI Personalities</h4>
              <p className="text-slate-300 text-sm">Personalità multiple con prompt specializzati per diversi stili di apprendimento</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">4. Smart Response</h4>
              <p className="text-slate-300 text-sm">Generazione di risposte contestualizzate con fonti verificabili e formattazione markdown</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Sicurezza e Controllo Completo
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="font-semibold mb-2">🔒 Backend Sicuro</h5>
              <p className="text-slate-300">Tutte le API key protette sul server. Rate limiting 5 req/min. Logging completo delle attività.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">🎭 Personalità Avanzate</h5>
              <p className="text-slate-300">4 personalità AI specializzate con prompt separati e configurazioni ottimizzate.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">📝 Markdown Rendering</h5>
              <p className="text-slate-300">Formattazione intelligente di testo, codice, liste e headers per una lettura ottimale.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;