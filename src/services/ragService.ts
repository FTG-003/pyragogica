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

// Import vector store
import { searchVectorStore, getVectorStoreStats } from '../data/vectorStore';

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
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: OPENROUTER_MODELS,
    keyFormat: 'sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Access to multiple AI models including free options',
    requiresKey: true
  },
  {
    id: 'openai',
    name: 'OpenAI Direct',
    baseUrl: 'https://api.openai.com/v1',
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'openai',
        free: false,
        contextWindow: 128000,
        description: 'Most capable GPT model',
        pricing: { input: 0.005, output: 0.015 }
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'openai',
        free: false,
        contextWindow: 128000,
        description: 'Efficient and cost-effective',
        pricing: { input: 0.00015, output: 0.0006 }
      }
    ],
    keyFormat: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Direct access to OpenAI models',
    requiresKey: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    models: [
      {
        id: 'claude-3-5-sonnet-20241022',
        name: 'Claude 3.5 Sonnet',
        provider: 'anthropic',
        free: false,
        contextWindow: 200000,
        description: 'Most capable Claude model',
        pricing: { input: 0.003, output: 0.015 }
      }
    ],
    keyFormat: 'sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Direct access to Claude models',
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

  // Enhanced Vector Store Integration
  private async queryVectorStore(query: string, topK: number = 3): Promise<RetrievedSource[]> {
    try {
      // Use the real vector store with Peeragogy V3 content
      const results = searchVectorStore(query, topK);
      
      return results.map(doc => ({
        id: doc.id,
        title: doc.metadata.title,
        chapter: doc.metadata.chapter,
        content: doc.content,
        similarity: doc.score || 0.8, // Use computed score
        metadata: {
          author: doc.metadata.author,
          page: doc.metadata.page,
          section: doc.metadata.section,
          source: doc.metadata.source,
          language: doc.metadata.language,
          version: doc.metadata.version
        }
      }));
    } catch (error) {
      console.error('Error querying vector store:', error);
      return [];
    }
  }

  // Main RAG Generation with Real Content
  async generateResponse(
    query: string,
    personalityId: string
  ): Promise<{
    response: string;
    sources: RetrievedSource[];
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

    // Retrieve relevant sources from real Peeragogy content
    const sources = await this.queryVectorStore(query);
    if (sources.length === 0) {
      throw new Error('Nessuna fonte rilevante trovata nel Peeragogy Handbook per questa domanda.');
    }

    // Build RAG prompt with real content
    const sourceContext = sources.map(source => 
      `[${source.title} - ${source.chapter}]
${source.content}
(Autore: ${source.metadata.author}, Pagina: ${source.metadata.page}, Versione: ${source.metadata.version})`
    ).join('\n\n');

    const ragPrompt = `${personality.systemPrompt}

CONTESTO DAL PEERAGOGY HANDBOOK V3 (CONTENUTO REALE):
${sourceContext}

DOMANDA DELL'UTENTE: ${query}

Rispondi alla domanda utilizzando le informazioni fornite dal contesto del Peeragogy Handbook V3, mantenendo la personalità ${personality.name} (${personality.emoji}). Cita sempre le fonti specifiche quando possibile.`;

    // Call AI API
    const response = await this.callAIAPI(ragPrompt, personality);

    const tokens = {
      input: Math.ceil(ragPrompt.length / 4),
      output: Math.ceil(response.length / 4),
      cost: this.calculateCost(ragPrompt.length, response.length)
    };

    return { response, sources, tokens };
  }

  private async callAIAPI(prompt: string, personality: PersonalityConfig): Promise<string> {
    const provider = this.getCurrentProvider();
    const model = this.getCurrentModel();
    const apiKey = this.getAPIKey(this.currentSession.selectedProvider);

    if (!provider || !model || !apiKey) {
      throw new Error('Configurazione API incompleta');
    }

    try {
      let response: Response;

      if (provider.id === 'openrouter') {
        response = await fetch(`${provider.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Pyragogica RAG System'
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
      } else if (provider.id === 'openai') {
        response = await fetch(`${provider.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
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
      } else if (provider.id === 'anthropic') {
        response = await fetch(`${provider.baseUrl}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
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
      } else {
        throw new Error(`Provider ${provider.id} non supportato`);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      if (provider.id === 'anthropic') {
        return data.content[0]?.text || 'Nessuna risposta generata';
      } else {
        return data.choices[0]?.message?.content || 'Nessuna risposta generata';
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
        const vectorStats = getVectorStoreStats();
        
        return `📊 **Stato Sistema RAG con Contenuti Reali**

**🔐 Configurazione:**
• Provider: ${status.provider}
• Modello: ${status.model} ${status.modelIsFree ? '(GRATUITO)' : '(A PAGAMENTO)'}
• API Key: ${status.hasApiKey ? '✅ Configurata' : '❌ Mancante'}
• Sistema: ${status.configured ? '✅ Operativo' : '⚠️ Richiede configurazione'}

**📚 Vector Store (Contenuti Reali):**
• Documenti: ${vectorStats.totalDocuments} dal Peeragogy Handbook V3
• Lingue: ${vectorStats.languages.join(', ')}
• Versioni: ${vectorStats.versions.join(', ')}
• Capitoli: ${vectorStats.chapters.length}
• Autori: ${vectorStats.authors.length}

**🎭 Personalità disponibili:** ${PERSONALITIES.length}
• 🎓 Accademico • 💡 Divulgatore • 🧠 Critico • 🤔 Socratico

**📱 Sessione:**
• ID: \`${status.sessionId}\`
• Cronologia: ${this.getConversationHistory().length} messaggi

${status.configured ? '**🚀 Sistema pronto con contenuti reali del Peeragogy Handbook V3!**' : '**⚙️ Configura API key per iniziare**'}`;

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

      case 'vectorstore':
        const stats = getVectorStoreStats();
        return `📚 **Vector Store - Peeragogy Handbook V3**

**📊 Statistiche:**
• **Documenti totali:** ${stats.totalDocuments}
• **Lingue:** ${stats.languages.join(', ')}
• **Versioni:** ${stats.versions.join(', ')}
• **Capitoli:** ${stats.chapters.length}
• **Autori:** ${stats.authors.length}

**📖 Capitoli disponibili:**
${stats.chapters.map(chapter => `• ${chapter}`).join('\n')}

**✍️ Autori principali:**
${stats.authors.map(author => `• ${author}`).join('\n')}

**🔍 Contenuti indicizzati:**
Il vector store contiene contenuti reali estratti dal PDF del Peeragogy Handbook V3, inclusi:
- Introduzione ai principi della peeragogy
- Motivazione e psicologia dell'apprendimento
- Case study 5PH1NX dettagliato
- Pattern e casi d'uso pratici
- Guida all'implementazione

Tutti i contenuti sono semanticamente indicizzati per ricerca intelligente!`;

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
• \`/status\` - Stato configurazione e vector store
• \`/providers\` - Lista provider disponibili
• \`/models\` - Modelli del provider corrente
• \`/vectorstore\` - Info contenuti Peeragogy V3
• \`/clear\` - Cancella cronologia conversazione
• \`/session\` - Info sessione corrente
• \`/help\` - Questa guida

**📚 Contenuti Reali:**
Il sistema ora include contenuti reali estratti dal Peeragogy Handbook V3:
- 10+ documenti semanticamente indicizzati
- Contenuti originali in inglese
- Citazioni precise con pagine e autori
- Ricerca intelligente nei contenuti

**🆓 Modelli Gratuiti:**
Usa OpenRouter con modelli gratuiti per testing senza costi!

**🔐 Sicurezza:**
• Le API key sono memorizzate localmente nel browser
• Ogni sessione ha un ID univoco
• Nessun dato viene condiviso tra sessioni

**🚀 Per iniziare:**
1. Configura una API key nell'interfaccia
2. Seleziona un modello (consigliati quelli gratuiti)
3. Fai una domanda sul Peeragogy Handbook!

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
• \`/vectorstore\` - Info contenuti reali
• \`/clear\` - Cancella cronologia
• \`/session\` - Info sessione
• \`/help\` - Guida completa

Usa \`/help\` per la guida completa! 🤖`;
    }
  }
}

export const ragService = new RAGService();