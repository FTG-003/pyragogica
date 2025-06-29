import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings, Info, X, Check, AlertCircle, Zap, Database, Brain, User, Bot, Copy, RefreshCw, Trash2, HelpCircle, Command } from 'lucide-react';
import { ragService, type ChatMessage, type PersonalityConfig, PERSONALITIES } from '../services/ragService';
import LoadingSpinner from '../components/LoadingSpinner';
import ModernButton from '../components/ui/ModernButton';
import ModernInput from '../components/ui/ModernInput';
import ModernCard from '../components/ui/ModernCard';
import PersonalityAvatar from '../components/ui/PersonalityAvatar';
import { useToast } from '../components/ToastNotification';

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<string>('academic');
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('openrouter');
  const [selectedModel, setSelectedModel] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { success, error, info } = useToast();

  // Load messages from service on mount
  useEffect(() => {
    const storedMessages = ragService.getConversationHistory();
    setMessages(storedMessages);
    
    // Get system status
    const status = ragService.getSystemStatus();
    setSelectedProvider(status.provider);
    setSelectedModel(status.model);
    
    // Check if API key is set
    if (!status.configured) {
      setShowConfig(true);
      info('Configurazione necessaria', 'Inserisci una API key per iniziare', 5000);
    }
  }, [info]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Check if it's a command
    const { isCommand, command, args } = ragService.parseCommand(inputValue);
    
    if (isCommand && command) {
      setIsLoading(true);
      try {
        const response = await ragService.handleCommand(command, args || []);
        
        const commandMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          content: inputValue,
          timestamp: new Date(),
          sessionId: ragService.getSessionId()
        };
        
        const responseMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          personality: 'system',
          sessionId: ragService.getSessionId()
        };
        
        ragService.addMessageToHistory(commandMessage);
        ragService.addMessageToHistory(responseMessage);
        
        setMessages([...messages, commandMessage, responseMessage]);
        setInputValue('');
        success('Comando eseguito', `/${command} completato con successo`);
      } catch (err) {
        error('Errore comando', err instanceof Error ? err.message : 'Errore sconosciuto');
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    // Regular message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      sessionId: ragService.getSessionId()
    };
    
    setMessages([...messages, userMessage]);
    ragService.addMessageToHistory(userMessage);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const { response, sources, tokens } = await ragService.generateResponse(
        inputValue,
        selectedPersonality
      );
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        personality: selectedPersonality,
        timestamp: new Date(),
        sources,
        tokens,
        sessionId: ragService.getSessionId()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      ragService.addMessageToHistory(assistantMessage);
      
      if (tokens) {
        info(
          'Tokens utilizzati',
          `Input: ${tokens.input}, Output: ${tokens.output}, Costo: $${tokens.cost.toFixed(6)}`,
          3000
        );
      }
    } catch (err) {
      error('Errore generazione risposta', err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    ragService.clearConversationHistory();
    setMessages([]);
    success('Chat cancellata', 'La cronologia è stata rimossa');
  };

  const handleSaveConfig = () => {
    // Set API key
    if (apiKey) {
      const keySet = ragService.setAPIKey(selectedProvider, apiKey);
      if (!keySet) {
        error('API Key non valida', 'Controlla il formato della chiave API');
        return;
      }
    }
    
    // Set provider and model
    ragService.setProvider(selectedProvider);
    if (selectedModel) {
      ragService.setModel(selectedModel);
    }
    
    setShowConfig(false);
    success('Configurazione salvata', 'Le impostazioni sono state aggiornate');
    
    // Clear input field for security
    setApiKey('');
  };

  const getPersonalityConfig = (id: string): PersonalityConfig | undefined => {
    return PERSONALITIES.find(p => p.id === id);
  };

  const formatMessageContent = (content: string) => {
    // Basic markdown-like formatting
    return content
      .split('\n\n')
      .map((paragraph, i) => {
        // Code blocks
        if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
          const code = paragraph.slice(3, -3);
          return (
            <pre key={i} className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto my-4">
              <code>{code}</code>
            </pre>
          );
        }
        
        // Headers
        if (paragraph.startsWith('# ')) {
          return <h2 key={i} className="text-2xl font-bold mt-6 mb-4">{paragraph.slice(2)}</h2>;
        }
        if (paragraph.startsWith('## ')) {
          return <h3 key={i} className="text-xl font-bold mt-5 mb-3">{paragraph.slice(3)}</h3>;
        }
        
        // Bold
        const boldFormatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Lists
        if (paragraph.startsWith('- ') || paragraph.startsWith('• ')) {
          return (
            <ul key={i} className="list-disc pl-5 my-3 space-y-2">
              <li dangerouslySetInnerHTML={{ __html: boldFormatted.slice(2) }} />
            </ul>
          );
        }
        
        return <p key={i} className="my-3" dangerouslySetInnerHTML={{ __html: boldFormatted }} />;
      });
  };

  const renderSources = (sources?: any[]) => {
    if (!sources || sources.length === 0) return null;
    
    return (
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Fonti:</h4>
        <div className="space-y-2">
          {sources.map((source, index) => (
            <div key={index} className="text-xs bg-slate-50 p-3 rounded-lg">
              <div className="font-semibold text-slate-800">{source.title}</div>
              <div className="text-slate-600 mt-1">{source.chapter}</div>
              <div className="text-slate-500 mt-1 text-xs">
                Autore: {source.metadata.author} • 
                Pagina: {source.metadata.page} • 
                Versione: {source.metadata.version}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChatMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';
    const personality = isUser ? undefined : getPersonalityConfig(message.personality || 'academic');
    
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
      >
        <div
          className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] gap-3`}
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isUser ? (
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
            ) : (
              <PersonalityAvatar 
                personality={message.personality || 'academic'} 
                size="md"
                showGlow={true}
              />
            )}
          </div>
          
          {/* Message Content */}
          <div
            className={`rounded-2xl px-6 py-4 ${
              isUser
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-white border border-slate-200 shadow-md'
            }`}
          >
            {/* Personality Label for AI */}
            {!isUser && personality && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-slate-700">
                  {personality.emoji} {personality.name}
                </span>
              </div>
            )}
            
            {/* Message Text */}
            <div className={`${isUser ? 'text-white' : 'text-slate-700'}`}>
              {formatMessageContent(message.content)}
            </div>
            
            {/* Sources for AI responses */}
            {!isUser && message.sources && renderSources(message.sources)}
            
            {/* Timestamp */}
            <div className={`text-xs mt-2 ${isUser ? 'text-indigo-100' : 'text-slate-400'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8">
      <div className="container-modern">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
                <p className="text-slate-600">Powered by Peeragogy Handbook V3</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ModernButton
                variant="secondary"
                onClick={() => setShowConfig(true)}
                icon={<Settings className="w-5 h-5" />}
                ariaLabel="Configurazione"
              >
                Configurazione
              </ModernButton>
              
              <ModernButton
                variant="outline"
                onClick={() => info('Informazioni', 'AI Assistant con contenuti reali del Peeragogy Handbook V3')}
                icon={<Info className="w-5 h-5" />}
                ariaLabel="Informazioni"
              >
                Info
              </ModernButton>
            </div>
          </div>
          
          {/* Personality Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-slate-700 font-semibold">Personalità:</span>
              
              {PERSONALITIES.map((personality) => (
                <button
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedPersonality === personality.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <PersonalityAvatar 
                    personality={personality.id} 
                    size="sm"
                    showGlow={selectedPersonality === personality.id}
                  />
                  <span>{personality.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Chat Container */}
          <ModernCard className="mb-6 min-h-[500px] max-h-[70vh] overflow-y-auto" padding="lg">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Benvenuto nell'AI Assistant
                </h2>
                <p className="text-slate-600 max-w-md mb-8">
                  Fai una domanda sul Peeragogy Handbook V3 e riceverai risposte basate su contenuti reali con citazioni precise.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                  <ModernButton
                    variant="secondary"
                    onClick={() => setInputValue('/status')}
                    icon={<Info className="w-5 h-5" />}
                  >
                    Stato Sistema
                  </ModernButton>
                  <ModernButton
                    variant="secondary"
                    onClick={() => setInputValue('/help')}
                    icon={<HelpCircle className="w-5 h-5" />}
                  >
                    Guida Comandi
                  </ModernButton>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map(renderChatMessage)}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ModernCard>
          
          {/* Input Area */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <ModernInput
                type="text"
                placeholder="Fai una domanda sul Peeragogy Handbook..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || showConfig}
                icon={<Command className="w-5 h-5" />}
                ariaLabel="Messaggio"
              />
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                <Command className="w-3 h-3" /> 
                <span>Prova <code>/help</code> per i comandi disponibili</span>
              </div>
            </div>
            
            <ModernButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || showConfig}
              loading={isLoading}
              icon={<Send className="w-5 h-5" />}
              ariaLabel="Invia messaggio"
            >
              Invia
            </ModernButton>
            
            <ModernButton
              variant="outline"
              onClick={handleClearChat}
              disabled={messages.length === 0 || isLoading || showConfig}
              icon={<Trash2 className="w-5 h-5" />}
              ariaLabel="Cancella chat"
            >
              Cancella
            </ModernButton>
          </div>
        </div>
      </div>
      
      {/* Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <ModernCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Configurazione AI</h2>
              <button
                onClick={() => setShowConfig(false)}
                className="p-2 text-slate-500 hover:text-slate-700 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Provider Selection */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Provider AI</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ragService.API_PROVIDERS.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => {
                        setSelectedProvider(provider.id);
                        setSelectedModel('');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedProvider === provider.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-semibold text-slate-900">{provider.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{provider.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* API Key Input */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">API Key</h3>
                <ModernInput
                  type="password"
                  placeholder={`Inserisci ${selectedProvider} API key`}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  icon={<Key className="w-5 h-5" />}
                />
                <p className="text-sm text-slate-500 mt-2">
                  La tua API key è memorizzata solo localmente nel browser e non viene mai condivisa.
                </p>
              </div>
              
              {/* Model Selection */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Modello AI</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ragService.API_PROVIDERS.find(p => p.id === selectedProvider)?.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedModel === model.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{model.name}</h4>
                        {model.free && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Free
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{model.description}</p>
                      {!model.free && model.pricing && (
                        <p className="text-xs text-slate-500 mt-2">
                          ${model.pricing.input}/1K input, ${model.pricing.output}/1K output
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Free Models Info */}
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Modelli Gratuiti Disponibili</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      OpenRouter offre modelli gratuiti come Phi-3, Gemma, Llama 3 e Mistral.
                      Perfetti per testare senza costi!
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                <ModernButton
                  variant="secondary"
                  onClick={() => setShowConfig(false)}
                >
                  Annulla
                </ModernButton>
                <ModernButton
                  onClick={handleSaveConfig}
                  icon={<Check className="w-5 h-5" />}
                >
                  Salva Configurazione
                </ModernButton>
              </div>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

// Componente Key per l'icona della chiave
const Key = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

export default React.memo(ChatbotPage);