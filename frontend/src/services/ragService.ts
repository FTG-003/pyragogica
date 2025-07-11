// Rimuovo import fs, path e override del systemPrompt

export interface APIProvider {
  id: string;
  name: string;
  baseUrl: string;
  models: ModelInfo[];
  keyFormat: string;
  description: string;
  requiresKey: boolean;
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  free: boolean;
  contextWindow: number;
  description: string;
  pricing?: {
    input: number;
    output: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  personality?: string;
  timestamp: Date;
  sources?: RetrievedSource[];
  tokens?: {
    input: number;
    output: number;
    cost: number;
  };
  sessionId: string;
}

export interface RetrievedSource {
  id: string;
  title: string;
  chapter?: string;
  content: string;
  similarity: number;
  metadata: {
    author: string;
    page?: string;
    section?: string;
    source?: string;
    language?: string;
    version?: string;
  };
}

export interface PersonalityConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  style: {
    tone: string;
    approach: string;
    examples: string[];
  };
}

export interface UserSession {
  sessionId: string;
  userId?: string;
  apiKeys: Record<string, string>;
  selectedProvider: string;
  selectedModel: string;
  conversationHistory: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
}

// OpenRouter Models with Free Tier Identification
export const OPENROUTER_MODELS: ModelInfo[] = [
  // Free Models
  {
    id: 'microsoft/phi-3-mini-128k-instruct:free',
    name: 'Phi-3 Mini 128K',
    provider: 'openrouter',
    free: true,
    contextWindow: 128000,
    description: 'Microsoft\'s efficient small model - Free tier',
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'microsoft/phi-3-medium-128k-instruct:free',
    name: 'Phi-3 Medium 128K',
    provider: 'openrouter',
    free: true,
    contextWindow: 128000,
    description: 'Microsoft\'s balanced model - Free tier',
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'google/gemma-7b-it:free',
    name: 'Gemma 7B',
    provider: 'openrouter',
    free: true,
    contextWindow: 8192,
    description: 'Google\'s open model - Free tier',
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'meta-llama/llama-3-8b-instruct:free',
    name: 'Llama 3 8B',
    provider: 'openrouter',
    free: true,
    contextWindow: 8192,
    description: 'Meta\'s efficient model - Free tier',
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B',
    provider: 'openrouter',
    free: true,
    contextWindow: 32768,
    description: 'Mistral\'s instruction-tuned model - Free tier',
    pricing: { input: 0, output: 0 }
  },
  // Premium Models
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'openrouter',
    free: false,
    contextWindow: 128000,
    description: 'OpenAI\'s most capable model',
    pricing: { input: 0.005, output: 0.015 }
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openrouter',
    free: false,
    contextWindow: 128000,
    description: 'OpenAI\'s efficient model',
    pricing: { input: 0.00015, output: 0.0006 }
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'openrouter',
    free: false,
    contextWindow: 200000,
    description: 'Anthropic\'s most capable model',
    pricing: { input: 0.003, output: 0.015 }
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    provider: 'openrouter',
    free: false,
    contextWindow: 2000000,
    description: 'Google\'s advanced model with huge context',
    pricing: { input: 0.00125, output: 0.005 }
  }
];

export const API_PROVIDERS: APIProvider[] = [
  {
    id: 'flowise',
    name: 'Flowise',
    baseUrl: 'https://flowise.pyragogy.org/api/v1',
    models: [
      {
        id: '9c4a9fce-a2dd-4e4f-a4b7-1bc72b9b9191',
        name: 'Piragogica Chatflow',
        provider: 'flowise',
        free: true,
        contextWindow: 16000,
        description: 'Flowise RAG Chatflow (Peeragogy, PDF, ecc.)'
      }
    ],
    keyFormat: '',
    description: 'Flowise RAG API (no API key richiesta)',
    requiresKey: false
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: [
      {
        id: 'mistralai/mistral-7b-instruct:free',
        name: 'Mistral 7B',
        provider: 'openrouter',
        free: true,
        contextWindow: 32768,
        description: 'Mistral 7B (open, gratuito)'
      }
    ],
    keyFormat: 'sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'OpenRouter (richiede API key, supporta Mistral 7B)',
    requiresKey: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'openai',
        free: false,
        contextWindow: 128000,
        description: 'OpenAI GPT-4o (top quality, richiede API key)',
        pricing: { input: 0.005, output: 0.015 }
      }
    ],
    keyFormat: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'OpenAI GPT-4o (richiede API key)',
    requiresKey: true
  }
];

// Import AI personalities
import { academicPersonality } from '../ai-prompts/academic';
import { divulgativePersonality } from '../ai-prompts/divulgative';
import { criticalPersonality } from '../ai-prompts/critical';
import { socraticPersonality } from '../ai-prompts/socratic';

export const PERSONALITIES: PersonalityConfig[] = [
  academicPersonality,
  divulgativePersonality,
  criticalPersonality,
  socraticPersonality
];

export class RAGService {
  private currentSession: UserSession;
  private sessionStorage: Map<string, UserSession> = new Map();

  constructor() {
    this.currentSession = this.createNewSession();
    this.loadSessionFromStorage();
  }

  private createNewSession(): UserSession {
    const sessionId = this.generateSessionId();
    return {
      sessionId,
      apiKeys: {},
      selectedProvider: 'openrouter',
      selectedModel: 'microsoft/phi-3-mini-128k-instruct:free',
      conversationHistory: [],
      createdAt: new Date(),
      lastActivity: new Date()
    };
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private loadSessionFromStorage() {
    try {
      const savedSession = localStorage.getItem('rag_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        this.currentSession = {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastActivity: new Date(parsed.lastActivity),
          conversationHistory: parsed.conversationHistory.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        };
      }
    } catch (error) {
      console.warn('Failed to load session from storage:', error);
      this.currentSession = this.createNewSession();
    }
  }

  private saveSessionToStorage() {
    try {
      this.currentSession.lastActivity = new Date();
      localStorage.setItem('rag_session', JSON.stringify(this.currentSession));
    } catch (error) {
      console.warn('Failed to save session to storage:', error);
    }
  }

  // API Key Management
  setAPIKey(provider: string, apiKey: string): boolean {
    if (!apiKey || apiKey.trim().length === 0) {
      return false;
    }

    // Validate API key format
    const providerConfig = API_PROVIDERS.find(p => p.id === provider);
    if (!providerConfig) {
      return false;
    }

    // Store encrypted in production (for now, just store directly)
    this.currentSession.apiKeys[provider] = apiKey.trim();
    this.saveSessionToStorage();
    return true;
  }

  getAPIKey(provider: string): string | null {
    return this.currentSession.apiKeys[provider] || null;
  }

  removeAPIKey(provider: string): void {
    delete this.currentSession.apiKeys[provider];
    this.saveSessionToStorage();
  }

  // Provider and Model Selection
  setProvider(providerId: string): boolean {
    const provider = API_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return false;

    this.currentSession.selectedProvider = providerId;
    // Auto-select first free model if available
    const freeModel = provider.models.find(m => m.free);
    if (freeModel) {
      this.currentSession.selectedModel = freeModel.id;
    } else {
      this.currentSession.selectedModel = provider.models[0]?.id || '';
    }
    
    this.saveSessionToStorage();
    return true;
  }

  setModel(modelId: string): boolean {
    const provider = API_PROVIDERS.find(p => p.id === this.currentSession.selectedProvider);
    if (!provider) return false;

    const model = provider.models.find(m => m.id === modelId);
    if (!model) return false;

    this.currentSession.selectedModel = modelId;
    this.saveSessionToStorage();
    return true;
  }

  getCurrentProvider(): APIProvider | null {
    return API_PROVIDERS.find(p => p.id === this.currentSession.selectedProvider) || null;
  }

  getCurrentModel(): ModelInfo | null {
    const provider = this.getCurrentProvider();
    if (!provider) return null;
    return provider.models.find(m => m.id === this.currentSession.selectedModel) || null;
  }

  getFreeModels(): ModelInfo[] {
    return OPENROUTER_MODELS.filter(model => model.free);
  }

  // Session Management
  getSessionId(): string {
    return this.currentSession.sessionId;
  }

  clearSession(): void {
    this.currentSession = this.createNewSession();
    localStorage.removeItem('rag_session');
  }

  getConversationHistory(): ChatMessage[] {
    return this.currentSession.conversationHistory;
  }

  addMessageToHistory(message: ChatMessage): void {
    message.sessionId = this.currentSession.sessionId;
    this.currentSession.conversationHistory.push(message);
    this.saveSessionToStorage();
  }

  clearConversationHistory(): void {
    this.currentSession.conversationHistory = [];
    this.saveSessionToStorage();
  }

  // System Status
  getSystemStatus(): {
    configured: boolean;
    provider: string;
    model: string;
    hasApiKey: boolean;
    modelIsFree: boolean;
    sessionId: string;
  } {
    const provider = this.getCurrentProvider();
    const model = this.getCurrentModel();
    const hasApiKey = !!this.getAPIKey(this.currentSession.selectedProvider);

    return {
      configured: !!provider && !!model && hasApiKey,
      provider: provider?.name || 'None',
      model: model?.name || 'None',
      hasApiKey,
      modelIsFree: model?.free || false,
      sessionId: this.currentSession.sessionId
    };
  }

  // Main RAG Generation with Real Content
  async generateResponse(
    query: string,
    personalityId: string
  ): Promise<{
    response: string;
    sources: any[];
    tokens?: { input: number; output: number; cost: number };
  }> {
    const status = this.getSystemStatus();
    if (!status.configured) {
      throw new Error('Sistema non configurato. Inserisci una API key valida e seleziona un modello.');
    }

    const personality = PERSONALITIES.find(p => p.id === personalityId);
    if (!personality) {
      throw new Error(`Personalità "${personalityId}" non trovata.`);
    }

    // Inoltra la domanda direttamente al provider (es. Flowise) senza retrieval locale
    const responseObj = await this.callAIAPI(query, personality);
    // Si assume che la risposta possa includere fonti già formattate dal provider
    // Adatta la struttura se necessario
    return {
      response: responseObj.text || responseObj.answer || responseObj.response || '',
      sources: responseObj.sources || [],
      tokens: responseObj.tokens || undefined
    };
  }

  private async callAIAPI(prompt: string, personality: PersonalityConfig): Promise<{
    text?: string;
    answer?: string;
    response?: string;
    sources?: any[];
    tokens?: { input: number; output: number; cost: number };
  }> {
    const provider = this.getCurrentProvider();
    const model = this.getCurrentModel();
    const apiKey = this.getAPIKey(this.currentSession.selectedProvider);

    if (!provider || !model) {
      throw new Error('Configurazione API incompleta');
    }

    try {
      let response: Response;

      if (provider.id === 'flowise') {
        // Forza sempre l'uso del proxy backend
        let data;
        response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/ai/flowise`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: prompt, persona: personality.name })
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Risposta non JSON dal backend Flowise:', text);
          throw new Error('Risposta non valida dal backend Flowise. Controlla i log o la connessione.');
        }
        data = await response.json();
        if (!response.ok) {
          throw new Error(`Flowise API Error ${response.status}: ${data.error || 'Unknown error'}`);
        }
        return {
          text: data.text || data.answer || 'Nessuna risposta generata',
          sources: data.sources || [],
          tokens: data.tokens || undefined
        };
      } else if (provider.id === 'openrouter') {
        // Proxy backend per OpenRouter
        let data;
        response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/ai/openrouter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
          },
          body: JSON.stringify({
            model: model.id,
            messages: [
              { role: 'system', content: prompt }
            ],
            temperature: personality.temperature,
            max_tokens: personality.maxTokens
          })
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Risposta non JSON dal backend OpenRouter:', text);
          throw new Error('Risposta non valida dal backend OpenRouter. Controlla i log o la connessione.');
        }
        data = await response.json();
        if (!response.ok) {
          throw new Error(`OpenRouter API Error ${response.status}: ${data.error || 'Unknown error'}`);
        }
        return {
          text: data.choices?.[0]?.message?.content || 'Nessuna risposta generata',
          sources: data.sources || [],
          tokens: data.tokens || undefined
        };
      } else if (provider.id === 'openai') {
        // Proxy backend per OpenAI
        let data;
        response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/ai/openai`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
          },
          body: JSON.stringify({
            model: model.id,
            messages: [
              { role: 'system', content: prompt }
            ],
            temperature: personality.temperature,
            max_tokens: personality.maxTokens
          })
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Risposta non JSON dal backend OpenAI:', text);
          throw new Error('Risposta non valida dal backend OpenAI. Controlla i log o la connessione.');
        }
        data = await response.json();
        if (!response.ok) {
          throw new Error(`OpenAI API Error ${response.status}: ${data.error || 'Unknown error'}`);
        }
        return {
          text: data.choices?.[0]?.message?.content || 'Nessuna risposta generata',
          sources: data.sources || [],
          tokens: data.tokens || undefined
        };
      } else if (provider.id === 'anthropic') {
        // Proxy backend per Anthropic
        let data;
        response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/ai/anthropic`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
          },
          body: JSON.stringify({
            model: model.id,
            max_tokens: personality.maxTokens,
            temperature: personality.temperature,
            messages: [
              { role: 'user', content: prompt }
            ]
          })
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Risposta non JSON dal backend Anthropic:', text);
          throw new Error('Risposta non valida dal backend Anthropic. Controlla i log o la connessione.');
        }
        data = await response.json();
        if (!response.ok) {
          throw new Error(`Anthropic API Error ${response.status}: ${data.error || 'Unknown error'}`);
        }
        return {
          text: data.content?.[0]?.text || 'Nessuna risposta generata',
          sources: data.sources || [],
          tokens: data.tokens || undefined
        };
      } else {
        throw new Error(`Provider ${provider.id} non supportato`);
      }

    } catch (error) {
      console.error('AI API Error:', error);
      throw new Error(`Errore nella chiamata API: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
    }
  }

  private calculateCost(inputLength: number, outputLength: number): number {
    const model = this.getCurrentModel();
    if (!model || model.free || !model.pricing) return 0;

    const inputTokens = Math.ceil(inputLength / 4);
    const outputTokens = Math.ceil(outputLength / 4);

    return (inputTokens / 1000) * model.pricing.input + (outputTokens / 1000) * model.pricing.output;
  }

  // Enhanced Command System
  parseCommand(message: string): { isCommand: boolean; command?: string; args?: string[] } {
    if (!message.startsWith('/')) {
      return { isCommand: false };
    }

    const parts = message.slice(1).split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    return { isCommand: true, command, args };
  }

  async handleCommand(command: string, args: string[]): Promise<string> {
    switch (command) {
      case 'status':
        const status = this.getSystemStatus();
        return `📊 **Stato Sistema RAG**

**Configurazione:**
• Provider: ${status.provider}
• Modello: ${status.model} ${status.modelIsFree ? '(GRATUITO)' : '(A PAGAMENTO)'}
• API Key: ${status.hasApiKey ? '✅ Configurata' : '❌ Mancante'}
• Sistema: ${status.configured ? '✅ Operativo' : '⚠️ Richiede configurazione'}

�� Sessione:
• ID: \`${status.sessionId}\`
• Cronologia: ${this.getConversationHistory().length} messaggi
${status.configured ? '**🚀 Sistema pronto!**' : '**⚙️ Configura API key per iniziare**'}`;

      case 'providers':
        return `🔌 **Provider AI Disponibili**

${API_PROVIDERS.map(provider => {
  const freeModels = provider.models.filter(m => m.free).length;
  const totalModels = provider.models.length;
  return `**${provider.name}**
• Modelli: ${totalModels} (${freeModels} gratuiti)
• Formato chiave: \`${provider.keyFormat}\`
• ${provider.description}
`;
}).join('\n')}

**🆓 Modelli Gratuiti Raccomandati:**
${this.getFreeModels().map(model => `• **${model.name}** - ${model.description}`).join('\n')}

Usa l'interfaccia per configurare provider e modelli!`;

      case 'models':
        const currentProvider = this.getCurrentProvider();
        if (!currentProvider) {
          return '❌ Nessun provider selezionato';
        }

        return `🤖 **Modelli Disponibili - ${currentProvider.name}**

**🆓 Modelli Gratuiti:**
${currentProvider.models.filter(m => m.free).map(model => 
  `• **${model.name}** (${model.contextWindow.toLocaleString()} token context)
  ${model.description}`
).join('\n')}

**💰 Modelli Premium:**
${currentProvider.models.filter(m => !m.free).map(model => 
  `• **${model.name}** (${model.contextWindow.toLocaleString()} token context)
  ${model.description}
  Costo: $${model.pricing?.input}/1K input, $${model.pricing?.output}/1K output`
).join('\n')}

Seleziona un modello dall'interfaccia di configurazione!`;

      case 'clear':
        this.clearConversationHistory();
        return '🗑️ **Cronologia conversazione cancellata**\n\nLa cronologia è stata rimossa dalla sessione corrente.';

      case 'session':
        return `📱 **Informazioni Sessione**

**ID Sessione:** \`${this.getSessionId()}\`
**Creata:** ${this.currentSession.createdAt.toLocaleString()}
**Ultima attività:** ${this.currentSession.lastActivity.toLocaleString()}
**Messaggi:** ${this.getConversationHistory().length}
**Provider:** ${this.currentSession.selectedProvider}
**Modello:** ${this.currentSession.selectedModel}

Ogni sessione mantiene la propria cronologia e configurazione separate.`;

      case 'help':
        return `🤖 **Sistema RAG Pyragogico - Guida Completa**

**⚙️ Configurazione:**
• Usa l'interfaccia per inserire le tue API key
• Seleziona provider e modello preferiti
• Scegli una personalità AI

**💬 Comandi Sistema:**
• \`/status\` - Stato configurazione
• \`/providers\` - Lista provider disponibili
• \`/models\` - Modelli del provider corrente
• \`/clear\` - Cancella cronologia conversazione
• \`/session\` - Info sessione corrente
• \`/help\` - Questa guida

**🆓 Modelli Gratuiti:**
Usa OpenRouter con modelli gratuiti per testing senza costi!

**🔐 Sicurezza:**
• Le API key sono memorizzate localmente nel browser
• Ogni sessione ha un ID univoco
• Nessun dato viene condiviso tra sessioni

**🚀 Per iniziare:**
1. Configura una API key nell'interfaccia
2. Seleziona un modello (consigliati quelli gratuiti)
3. Fai una domanda!

**💡 Esempi di domande:**
• "Spiegami i principi fondamentali della peeragogy"
• "Come funziona il pattern Wrapper?"
• "Raccontami del caso studio 5PH1NX"
• "Quali sono le strategie per la motivazione?"`;

      default:
        return `❌ **Comando non riconosciuto:** \`/${command}\`

**Comandi disponibili:**
• \`/status\` - Stato sistema
• \`/providers\` - Lista provider
• \`/models\` - Modelli disponibili
• \`/clear\` - Cancella cronologia
• \`/session\` - Info sessione
• \`/help\` - Guida completa

Usa \`/help\` per la guida completa! 🤖`;
    }
  }
}

export const ragService = new RAGService();