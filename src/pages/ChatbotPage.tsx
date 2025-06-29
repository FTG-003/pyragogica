import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, User, Bot, Loader2, Key, Zap, Brain, Users, MessageCircle, Sparkles, Database, Shield, Globe, Star, CheckCircle, AlertCircle, Info, Trash2, Copy, Download, Upload, RefreshCw, Eye, EyeOff, ChevronDown, ChevronUp, Infinity, TrendingUp, Award, Heart } from 'lucide-react';
import { ragService, PERSONALITIES, API_PROVIDERS, type ChatMessage } from '../services/ragService';
import LoadingSpinner from '../components/LoadingSpinner';
import ModernButton from '../components/ui/ModernButton';
import ModernCard from '../components/ui/ModernCard';
import ModernInput from '../components/ui/ModernInput';
import PersonalityAvatar from '../components/ui/PersonalityAvatar';
import { useToast } from '../components/ToastNotification';

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('academic');
  const [showConfig, setShowConfig] = useState(false);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [selectedProvider, setSelectedProvider] = useState('openrouter');
  const [selectedModel, setSelectedModel] = useState('microsoft/phi-3-mini-128k-instruct:free');
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    providers: true,
    models: false,
    personality: true,
    system: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { success, error, info, warning } = useToast();

  useEffect(() => {
    // Load initial data
    const history = ragService.getConversationHistory();
    setMessages(history);
    
    const status = ragService.getSystemStatus();
    setSelectedProvider(ragService.getCurrentProvider()?.id || 'openrouter');
    setSelectedModel(ragService.getCurrentModel()?.id || 'microsoft/phi-3-mini-128k-instruct:free');
    
    // Load API keys from service
    API_PROVIDERS.forEach(provider => {
      const key = ragService.getAPIKey(provider.id);
      if (key) {
        setApiKeys(prev => ({ ...prev, [provider.id]: key }));
      }
    });

    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      sessionId: ragService.getSessionId()
    };

    setMessages(prev => [...prev, userMessage]);
    ragService.addMessageToHistory(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Check if it's a command
      const commandResult = ragService.parseCommand(inputMessage.trim());
      
      if (commandResult.isCommand) {
        const response = await ragService.handleCommand(commandResult.command!, commandResult.args!);
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          personality: 'system',
          timestamp: new Date(),
          sessionId: ragService.getSessionId()
        };

        setMessages(prev => [...prev, assistantMessage]);
        ragService.addMessageToHistory(assistantMessage);
        success('Comando eseguito', 'Comando di sistema elaborato con successo');
      } else {
        // Regular RAG query
        const result = await ragService.generateResponse(inputMessage.trim(), selectedPersonality);
        
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
        success('Risposta generata', `Utilizzate ${result.sources.length} fonti dal Peeragogy Handbook`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
      error('Errore', errorMessage);
      
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ **Errore**: ${errorMessage}`,
        personality: selectedPersonality,
        timestamp: new Date(),
        sessionId: ragService.getSessionId()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApiKeyChange = (provider: string, key: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: key }));
    if (key.trim()) {
      const success = ragService.setAPIKey(provider, key);
      if (success) {
        info('API Key salvata', `Chiave per ${provider} configurata correttamente`);
      } else {
        warning('Formato non valido', 'Controlla il formato della chiave API');
      }
    }
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    ragService.setProvider(providerId);
    
    const provider = API_PROVIDERS.find(p => p.id === providerId);
    if (provider) {
      const freeModel = provider.models.find(m => m.free);
      if (freeModel) {
        setSelectedModel(freeModel.id);
        ragService.setModel(freeModel.id);
      }
      success('Provider cambiato', `Ora stai usando ${provider.name}`);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    ragService.setModel(modelId);
    
    const model = ragService.getCurrentModel();
    if (model) {
      success('Modello cambiato', `Ora stai usando ${model.name}`);
    }
  };

  const clearConversation = () => {
    ragService.clearConversationHistory();
    setMessages([]);
    success('Cronologia cancellata', 'La conversazione è stata rimossa');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    success('Copiato', 'Messaggio copiato negli appunti');
  };

  const exportConversation = () => {
    const conversation = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.role.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pyragogica-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    success('Esportazione completata', 'Conversazione salvata come file di testo');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentProvider = API_PROVIDERS.find(p => p.id === selectedProvider);
  const currentModel = currentProvider?.models.find(m => m.id === selectedModel);
  const systemStatus = ragService.getSystemStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header Spettacolare */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 relative overflow-hidden">
        {/* Background Animato */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-white to-yellow-300 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-30 animate-pulse bg-gradient-to-br from-cyan-300 to-white blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-modern relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/20 backdrop-blur-xl rounded-full text-white text-xl font-bold mb-8 shadow-2xl">
              <Brain className="w-6 h-6 animate-pulse" />
              <span>AI Assistant Production-Ready</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight title-safe">
              Assistente AI 
              <span className="block text-gradient-safe bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Multi-Personalità
              </span>
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              Interagisci con il <strong>Peeragogy Handbook V3</strong> attraverso 4 personalità AI uniche. 
              Sistema RAG avanzato con <strong>contenuti reali</strong> e <strong>citazioni precise</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="container-modern py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Configurazione Moderna */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card Spettacolare */}
            <ModernCard className={`border-4 shadow-2xl ${
              systemStatus.configured 
                ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' 
                : 'border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50'
            }`}>
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  systemStatus.configured 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                }`}>
                  {systemStatus.configured ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {systemStatus.configured ? '🚀 Sistema Attivo' : '⚙️ Configurazione Richiesta'}
                  </h3>
                  <p className={`text-lg font-semibold ${
                    systemStatus.configured ? 'text-green-700' : 'text-orange-700'
                  }`}>
                    {systemStatus.configured 
                      ? 'Pronto per conversazioni intelligenti!' 
                      : 'Inserisci una API key per iniziare'
                    }
                  </p>
                </div>
                
                {systemStatus.configured && (
                  <div className="space-y-3 text-left bg-white/50 rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Provider:</span>
                      <span className="font-black text-slate-900">{systemStatus.provider}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Modello:</span>
                      <span className="font-black text-slate-900 text-sm">{currentModel?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Costo:</span>
                      <span className={`font-black text-lg ${systemStatus.modelIsFree ? 'text-green-600' : 'text-orange-600'}`}>
                        {systemStatus.modelIsFree ? '🆓 GRATUITO' : '💰 A pagamento'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </ModernCard>

            {/* Configuration Toggle */}
            <ModernButton
              variant="secondary"
              onClick={() => setShowConfig(!showConfig)}
              icon={<Settings className="w-6 h-6" />}
              className="w-full text-xl py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-indigo-200 hover:border-indigo-400"
            >
              {showConfig ? '🔧 Nascondi Configurazione' : '⚙️ Mostra Configurazione'}
            </ModernButton>

            {/* Configuration Panel */}
            {showConfig && (
              <div className="space-y-6">
                {/* Providers Section */}
                <ModernCard className="border-4 border-blue-200 shadow-2xl">
                  <button
                    onClick={() => toggleSection('providers')}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <Globe className="w-6 h-6 text-blue-600" />
                      🌐 Provider API
                    </h3>
                    {expandedSections.providers ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </button>
                  
                  {expandedSections.providers && (
                    <div className="mt-6 space-y-4">
                      {API_PROVIDERS.map(provider => (
                        <div key={provider.id} className="space-y-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              id={provider.id}
                              name="provider"
                              checked={selectedProvider === provider.id}
                              onChange={() => handleProviderChange(provider.id)}
                              className="w-5 h-5 text-indigo-600"
                            />
                            <label htmlFor={provider.id} className="flex-1 cursor-pointer">
                              <div className="font-bold text-slate-900 text-lg">{provider.name}</div>
                              <div className="text-slate-600 text-sm">{provider.description}</div>
                            </label>
                          </div>
                          
                          {selectedProvider === provider.id && (
                            <div className="ml-8 space-y-3">
                              <div className="relative">
                                <ModernInput
                                  type={showApiKey[provider.id] ? 'text' : 'password'}
                                  placeholder={`Inserisci ${provider.name} API Key`}
                                  value={apiKeys[provider.id] || ''}
                                  onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                                  icon={<Key className="w-5 h-5" />}
                                  className="pr-12"
                                />
                                <button
                                  onClick={() => setShowApiKey(prev => ({ ...prev, [provider.id]: !prev[provider.id] }))}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                  {showApiKey[provider.id] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                              <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-lg">
                                <strong>Formato:</strong> {provider.keyFormat}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ModernCard>

                {/* Models Section */}
                {currentProvider && (
                  <ModernCard className="border-4 border-purple-200 shadow-2xl">
                    <button
                      onClick={() => toggleSection('models')}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <Brain className="w-6 h-6 text-purple-600" />
                        🤖 Modelli AI
                      </h3>
                      {expandedSections.models ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </button>
                    
                    {expandedSections.models && (
                      <div className="mt-6 space-y-4">
                        <div className="grid gap-3">
                          {currentProvider.models.map(model => (
                            <div
                              key={model.id}
                              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                selectedModel === model.id
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-slate-200 hover:border-purple-300'
                              }`}
                              onClick={() => handleModelChange(model.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-2">
                                    {model.name}
                                    {model.free && (
                                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                        🆓 GRATIS
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-600 text-sm">{model.description}</div>
                                  <div className="text-slate-500 text-xs mt-1">
                                    Context: {model.contextWindow.toLocaleString()} token
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  checked={selectedModel === model.id}
                                  onChange={() => handleModelChange(model.id)}
                                  className="w-5 h-5 text-purple-600"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ModernCard>
                )}
              </div>
            )}

            {/* Personality Selection */}
            <ModernCard className="border-4 border-green-200 shadow-2xl">
              <button
                onClick={() => toggleSection('personality')}
                className="w-full flex items-center justify-between text-left mb-4"
              >
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-600" />
                  🎭 Personalità AI
                </h3>
                {expandedSections.personality ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </button>
              
              {expandedSections.personality && (
                <div className="grid gap-4">
                  {PERSONALITIES.map(personality => (
                    <div
                      key={personality.id}
                      className={`p-4 rounded-2xl border-4 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                        selectedPersonality === personality.id
                          ? 'border-green-500 bg-green-50 shadow-xl'
                          : 'border-slate-200 hover:border-green-300 hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedPersonality(personality.id)}
                    >
                      <div className="flex items-center gap-4">
                        <PersonalityAvatar 
                          personality={personality.id} 
                          size="md" 
                          animated={selectedPersonality === personality.id}
                          showGlow={selectedPersonality === personality.id}
                        />
                        <div className="flex-1">
                          <div className="font-black text-slate-900 text-lg flex items-center gap-2">
                            {personality.emoji} {personality.name}
                          </div>
                          <div className="text-slate-600 text-sm leading-relaxed">
                            {personality.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ModernCard>

            {/* System Info */}
            <ModernCard className="border-4 border-indigo-200 shadow-2xl">
              <button
                onClick={() => toggleSection('system')}
                className="w-full flex items-center justify-between text-left mb-4"
              >
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Database className="w-6 h-6 text-indigo-600" />
                  📊 Sistema
                </h3>
                {expandedSections.system ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </button>
              
              {expandedSections.system && (
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-2xl">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-700">Sessione:</span>
                        <span className="font-mono text-indigo-900 text-xs">{systemStatus.sessionId.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-700">Messaggi:</span>
                        <span className="font-black text-indigo-900">{messages.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-indigo-700">Vector Store:</span>
                        <span className="font-black text-indigo-900">Peeragogy V3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <ModernButton
                      variant="secondary"
                      onClick={clearConversation}
                      icon={<Trash2 className="w-4 h-4" />}
                      size="sm"
                      className="flex-1 text-sm"
                    >
                      Cancella
                    </ModernButton>
                    <ModernButton
                      variant="secondary"
                      onClick={exportConversation}
                      icon={<Download className="w-4 h-4" />}
                      size="sm"
                      className="flex-1 text-sm"
                    >
                      Esporta
                    </ModernButton>
                  </div>
                </div>
              )}
            </ModernCard>
          </div>

          {/* Chat Interface Moderna */}
          <div className="lg:col-span-3">
            <ModernCard className="h-[800px] flex flex-col border-4 border-indigo-200 shadow-2xl" padding="lg">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-6 border-b-4 border-slate-200">
                <div className="flex items-center gap-4">
                  <PersonalityAvatar 
                    personality={selectedPersonality} 
                    size="lg" 
                    animated={true}
                    showGlow={true}
                  />
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">
                      Chat con {PERSONALITIES.find(p => p.id === selectedPersonality)?.name}
                    </h2>
                    <p className="text-slate-600 text-lg">
                      {PERSONALITIES.find(p => p.id === selectedPersonality)?.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Messaggi: {messages.length}</div>
                  <div className="text-sm text-slate-500">Sessione: {systemStatus.sessionId.slice(-8)}</div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <MessageCircle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">
                      Inizia una Conversazione
                    </h3>
                    <p className="text-slate-600 text-xl mb-8 max-w-2xl mx-auto">
                      Fai una domanda sul <strong>Peeragogy Handbook V3</strong> o usa un comando di sistema come <code>/status</code>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                      <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                        <h4 className="font-black text-blue-900 mb-3">💬 Esempi di Domande</h4>
                        <ul className="text-blue-700 text-left space-y-2">
                          <li>• "Spiegami i principi della peeragogy"</li>
                          <li>• "Come funziona il pattern Wrapper?"</li>
                          <li>• "Raccontami del caso studio 5PH1NX"</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                        <h4 className="font-black text-green-900 mb-3">⚙️ Comandi Sistema</h4>
                        <ul className="text-green-700 text-left space-y-2">
                          <li>• <code>/status</code> - Stato sistema</li>
                          <li>• <code>/vectorstore</code> - Info contenuti</li>
                          <li>• <code>/help</code> - Guida completa</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <PersonalityAvatar 
                          personality={message.personality || selectedPersonality} 
                          size="md" 
                          animated={false}
                        />
                      )}
                      
                      <div className={`max-w-3xl ${message.role === 'user' ? 'order-first' : ''}`}>
                        <div
                          className={`p-6 rounded-3xl shadow-lg ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                              : 'bg-white border-4 border-slate-200'
                          }`}
                        >
                          <div className="prose prose-lg max-w-none">
                            {message.content.split('\n').map((line, index) => {
                              if (line.startsWith('# ')) {
                                return <h1 key={index} className="text-2xl font-black mb-4">{line.substring(2)}</h1>;
                              }
                              if (line.startsWith('## ')) {
                                return <h2 key={index} className="text-xl font-black mb-3">{line.substring(3)}</h2>;
                              }
                              if (line.startsWith('### ')) {
                                return <h3 key={index} className="text-lg font-black mb-2">{line.substring(4)}</h3>;
                              }
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return <p key={index} className="font-black text-lg mb-2">{line.slice(2, -2)}</p>;
                              }
                              if (line.startsWith('• ')) {
                                return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
                              }
                              if (line.trim() === '') {
                                return <br key={index} />;
                              }
                              return <p key={index} className="mb-2 leading-relaxed">{line}</p>;
                            })}
                          </div>
                          
                          {/* Sources */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-6 pt-4 border-t-2 border-slate-200">
                              <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                📚 Fonti dal Peeragogy Handbook V3
                              </h4>
                              <div className="space-y-3">
                                {message.sources.map((source, index) => (
                                  <div key={index} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
                                    <div className="font-bold text-slate-900 mb-2">
                                      {source.title} - {source.chapter}
                                    </div>
                                    <div className="text-slate-600 text-sm mb-2">
                                      Autore: {source.metadata.author} • Pagina: {source.metadata.page} • 
                                      Versione: {source.metadata.version}
                                    </div>
                                    <div className="text-slate-700 text-sm italic">
                                      "{source.content.substring(0, 150)}..."
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Tokens Info */}
                          {message.tokens && (
                            <div className="mt-4 pt-3 border-t border-slate-200 text-sm text-slate-500">
                              Token: {message.tokens.input + message.tokens.output} • 
                              Costo: ${message.tokens.cost.toFixed(4)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-sm text-slate-500">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <ModernButton
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            icon={<Copy className="w-4 h-4" />}
                            className="text-xs"
                          >
                            Copia
                          </ModernButton>
                        </div>
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <PersonalityAvatar 
                      personality={selectedPersonality} 
                      size="md" 
                      animated={true}
                      showGlow={true}
                    />
                    <div className="bg-white border-4 border-slate-200 p-6 rounded-3xl shadow-lg">
                      <LoadingSpinner size="md" text="Elaborazione intelligente in corso..." />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="pt-6 border-t-4 border-slate-200">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <ModernInput
                      type="text"
                      placeholder="Scrivi la tua domanda sul Peeragogy Handbook o usa /help per i comandi..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      size="lg"
                      className="text-xl py-4"
                    />
                  </div>
                  <ModernButton
                    variant="primary"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading || !systemStatus.configured}
                    icon={isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                    size="lg"
                    className="px-8 py-4 text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500"
                  >
                    {isLoading ? 'Elaborando...' : 'Invia'}
                  </ModernButton>
                </div>
                
                {!systemStatus.configured && (
                  <div className="mt-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      <span className="text-orange-700 font-bold">
                        ⚙️ Configura una API key per iniziare a chattare con l'AI
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </ModernCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatbotPage);