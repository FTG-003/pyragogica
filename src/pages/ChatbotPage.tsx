import React, { useState } from 'react';
import { Send, Brain, User, BookOpen, Lightbulb, MessageCircle, Zap } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Benvenuto nell\'AI Assistant Pyragogico! Seleziona una personalità per iniziare la conversazione.',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('academic');

  const personalities = [
    {
      id: 'academic',
      name: 'Accademico',
      icon: BookOpen,
      description: 'Rigoroso, metodico, basato su evidenze scientifiche',
      color: 'from-blue-500 to-indigo-500',
      sample: 'Analizza questo concetto dal punto di vista teorico e metodologico...'
    },
    {
      id: 'divulgative',
      name: 'Divulgatore',
      icon: Lightbulb,
      description: 'Semplice, coinvolgente, orientato alla comprensione pratica',
      color: 'from-green-500 to-teal-500',
      sample: 'Spiegami questo argomento come se fossi un principiante...'
    },
    {
      id: 'critical',
      name: 'Critico',
      icon: Brain,
      description: 'Analitico, questionante, stimola il pensiero critico',
      color: 'from-purple-500 to-pink-500',
      sample: 'Quali sono i punti deboli di questa teoria? Cosa manca?'
    },
    {
      id: 'socratic',
      name: 'Socratico',
      icon: MessageCircle,
      description: 'Utilizza domande per guidare la scoperta autonoma',
      color: 'from-orange-500 to-red-500',
      sample: 'Invece di darti la risposta, lascia che ti guidi con domande...'
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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue
    };

    const personality = personalities.find(p => p.id === selectedPersonality);
    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      content: `[${personality?.name}] Interessante domanda! In modalità ${personality?.name.toLowerCase()}, potrei approfondire questo aspetto considerando...`,
      personality: selectedPersonality
    };

    setMessages([...messages, newUserMessage, botResponse]);
    setInputValue('');
  };

  const getCurrentPersonality = () => personalities.find(p => p.id === selectedPersonality);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">AI Assistant Pyragogico</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Interagisci con l'intelligenza artificiale attraverso diverse personalità pedagogiche. 
          Ogni modalità offre un approccio unico all'apprendimento e alla scoperta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Personality Selector */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Personalità AI</h3>
          <div className="space-y-3">
            {personalities.map((personality) => {
              const Icon = personality.icon;
              return (
                <button
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedPersonality === personality.id
                      ? 'bg-white shadow-lg ring-2 ring-indigo-500'
                      : 'bg-slate-50 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${personality.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900">{personality.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{personality.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Examples */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Esempi di Conversazione</h4>
            <div className="space-y-3">
              {sampleConversations.map((sample, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-xs font-medium text-slate-500 mb-2">
                    {personalities.find(p => p.id === sample.personality)?.name}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-700 font-medium">
                      Q: {sample.messages[0].content}
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-3">
                      A: {sample.messages[1].content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getCurrentPersonality()?.color}`}>
                  {React.createElement(getCurrentPersonality()?.icon || Brain, { className: "w-5 h-5 text-white" })}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Modalità {getCurrentPersonality()?.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {getCurrentPersonality()?.description}
                  </p>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${
                      message.type === 'user' 
                        ? 'bg-indigo-600' 
                        : message.type === 'system'
                        ? 'bg-slate-400'
                        : `bg-gradient-to-r ${getCurrentPersonality()?.color}`
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : message.type === 'system' ? (
                        <Zap className="w-4 h-4 text-white" />
                      ) : (
                        React.createElement(getCurrentPersonality()?.icon || Brain, { className: "w-4 h-4 text-white" })
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : message.type === 'system'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-slate-100 text-slate-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder={`Scrivi una domanda per la modalità ${getCurrentPersonality()?.name}...`}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Invia</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RAG System Visualization */}
      <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Sistema RAG in Azione</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold mb-2">1. Retrieval</h4>
            <p className="text-slate-300 text-sm">Ricerca semantica nei contenuti della biblioteca</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold mb-2">2. Augmentation</h4>
            <p className="text-slate-300 text-sm">Arricchimento del contesto con conoscenze rilevanti</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold mb-2">3. Generation</h4>
            <p className="text-slate-300 text-sm">Generazione di risposte personalizzate e contestuali</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;