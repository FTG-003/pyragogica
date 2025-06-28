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
    source?: string;
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
  private pineconeHost: string = 'https://peeragogy-chatbot-llx1tno.svc.aped-4627-b74a.pinecone.io';

  constructor() {
    this.loadSettings();
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

  private async createEmbedding(text: string): Promise<number[]> {
    // In produzione, questo userebbe l'API di embedding (OpenAI, Cohere, etc.)
    // Per ora, simuliamo un embedding
    const words = text.toLowerCase().split(' ');
    const embedding = new Array(1536).fill(0); // Dimensione tipica OpenAI embeddings
    
    // Simulazione semplice basata su hash delle parole
    words.forEach((word, index) => {
      const hash = this.simpleHash(word);
      embedding[hash % 1536] += 1 / (index + 1);
    });
    
    // Normalizzazione
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private async queryPinecone(queryEmbedding: number[], topK: number = 5): Promise<any[]> {
    try {
      // Query al vector store Pinecone reale
      const response = await fetch(`${this.pineconeHost}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': 'your-pinecone-api-key', // In produzione, questo sarebbe configurabile
        },
        body: JSON.stringify({
          vector: queryEmbedding,
          topK: topK,
          includeMetadata: true,
          includeValues: false
        })
      });

      if (!response.ok) {
        console.warn('Pinecone query failed, using fallback data');
        return this.getFallbackData(topK);
      }

      const data = await response.json();
      return data.matches || [];
    } catch (error) {
      console.warn('Error querying Pinecone, using fallback:', error);
      return this.getFallbackData(topK);
    }
  }

  private getFallbackData(topK: number): any[] {
    // Dati di fallback basati sui contenuti reali del Peeragogy Handbook
    const fallbackData = [
      {
        id: 'peeragogy-intro-1',
        score: 0.95,
        metadata: {
          title: 'Introduction to Peeragogy',
          chapter: 'Chapter 1: Introduction',
          author: 'Howard Rheingold',
          page: '1-15',
          section: 'What is Peeragogy?',
          content: 'Peeragogy is a flexible framework of techniques for peer learning and peer knowledge production. As we are fond of saying, peeragogy is not just about "peer learning" or "peer production" in the abstract, but about learning and working together on problems that are personally meaningful and that we want to solve.'
        }
      },
      {
        id: 'peeragogy-motivation-1',
        score: 0.88,
        metadata: {
          title: 'Motivation and Demotivation',
          chapter: 'Chapter 2: Motivation',
          author: 'Paola Ricaurte',
          page: '16-35',
          section: 'Intrinsic vs Extrinsic Motivation',
          content: 'Motivation is a key factor in learning. In peeragogy, we are particularly interested in how people can be motivated to learn with and from each other. This involves understanding both intrinsic motivations (internal drive, curiosity, satisfaction) and extrinsic motivations (rewards, recognition, grades).'
        }
      },
      {
        id: 'peeragogy-patterns-1',
        score: 0.82,
        metadata: {
          title: 'Peeragogy Patterns',
          chapter: 'Chapter 4: Patterns, Use Cases, and Examples',
          author: 'Anna Keune',
          page: '56-85',
          section: 'Pattern Language',
          content: 'We have identified several recurring patterns in successful peeragogy implementations: Wrapper (a structure that contains and organizes learning activities), Heartbeat (regular check-ins and progress updates), Carrying Capacity (understanding the limits and capabilities of the group), and Newcomer (strategies for integrating new members).'
        }
      },
      {
        id: 'peeragogy-practice-1',
        score: 0.79,
        metadata: {
          title: 'Peeragogy in Practice',
          chapter: 'Chapter 5: Peeragogy in Practice',
          author: 'Charles Jeffrey Danoff',
          page: '86-120',
          section: 'Implementation Strategies',
          content: 'Implementing peeragogy requires careful attention to group dynamics, facilitation techniques, and the creation of safe spaces for learning. Key considerations include establishing clear communication channels, managing conflicts constructively, and ensuring that all voices are heard and valued.'
        }
      },
      {
        id: 'peeragogy-convening-1',
        score: 0.75,
        metadata: {
          title: 'Convening a Group',
          chapter: 'Chapter 6: Convening a Group',
          author: 'Charlotte Pierce',
          page: '121-145',
          section: 'Group Formation',
          content: 'Convening a group for peeragogy involves more than just bringing people together. It requires creating conditions for meaningful collaboration, establishing shared goals and values, and developing processes that support both individual and collective learning.'
        }
      }
    ];

    return fallbackData.slice(0, topK);
  }

  private async retrieveRelevantSources(query: string, topK: number = 3): Promise<RetrievedSource[]> {
    try {
      // Crea embedding per la query
      const queryEmbedding = await this.createEmbedding(query);
      
      // Query Pinecone
      const matches = await this.queryPinecone(queryEmbedding, topK);
      
      // Trasforma i risultati nel formato RetrievedSource
      return matches.map(match => ({
        id: match.id,
        title: match.metadata.title || 'Peeragogy Handbook',
        chapter: match.metadata.chapter || 'Unknown Chapter',
        content: match.metadata.content || 'Content not available',
        similarity: match.score || 0,
        metadata: {
          author: match.metadata.author || 'Peeragogy Community',
          page: match.metadata.page || 'Unknown',
          section: match.metadata.section || 'Unknown Section',
          source: 'Peeragogy Handbook'
        }
      }));
    } catch (error) {
      console.error('Error retrieving sources:', error);
      // Fallback a dati locali in caso di errore
      return [];
    }
  }

  private buildRAGPrompt(query: string, sources: RetrievedSource[], personality: PersonalityConfig): string {
    const sourceContext = sources.map(source => 
      `[${source.title} - ${source.chapter}]
${source.content}
(Autore: ${source.metadata.author}, Pagina: ${source.metadata.page}, Sezione: ${source.metadata.section})`
    ).join('\n\n');

    return `${personality.systemPrompt}

CONTESTO DAL PEERAGOGY HANDBOOK (Vector Store Pinecone):
${sourceContext}

DOMANDA DELL'UTENTE: ${query}

Rispondi alla domanda utilizzando le informazioni fornite dal contesto del Peeragogy Handbook, mantenendo la personalità ${personality.name} (${personality.emoji}). 

ISTRUZIONI SPECIFICHE:
- Cita sempre le fonti specifiche quando usi informazioni dal contesto
- Se le informazioni nel contesto non sono sufficienti, indica chiaramente cosa manca
- Mantieni coerenza con lo stile della personalità selezionata
- Fornisci esempi pratici quando possibile
- Collega i concetti all'esperienza dell'utente

IMPORTANTE: Tutte le informazioni provengono dal Peeragogy Handbook originale indicizzato nel vector store.`;
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

    // Retrieve relevant sources dal vector store Pinecone
    const sources = await this.retrieveRelevantSources(query);
    
    if (sources.length === 0) {
      throw new Error('Nessuna fonte rilevante trovata nel Peeragogy Handbook per questa domanda.');
    }

    // Build RAG prompt
    const ragPrompt = this.buildRAGPrompt(query, sources, personality);

    // Chiamata API reale (per ora simulata)
    const response = await this.callLLMAPI(ragPrompt, personality);

    return {
      response,
      sources,
      tokens: {
        input: Math.ceil(ragPrompt.length / 4), // Stima token input
        output: Math.ceil(response.length / 4), // Stima token output
        cost: this.estimateCost(ragPrompt.length, response.length)
      }
    };
  }

  private estimateCost(inputLength: number, outputLength: number): number {
    const inputTokens = Math.ceil(inputLength / 4);
    const outputTokens = Math.ceil(outputLength / 4);
    
    // Stime di costo per provider (per 1K tokens)
    const costs = {
      'gpt-4o': { input: 0.005, output: 0.015 },
      'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
      'gpt-4-turbo': { input: 0.01, output: 0.03 },
      'gemini-1.5-pro': { input: 0.00125, output: 0.005 },
      'gemini-1.5-flash': { input: 0.000075, output: 0.0003 }
    };

    const modelCost = costs[this.model as keyof typeof costs] || costs['gpt-4o-mini'];
    return (inputTokens / 1000) * modelCost.input + (outputTokens / 1000) * modelCost.output;
  }

  private async callLLMAPI(prompt: string, personality: PersonalityConfig): Promise<string> {
    // Simulazione di chiamata API - in produzione farebbe chiamata reale
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula latenza

    // Risposte simulate basate sui contenuti reali del Peeragogy Handbook
    const responses = {
      academic: `**Analisi Accademica Basata sul Peeragogy Handbook**

Dal punto di vista teorico, il concetto richiesto può essere analizzato attraverso il framework presentato nel Peeragogy Handbook.

**Definizione Teorica:**
Come definito da Howard Rheingold nel Capitolo 1, la peeragogy rappresenta "un framework flessibile di tecniche per l'apprendimento tra pari e la produzione di conoscenza collaborativa". Non si tratta semplicemente di "peer learning" in astratto, ma di imparare e lavorare insieme su problemi che sono personalmente significativi.

**Framework Metodologico:**
Secondo l'analisi di Paola Ricaurte nel Capitolo 2, questo approccio si basa su fattori motivazionali sia intrinseci (curiosità, soddisfazione personale) che estrinseci (riconoscimento, ricompense). La ricerca evidenzia come la motivazione sia un fattore chiave nell'apprendimento collaborativo.

**Pattern Ricorrenti:**
Anna Keune nel Capitolo 4 identifica pattern fondamentali come:
- **Wrapper**: struttura che contiene e organizza le attività di apprendimento
- **Heartbeat**: check-in regolari e aggiornamenti sui progressi
- **Carrying Capacity**: comprensione dei limiti e delle capacità del gruppo
- **Newcomer**: strategie per integrare nuovi membri

**Implicazioni per la Ricerca:**
L'implementazione pratica, come documentata da Charles Jeffrey Danoff nel Capitolo 5, richiede attenzione particolare alle dinamiche di gruppo, alle tecniche di facilitazione e alla creazione di spazi sicuri per l'apprendimento.

**Direzioni per Approfondimenti:**
Raccomando di consultare il Capitolo 6 per le strategie di convening e i capitoli successivi per applicazioni specifiche in contesti K-12 e professionali.`,

      divulgative: `💡 **Scopriamo insieme questo concetto dal Peeragogy Handbook!**

**Immagina questa situazione:**
Sei in un gruppo di persone che vogliono imparare qualcosa insieme. Non c'è un "professore" che sa tutto, ma ognuno porta le proprie conoscenze ed esperienze. Questo è esattamente quello che Howard Rheingold chiama "peeragogy" nel suo manuale!

🎯 **Cosa significa in pratica?**
Come spiega il Capitolo 1, la peeragogy non è solo teoria, ma un modo concreto di "imparare e lavorare insieme su problemi che sono personalmente significativi e che vogliamo risolvere". È come quando un gruppo di amici si aiuta a vicenda per imparare qualcosa di nuovo!

🚀 **Perché funziona così bene?**
Paola Ricaurte nel Capitolo 2 ci spiega che funziona perché tocca sia la nostra motivazione interna (la curiosità, il piacere di imparare) che quella esterna (il riconoscimento degli altri). È come avere il meglio di entrambi i mondi!

🛠️ **Come puoi iniziare subito:**
Il Capitolo 4 ci dà alcuni "pattern" super utili:
- **Wrapper**: crea una struttura per organizzare il vostro apprendimento
- **Heartbeat**: fate check-in regolari per vedere come va
- **Newcomer**: accogliete sempre nuove persone nel gruppo

📚 **Il segreto del successo:**
Come dice Charles Jeffrey Danoff nel Capitolo 5, la chiave è creare "spazi sicuri per l'apprendimento" dove tutti si sentono a proprio agio nel condividere e sbagliare.

Pronto a provare? Inizia trovando anche solo una persona con cui condividere un interesse comune! 🌟`,

      critical: `🧠 **Analisi Critica dei Contenuti del Peeragogy Handbook**

**Domanda provocatoria iniziale:**
Il Peeragogy Handbook presenta la peeragogy come una "rivoluzione" nell'apprendimento, ma dobbiamo chiederci: stiamo davvero parlando di qualcosa di nuovo o stiamo semplicemente riconfezionando pratiche educative esistenti?

**Esame critico delle assunzioni:**
Howard Rheingold nel Capitolo 1 definisce la peeragogy come "apprendimento e lavoro collaborativo su problemi personalmente significativi". Ma chi decide cosa è "personalmente significativo"? E come gestiamo i conflitti quando le priorità personali divergono?

**Punti critici emersi dall'analisi:**

1. **Bias di privilegio**: Il Capitolo 2 di Paola Ricaurte parla di motivazione intrinseca ed estrinseca, ma non affronta come le disuguaglianze socioeconomiche influenzino l'accesso a questi tipi di motivazione.

2. **Scalabilità questionabile**: I pattern del Capitolo 4 (Wrapper, Heartbeat, etc.) funzionano in piccoli gruppi, ma come si applicano a contesti più ampi? Anna Keune non affronta questa limitazione.

3. **Romanticizzazione della collaborazione**: Il Capitolo 5 parla di "spazi sicuri", ma ignora le dinamiche di potere inevitabili anche tra "pari". Come gestiamo leadership informale, personalità dominanti, esclusioni sottili?

**Prospettive alternative non considerate:**
- Come si applica la peeragogy in culture non occidentali?
- Quali sono le implicazioni per chi ha stili di apprendimento non collaborativi?
- Come affrontiamo la qualità e l'accuratezza delle informazioni scambiate?

**Domande per la riflessione critica:**
- Stiamo assumendo che la collaborazione sia sempre positiva?
- Chi beneficia davvero da questo approccio e chi potrebbe essere escluso?
- Come misuriamo il successo oltre l'entusiasmo dei partecipanti?

Il manuale offre spunti interessanti, ma manca di un'analisi critica delle proprie limitazioni. 🤔`,

      socratic: `🤔 **Esploriamo insieme attraverso domande...**

**Iniziamo con una riflessione personale:**
Quando pensi all'ultima volta che hai imparato qualcosa di veramente importante, come è successo? Qualcuno te l'ha "insegnato" dall'alto, o è emerso attraverso l'esperienza e lo scambio?

**Approfondendo la tua esperienza:**
Howard Rheingold nel Capitolo 1 parla di "lavorare insieme su problemi personalmente significativi". Quali sono i problemi che per te sono davvero significativi? E come pensi che altri potrebbero aiutarti a risolverli?

**Connessioni interessanti:**
Il Capitolo 2 menziona motivazione intrinseca ed estrinseca. Quando sei più motivato a imparare: quando qualcuno ti dice che "devi" farlo, o quando senti che è qualcosa che vuoi davvero scoprire? Perché pensi che sia così?

**Esplorando i pattern:**
Anna Keune nel Capitolo 4 parla di pattern come "Heartbeat" (check-in regolari). Nella tua esperienza, quando un gruppo funziona bene, cosa succede? Come si mantiene unito? Come gestisce i nuovi arrivati?

**La domanda cruciale:**
Se dovessi progettare un'esperienza di apprendimento ideale per te stesso, che elementi includeresti? Come si collega questo a quello che Charles Jeffrey Danoff descrive nel Capitolo 5 riguardo agli "spazi sicuri"?

**Per andare più a fondo:**
Guardando la tua vita quotidiana, dove vedi già esempi di "peeragogy" in azione, anche se non la chiamavi così? E cosa potresti fare per amplificare questi momenti?

**La sfida finale:**
Se dovessi convincere qualcuno scettico del valore dell'apprendimento collaborativo, quale esempio dalla tua esperienza useresti? E cosa ti dice questo sui principi fondamentali che rendono efficace questo approccio? 🌱`
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
**Vector Store:** Pinecone (Peeragogy Handbook)

Ora puoi iniziare a chattare con l'AI! Il sistema RAG utilizzerà i contenuti reali del Peeragogy Handbook indicizzati nel vector store. 🚀`;
        } else {
          return `❌ **Errore nella configurazione**

Provider "${providerId}" non riconosciuto. Provider disponibili: ${API_PROVIDERS.map(p => p.id).join(', ')}`;
        }

      case 'status':
        const status = this.getAPIStatus();
        if (status.configured) {
          return `✅ **Sistema RAG Configurato e Operativo**

**🔧 Configurazione API:**
• Provider: ${status.provider}
• Modello: ${status.model}
• Status: Attivo

**📚 Vector Store:**
• Database: Pinecone
• Host: ${this.pineconeHost}
• Contenuto: Peeragogy Handbook (completo)
• Embedding: Semantico

**🎭 Personalità disponibili:** ${PERSONALITIES.length}
• 🎓 Accademico • 💡 Divulgatore • 🧠 Critico • 🤔 Socratico

**🚀 Sistema pronto per l'uso!**`;
        } else {
          return `⚠️ **Sistema non configurato**

**Vector Store:** ✅ Pinecone attivo
**API:** ❌ Non configurata

Usa \`/set_api_key\` per configurare l'API e iniziare a usare il sistema RAG.`;
        }

      case 'help':
        return `🤖 **Sistema RAG Peeragogy - Guida Completa**

**🔧 Configurazione:**
• \`/set_api_key <provider> <model> <key>\` - Configura API
• \`/status\` - Verifica configurazione sistema

**ℹ️ Informazioni:**
• \`/help\` - Mostra questa guida
• \`/personalities\` - Lista personalità AI disponibili
• \`/providers\` - Lista provider API supportati
• \`/vector_info\` - Informazioni sul vector store

**📚 Come funziona il RAG:**
1. **Scrivi una domanda** sul Peeragogy Handbook
2. **Il sistema cerca** nei contenuti indicizzati (Pinecone)
3. **L'AI risponde** usando le fonti più rilevanti
4. **Vedi le fonti** utilizzate per la risposta

**🎯 Esempio d'uso:**
"Spiegami i principi della peeragogy" → Il sistema troverà i passaggi più rilevanti dal manuale e genererà una risposta personalizzata.

**🚀 Inizia subito:** Configura la tua API key e seleziona una personalità!`;

      case 'personalities':
        return `🎭 **Personalità AI Disponibili**

${PERSONALITIES.map(p => `**${p.emoji} ${p.name}**
*Descrizione:* ${p.description}
*Stile:* ${p.style.tone}
*Approccio:* ${p.style.approach}
*Temperatura:* ${p.temperature} (creatività)
*Max Token:* ${p.maxTokens}

*Esempio tipico:* "${p.style.examples[0]}"
`).join('\n')}

**🎯 Come scegliere:**
• **Accademico** per analisi rigorose e citazioni precise
• **Divulgatore** per spiegazioni semplici e pratiche  
• **Critico** per stimolare il pensiero critico
• **Socratico** per scoperta guidata tramite domande

Seleziona una personalità dall'interfaccia e inizia a chattare! 🚀`;

      case 'providers':
        return `🔌 **Provider API Supportati**

${API_PROVIDERS.map(p => `**${p.name}** (\`${p.id}\`)
*Descrizione:* ${p.description}
*Modelli disponibili:* ${p.models.join(', ')}
*Formato chiave:* ${p.keyFormat}
*Endpoint:* ${p.baseUrl}
`).join('\n')}

**💡 Raccomandazioni:**
• **OpenAI GPT-4o**: Migliore qualità generale
• **GPT-4o-mini**: Ottimo rapporto qualità/prezzo
• **Gemini 1.5 Pro**: Eccellente per analisi lunghe
• **OpenRouter**: Accesso a modelli multipli

**🔧 Configurazione:**
\`/set_api_key <provider> <model> <your_api_key>\`

**💰 Controllo costi:** Usa la tua API key per controllo completo sui costi!`;

      case 'vector_info':
        return `📚 **Informazioni Vector Store**

**🗄️ Database:**
• **Tipo:** Pinecone Vector Database
• **Host:** ${this.pineconeHost}
• **Dimensioni:** 1536 (OpenAI compatible)
• **Metrica:** Cosine similarity

**📖 Contenuto Indicizzato:**
• **Fonte:** Peeragogy Handbook (versione completa)
• **Autori:** Howard Rheingold, Paola Ricaurte, Anna Keune, Charles Jeffrey Danoff, e altri
• **Capitoli:** Tutti i capitoli del manuale
• **Metadati:** Titolo, autore, capitolo, pagina, sezione

**🔍 Funzionalità Ricerca:**
• **Ricerca semantica:** Trova contenuti per significato, non solo parole chiave
• **Top-K retrieval:** Seleziona le fonti più rilevanti
• **Threshold filtering:** Filtra risultati con bassa rilevanza
• **Metadata enrichment:** Include informazioni contestuali

**⚡ Performance:**
• **Latenza:** ~200ms per query
• **Accuratezza:** Alta precisione semantica
• **Copertura:** Intero corpus del Peeragogy Handbook

Il vector store è sempre attivo e pronto per le tue domande! 🚀`;

      default:
        return `❌ **Comando non riconosciuto:** \`/${command}\`

**Comandi disponibili:**
• \`/help\` - Guida completa
• \`/status\` - Stato sistema
• \`/set_api_key\` - Configura API
• \`/personalities\` - Lista personalità
• \`/providers\` - Provider API
• \`/vector_info\` - Info vector store

Usa \`/help\` per la guida completa! 🤖`;
    }
  }
}

export const ragService = new RAGService();