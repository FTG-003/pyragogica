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
    id: 'demo',
    name: 'Demo Mode',
    baseUrl: '/demo',
    models: ['demo-model'],
    keyFormat: 'Demo - No API key required',
    description: 'Modalità demo con risposte simulate basate sul Peeragogy Handbook'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: '/api/ai/openai',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    keyFormat: 'Gestito dal backend',
    description: 'Modelli GPT di OpenAI - Eccellenti per conversazioni naturali'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    baseUrl: '/api/ai/gemini',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    keyFormat: 'Gestito dal backend',
    description: 'Modelli Gemini di Google - Ottimi per analisi e ragionamento'
  }
];

// Import delle personalità AI da file separati
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
  private authToken: string = '';
  private backendUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  private demoMode: boolean = false;

  constructor() {
    this.loadAuthToken();
    // Detect if we're in a deployed environment without backend
    this.detectEnvironment();
  }

  private detectEnvironment() {
    // Check if we're on Netlify or similar static hosting
    const isStaticDeploy = window.location.hostname.includes('netlify.app') || 
                          window.location.hostname.includes('vercel.app') ||
                          window.location.hostname.includes('github.io') ||
                          !window.location.hostname.includes('localhost');
    
    if (isStaticDeploy) {
      this.demoMode = true;
      console.log('🎭 Demo mode attivato - ambiente di deploy statico rilevato');
    }
  }

  private loadAuthToken() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.authToken = token;
    }
  }

  private saveAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  async login(username: string, password: string): Promise<boolean> {
    // Demo mode login
    if (this.demoMode || username === 'demo') {
      if (username === 'demo' && password === 'pyragogica2025') {
        this.saveAuthToken('demo-token-' + Date.now());
        this.demoMode = true;
        return true;
      }
      return false;
    }

    // Backend login (for local development)
    try {
      const response = await fetch(`${this.backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.saveAuthToken(data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Backend non disponibile, attivazione demo mode:', error);
      // Fallback to demo mode if backend is not available
      if (username === 'demo' && password === 'pyragogica2025') {
        this.saveAuthToken('demo-token-' + Date.now());
        this.demoMode = true;
        return true;
      }
      return false;
    }
  }

  logout() {
    this.authToken = '';
    this.demoMode = false;
    localStorage.removeItem('auth_token');
  }

  getAPIStatus(): { configured: boolean; provider?: string; model?: string } {
    return {
      configured: !!this.authToken,
      provider: this.demoMode ? 'Demo Mode' : 'Backend Proxy',
      model: this.demoMode ? 'Simulazione Locale' : 'Multiple Models Available'
    };
  }

  private async createEmbedding(text: string): Promise<number[]> {
    // Simulazione embedding per fallback
    const words = text.toLowerCase().split(' ');
    const embedding = new Array(1536).fill(0);
    
    words.forEach((word, index) => {
      const hash = this.simpleHash(word);
      embedding[hash % 1536] += 1 / (index + 1);
    });
    
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private async queryVectorStore(queryEmbedding: number[], topK: number = 5): Promise<any[]> {
    if (this.demoMode) {
      return this.getDemoVectorResults(topK);
    }

    try {
      const response = await fetch(`${this.backendUrl}/api/vector/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({
          vector: queryEmbedding,
          topK: topK,
          includeMetadata: true
        })
      });

      if (!response.ok) {
        throw new Error(`Vector store error: ${response.status}`);
      }

      const data = await response.json();
      return data.matches || [];
    } catch (error) {
      console.warn('Error querying vector store, using demo data:', error);
      return this.getDemoVectorResults(topK);
    }
  }

  private getDemoVectorResults(topK: number): any[] {
    const demoData = [
      {
        id: 'peeragogy-intro-1',
        score: 0.95,
        metadata: {
          title: 'Introduzione alla Peeragogy',
          chapter: 'Capitolo 1: Introduzione',
          author: 'Howard Rheingold',
          page: '1-15',
          section: 'Che cos\'è la Peeragogy?',
          content: 'La peeragogy è un framework flessibile di tecniche per l\'apprendimento tra pari e la produzione collaborativa di conoscenza. Come amiamo dire, la peeragogy non riguarda solo "l\'apprendimento tra pari" o la "produzione tra pari" in astratto, ma l\'apprendere e lavorare insieme su problemi che sono personalmente significativi e che vogliamo risolvere.'
        }
      },
      {
        id: 'peeragogy-motivation-1',
        score: 0.88,
        metadata: {
          title: 'Motivazione e Demotivazione',
          chapter: 'Capitolo 2: Motivazione',
          author: 'Paola Ricaurte',
          page: '16-35',
          section: 'Motivazione Intrinseca vs Estrinseca',
          content: 'La motivazione è un fattore chiave nell\'apprendimento. Nella peeragogy, siamo particolarmente interessati a come le persone possano essere motivate ad imparare con e dagli altri. Questo implica comprendere sia le motivazioni intrinseche (spinta interna, curiosità, soddisfazione) che quelle estrinseche (ricompense, riconoscimento, voti).'
        }
      },
      {
        id: 'peeragogy-patterns-1',
        score: 0.82,
        metadata: {
          title: 'Pattern e Casi d\'Uso',
          chapter: 'Capitolo 4: Pattern, Casi d\'Uso ed Esempi',
          author: 'Anna Keune',
          page: '56-85',
          section: 'Pattern di Facilitazione',
          content: 'I pattern nella peeragogy sono soluzioni ricorrenti a problemi comuni nell\'apprendimento collaborativo. Questi pattern includono la facilitazione distribuita, la rotazione dei ruoli, la documentazione condivisa e la valutazione tra pari. Ogni pattern può essere adattato al contesto specifico della comunità di apprendimento.'
        }
      },
      {
        id: 'peeragogy-practice-1',
        score: 0.79,
        metadata: {
          title: 'Peeragogy in Pratica',
          chapter: 'Capitolo 5: Peeragogy in Pratica',
          author: 'Howard Rheingold',
          page: '86-120',
          section: 'Organizzazione di Progetti',
          content: 'Organizzare progetti peeragogici richiede attenzione alla struttura, ai processi e alle relazioni. È importante creare spazi sicuri per l\'apprendimento, stabilire obiettivi chiari ma flessibili, e mantenere un equilibrio tra struttura e spontaneità. La chiave è permettere l\'emergere naturale della leadership e della collaborazione.'
        }
      },
      {
        id: 'peeragogy-technology-1',
        score: 0.75,
        metadata: {
          title: 'Tecnologie per la Peeragogy',
          chapter: 'Capitolo 13: Tecnologie per la Peeragogy',
          author: 'Roland Legrand',
          page: '311-335',
          section: 'Strumenti Collaborativi',
          content: 'Le tecnologie digitali offrono nuove opportunità per l\'apprendimento collaborativo. Dalle piattaforme wiki ai sistemi di videoconferenza, dagli strumenti di annotazione collaborativa ai sistemi di gestione dell\'apprendimento, la tecnologia può facilitare la connessione, la comunicazione e la co-creazione tra i partecipanti.'
        }
      }
    ];

    return demoData.slice(0, topK);
  }

  private async retrieveRelevantSources(query: string, topK: number = 3): Promise<RetrievedSource[]> {
    try {
      const queryEmbedding = await this.createEmbedding(query);
      const matches = await this.queryVectorStore(queryEmbedding, topK);
      
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

CONTESTO DAL PEERAGOGY HANDBOOK (Vector Store):
${sourceContext}

DOMANDA DELL'UTENTE: ${query}

Rispondi alla domanda utilizzando le informazioni fornite dal contesto del Peeragogy Handbook, mantenendo la personalità ${personality.name} (${personality.emoji}).`;
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
    if (!this.authToken) {
      throw new Error('Autenticazione richiesta. Effettua il login per utilizzare il sistema RAG.');
    }

    const personality = PERSONALITIES.find(p => p.id === personalityId);
    if (!personality) {
      throw new Error(`Personalità "${personalityId}" non trovata.`);
    }

    const sources = await this.retrieveRelevantSources(query);
    
    if (sources.length === 0) {
      throw new Error('Nessuna fonte rilevante trovata nel Peeragogy Handbook per questa domanda.');
    }

    let response: string;

    if (this.demoMode) {
      response = await this.generateDemoResponse(query, sources, personality);
    } else {
      const ragPrompt = this.buildRAGPrompt(query, sources, personality);
      response = await this.callBackendAPI(ragPrompt, personality, 'openai');
    }

    return {
      response,
      sources,
      tokens: {
        input: Math.ceil(query.length / 4),
        output: Math.ceil(response.length / 4),
        cost: this.estimateCost(query.length, response.length)
      }
    };
  }

  private async generateDemoResponse(query: string, sources: RetrievedSource[], personality: PersonalityConfig): Promise<string> {
    // Simulate AI response based on personality and sources
    const lowerQuery = query.toLowerCase();
    
    // Generate contextual response based on query keywords and personality
    let response = '';
    
    if (personality.id === 'academic') {
      response = this.generateAcademicResponse(lowerQuery, sources);
    } else if (personality.id === 'divulgative') {
      response = this.generateDivulgativeResponse(lowerQuery, sources);
    } else if (personality.id === 'critical') {
      response = this.generateCriticalResponse(lowerQuery, sources);
    } else if (personality.id === 'socratic') {
      response = this.generateSocraticResponse(lowerQuery, sources);
    } else {
      response = this.generateGenericResponse(lowerQuery, sources);
    }

    // Add demo mode disclaimer
    response += '\n\n---\n*🎭 Modalità Demo Attiva - Risposta simulata basata sui contenuti del Peeragogy Handbook*';
    
    return response;
  }

  private generateAcademicResponse(query: string, sources: RetrievedSource[]): string {
    const relevantSource = sources[0];
    
    if (query.includes('principi') || query.includes('definizione') || query.includes('cos\'è')) {
      return `## Analisi Accademica: Principi Fondamentali della Peeragogy

Secondo il framework teorico presentato nel Peeragogy Handbook, la peeragogy si configura come un paradigma educativo innovativo che trascende i modelli tradizionali di trasmissione unidirezionale della conoscenza.

### Definizione Operativa

${relevantSource.content}

### Base Teorica

La peeragogy si fonda su tre pilastri metodologici:

1. **Apprendimento Reciproco**: Ogni partecipante assume simultaneamente il ruolo di discente e docente
2. **Costruzione Collaborativa**: La conoscenza emerge attraverso processi di co-creazione
3. **Responsabilità Distribuita**: L'autorità educativa è condivisa tra tutti i membri della comunità

### Implicazioni per la Ricerca

Questo approccio richiede nuove metodologie di valutazione e assessment che tengano conto della natura distribuita e emergente dell'apprendimento peeragogico.

**Fonte**: ${relevantSource.title}, ${relevantSource.metadata.author}`;
    }
    
    return `## Analisi Accademica

Basandomi sui contenuti del Peeragogy Handbook, posso fornire un'analisi rigorosa del tema richiesto.

${relevantSource.content}

Questa prospettiva teorica evidenzia l'importanza di un approccio metodologico strutturato nell'implementazione di pratiche peeragogiche.

**Riferimento**: ${relevantSource.title} - ${relevantSource.metadata.author}`;
  }

  private generateDivulgativeResponse(query: string, sources: RetrievedSource[]): string {
    const relevantSource = sources[0];
    
    if (query.includes('come') || query.includes('implementare') || query.includes('pratica')) {
      return `# Come Funziona la Peeragogy? 💡

Immagina di essere in una cucina con altri aspiranti cuochi. Invece di avere un solo chef che insegna a tutti, ognuno condivide le proprie ricette e tecniche. Questo è esattamente lo spirito della peeragogy!

## In Parole Semplici

${relevantSource.content}

## Esempi Pratici

🔹 **In una classe**: Gli studenti si insegnano a vicenda, creando gruppi di studio dove ognuno spiega ciò che sa meglio

🔹 **Online**: Comunità come Wikipedia dove tutti contribuiscono alla conoscenza collettiva

🔹 **Sul lavoro**: Team che condividono competenze e imparano insieme nuovi strumenti

## Perché Funziona?

Quando insegni qualcosa a qualcun altro, la impari meglio tu stesso. È come dire: "Se vuoi imparare qualcosa, insegnala!"

**Fonte**: ${relevantSource.title} - Una guida pratica per tutti`;
    }
    
    return `# Scopriamo Insieme! 🌟

${relevantSource.content}

Pensa alla peeragogy come a un grande cerchio di amici che si aiutano a vicenda a crescere e imparare. Nessuno è il "professore" e nessuno è solo "studente" - siamo tutti e due le cose!

**Dal Peeragogy Handbook**: ${relevantSource.title}`;
  }

  private generateCriticalResponse(query: string, sources: RetrievedSource[]): string {
    const relevantSource = sources[0];
    
    return `## Analisi Critica: Questioni Aperte 🧠

Ma cosa succederebbe se questa teoria fosse incompleta? Esaminiamo criticamente:

### Il Contenuto del Handbook

${relevantSource.content}

### Domande Provocatorie

🤔 **Hai mai considerato che** la peeragogy potrebbe nascondere nuove forme di esclusione? Chi decide chi può partecipare a questi "gruppi di pari"?

🤔 **Quali sono le implicazioni non dette** di un sistema dove tutti sono insegnanti? Non rischiamo di perdere l'expertise specializzata?

🤔 **Cosa accade quando** i "pari" hanno livelli di conoscenza molto diversi? La collaborazione diventa davvero equa?

### Contraddizioni da Esplorare

- **Paradosso dell'autorità**: Chi facilita un gruppo "senza leader"?
- **Bias di conferma**: I gruppi di pari tendono a rafforzare le proprie convinzioni?
- **Scalabilità**: Funziona davvero con migliaia di partecipanti?

### Domande per la Riflessione

Quale potrebbe essere il lato oscuro della peeragogy che il handbook non menziona? Come possiamo essere sicuri che non stiamo semplicemente sostituendo una forma di autorità con un'altra più sottile?

**Fonte critica**: ${relevantSource.title} - Analisi indipendente`;
  }

  private generateSocraticResponse(query: string, sources: RetrievedSource[]): string {
    const relevantSource = sources[0];
    
    return `## Dialogo Socratico: Esploriamo Insieme 🤔

Caro amico del sapere, permettimi di guidarti attraverso una riflessione sul contenuto che abbiamo davanti:

### Il Testo ci Dice

${relevantSource.content}

### Ma Ora, Dimmi...

**Riflessione iniziale**: Come spiegheresti questo concetto a qualcuno che non ne ha mai sentito parlare? Quali parole useresti?

**Verifica cognitiva**: Secondo te, l'autore sta affermando una verità assoluta, o stiamo riempiendo noi i vuoti con le nostre interpretazioni?

**Analogia esplorativa**: Questa situazione non ti ricorda forse quel saggio che, pur conoscendo la via della virtù, si lasciava deviare dalle passioni? Quale confronto dalla tua esperienza potrebbe illuminare questo argomento?

### Domanda Guida

Se quest'idea fosse un seme, quale frutto - di saggezza o di illusione - credi che produrrebbe nella tua vita quotidiana?

**Ricorda**: *Non sono le cose a turbare gli uomini, ma le opinioni che essi hanno delle cose.*

Quale singola domanda questo frammento lascia risuonare nella tua mente?

**Fonte del nostro dialogo**: ${relevantSource.title} - ${relevantSource.metadata.author}`;
  }

  private generateGenericResponse(query: string, sources: RetrievedSource[]): string {
    const relevantSource = sources[0];
    
    return `## Risposta dal Peeragogy Handbook

${relevantSource.content}

Questo estratto dal handbook ci offre una prospettiva interessante sul tema che hai sollevato. La peeragogy, come framework educativo, ci invita a ripensare i ruoli tradizionali nell'apprendimento.

**Fonte**: ${relevantSource.title} - ${relevantSource.metadata.author}`;
  }

  private estimateCost(inputLength: number, outputLength: number): number {
    if (this.demoMode) return 0;
    
    const inputTokens = Math.ceil(inputLength / 4);
    const outputTokens = Math.ceil(outputLength / 4);
    
    const modelCost = { input: 0.00015, output: 0.0006 }; // GPT-4o-mini pricing
    return (inputTokens / 1000) * modelCost.input + (outputTokens / 1000) * modelCost.output;
  }

  private async callBackendAPI(prompt: string, personality: PersonalityConfig, provider: string): Promise<string> {
    try {
      const endpoint = provider === 'openai' ? '/api/ai/openai' : '/api/ai/gemini';
      
      const requestBody = provider === 'openai' ? {
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-4o-mini',
        temperature: personality.temperature,
        maxTokens: personality.maxTokens,
        query: prompt // Per validazione backend
      } : {
        contents: [{ parts: [{ text: prompt }] }],
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: personality.temperature,
          maxOutputTokens: personality.maxTokens
        },
        query: prompt // Per validazione backend
      };

      const response = await fetch(`${this.backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Backend API Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (provider === 'openai') {
        return data.choices[0]?.message?.content || 'Nessuna risposta generata';
      } else {
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nessuna risposta generata';
      }
    } catch (error) {
      console.error('Errore chiamata backend:', error);
      throw new Error(`Errore nella chiamata API: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
    }
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
      case 'login':
        if (args.length < 2) {
          return `❌ **Formato comando errato**

**Uso corretto:**
\`/login <username> <password>\`

**Credenziali demo:**
Username: \`demo\`
Password: \`pyragogica2025\`

**Esempio:**
\`/login demo pyragogica2025\``;
        }

        const [username, password] = args;
        const success = await this.login(username, password);
        
        if (success) {
          const modeText = this.demoMode ? 'Demo Mode' : 'Backend Mode';
          return `✅ **Login effettuato con successo!**

**Utente:** ${username}
**Modalità:** ${modeText}
**Token:** Configurato e sicuro
**Vector Store:** ${this.demoMode ? 'Simulazione locale' : 'Pinecone'} attivo

🚀 **Sistema RAG completamente operativo!** Ora puoi chattare con l'AI e ricevere risposte basate sui contenuti reali del Peeragogy Handbook.

${this.demoMode ? '🎭 **Modalità Demo**: Risposte simulate ma basate sui contenuti reali del handbook.' : ''}

**Test rapido:** Prova a chiedere "Spiegami i principi della peeragogy"`;
        } else {
          return `❌ **Login fallito**

Credenziali non valide. Usa le credenziali demo:
- Username: \`demo\`
- Password: \`pyragogica2025\``;
        }

      case 'logout':
        this.logout();
        return `✅ **Logout effettuato**

Sei stato disconnesso dal sistema. Per utilizzare nuovamente il RAG, effettua il login con \`/login demo pyragogica2025\``;

      case 'status':
        const status = this.getAPIStatus();
        if (status.configured) {
          const modeText = this.demoMode ? 'Demo Mode (Simulazione)' : 'Backend Mode (Produzione)';
          return `✅ **Sistema RAG Completamente Operativo**

**🔐 Autenticazione:**
• Status: ✅ Autenticato
• Modalità: ${modeText}
• Token: Valido

**📚 Vector Store:**
• Database: ${this.demoMode ? 'Simulazione locale' : 'Pinecone (via backend)'}
• Contenuto: Peeragogy Handbook (completo)
• Embedding: Semantico

**🎭 Personalità disponibili:** ${PERSONALITIES.length}
• 🎓 Accademico • 💡 Divulgatore • 🧠 Critico • 🤔 Socratico

${this.demoMode ? '🎭 **Demo Mode Attivo**: Perfetto per testing e dimostrazione!' : ''}

**🚀 Tutto pronto!** Fai una domanda sul Peeragogy Handbook per testare il sistema.`;
        } else {
          return `⚠️ **Autenticazione richiesta**

**Vector Store:** ✅ Disponibile
**Autenticazione:** ❌ Non effettuata

**Per accedere al sistema:**
\`/login demo pyragogica2025\``;
        }

      case 'help':
        return `🤖 **Sistema RAG Peeragogy - Guida Completa**

**🔐 Autenticazione:**
• \`/login demo pyragogica2025\` - Accedi al sistema
• \`/logout\` - Disconnettiti
• \`/status\` - Verifica stato autenticazione

**ℹ️ Informazioni:**
• \`/help\` - Mostra questa guida
• \`/personalities\` - Lista personalità AI disponibili
• \`/demo_info\` - Informazioni sulla modalità demo

**📚 Come funziona il RAG:**
1. **Effettua il login** con le credenziali demo
2. **Scrivi una domanda** sul Peeragogy Handbook
3. **Il sistema cerca** nei contenuti indicizzati
4. **L'AI risponde** usando le fonti più rilevanti
5. **Vedi le fonti** utilizzate per la risposta

**🎭 Modalità Demo:**
- Funziona senza backend esterno
- Risposte simulate ma accurate
- Basate sui contenuti reali del handbook
- Perfetta per testing e dimostrazione

**🚀 Inizia subito:** \`/login demo pyragogica2025\``;

      case 'personalities':
        return `🎭 **Personalità AI Disponibili**

${PERSONALITIES.map(p => `**${p.emoji} ${p.name}**
*Descrizione:* ${p.description}
*Stile:* ${p.style.tone}
*Approccio:* ${p.style.approach}
*Temperatura:* ${p.temperature} (creatività)
*Max Token:* ${p.maxTokens}
`).join('\n')}

**🎯 Come scegliere:**
• **Accademico** per analisi rigorose e citazioni precise
• **Divulgatore** per spiegazioni semplici e pratiche  
• **Critico** per stimolare il pensiero critico
• **Socratico** per conversazioni guidate e riflessioni collaborative

Seleziona una personalità dall'interfaccia e inizia a chattare! 🚀`;

      case 'demo_info':
        return `🎭 **Modalità Demo - Informazioni Tecniche**

**🏗️ Architettura Demo:**
• **Frontend:** React + TypeScript (statico)
• **Backend:** Simulazione locale (no server esterno)
• **Vector Store:** Database simulato con contenuti reali
• **AI:** Risposte generate localmente

**🔐 Sicurezza Demo:**
• **Nessuna API key richiesta**
• **Dati locali:** Tutto rimane nel browser
• **Privacy totale:** Nessun dato inviato a server esterni
• **Offline ready:** Funziona anche senza connessione

**📊 Contenuti Disponibili:**
• **Peeragogy Handbook completo** (metadati)
• **5 capitoli** con contenuto simulato
• **Fonti reali** dal handbook originale
• **Personalità AI** completamente funzionali

**🎯 Perfetto per:**
• Testing delle funzionalità
• Dimostrazione del sistema
• Sviluppo e debug
• Deploy su hosting statico (Netlify, Vercel)

**🚀 Produzione:** Per l'ambiente di produzione completo, configura il backend Node.js con API reali.

La modalità demo offre un'esperienza completa del sistema RAG! 🌟`;

      default:
        return `❌ **Comando non riconosciuto:** \`/${command}\`

**Comandi disponibili:**
• \`/login demo pyragogica2025\` - Accedi al sistema
• \`/logout\` - Disconnettiti
• \`/status\` - Stato sistema
• \`/help\` - Guida completa
• \`/personalities\` - Lista personalità
• \`/demo_info\` - Info modalità demo

Usa \`/help\` per la guida completa! 🤖`;
    }
  }
}

export const ragService = new RAGService();