import React, { useState } from 'react';
import { Send, Brain, User, BookOpen, Lightbulb, MessageCircle, Zap, Sparkles, Bot, Play } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Benvenuto nell\'AI Assistant Pyragogico! Seleziona una personalità per iniziare la conversazione e scoprire nuovi modi di apprendere.',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('academic');
  const [isTyping, setIsTyping] = useState(false);

  const personalities = [
    {
      id: 'academic',
      name: 'Accademico',
      icon: BookOpen,
      description: 'Rigoroso, metodico, basato su evidenze scientifiche',
      color: 'from-blue-500 to-indigo-500',
      sample: 'Analizza questo concetto dal punto di vista teorico e metodologico...',
      avatar: '🎓'
    },
    {
      id: 'divulgative',
      name: 'Divulgatore',
      icon: Lightbulb,
      description: 'Semplice, coinvolgente, orientato alla comprensione pratica',
      color: 'from-green-500 to-teal-500',
      sample: 'Spiegami questo argomento come se fossi un principiante...',
      avatar: '💡'
    },
    {
      id: 'critical',
      name: 'Critico',
      icon: Brain,
      description: 'Analitico, questionante, stimola il pensiero critico',
      color: 'from-purple-500 to-pink-500',
      sample: 'Quali sono i punti deboli di questa teoria? Cosa manca?',
      avatar: '🧠'
    },
    {
      id: 'socratic',
      name: 'Socratico',
      icon: MessageCircle,
      description: 'Utilizza domande per guidare la scoperta autonoma',
      color: 'from-orange-500 to-red-500',
      sample: 'Invece di darti la risposta, lascia che ti guidi con domande...',
      avatar: '🤔'
    }
  ];

  const sampleConversations = [
    {
      personality: 'academic',
      messages: [
        { type: 'user', content: 'Come funziona il sistema RAG nell\'educazione?' },
        { type: 'bot', content: 'Il Retrieval Augmented Generation (RAG) in ambito educativo rappresenta un paradigma innovativo che combina tecniche di information retrieval con modelli generativi. Il sistema opera attraverso tre fasi principali: 1) indicizzazione semantica dei contenuti educativi, 2) recupero contestuale delle informazioni rilevanti, 3) generazione di risposte personalizzate basate sul corpus recuperato. Studi recenti (Zhang et al., 2024) dimostrano un miglioramento del 73% nell\'accuratezza delle risposte educative...' }
      ]
    },
    {
      personality: 'divulgative',
      messages: [
        { type: 'user', content: 'Cos\'è l\'apprendimento peer-to-peer?' },
        { type: 'bot', content: 'Immagina di imparare a cucinare: invece di seguire solo un maestro chef, ti ritrovi in una cucina con tanti altri aspiranti cuochi. Ognuno ha qualcosa di diverso da condividere - chi sa fare la pasta, chi conosce i segreti delle spezie, chi è bravo con i dolci. L\'apprendimento peer-to-peer è proprio così! È quando le persone imparano l\'una dall\'altra, condividendo conoscenze, esperienze e competenze. Non c\'è un "professore" al centro, ma tutti sono allo stesso tempo studenti e insegnanti.' }
      ]
    }
  ];

  const quickPrompts = [
    "Spiegami il concetto di peeragogy",
    "Come posso migliorare il mio apprendimento collaborativo?",
    "Quali sono i benefici dell'AI nell'educazione?",
    "Come funziona la co-creazione cognitiva?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const personality = personalities.find(p => p.id === selectedPersonality);
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: `[${personality?.name}] Interessante domanda! In modalità ${personality?.name.toLowerCase()}, potrei approfondire questo aspetto considerando le metodologie più avanzate di apprendimento peer-to-peer. Questo approccio ci permette di esplorare il tema da una prospettiva unica e coinvolgente.`,
        personality: selectedPersonality
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const getCurrentPersonality = () => personalities.find(p => p.id === selectedPersonality);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
          <Brain className="w-4 h-4" />
          <span>AI Assistant Pyragogico</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Conversazioni Intelligenti</h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Interagisci con l'intelligenza artificiale attraverso diverse personalità pedagogiche. 
          Ogni modalità offre un approccio unico all'apprendimento e alla scoperta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Enhanced Personality Selector */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Personalità AI</h3>
            <div className="space-y-4">
              {personalities.map((personality) => {
                const Icon = personality.icon;
                return (
                  <button
                    key={personality.id}
                    onClick={() => setSelectedPersonality(personality.id)}
                    className={`w-full p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                      selectedPersonality === personality.id
                        ? 'bg-white shadow-xl ring-4 ring-indigo-500/20 border-2 border-indigo-500'
                        : 'bg-slate-50 hover:bg-white hover:shadow-lg border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${personality.color} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-slate-900 text-lg">{personality.name}</h4>
                          <span className="text-2xl">{personality.avatar}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{personality.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enhanced Quick Examples */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">Esempi di Conversazione</h4>
            <div className="space-y-4">
              {sampleConversations.map((sample, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                    {personalities.find(p => p.id === sample.personality)?.name}
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-slate-700 font-semibold">
                      Q: {sample.messages[0].content}
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      A: {sample.messages[1].content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">Domande Rapide</h4>
            <div className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="w-full p-3 text-left text-sm text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-300 border border-slate-200 hover:border-indigo-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-xl h-[700px] flex flex-col border border-slate-200">
            {/* Enhanced Chat Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className={`relative p-3 rounded-2xl bg-gradient-to-r ${getCurrentPersonality()?.color} shadow-lg`}>
                  {React.createElement(getCurrentPersonality()?.icon || Brain, { className: "w-7 h-7 text-white" })}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-slate-900 text-xl">
                      Modalità {getCurrentPersonality()?.name}
                    </h3>
                    <span className="text-2xl">{getCurrentPersonality()?.avatar}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {getCurrentPersonality()?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>

            {/* Enhanced Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-slate-50/50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-4 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-3 rounded-2xl shadow-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                        : message.type === 'system'
                        ? 'bg-gradient-to-r from-slate-400 to-slate-500'
                        : `bg-gradient-to-r ${getCurrentPersonality()?.color}`
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : message.type === 'system' ? (
                        <Sparkles className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`p-6 rounded-3xl shadow-lg max-w-3xl ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                        : message.type === 'system'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-white text-slate-900 border border-slate-200'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-4 max-w-4xl">
                    <div className={`p-3 rounded-2xl shadow-lg bg-gradient-to-r ${getCurrentPersonality()?.color}`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="p-6 rounded-3xl shadow-lg bg-white border border-slate-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Input */}
            <div className="p-6 border-t border-slate-200 bg-white rounded-b-3xl">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder={`Scrivi una domanda per la modalità ${getCurrentPersonality()?.name}...`}
                  className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Send className="w-5 h-5" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">1. Retrieval</h4>
              <p className="text-slate-300 leading-relaxed">Ricerca semantica intelligente nei contenuti della biblioteca per trovare informazioni rilevanti</p>
            </div>
          </div>
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">2. Augmentation</h4>
              <p className="text-slate-300 leading-relaxed">Arricchimento del contesto con conoscenze specifiche e personalizzazione</p>
            </div>
          </div>
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">3. Generation</h4>
              <p className="text-slate-300 leading-relaxed">Generazione di risposte personalizzate basate sulla personalità selezionata</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;