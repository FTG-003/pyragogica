import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, User, BookOpen, Lightbulb, MessageCircle, Zap, Sparkles, Bot, Play, Settings, Key, Database, AlertCircle, CheckCircle, Loader, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react';
import { ragService, PERSONALITIES, API_PROVIDERS, type ChatMessage, type PersonalityConfig, type RetrievedSource } from '../services/ragService';

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Benvenuto nel Sistema RAG Pyragogico! 🤖\n\nPer iniziare:\n1. Configura la tua API key con `/set_api_key`\n2. Seleziona una personalità AI\n3. Inizia a chattare!\n\nUsa `/help` per vedere tutti i comandi disponibili.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('academic');
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState({ configured: false, provider: '', model: '' });
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [configForm, setConfigForm] = useState({
    provider: 'openai',
    model: 'gpt-4o',
    apiKey: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      // Check if it's a command
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
        checkApiStatus(); // Update status after potential configuration
      } else {
        // Regular RAG query
        if (!apiStatus.configured) {
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: '⚠️ **API non configurata**\n\nPer utilizzare il sistema RAG, devi prima configurare la tua API key.\n\nUsa il comando: `/set_api_key <provider> <model> <api_key>`\n\nEsempio: `/set_api_key openai gpt-4o sk-your-key-here`',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
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
        }
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ **Errore**: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickConfig = async () => {
    const { provider, model, apiKey } = configForm;
    if (!apiKey.trim()) return;

    const command = `/set_api_key ${provider} ${model} ${apiKey}`;
    setInputValue(command);
    setShowApiConfig(false);
    await handleSendMessage();
  };

  const getCurrentPersonality = (): PersonalityConfig => {
    return PERSONALITIES.find(p => p.id === selectedPersonality) || PERSONALITIES[0];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickPrompts = [
    "Spiegami i principi fondamentali della peeragogy",
    "Come posso implementare l'apprendimento peer-to-peer?",
    "Quali sono i benefici della collaborazione nell'educazione?",
    "Come gestire i conflitti in un gruppo di apprendimento?",
    "Che ruolo ha la tecnologia nella peeragogy?"
  ];

  const commandExamples = [
    "/set_api_key openai gpt-4o sk-your-key-here",
    "/status",
    "/help",
    "/personalities",
    "/providers"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
          <Brain className="w-4 h-4" />
          <span>Sistema RAG Avanzato</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">AI Assistant Pyragogico</h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Sistema RAG (Retrieval-Augmented Generation) con personalità multiple basato sul Peeragogy Handbook. 
          Configura la tua API key e inizia conversazioni intelligenti e contestualizzate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* API Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Stato Sistema</h3>
              <button
                onClick={() => setShowApiConfig(!showApiConfig)}
                className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {apiStatus.configured ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">
                    {apiStatus.configured ? 'Configurato' : 'Non Configurato'}
                  </div>
                  {apiStatus.configured && (
                    <div className="text-xs text-slate-600">
                      {apiStatus.provider} • {apiStatus.model}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">Vector Store</div>
                  <div className="text-xs text-slate-600">Peeragogy Handbook</div>
                </div>
              </div>
            </div>

            {!apiStatus.configured && (
              <button
                onClick={() => setShowApiConfig(true)}
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Configura API
              </button>
            )}
          </div>

          {/* API Configuration Modal */}
          {showApiConfig && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Configurazione API</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Provider</label>
                  <select
                    value={configForm.provider}
                    onChange={(e) => setConfigForm(prev => ({ 
                      ...prev, 
                      provider: e.target.value,
                      model: API_PROVIDERS.find(p => p.id === e.target.value)?.models[0] || ''
                    }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {API_PROVIDERS.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Modello</label>
                  <select
                    value={configForm.model}
                    onChange={(e) => setConfigForm(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {API_PROVIDERS.find(p => p.id === configForm.provider)?.models.map(model => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">API Key</label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={configForm.apiKey}
                      onChange={(e) => setConfigForm(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder={API_PROVIDERS.find(p => p.id === configForm.provider)?.keyFormat}
                      className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleQuickConfig}
                    disabled={!configForm.apiKey.trim()}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    Configura
                  </button>
                  <button
                    onClick={() => setShowApiConfig(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-300"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Personality Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Personalità AI</h3>
            <div className="space-y-3">
              {PERSONALITIES.map((personality) => (
                <button
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedPersonality === personality.id
                      ? 'bg-indigo-600 text-white shadow-lg'
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

          {/* Quick Prompts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Domande Rapide</h4>
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
            <h4 className="text-lg font-bold text-slate-900 mb-4">Comandi Utili</h4>
            <div className="space-y-2">
              {commandExamples.map((command, index) => (
                <div key={index} className="group flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
                  <code className="flex-1 text-xs text-slate-700 font-mono">{command}</code>
                  <button
                    onClick={() => copyToClipboard(command)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-all duration-300"
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
                      Sistema RAG • {getCurrentPersonality().name}
                    </h3>
                    <span className="text-2xl">{getCurrentPersonality().emoji}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {getCurrentPersonality().description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{apiStatus.configured ? 'Pronto' : 'Configurazione richiesta'}</span>
                </div>
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
                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <h4 key={index} className="font-bold mt-4 mb-2">{line.slice(2, -2)}</h4>;
                          }
                          if (line.startsWith('`') && line.endsWith('`')) {
                            return <code key={index} className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">{line.slice(1, -1)}</code>;
                          }
                          if (line.trim() === '') {
                            return <br key={index} />;
                          }
                          return <p key={index} className="mb-2">{line}</p>;
                        })}
                      </div>
                      
                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <h5 className="text-sm font-semibold text-slate-600 mb-2">📚 Fonti dal Peeragogy Handbook:</h5>
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
                      <div className="flex items-center space-x-2">
                        <Loader className="w-4 h-4 animate-spin text-indigo-600" />
                        <span className="text-slate-600">Elaborando risposta RAG...</span>
                      </div>
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
                    ? `Scrivi una domanda per ${getCurrentPersonality().name} o usa un comando (/help)...`
                    : 'Configura prima la tua API key con /set_api_key...'
                  }
                  className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
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
        <h3 className="text-3xl font-bold mb-8 text-center">Sistema RAG in Azione</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Database className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">1. Vector Store</h4>
              <p className="text-slate-300 text-sm">Peeragogy Handbook indicizzato semanticamente per ricerca intelligente</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">2. Retrieval</h4>
              <p className="text-slate-300 text-sm">Ricerca delle fonti più rilevanti basata sulla similarity semantica</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">3. Augmentation</h4>
              <p className="text-slate-300 text-sm">Arricchimento del prompt con contesto e personalità selezionata</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">4. Generation</h4>
              <p className="text-slate-300 text-sm">Generazione di risposte contestualizzate con la personalità scelta</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Gestione API Trasparente
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="font-semibold mb-2">🔐 Privacy</h5>
              <p className="text-slate-300">Le tue API key sono memorizzate solo localmente nel browser</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">💰 Controllo Costi</h5>
              <p className="text-slate-300">Usa la tua API key per controllo completo sui costi</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">🔄 Flessibilità</h5>
              <p className="text-slate-300">Supporto per OpenAI, Gemini, OpenRouter e altri provider</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;