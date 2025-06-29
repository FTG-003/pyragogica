import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, User, Settings, Key, Database, AlertCircle, CheckCircle, Loader, Copy, RotateCcw, Trash2, Globe, Shield, Zap, Eye, EyeOff, ChevronDown, ExternalLink, Sparkles, Award, TrendingUp, Infinity } from 'lucide-react';
import { ragService, PERSONALITIES, API_PROVIDERS, type ChatMessage, type PersonalityConfig, type RetrievedSource, type APIProvider, type ModelInfo } from '../services/ragService';
import { useToast } from '../components/ToastNotification';
import LoadingSpinner from '../components/LoadingSpinner';

// Componente per renderizzare il markdown
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-black mt-6 mb-3">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-black mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-black mt-6 mb-3">{line.substring(2)}</h1>;
      }
      
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="mb-3 text-lg">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={partIndex} className="font-black">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      
      if (line.startsWith('`') && line.endsWith('`')) {
        return (
          <code key={index} className="bg-slate-100 px-3 py-2 rounded-lg text-lg font-mono block my-3">
            {line.slice(1, -1)}
          </code>
        );
      }
      
      if (line.includes('`')) {
        const parts = line.split(/(`[^`]+`)/g);
        return (
          <p key={index} className="mb-3 text-lg">
            {parts.map((part, partIndex) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={partIndex} className="bg-slate-100 px-2 py-1 rounded text-lg font-mono">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        );
      }
      
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start space-x-3 mb-2">
            <span className="text-indigo-500 mt-1 text-xl">•</span>
            <span className="text-lg">{line.substring(2)}</span>
          </div>
        );
      }

      if (line.match(/^[🔹🤔✅❌⚠️🚀🎭📚🔐ℹ️🎯🏗️📊🌟💬⚙️📱🔌🤖🆓💰🗑️]/)) {
        return (
          <div key={index} className="flex items-start space-x-3 mb-2">
            <span className="mt-1 text-xl">{line.charAt(0)}</span>
            <span className="text-lg">{line.substring(2)}</span>
          </div>
        );
      }
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return <p key={index} className="mb-3 text-lg">{line}</p>;
    });
  };

  return <div className="prose prose-lg max-w-none">{renderContent(content)}</div>;
};

// API Configuration Component
const APIConfigPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdate: () => void;
}> = ({ isOpen, onClose, onConfigUpdate }) => {
  const [selectedProvider, setSelectedProvider] = useState(ragService.getCurrentProvider()?.id || 'openrouter');
  const [selectedModel, setSelectedModel] = useState(ragService.getCurrentModel()?.id || '');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const currentKey = ragService.getAPIKey(selectedProvider);
    setApiKey(currentKey || '');
  }, [selectedProvider]);

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    ragService.setProvider(providerId);
    setSelectedModel(ragService.getCurrentModel()?.id || '');
    const currentKey = ragService.getAPIKey(providerId);
    setApiKey(currentKey || '');
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    ragService.setModel(modelId);
  };

  const handleSaveApiKey = () => {
    if (ragService.setAPIKey(selectedProvider, apiKey)) {
      success('API Key salvata', 'Configurazione aggiornata con successo');
      onConfigUpdate();
    } else {
      error('Errore', 'API Key non valida');
    }
  };

  const handleRemoveApiKey = () => {
    ragService.removeAPIKey(selectedProvider);
    setApiKey('');
    success('API Key rimossa', 'Configurazione aggiornata');
    onConfigUpdate();
  };

  if (!isOpen) return null;

  const currentProvider = API_PROVIDERS.find(p => p.id === selectedProvider);
  const currentModel = currentProvider?.models.find(m => m.id === selectedModel);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
              <Settings className="w-8 h-8 text-indigo-600" />
              Configurazione API Spettacolare
            </h2>
            <button
              onClick={onClose}
              className="p-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all duration-300 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Provider Selection */}
          <div className="mb-12">
            <h3 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              Seleziona Provider
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {API_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderChange(provider.id)}
                  className={`p-8 rounded-3xl border-4 transition-all duration-500 text-left transform hover:scale-105 ${
                    selectedProvider === provider.id
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-2xl'
                      : 'border-slate-200 hover:border-slate-300 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  <h4 className="font-black text-slate-900 mb-3 text-xl">{provider.name}</h4>
                  <p className="text-lg text-slate-600 mb-4 leading-relaxed">{provider.description}</p>
                  <div className="text-sm text-slate-500 font-bold">
                    🆓 {provider.models.filter(m => m.free).length} modelli gratuiti
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {currentProvider && (
            <div className="mb-12">
              <h3 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-500" />
                Seleziona Modello
              </h3>
              
              {/* Free Models */}
              <div className="mb-8">
                <h4 className="text-2xl font-black text-green-700 mb-4 flex items-center gap-3">
                  <span className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
                  🆓 Modelli Gratuiti
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProvider.models.filter(m => m.free).map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelChange(model.id)}
                      className={`p-6 rounded-2xl border-4 transition-all duration-500 text-left transform hover:scale-105 ${
                        selectedModel === model.id
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl'
                          : 'border-slate-200 hover:border-green-300 shadow-xl hover:shadow-2xl'
                      }`}
                    >
                      <div className="font-black text-slate-900 text-xl">{model.name}</div>
                      <div className="text-lg text-slate-600 mt-2">{model.description}</div>
                      <div className="text-sm text-slate-500 mt-3 font-bold">
                        📊 Context: {model.contextWindow.toLocaleString()} token
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Models */}
              {currentProvider.models.some(m => !m.free) && (
                <div>
                  <h4 className="text-2xl font-black text-orange-700 mb-4 flex items-center gap-3">
                    <span className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></span>
                    💰 Modelli Premium
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProvider.models.filter(m => !m.free).map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelChange(model.id)}
                        className={`p-6 rounded-2xl border-4 transition-all duration-500 text-left transform hover:scale-105 ${
                          selectedModel === model.id
                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-2xl'
                            : 'border-slate-200 hover:border-orange-300 shadow-xl hover:shadow-2xl'
                        }`}
                      >
                        <div className="font-black text-slate-900 text-xl">{model.name}</div>
                        <div className="text-lg text-slate-600 mt-2">{model.description}</div>
                        <div className="text-sm text-slate-500 mt-3 font-bold">
                          📊 Context: {model.contextWindow.toLocaleString()} token
                          {model.pricing && (
                            <span className="ml-2">
                              💵 ${model.pricing.input}/1K in, ${model.pricing.output}/1K out
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* API Key Configuration */}
          <div className="mb-12">
            <h3 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Key className="w-6 h-6 text-indigo-500" />
              API Key
            </h3>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-xl">
              <div className="mb-6">
                <label className="block text-xl font-black text-slate-700 mb-3">
                  🔑 API Key per {currentProvider?.name}
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={currentProvider?.keyFormat}
                    className="w-full px-6 py-4 border-4 border-slate-300 rounded-2xl focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 pr-16 text-lg font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2"
                  >
                    {showApiKey ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 transform hover:scale-105 shadow-xl text-xl"
                >
                  💾 Salva API Key
                </button>
                {ragService.getAPIKey(selectedProvider) && (
                  <button
                    onClick={handleRemoveApiKey}
                    className="px-8 py-4 border-4 border-red-300 text-red-600 font-black rounded-2xl hover:bg-red-50 transition-all duration-500 transform hover:scale-105 shadow-xl text-xl"
                  >
                    🗑️ Rimuovi
                  </button>
                )}
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <Shield className="w-8 h-8 text-blue-600 mt-1" />
                  <div className="text-lg text-blue-800">
                    <strong className="font-black">🔒 Sicurezza Totale:</strong> Le API key sono memorizzate localmente nel tuo browser e non vengono mai inviate a server esterni. 
                    Ogni sessione mantiene le proprie configurazioni separate.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Configuration Summary */}
          {currentModel && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-4 border-indigo-200 shadow-2xl">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Configurazione Attuale
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div>
                  <span className="font-black text-slate-700">Provider:</span>
                  <span className="ml-3 text-slate-900 font-bold">{currentProvider?.name}</span>
                </div>
                <div>
                  <span className="font-black text-slate-700">Modello:</span>
                  <span className="ml-3 text-slate-900 font-bold">{currentModel.name}</span>
                </div>
                <div>
                  <span className="font-black text-slate-700">Tipo:</span>
                  <span className={`ml-3 font-black ${currentModel.free ? 'text-green-600' : 'text-orange-600'}`}>
                    {currentModel.free ? '🆓 Gratuito' : '💰 Premium'}
                  </span>
                </div>
                <div>
                  <span className="font-black text-slate-700">API Key:</span>
                  <span className={`ml-3 font-black ${ragService.getAPIKey(selectedProvider) ? 'text-green-600' : 'text-red-600'}`}>
                    {ragService.getAPIKey(selectedProvider) ? '✅ Configurata' : '❌ Mancante'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('socratic');
  const [isTyping, setIsTyping] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [systemStatus, setSystemStatus] = useState(ragService.getSystemStatus());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { success, error, info } = useToast();

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      role: 'system',
      content: `🤖 **Benvenuto nel Sistema RAG Pyragogico Production-Ready Spettacolare!**

**🎯 Sistema di Testing Completo** - Configurazione API personalizzabile

**Vector Store:** ✅ Simulazione locale con contenuti reali del Peeragogy Handbook
**Status:** 🚀 Pronto per la configurazione

**Per iniziare:**
1. 🔧 Clicca su "Configurazione" per inserire la tua API key
2. 🎭 Seleziona una personalità AI
3. 💬 Inizia a chattare!

**Comandi utili:**
• \`/help\` - Guida completa
• \`/status\` - Verifica configurazione
• \`/providers\` - Lista provider disponibili

**🆓 Modelli Gratuiti Disponibili:**
• Phi-3 Mini/Medium (Microsoft)
• Gemma 7B (Google)
• Llama 3 8B (Meta)
• Mistral 7B (Mistral AI)

Il sistema utilizzerà i contenuti reali del Peeragogy Handbook per rispondere alle tue domande! 📚`,
      timestamp: new Date(),
      sessionId: ragService.getSessionId()
    };

    setMessages([welcomeMessage]);
    updateSystemStatus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateSystemStatus = () => {
    setSystemStatus(ragService.getSystemStatus());
  };

  const resetChat = () => {
    const confirmReset = window.confirm('Sei sicuro di voler azzerare la conversazione? Tutti i messaggi verranno eliminati.');
    
    if (confirmReset) {
      ragService.clearConversationHistory();
      setMessages([
        {
          id: Date.now().toString(),
          role: 'system',
          content: '🔄 **Chat Azzerata Spettacolarmente!**\n\n**Sistema RAG Pyragogico** pronto per una nuova conversazione epica.\n\n**Personalità Attiva:** ' + getCurrentPersonality().name + ' ' + getCurrentPersonality().emoji + '\n**Configurazione:** ' + (systemStatus.configured ? '✅ Operativa' : '⚠️ Da configurare') + '\n\nPuoi iniziare con una nuova domanda o cambiare personalità! 🚀',
          timestamp: new Date(),
          sessionId: ragService.getSessionId()
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
      timestamp: new Date(),
      sessionId: ragService.getSessionId()
    };

    setMessages(prev => [...prev, userMessage]);
    ragService.addMessageToHistory(userMessage);
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
          timestamp: new Date(),
          sessionId: ragService.getSessionId()
        };
        
        setMessages(prev => [...prev, systemMessage]);
        ragService.addMessageToHistory(systemMessage);
        updateSystemStatus();
        
        if (commandResult.command === 'clear') {
          setMessages([systemMessage]);
        }
        
        info('Comando eseguito', `Comando /${commandResult.command} completato`);
      } else {
        if (!systemStatus.configured) {
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: '⚠️ **Configurazione richiesta**\n\nPer utilizzare il sistema RAG, devi prima configurare una API key.\n\n**Passi necessari:**\n1. Clicca su "Configurazione" in alto a destra\n2. Seleziona un provider (consigliato: OpenRouter)\n3. Inserisci la tua API key\n4. Scegli un modello (disponibili opzioni gratuite)\n\n**Vector Store:** ✅ Pronto con contenuti del Peeragogy Handbook\n**API:** ❌ Richiede configurazione',
            timestamp: new Date(),
            sessionId: ragService.getSessionId()
          };
          setMessages(prev => [...prev, errorMessage]);
          ragService.addMessageToHistory(errorMessage);
          error('Configurazione richiesta', 'Configura una API key per continuare');
        } else {
          const result = await ragService.generateResponse(
            inputValue,
            selectedPersonality
          );

          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: result.response,
            personality: selectedPersonality,
            timestamp: new Date(),
            sources: result.sources,
            tokens: result.tokens,
            sessionId: ragService.getSessionId()
          };

          setMessages(prev => [...prev, assistantMessage]);
          ragService.addMessageToHistory(assistantMessage);
          success('Risposta generata', `Basata sui contenuti del Peeragogy Handbook${systemStatus.modelIsFree ? ' (modello gratuito)' : ''}`);
        }
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ **Errore Sistema RAG**\n\n${error instanceof Error ? error.message : 'Errore sconosciuto'}\n\n**Possibili soluzioni:**\n• Verifica la configurazione con \`/status\`\n• Controlla che la tua API key sia valida\n• Prova con un modello diverso\n• Riprova con una domanda diversa`,
        timestamp: new Date(),
        sessionId: ragService.getSessionId()
      };
      setMessages(prev => [...prev, errorMessage]);
      ragService.addMessageToHistory(errorMessage);
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
        content: `🎭 **Personalità cambiata spettacolarmente!**\n\n**Da:** ${oldPersonality.name} ${oldPersonality.emoji} → **A:** ${newPersonality.name} ${newPersonality.emoji}\n\n**Nuovo stile:** ${newPersonality.description}\n\nLe prossime risposte seguiranno questo approccio rivoluzionario. La conversazione precedente rimane invariata.`,
        timestamp: new Date(),
        sessionId: ragService.getSessionId()
      };
      
      setMessages(prev => [...prev, changeMessage]);
      ragService.addMessageToHistory(changeMessage);
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
    "/status",
    "/providers",
    "/models",
    "/help",
    "/clear"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header Drammatico */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xl font-black mb-8 shadow-2xl">
            <Brain className="w-6 h-6 animate-pulse" />
            <span>Sistema RAG Production-Ready con API Personalizzabili</span>
            <Infinity className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            AI Assistant 
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pyragogico
            </span>
          </h1>
          <p className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
            Sistema RAG (Retrieval-Augmented Generation) con <strong className="text-slate-900">personalità multiple</strong> basato sul 
            <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Peeragogy Handbook completo</strong>. 
            Configurazione API flessibile con supporto per <strong className="text-slate-900">modelli gratuiti e premium</strong>.
          </p>
          
          {/* System Status */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-200 rounded-2xl shadow-xl">
              <Database className="w-6 h-6 text-green-600" />
              <span className="text-green-800 font-black text-lg">Vector Store Locale</span>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl border-4 shadow-xl ${
              systemStatus.configured 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800' 
                : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 text-orange-800'
            }`}>
              <Key className="w-6 h-6" />
              <span className="font-black text-lg">
                {systemStatus.configured ? '✅ API Configurata' : '⚠️ API da Configurare'}
              </span>
            </div>
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200 rounded-2xl shadow-xl">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-blue-800 font-black text-lg">Sicurezza Locale</span>
            </div>
            {systemStatus.modelIsFree && (
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border-4 border-emerald-200 rounded-2xl shadow-xl">
                <Zap className="w-6 h-6 text-emerald-600" />
                <span className="text-emerald-800 font-black text-lg">🆓 Modello Gratuito</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-10">
            {/* System Status */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  Stato Sistema
                </h3>
                <button
                  onClick={() => setShowApiConfig(true)}
                  className="p-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 transform hover:scale-110"
                  aria-label="Configurazione API"
                >
                  <Settings className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Configuration Status */}
                <div className="flex items-center space-x-4">
                  {systemStatus.configured ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-orange-500" />
                  )}
                  <div className="flex-1">
                    <div className="text-lg font-black text-slate-900">
                      {systemStatus.configured ? '✅ Sistema Configurato' : '⚠️ Configurazione Richiesta'}
                    </div>
                    <div className="text-sm text-slate-600 font-semibold">
                      {systemStatus.configured ? `${systemStatus.provider} • ${systemStatus.model}` : 'Inserisci API key per iniziare'}
                    </div>
                  </div>
                </div>
                
                {/* API Key Status */}
                <div className="flex items-center space-x-4">
                  {systemStatus.hasApiKey ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-orange-500" />
                  )}
                  <div className="flex-1">
                    <div className="text-lg font-black text-slate-900">
                      🔑 API Key {systemStatus.hasApiKey ? 'Configurata' : 'Mancante'}
                    </div>
                    <div className="text-sm text-slate-600 font-semibold">
                      {systemStatus.hasApiKey ? 'Memorizzata localmente' : 'Richiesta per l\'accesso AI'}
                    </div>
                  </div>
                </div>

                {/* Vector Store Status */}
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div className="flex-1">
                    <div className="text-lg font-black text-slate-900">📚 Vector Store Locale</div>
                    <div className="text-sm text-slate-600 font-semibold">Peeragogy Handbook • Attivo</div>
                  </div>
                </div>

                {/* Session Info */}
                <div className="flex items-center space-x-4">
                  <Globe className="w-8 h-8 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-lg font-black text-slate-900">🌐 Sessione Attiva</div>
                    <div className="text-sm text-slate-600 font-mono font-bold">
                      {systemStatus.sessionId.substring(0, 16)}...
                    </div>
                  </div>
                </div>
              </div>

              {!systemStatus.configured && (
                <button
                  onClick={() => setShowApiConfig(true)}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 shadow-xl text-xl"
                >
                  🚀 Configura API
                </button>
              )}
            </div>

            {/* Enhanced Personality Selector */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Personalità AI
                </h3>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-black">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>ATTIVA</span>
                </div>
              </div>
              <div className="space-y-4">
                {PERSONALITIES.map((personality) => (
                  <button
                    key={personality.id}
                    onClick={() => handlePersonalityChange(personality.id)}
                    className={`w-full p-6 rounded-2xl text-left transition-all duration-500 transform hover:scale-105 ${
                      selectedPersonality === personality.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl ring-4 ring-indigo-500/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-4 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{personality.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-black flex items-center space-x-3 text-xl">
                          <span>{personality.name}</span>
                          {selectedPersonality === personality.id && (
                            <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-black">ATTIVA</span>
                          )}
                        </h4>
                      </div>
                    </div>
                    <p className="text-lg opacity-90 mb-3">{personality.description}</p>
                    <div className="text-sm opacity-75 font-bold">
                      🌡️ Temp: {personality.temperature} • 🎯 Max: {personality.maxTokens} token
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-slate-200">
              <h4 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Domande sul Peeragogy Handbook
              </h4>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(prompt)}
                    className="w-full p-4 text-left text-lg text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl transition-all duration-500 border-2 border-slate-200 hover:border-indigo-300 transform hover:scale-105"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Command Examples */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-slate-200">
              <h4 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-indigo-500" />
                Comandi Sistema
              </h4>
              <div className="space-y-3">
                {commandExamples.map((command, index) => (
                  <div key={index} className="group flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                    <code className="flex-1 text-lg text-slate-700 font-mono font-bold">{command}</code>
                    <button
                      onClick={() => copyToClipboard(command)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-slate-600 transition-all duration-300 transform hover:scale-110"
                      aria-label="Copia comando"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl h-[900px] flex flex-col border-4 border-slate-200">
              {/* Enhanced Chat Header */}
              <div className="p-8 border-b-4 border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-t-3xl">
                <div className="flex items-center space-x-6">
                  <div className="relative p-4 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl">
                    <Brain className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-black text-slate-900 text-3xl">
                        RAG System • {getCurrentPersonality().name}
                      </h3>
                      <span className="text-4xl">{getCurrentPersonality().emoji}</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-lg font-black">
                        PRODUCTION
                      </span>
                      {systemStatus.modelIsFree && (
                        <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-lg font-black">
                          FREE
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xl">
                      {getCurrentPersonality().description} • {systemStatus.configured ? `${systemStatus.provider} attivo` : 'Configurazione richiesta'}
                    </p>
                  </div>
                  
                  <button
                    onClick={resetChat}
                    className="group p-4 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-500 border-4 border-transparent hover:border-red-200 transform hover:scale-110"
                    title="Reset Chat - Azzera conversazione"
                    aria-label="Reset chat"
                  >
                    <RotateCcw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>
              </div>

              {/* Enhanced Messages */}
              <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-gradient-to-b from-slate-50/50 to-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-6 max-w-5xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-4 rounded-3xl shadow-2xl ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                          : message.role === 'system'
                          ? 'bg-gradient-to-r from-slate-400 to-slate-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-6 h-6 text-white" />
                        ) : message.role === 'system' ? (
                          <Settings className="w-6 h-6 text-white" />
                        ) : (
                          <Brain className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className={`p-8 rounded-3xl shadow-2xl max-w-4xl ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                          : message.role === 'system'
                          ? 'bg-slate-100 text-slate-700 border-4 border-slate-200'
                          : 'bg-white text-slate-900 border-4 border-slate-200'
                      }`}>
                        <MarkdownRenderer content={message.content} />
                        
                        {/* Sources from Vector Store */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-6 pt-6 border-t-4 border-slate-200">
                            <h5 className="text-lg font-black text-slate-600 mb-4 flex items-center gap-3">
                              <Database className="w-5 h-5" />
                              📚 Fonti dal Vector Store:
                            </h5>
                            <div className="space-y-3">
                              {message.sources.map((source: RetrievedSource, index: number) => (
                                <div key={index} className="p-4 bg-slate-50 rounded-2xl border-4 border-slate-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-lg font-black text-slate-900">{source.title}</span>
                                    <span className="text-sm text-slate-500 font-bold">
                                      {Math.round(source.similarity * 100)}% rilevanza
                                    </span>
                                  </div>
                                  <div className="text-sm text-slate-600 font-semibold">
                                    {source.chapter} • {source.metadata.author} • Pag. {source.metadata.page}
                                  </div>
                                  {source.metadata.section && (
                                    <div className="text-sm text-slate-500 mt-1 font-semibold">
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
                          <div className="mt-6 pt-6 border-t-4 border-slate-200">
                            <div className="flex items-center space-x-6 text-sm text-slate-500 font-bold">
                              <span>Input: {message.tokens.input} tokens</span>
                              <span>Output: {message.tokens.output} tokens</span>
                              <span>Costo: {message.tokens.cost === 0 ? '🆓 Gratuito' : `💰 ~$${message.tokens.cost.toFixed(4)}`}</span>
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
                    <div className="flex items-start space-x-6 max-w-5xl">
                      <div className="p-4 rounded-3xl shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-8 rounded-3xl shadow-2xl bg-white border-4 border-slate-200">
                        <LoadingSpinner size="sm" text="Generando risposta spettacolare..." />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input */}
              <div className="p-8 border-t-4 border-slate-200 bg-white rounded-b-3xl">
                <div className="flex space-x-6">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={systemStatus.configured 
                      ? `Chiedi qualcosa sul Peeragogy Handbook a ${getCurrentPersonality().name} o usa un comando (/help)...`
                      : 'Configura una API key per iniziare...'
                    }
                    className="flex-1 px-8 py-5 border-4 border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-500 text-xl font-semibold"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  
                  <button
                    onClick={resetChat}
                    disabled={isTyping}
                    className="px-8 py-5 border-4 border-slate-300 text-slate-700 rounded-3xl hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-500 flex items-center space-x-3 font-black disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl text-xl"
                    title="Reset Chat"
                    aria-label="Reset chat"
                  >
                    <Trash2 className="w-6 h-6" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-500 flex items-center space-x-4 font-black shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xl"
                  >
                    {isTyping ? (
                      <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                      <Send className="w-6 h-6" />
                    )}
                    <span className="hidden sm:inline">Invia</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Configuration Modal */}
        <APIConfigPanel
          isOpen={showApiConfig}
          onClose={() => setShowApiConfig(false)}
          onConfigUpdate={updateSystemStatus}
        />

        {/* Enhanced System Visualization */}
        <div className="mt-32 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-4xl font-black mb-12 text-center flex items-center justify-center gap-4">
            <Zap className="w-8 h-8" />
            Sistema RAG Production-Ready Spettacolare
            <Infinity className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Database className="w-12 h-12 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-3">1. Vector Store</h4>
                <p className="text-slate-300 text-lg">
                  Peeragogy Handbook completo indicizzato localmente con embedding semantici
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Key className="w-12 h-12 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-3">2. API Sicure</h4>
                <p className="text-slate-300 text-lg">
                  Gestione sicura delle API key con memorizzazione locale e sessioni separate
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-3">3. AI Personalities</h4>
                <p className="text-slate-300 text-lg">
                  Personalità multiple con prompt specializzati per diversi stili di apprendimento
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-black mb-3">4. Smart Response</h4>
                <p className="text-slate-300 text-lg">
                  Generazione di risposte contestualizzate con fonti verificabili
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
            <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Sicurezza e Controllo Completo
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
              <div>
                <h5 className="font-black mb-3">🔒 Sicurezza Locale</h5>
                <p className="text-slate-300">
                  API key memorizzate solo nel browser. Sessioni separate con ID univoci. Nessun dato condiviso.
                </p>
              </div>
              <div>
                <h5 className="font-black mb-3">🆓 Modelli Gratuiti</h5>
                <p className="text-slate-300">
                  Accesso a modelli gratuiti tramite OpenRouter: Phi-3, Gemma, Llama 3, Mistral.
                </p>
              </div>
              <div>
                <h5 className="font-black mb-3">⚙️ Configurazione Flessibile</h5>
                <p className="text-slate-300">
                  Selezione provider e modelli personalizzabile. Supporto per OpenAI, Anthropic, OpenRouter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;