import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, User, Settings, Key, Database, AlertCircle, CheckCircle, Loader, Copy, RotateCcw, Trash2, Globe, Shield, Zap, Eye, EyeOff, ChevronDown, ExternalLink, Menu, X, Cpu, Sparkles, LogOut } from 'lucide-react';
import { ragService, PERSONALITIES, API_PROVIDERS, type ChatMessage, type PersonalityConfig, type RetrievedSource, type APIProvider, type ModelInfo } from '../services/ragService';
import { useToast } from '../components/ToastNotification';
import LoadingSpinner from '../components/LoadingSpinner';

// Componente per renderizzare il markdown senza simboli
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-slate-900">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-slate-900">{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-4 mb-2 text-slate-900">{line.substring(2)}</h1>;
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={partIndex} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Code blocks
      if (line.startsWith('`') && line.endsWith('`')) {
        return (
          <code key={index} className="bg-slate-100 px-2 py-1 rounded text-sm font-mono block my-2 text-slate-800">
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
                return <code key={partIndex} className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-slate-800">{part.slice(1, -1)}</code>;
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
            <span className="text-indigo-500 mt-1 font-bold">•</span>
            <span className="text-slate-700">{line.substring(2)}</span>
          </div>
        );
      }

      // Emoji bullet points
      if (line.match(/^[🔹🤔✅❌⚠️🚀🎭📚🔐ℹ️🎯🏗️📊🌟💬⚙️📱🔌🤖🆓💰🗑️]/)) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-1">
            <span className="mt-1">{line.charAt(0)}</span>
            <span className="text-slate-700">{line.substring(2)}</span>
          </div>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular paragraphs
      return <p key={index} className="mb-2 text-slate-700">{line}</p>;
    });
  };

  return <div className="prose prose-sm max-w-none">{renderContent(content)}</div>;
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
  const [apiKeyValid, setApiKeyValid] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const currentKey = ragService.getAPIKey(selectedProvider);
    setApiKey(currentKey || '');
    setApiKeyValid(!!currentKey && currentKey.length > 10); // semplice validazione
  }, [selectedProvider]);

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    ragService.setProvider(providerId);
    setSelectedModel(ragService.getCurrentModel()?.id || '');
    const currentKey = ragService.getAPIKey(providerId);
    setApiKey(currentKey || '');
    setApiKeyValid(!!currentKey && currentKey.length > 10);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    ragService.setModel(modelId);
  };

  const handleSaveApiKey = () => {
    if (ragService.setAPIKey(selectedProvider, apiKey)) {
      setApiKeyValid(true);
      success('API Key salvata', 'Configurazione aggiornata con successo');
      onConfigUpdate();
    } else {
      setApiKeyValid(false);
      error('Errore', 'API Key non valida');
    }
  };

  const handleRemoveApiKey = () => {
    ragService.removeAPIKey(selectedProvider);
    setApiKey('');
    setApiKeyValid(false);
    success('API Key rimossa', 'Configurazione aggiornata');
    onConfigUpdate();
  };

  if (!isOpen) return null;

  const currentProvider = API_PROVIDERS.find(p => p.id === selectedProvider);
  const currentModel = currentProvider?.models.find(m => m.id === selectedModel);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Configurazione AI</h2>
            <button
              onClick={onClose}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Provider Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Seleziona Provider</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {API_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderChange(provider.id)}
                  className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left relative ${
                    selectedProvider === provider.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                    {provider.name}
                    {selectedProvider === provider.id && apiKeyValid && provider.requiresKey && (
                      <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">API Key OK</span>
                    )}
                    {selectedProvider === provider.id && !provider.requiresKey && (
                      <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">Pronto</span>
                    )}
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">{provider.description}</p>
                  <div className="text-xs text-slate-500">
                    {provider.models.length} modello disponibile
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {currentProvider && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Seleziona Modello</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProvider.models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(model.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedModel === model.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-slate-200 hover:border-green-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{model.name}</div>
                    <div className="text-sm text-slate-600 mt-1">{model.description}</div>
                    <div className="text-xs text-slate-500 mt-2">
                      Context: {model.contextWindow.toLocaleString()} token
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* API Key Configuration (solo se richiesta) */}
          {currentProvider?.requiresKey && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">API Key</h3>
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    API Key per {currentProvider?.name}
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={currentProvider?.keyFormat}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12 ${apiKeyValid ? 'border-green-400 bg-green-50' : 'border-slate-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleSaveApiKey}
                    disabled={!apiKey.trim()}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Salva API Key
                  </button>
                  {ragService.getAPIKey(selectedProvider) && (
                    <button
                      onClick={handleRemoveApiKey}
                      className="px-6 py-3 border border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
                {apiKeyValid && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-xl text-green-800 text-sm font-semibold flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> API Key valida per {currentProvider?.name}
                  </div>
                )}
                {/* Security Notice */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Sicurezza:</strong> Le API key sono memorizzate localmente nel tuo browser e non vengono mai inviate a server esterni diversi dal provider selezionato.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Configuration Summary */}
          {currentModel && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Configurazione Attuale</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Provider:</span>
                  <span className="ml-2 text-slate-900">{currentProvider?.name}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Modello:</span>
                  <span className="ml-2 text-slate-900">{currentModel.name}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Tipo:</span>
                  <span className={`ml-2 font-semibold ${currentModel.free ? 'text-green-600' : 'text-orange-600'}`}>{currentModel.free ? 'Gratuito' : 'Premium'}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">API Key:</span>
                  <span className={`ml-2 font-semibold ${apiKeyValid || !currentProvider?.requiresKey ? 'text-green-600' : 'text-red-600'}`}>{currentProvider?.requiresKey ? (apiKeyValid ? 'Configurata' : 'Mancante') : 'Non richiesta'}</span>
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flowiseActive, setFlowiseActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { success, error, info } = useToast();

  // Quick prompts per il Peeragogy Handbook
  const quickPrompts = [
    "Spiegami i principi fondamentali della peeragogy",
    "Come posso implementare l'apprendimento peer-to-peer?",
    "Quali sono i pattern ricorrenti nella peeragogy?",
    "Come gestire i conflitti in un gruppo di apprendimento?",
    "Che ruolo ha la motivazione nell'apprendimento collaborativo?"
  ];

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      role: 'system',
      content: `🤖 **Benvenuto nel Sistema RAG Pyragogico Production-Ready!**\n\n**🎯 Sistema di Testing Completo** - Configurazione API personalizzabile\n\n**Status:** Pronto per la configurazione\n\n**Per iniziare:**\n1. 🔧 Clicca su "Configurazione" per inserire la tua API key\n2. 🎭 Seleziona una personalità AI\n3. 💬 Inizia a chattare!\n\n**Comandi utili:**\n• \`/help\` - Guida completa\n• \`/status\` - Verifica configurazione\n• \`/providers\` - Lista provider disponibili\n\n**🆓 Modelli Gratuiti Disponibili:**\n• Phi-3 Mini/Medium (Microsoft)\n• Gemma 7B (Google)\n• Llama 3 8B (Meta)\n• Mistral 7B (Mistral AI)`,
      timestamp: new Date(),
      sessionId: ragService.getSessionId()
    };

    setMessages([welcomeMessage]);
    updateSystemStatus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setFlowiseActive(systemStatus.provider === 'Flowise');
  }, [systemStatus]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateSystemStatus = () => {
    setSystemStatus(ragService.getSystemStatus());
  };

  const resetChat = () => {
    const confirmReset = window.confirm('Sei sicuro di voler azzerare la conversazione?');
    
    if (confirmReset) {
      ragService.clearConversationHistory();
      setMessages([
        {
          id: Date.now().toString(),
          role: 'system',
          content: '🔄 **Chat Azzerata!**\n\n**Sistema RAG Pyragogico** pronto per una nuova conversazione.\n\n**Personalità Attiva:** ' + getCurrentPersonality().name + ' ' + getCurrentPersonality().emoji + '\n**Configurazione:** ' + (systemStatus.configured ? '✅ Operativa' : '⚠️ Da configurare') + '\n\nPuoi iniziare con una nuova domanda! 🚀',
          timestamp: new Date(),
          sessionId: ragService.getSessionId()
        }
      ]);
      setInputValue('');
      setIsTyping(false);
      success('Chat azzerata', 'Conversazione resettata con successo');
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
      sessionId: ragService.getSessionId()
    };

    setMessages(prev => [...prev, userMessage]);
    ragService.addMessageToHistory(userMessage);
    setInputValue('');
    setIsTyping(true);

    try {
      const commandResult = ragService.parseCommand(textToSend);
      
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
            content: '⚠️ **Configurazione richiesta**\n\nPer utilizzare il sistema RAG, devi prima configurare una API key.\n\n**Passi necessari:**\n1. Clicca su "Configurazione" in alto a destra\n2. Seleziona un provider (consigliato: OpenRouter)\n3. Inserisci la tua API key\n4. Scegli un modello (disponibili opzioni gratuite)',
            timestamp: new Date(),
            sessionId: ragService.getSessionId()
          };
          setMessages(prev => [...prev, errorMessage]);
          ragService.addMessageToHistory(errorMessage);
          error('Configurazione richiesta', 'Configura una API key per continuare');
        } else {
          const result = await ragService.generateResponse(
            textToSend,
            selectedPersonality
          );
          // Logging specifico per Flowise
          if (systemStatus.provider === 'Flowise') {
            console.log('[Flowise] Risposta:', result);
          }
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
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ **Errore Sistema RAG**\n\n${err instanceof Error ? err.message : 'Errore sconosciuto'}\n\n**Possibili soluzioni:**\n• Verifica la configurazione con \`/status\`\n• Controlla che la tua API key sia valida\n• Prova con un modello diverso`,
        timestamp: new Date(),
        sessionId: ragService.getSessionId()
      };
      setMessages(prev => [...prev, errorMessage]);
      ragService.addMessageToHistory(errorMessage);
      error('Errore sistema', err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setIsTyping(false);
    }
  };

  const getCurrentPersonality = (): PersonalityConfig => {
    return PERSONALITIES.find(p => p.id === selectedPersonality) || PERSONALITIES[0];
  };

  const getCurrentModel = (): ModelInfo | null => {
    return ragService.getCurrentModel();
  };

  const handlePersonalityChange = (personalityId: string) => {
    const oldPersonality = getCurrentPersonality();
    setSelectedPersonality(personalityId);
    const newPersonality = PERSONALITIES.find(p => p.id === personalityId);
    
    if (newPersonality && oldPersonality.id !== personalityId) {
      const changeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'system',
        content: `🎭 **Personalità cambiata!**\n\n**Da:** ${oldPersonality.name} ${oldPersonality.emoji} → **A:** ${newPersonality.name} ${newPersonality.emoji}\n\n**Nuovo stile:** ${newPersonality.description}`,
        timestamp: new Date(),
        sessionId: ragService.getSessionId()
      };
      
      setMessages(prev => [...prev, changeMessage]);
      ragService.addMessageToHistory(changeMessage);
      info('Personalità cambiata', `Ora attiva: ${newPersonality.name} ${newPersonality.emoji}`);
      setSidebarOpen(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    // Auto-focus input after setting the prompt
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    info('Domanda selezionata', 'Premi Invio per inviare o modifica il testo');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header - Compact on mobile to prevent overlap */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 min-h-[120px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-center relative">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 hover-lift cursor-pointer">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Sistema RAG Production-Ready con API Personalizzabili</span>
            <span className="sm:hidden">RAG System Ready</span>
            {flowiseActive && (
              <span className="ml-2 sm:ml-3 inline-flex items-center px-2 sm:px-3 py-1 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-full text-xs font-bold">
                <Zap className="w-3 h-3 mr-1" /> <span className="hidden sm:inline">Flowise attivo</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            AI Assistant Pyragogico
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-2">
            Sistema RAG con personalità multiple basato sul <strong className="text-purple-600">Peeragogy Handbook completo</strong>. 
            <span className="hidden sm:inline">Configurazione API flessibile con supporto per modelli gratuiti e premium.</span>
          </p>
          
          {/* System Status - Compact on mobile */}
          <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 min-h-[40px] sm:min-h-[50px] lg:min-h-[60px] items-center">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-50 border border-green-200 rounded-xl hover-lift cursor-pointer">
              <Database className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-green-800 font-semibold text-xs sm:text-sm">Vector Store</span>
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </div>
            <div className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl border hover-lift cursor-pointer ${
              systemStatus.configured 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-orange-50 border-orange-200 text-orange-800'
            }`}>
              <Key className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-sm">
                {systemStatus.configured ? 'API OK' : 'API da Config'}
              </span>
            </div>
            {systemStatus.modelIsFree && (
              <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl hover-lift cursor-pointer">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                <span className="text-emerald-800 font-semibold text-xs sm:text-sm">Gratuito</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid - Optimized for all screen sizes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden col-span-1 mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-between p-3 sm:p-4 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/50"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl sm:text-2xl">{getCurrentPersonality().emoji}</span>
                <div className="text-left">
                  <div className="font-semibold text-slate-900 text-sm sm:text-base">{getCurrentPersonality().name}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{systemStatus.configured ? 'Configurato' : 'Da configurare'}</div>
                </div>
              </div>
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Enhanced Sidebar - Optimized for all screen sizes */}
          <div className={`lg:col-span-3 space-y-4 lg:space-y-6 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            {/* System Status */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Stato Sistema</h3>
                <button
                  onClick={() => setShowApiConfig(true)}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                  aria-label="Configurazione API"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Configuration Status */}
                <div className="flex items-center space-x-3">
                  {systemStatus.configured ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">
                      {systemStatus.configured ? 'Sistema Configurato' : 'Configurazione Richiesta'}
                    </div>
                    <div className="text-xs text-slate-600">
                      {systemStatus.configured ? `${systemStatus.provider} • ${systemStatus.model}` : 'Inserisci API key per iniziare'}
                    </div>
                  </div>
                </div>
                
                {/* API Key Status */}
                <div className="flex items-center space-x-3">
                  {systemStatus.hasApiKey ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">
                      API Key {systemStatus.hasApiKey ? 'Configurata' : 'Mancante'}
                    </div>
                    <div className="text-xs text-slate-600">
                      {systemStatus.hasApiKey ? 'Memorizzata localmente' : 'Richiesta per l\'accesso AI'}
                    </div>
                  </div>
                </div>

                {/* Vector Store Status */}
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">Vector Store Locale</div>
                    <div className="text-xs text-slate-600">Peeragogy Handbook • Attivo</div>
                  </div>
                </div>
              </div>

              {!systemStatus.configured && (
                <button
                  onClick={() => setShowApiConfig(true)}
                  className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Configura API
                </button>
              )}
            </div>

            {/* Enhanced Personality Selector */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200 hover-lift">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Personalità AI</h3>
                <div className="flex items-center space-x-2 px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Attiva</span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {PERSONALITIES.map((personality) => (
                  <button
                    key={personality.id}
                    onClick={() => handlePersonalityChange(personality.id)}
                    className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-105 hover-lift ${
                      selectedPersonality === personality.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg ring-4 ring-indigo-500/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-2 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                      <span className="text-xl sm:text-2xl">{personality.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold flex items-center space-x-2 text-sm sm:text-base">
                          <span>{personality.name}</span>
                          {selectedPersonality === personality.id && (
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">ATTIVA</span>
                          )}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm opacity-90 mb-2">{personality.description}</p>
                    <div className="text-xs opacity-75">
                      Temp: {personality.temperature} • Max: {personality.maxTokens} token
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Chat Interface - Optimized for all screen sizes */}
          <div className="lg:col-span-9">
            <div 
              ref={chatContainerRef}
              className="bg-white rounded-xl sm:rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden"
              style={{ 
                height: 'calc(100vh - 16rem)',
                minHeight: '600px',
                maxHeight: '900px'
              }}
            >
              {/* Enhanced Chat Header - Mobile optimized to prevent overlap */}
              <div className="p-3 sm:p-4 md:p-6 border-b-2 border-slate-200 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                  <div className="relative p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg flex-shrink-0">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 mb-1 sm:mb-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl truncate">
                        RAG • {getCurrentPersonality().name}
                      </h3>
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl flex-shrink-0">{getCurrentPersonality().emoji}</span>
                      <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex-shrink-0">
                        PROD
                      </span>
                      {systemStatus.modelIsFree && (
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold flex-shrink-0">
                          FREE
                        </span>
                      )}
                    </div>
                    
                    {/* Model Indicator - Compact on mobile */}
                    {systemStatus.configured && getCurrentModel() && (
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                        <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-indigo-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-indigo-600 truncate">
                          {getCurrentModel()?.name}
                        </span>
                        <span className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          getCurrentModel()?.free 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {getCurrentModel()?.free ? 'Free' : 'Pro'}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base truncate">
                      {getCurrentPersonality().description} • {systemStatus.configured ? `${systemStatus.provider} attivo` : 'Configurazione richiesta'}
                    </p>
                  </div>
                  
                  <button
                    onClick={resetChat}
                    className="group p-1.5 sm:p-2 md:p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-200 border-2 border-transparent hover:border-red-200 flex-shrink-0"
                    title="Reset Chat"
                    aria-label="Reset chat"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Enhanced Messages - Optimized for all screen sizes */}
              <div 
                className="p-3 sm:p-4 md:p-6 overflow-y-auto space-y-4 sm:space-y-6 bg-gradient-to-b from-orange-50/30 via-pink-50/30 to-purple-50/30"
                style={{ height: 'calc(100% - 180px)' }}
              >
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
                      <div className={`p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg max-w-[90%] sm:max-w-4xl lg:max-w-5xl ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white' 
                          : message.role === 'system'
                          ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-slate-800 border-2 border-blue-300'
                          : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-slate-900 border-2 border-emerald-300'
                      }`}>
                        <MarkdownRenderer content={message.content} />
                        
                        {/* Sources from Vector Store - Fixed relevance percentages */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <h5 className="text-sm font-semibold text-slate-600 mb-2 flex items-center">
                              <Database className="w-4 h-4 mr-2" />
                              📚 Fonti dal Vector Store:
                            </h5>
                            <div className="space-y-2">
                              {message.sources.map((source: RetrievedSource, index: number) => {
                                // Fix: Ensure realistic relevance percentages (0-100%)
                                const relevancePercentage = Math.min(100, Math.max(0, Math.round(source.similarity * 100)));
                                
                                return (
                                  <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-slate-900">{source.title}</span>
                                      <span className="text-xs text-slate-500">
                                        {relevancePercentage}% rilevanza
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-600">
                                      {source.chapter} • {source.metadata.author} • Pag. {source.metadata.page}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Token Usage */}
                        {message.tokens && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                              <span>Input: {message.tokens.input} tokens</span>
                              <span>Output: {message.tokens.output} tokens</span>
                              <span>Costo: {message.tokens.cost === 0 ? 'Gratuito' : `~$${message.tokens.cost.toFixed(4)}`}</span>
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
                    <div className="flex items-start space-x-4 max-w-full">
                      <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg bg-gradient-to-r from-emerald-100 to-teal-100 text-slate-900 border-2 border-emerald-300">
                        <LoadingSpinner size="sm" text="Generando risposta..." />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input - Optimized for all screen sizes */}
              <div className="p-3 sm:p-4 md:p-6 border-t-2 border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50" style={{ height: '120px' }}>
                <div className="flex space-x-2 sm:space-x-3 lg:space-x-4 h-full items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={systemStatus.configured 
                      ? `Chiedi qualcosa sul Peeragogy Handbook a ${getCurrentPersonality().name} o usa un comando (/help)...`
                      : 'Configura una API key per iniziare...'
                    }
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-orange-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 bg-white/90 backdrop-blur-sm hover:border-amber-300 min-h-[44px] text-sm sm:text-base"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  
                  <button
                    onClick={resetChat}
                    disabled={isTyping}
                    className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                    title="Reset Chat"
                    aria-label="Reset chat"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden lg:inline">Reset</span>
                  </button>
                  
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 lg:space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[44px]"
                  >
                    {isTyping ? (
                      <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span className="hidden lg:inline">Invia</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Prompts Section - Mobile optimized */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Domande Pronte sul Peeragogy Handbook</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="group p-3 sm:p-4 text-left bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                    disabled={isTyping}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors duration-200">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-900 transition-colors duration-200">
                          {prompt}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 group-hover:text-indigo-600 transition-colors duration-200">
                          Clicca per inserire nel chat
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
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
    </div>
  );
};

export default ChatbotPage;