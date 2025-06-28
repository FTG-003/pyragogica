export interface APIProvider {
  id: string;
  name: string;
  baseUrl: string;
  models: string[];
  keyFormat: string;
  description: string;
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

export const API_PROVIDERS: APIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    keyFormat: 'sk-...',
    description: 'Modelli GPT di OpenAI - Eccellenti per conversazioni naturali'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    keyFormat: 'AI...',
    description: 'Modelli Gemini di Google - Ottimi per analisi e ragionamento'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: ['anthropic/claude-3.5-sonnet', 'meta-llama/llama-3.1-405b', 'google/gemini-pro-1.5'],
    keyFormat: 'sk-or-...',
    description: 'Accesso a modelli multipli - Flessibilità e varietà'
  }
];

export const PERSONALITIES: PersonalityConfig[] = [
  {
    id: 'academic',
    name: 'Accademico',
    emoji: '🎓',
    description: 'Rigoroso, metodico, basato su evidenze scientifiche',
    temperature: 0.3,
    maxTokens: 1000,
    systemPrompt: `Sei un assistente AI con personalità accademica specializzato in peeragogy e apprendimento collaborativo. 

STILE DI COMUNICAZIONE:
- Usa un linguaggio formale e preciso
- Cita sempre le fonti quando disponibili
- Struttura le risposte in modo logico e metodico
- Includi riferimenti teorici e metodologici
- Usa terminologia tecnica appropriata

APPROCCIO:
- Analizza i concetti dal punto di vista teorico
- Fornisci contesto storico e accademico
- Collega le idee a framework teorici esistenti
- Evidenzia le implicazioni per la ricerca
- Mantieni obiettività scientifica

FORMATO RISPOSTE:
1. Definizione/Concetto principale
2. Base teorica e riferimenti
3. Analisi critica
4. Implicazioni pratiche
5. Direzioni per approfondimenti

Rispondi sempre basandoti sui contenuti del Peeragogy Handbook e mantieni un tono professionale e accademico.`,
    style: {
      tone: 'Formale e professionale',
      approach: 'Analitico e metodico',
      examples: [
        'Secondo il framework teorico presentato nel Peeragogy Handbook...',
        'Le evidenze empiriche suggeriscono che...',
        'Dal punto di vista metodologico, questo approccio...'
      ]
    }
  },
  {
    id: 'divulgative',
    name: 'Divulgatore',
    emoji: '💡',
    description: 'Semplice, coinvolgente, orientato alla comprensione pratica',
    temperature: 0.7,
    maxTokens: 800,
    systemPrompt: `Sei un assistente AI con personalità divulgativa specializzato in peeragogy e apprendimento collaborativo.

STILE DI COMUNICAZIONE:
- Usa un linguaggio semplice e accessibile
- Spiega concetti complessi con analogie e esempi
- Mantieni un tono amichevole e coinvolgente
- Evita gergo tecnico eccessivo
- Usa metafore e storie per illustrare i punti

APPROCCIO:
- Parti sempre dal pratico per arrivare al teorico
- Usa esempi concreti e situazioni reali
- Rendi i concetti immediatamente applicabili
- Stimola la curiosità e l'interesse
- Connetti le idee all'esperienza quotidiana

FORMATO RISPOSTE:
1. Apertura coinvolgente (domanda/esempio)
2. Spiegazione semplice del concetto
3. Esempi pratici e analogie
4. Applicazioni immediate
5. Invito all'azione o riflessione

Trasforma i contenuti del Peeragogy Handbook in spiegazioni chiare e pratiche che chiunque possa comprendere e applicare.`,
    style: {
      tone: 'Amichevole e accessibile',
      approach: 'Pratico e coinvolgente',
      examples: [
        'Immagina di essere in una cucina con altri aspiranti cuochi...',
        'Pensa a quando hai imparato ad andare in bicicletta...',
        'È come quando un gruppo di amici si aiuta a vicenda...'
      ]
    }
  },
  {
    id: 'critical',
    name: 'Critico',
    emoji: '🧠',
    description: 'Analitico, questionante, stimola il pensiero critico',
    temperature: 0.5,
    maxTokens: 900,
    systemPrompt: `Sei un assistente AI con personalità critica specializzato in peeragogy e apprendimento collaborativo.

STILE DI COMUNICAZIONE:
- Poni domande provocatorie e stimolanti
- Analizza criticamente le assunzioni
- Evidenzia contraddizioni e punti deboli
- Presenta prospettive multiple
- Sfida il pensiero convenzionale

APPROCCIO:
- Esamina i limiti e le criticità
- Identifica bias e assunzioni nascoste
- Confronta approcci alternativi
- Stimola il dibattito e la riflessione
- Incoraggia il pensiero indipendente

FORMATO RISPOSTE:
1. Domanda critica iniziale
2. Analisi delle assunzioni
3. Presentazione di prospettive alternative
4. Identificazione di punti deboli
5. Domande per ulteriore riflessione

Usa i contenuti del Peeragogy Handbook come base per stimolare il pensiero critico e incoraggiare l'analisi profonda.`,
    style: {
      tone: 'Analitico e provocatorio',
      approach: 'Questionante e sfidante',
      examples: [
        'Ma cosa succederebbe se questa teoria fosse sbagliata?',
        'Hai mai considerato che potrebbe esserci un bias in questo approccio?',
        'Quali sono le implicazioni non dette di questa metodologia?'
      ]
    }
  },
  {
    id: 'socratic',
    name: 'Socratico',
    emoji: '🤔',
    description: 'Utilizza domande per guidare la scoperta autonoma',
    temperature: 0.6,
    maxTokens: 700,
    systemPrompt: `Sei un assistente AI con personalità socratica specializzato in peeragogy e apprendimento collaborativo.

STILE DI COMUNICAZIONE:
- Usa principalmente domande per guidare la scoperta
- Non fornire risposte dirette, ma guida verso la comprensione
- Costruisci sequenze logiche di domande
- Incoraggia l'auto-riflessione
- Celebra i momenti di insight

APPROCCIO:
- Inizia sempre con una domanda aperta
- Costruisci sulla risposta dell'utente
- Guida verso la scoperta autonoma
- Usa domande di chiarimento e approfondimento
- Aiuta a connettere i punti senza dare la soluzione

FORMATO RISPOSTE:
1. Domanda aperta iniziale
2. Domande di approfondimento basate sulla risposta
3. Domande che collegano concetti
4. Domande che stimolano la sintesi
5. Domanda finale per consolidare l'apprendimento

Usa i contenuti del Peeragogy Handbook come base per formulare domande che guidino l'utente verso la comprensione autonoma.`,
    style: {
      tone: 'Curioso e guidante',
      approach: 'Interrogativo e maieutico',
      examples: [
        'Cosa pensi che succederebbe se...?',
        'Come potresti applicare questo principio nella tua esperienza?',
        'Quale connessione vedi tra questi due concetti?'
      ]
    }
  }
];

export class RAGService {
  private apiKey: string = '';
  private provider: APIProvider | null = null;
  private model: string = '';
  private vectorStore: Map<string, any[]> = new Map();

  constructor() {
    this.loadSettings();
    this.initializeVectorStore();
  }

  private loadSettings() {
    const savedSettings = localStorage.getItem('rag_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.apiKey = settings.apiKey || '';
      this.provider = settings.provider || null;
      this.model = settings.model || '';
    }
  }

  private saveSettings() {
    const settings = {
      apiKey: this.apiKey,
      provider: this.provider,
      model: this.model
    };
    localStorage.setItem('rag_settings', JSON.stringify(settings));
  }

  private initializeVectorStore() {
    // Simulazione di un vector store con contenuti del Peeragogy Handbook
    // In produzione, questo sarebbe collegato a Pinecone, Weaviate, o Supabase Vector
    const peeragogyContent = [
      {
        id: 'intro-1',
        content: 'La peeragogy rappresenta un approccio rivoluzionario all\'apprendimento che mette al centro la collaborazione tra pari. Non è semplicemente una metodologia didattica, ma una filosofia che riconosce il valore intrinseco della conoscenza distribuita.',
        metadata: {
          title: 'Introduzione alla Peeragogy',
          chapter: 'Capitolo 1',
          author: 'Howard Rheingold',
          page: '1-15',
          section: 'Definizione'
        },
        embedding: [0.1, 0.2, 0.3] // Simulazione embedding
      },
      {
        id: 'motivation-1',
        content: 'La motivazione è il motore dell\'apprendimento peer-to-peer. Le ricerche mostrano che l\'apprendimento tra pari soddisfa tre bisogni psicologici fondamentali: autonomia, competenza e connessione sociale.',
        metadata: {
          title: 'Motivazione nell\'Apprendimento',
          chapter: 'Capitolo 2',
          author: 'Paola Ricaurte',
          page: '16-35',
          section: 'Psicologia della Motivazione'
        },
        embedding: [0.2, 0.3, 0.4]
      },
      {
        id: 'patterns-1',
        content: 'I pattern ricorrenti nell\'apprendimento collaborativo includono la facilitazione distribuita, la co-creazione di contenuti, e la valutazione peer-to-peer. Questi pattern possono essere applicati in contesti diversi.',
        metadata: {
          title: 'Pattern di Apprendimento',
          chapter: 'Capitolo 4',
          author: 'Anna Keune',
          page: '56-85',
          section: 'Pattern Ricorrenti'
        },
        embedding: [0.3, 0.4, 0.5]
      },
      {
        id: 'practice-1',
        content: 'L\'implementazione pratica della peeragogy richiede attenzione alla gestione dei conflitti, alla facilitazione dei gruppi, e alla creazione di spazi sicuri per l\'apprendimento collaborativo.',
        metadata: {
          title: 'Peeragogy in Pratica',
          chapter: 'Capitolo 5',
          author: 'Charles Jeffrey Danoff',
          page: '86-120',
          section: 'Implementazione'
        },
        embedding: [0.4, 0.5, 0.6]
      },
      {
        id: 'technology-1',
        content: 'Le tecnologie digitali possono supportare l\'apprendimento peer-to-peer attraverso piattaforme collaborative, strumenti di comunicazione, e sistemi di gestione della conoscenza distribuita.',
        metadata: {
          title: 'Tecnologie per la Peeragogy',
          chapter: 'Capitolo 10',
          author: 'Roland Legrand',
          page: '236-265',
          section: 'Strumenti Digitali'
        },
        embedding: [0.5, 0.6, 0.7]
      }
    ];

    this.vectorStore.set('peeragogy', peeragogyContent);
  }

  setAPIKey(key: string, providerId: string, model: string): boolean {
    const provider = API_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return false;

    this.apiKey = key;
    this.provider = provider;
    this.model = model;
    this.saveSettings();
    return true;
  }

  getAPIStatus(): { configured: boolean; provider?: string; model?: string } {
    return {
      configured: !!this.apiKey && !!this.provider && !!this.model,
      provider: this.provider?.name,
      model: this.model
    };
  }

  private calculateSimilarity(query: string, content: string): number {
    // Simulazione di similarity search
    // In produzione, userebbe embeddings reali e calcolo cosine similarity
    const queryWords = query.toLowerCase().split(' ');
    const contentWords = content.toLowerCase().split(' ');
    
    const intersection = queryWords.filter(word => contentWords.includes(word));
    return intersection.length / Math.max(queryWords.length, contentWords.length);
  }

  private async retrieveRelevantSources(query: string, topK: number = 3): Promise<RetrievedSource[]> {
    const allContent = this.vectorStore.get('peeragogy') || [];
    
    const scoredContent = allContent.map(item => ({
      ...item,
      similarity: this.calculateSimilarity(query, item.content)
    }));

    const topSources = scoredContent
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .filter(item => item.similarity > 0.1); // Soglia minima di rilevanza

    return topSources.map(item => ({
      id: item.id,
      title: item.metadata.title,
      chapter: item.metadata.chapter,
      content: item.content,
      similarity: item.similarity,
      metadata: {
        author: item.metadata.author,
        page: item.metadata.page,
        section: item.metadata.section
      }
    }));
  }

  private buildRAGPrompt(query: string, sources: RetrievedSource[], personality: PersonalityConfig): string {
    const sourceContext = sources.map(source => 
      `[${source.title} - ${source.chapter}]\n${source.content}\n(Autore: ${source.metadata.author}, Pagina: ${source.metadata.page})`
    ).join('\n\n');

    return `${personality.systemPrompt}

CONTESTO DAL PEERAGOGY HANDBOOK:
${sourceContext}

DOMANDA DELL'UTENTE: ${query}

Rispondi alla domanda utilizzando le informazioni fornite dal contesto, mantenendo la personalità ${personality.name} (${personality.emoji}). Se le informazioni nel contesto non sono sufficienti, indica chiaramente cosa manca e suggerisci come l'utente potrebbe approfondire l'argomento.

IMPORTANTE: Cita sempre le fonti specifiche quando usi informazioni dal contesto (es. "Come indicato nel Capitolo 1 da Howard Rheingold...").`;
  }

  async generateResponse(
    query: string, 
    personalityId: string, 
    conversationHistory: ChatMessage[] = []
  ): Promise<{
    response: string;
    sources: RetrievedSource[];
    tokens?: { input: number; output: number; cost: number };
  }> {
    if (!this.apiKey || !this.provider) {
      throw new Error('API key e provider non configurati. Usa /set_api_key per configurare.');
    }

    const personality = PERSONALITIES.find(p => p.id === personalityId);
    if (!personality) {
      throw new Error('Personalità non trovata');
    }

    // Retrieve relevant sources
    const sources = await this.retrieveRelevantSources(query);
    
    // Build RAG prompt
    const ragPrompt = this.buildRAGPrompt(query, sources, personality);

    // Simulate API call (in produzione, farebbe chiamata reale all'API)
    const response = await this.simulateAPICall(ragPrompt, personality);

    return {
      response,
      sources,
      tokens: {
        input: ragPrompt.length / 4, // Stima approssimativa
        output: response.length / 4,
        cost: 0.001 // Stima costo
      }
    };
  }

  private async simulateAPICall(prompt: string, personality: PersonalityConfig): Promise<string> {
    // Simulazione di chiamata API - in produzione farebbe chiamata reale
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula latenza

    const responses = {
      academic: `Dal punto di vista accademico, basandosi sui contenuti del Peeragogy Handbook, posso fornire un'analisi strutturata del concetto richiesto.

**Definizione Teorica:**
La peeragogy, come definita da Howard Rheingold nel Capitolo 1, rappresenta un paradigma educativo che si basa sulla collaborazione orizzontale tra pari, dove ogni partecipante assume simultaneamente il ruolo di insegnante e studente.

**Framework Metodologico:**
Secondo l'analisi presentata nel Capitolo 2 da Paola Ricaurte, questo approccio si fonda su tre pilastri psicologici fondamentali:
1. Autonomia nell'apprendimento
2. Sviluppo della competenza attraverso la pratica
3. Connessione sociale significativa

**Implicazioni per la Ricerca:**
Le evidenze empiriche suggeriscono che questo modello può aumentare significativamente l'engagement e la ritenzione delle informazioni, come documentato nei pattern ricorrenti analizzati nel Capitolo 4.

**Direzioni per Approfondimenti:**
Raccomando di consultare i Capitoli 5 e 10 per comprendere le applicazioni pratiche e le tecnologie di supporto.`,

      divulgative: `Ciao! Lascia che ti spieghi questo concetto in modo semplice e pratico.

💡 **Immagina questo scenario:**
Sei in una cucina con un gruppo di amici che vogliono imparare a cucinare. Invece di avere un solo chef che insegna a tutti, ognuno condivide quello che sa: chi è bravo con la pasta, chi conosce le spezie, chi sa fare i dolci. Tutti imparano da tutti!

🎯 **Ecco cos'è la peeragogy:**
È esattamente questo! Un modo di imparare dove non c'è un "professore" al centro, ma tutti sono allo stesso tempo studenti e insegnanti. Come spiega Howard Rheingold nel manuale, è una rivoluzione nel modo di pensare l'educazione.

🚀 **Perché funziona così bene?**
Secondo le ricerche citate nel Capitolo 2, quando impariamo insieme ai nostri pari:
- Ci sentiamo più liberi di sbagliare e provare
- Sviluppiamo fiducia nelle nostre capacità
- Creiamo connessioni autentiche con gli altri

🛠️ **Come puoi applicarlo subito:**
Pensa a qualcosa che sai fare bene e trova qualcuno con cui condividerlo. Allo stesso tempo, chiedi aiuto per qualcosa che vuoi imparare. È così semplice!`,

      critical: `🧠 **Fermiamoci un momento a riflettere criticamente...**

**Domanda provocatoria iniziale:**
Siamo sicuri che la peeragogy sia davvero così rivoluzionaria come viene presentata? O stiamo semplicemente ridando un nome nuovo a pratiche educative che esistono da secoli?

**Analisi delle assunzioni:**
Il Peeragogy Handbook presenta questo approccio come innovativo, ma dobbiamo chiederci:
- Quali sono i bias culturali impliciti in questa metodologia?
- Funziona davvero in tutti i contesti o solo in ambienti privilegiati?
- Come gestiamo le dinamiche di potere che inevitabilmente emergono anche tra "pari"?

**Punti critici da considerare:**
1. **Scalabilità:** Come documentato nel Capitolo 5, l'implementazione pratica presenta sfide significative
2. **Qualità:** Chi garantisce l'accuratezza delle informazioni scambiate tra pari?
3. **Inclusività:** Rischia di escludere chi ha stili di apprendimento diversi?

**Prospettive alternative:**
Cosa succederebbe se applicassimo una lente critica femminista o decoloniale a questi concetti? Come cambierebbe la nostra comprensione?

**Domande per la riflessione:**
- Quali interessi potrebbero essere serviti dalla promozione di questo approccio?
- Stiamo romanticizzando la collaborazione ignorando i conflitti reali?`,

      socratic: `🤔 **Iniziamo con una domanda fondamentale...**

Quando pensi alla parola "apprendimento", cosa ti viene in mente per primo? Un'aula con un insegnante alla lavagna, o qualcos'altro?

**Ora, rifletti su questo:**
Pensa all'ultima volta che hai imparato qualcosa di veramente importante per te. Come è successo? Qualcuno te l'ha "insegnato" dall'alto, o è emerso attraverso l'esperienza e lo scambio?

**Approfondendo la tua esperienza:**
- Quali sono stati i momenti di apprendimento più significativi della tua vita?
- Che ruolo hanno avuto le altre persone in questi momenti?
- Ti sei mai trovato nella situazione di imparare qualcosa mentre la stavi insegnando a qualcun altro?

**Connessioni interessanti:**
Se ripensi a queste esperienze, che pattern vedi emergere? Come si collegano a quello che Howard Rheingold descrive nel Capitolo 1 del manuale?

**La domanda cruciale:**
Cosa pensi che succederebbe se progettassimo intenzionalmente esperienze di apprendimento basate su questi pattern naturali che hai già sperimentato?

**Per andare più a fondo:**
Come potresti applicare queste intuizioni nella tua vita quotidiana, partendo da oggi stesso?`
    };

    return responses[personalityId as keyof typeof responses] || responses.academic;
  }

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
      case 'set_api_key':
        if (args.length < 3) {
          return `❌ **Formato comando errato**

**Uso corretto:**
\`/set_api_key <provider> <model> <api_key>\`

**Provider disponibili:**
${API_PROVIDERS.map(p => `• **${p.id}**: ${p.description}`).join('\n')}

**Esempio:**
\`/set_api_key openai gpt-4o sk-your-api-key-here\``;
        }

        const [providerId, model, apiKey] = args;
        const success = this.setAPIKey(apiKey, providerId, model);
        
        if (success) {
          return `✅ **API configurata con successo!**

**Provider:** ${this.provider?.name}
**Modello:** ${this.model}
**Chiave:** ${apiKey.substring(0, 8)}...

Ora puoi iniziare a chattare con l'AI! 🚀`;
        } else {
          return `❌ **Errore nella configurazione**

Provider "${providerId}" non riconosciuto. Provider disponibili: ${API_PROVIDERS.map(p => p.id).join(', ')}`;
        }

      case 'status':
        const status = this.getAPIStatus();
        if (status.configured) {
          return `✅ **Sistema RAG Configurato**

**Provider:** ${status.provider}
**Modello:** ${status.model}
**Vector Store:** Peeragogy Handbook indicizzato
**Personalità disponibili:** ${PERSONALITIES.length}

Tutto pronto per l'uso! 🎯`;
        } else {
          return `⚠️ **Sistema non configurato**

Usa \`/set_api_key\` per configurare l'API prima di iniziare.`;
        }

      case 'help':
        return `🤖 **Comandi disponibili:**

**Configurazione:**
• \`/set_api_key <provider> <model> <key>\` - Configura API
• \`/status\` - Verifica configurazione

**Informazioni:**
• \`/help\` - Mostra questo messaggio
• \`/personalities\` - Lista personalità disponibili
• \`/providers\` - Lista provider API

**Uso:**
1. Configura la tua API key
2. Seleziona una personalità
3. Inizia a chattare!

Il sistema RAG utilizzerà automaticamente i contenuti del Peeragogy Handbook per rispondere alle tue domande. 📚`;

      case 'personalities':
        return `🎭 **Personalità AI disponibili:**

${PERSONALITIES.map(p => `**${p.emoji} ${p.name}**
${p.description}
*Stile:* ${p.style.tone}
*Approccio:* ${p.style.approach}
*Esempio:* "${p.style.examples[0]}"
`).join('\n')}

Seleziona una personalità dall'interfaccia per iniziare! 🚀`;

      case 'providers':
        return `🔌 **Provider API supportati:**

${API_PROVIDERS.map(p => `**${p.name}** (\`${p.id}\`)
${p.description}
*Modelli:* ${p.models.join(', ')}
*Formato chiave:* ${p.keyFormat}
*URL:* ${p.baseUrl}
`).join('\n')}

Usa \`/set_api_key <provider> <model> <key>\` per configurare! 🔧`;

      default:
        return `❌ **Comando non riconosciuto:** \`/${command}\`

Usa \`/help\` per vedere tutti i comandi disponibili.`;
    }
  }
}

export const ragService = new RAGService();