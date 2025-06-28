export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Chapter {
  id: number;
  title: string;
  originalTitle?: string;
  subtitle?: string;
  pages: string;
  duration: string;
  available: boolean;
  content?: string;
  summary: string;
  keyPoints: string[];
  authors: string[];
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated?: string;
}

export interface Resource {
  id: string;
  title: string;
  originalTitle?: string;
  subtitle?: string;
  authors: Author[];
  category: string;
  subcategory?: string;
  type: 'handbook' | 'guide' | 'article' | 'video' | 'course' | 'research' | 'tool' | 'dataset';
  access: 'free' | 'premium' | 'community';
  version?: string;
  pages?: number;
  duration?: string;
  language: string;
  originalLanguage?: string;
  translatedBy?: string[];
  rating: number;
  downloads?: number;
  likes?: number;
  bookmarks?: number;
  views?: number;
  description: string;
  chapters?: Chapter[];
  tags: string[];
  lastUpdated: string;
  publishedDate: string;
  featured: boolean;
  isbn?: string;
  license: string;
  repository?: string;
  website?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'complete' | 'in-progress' | 'planned';
  translationStatus?: 'complete' | 'partial' | 'planned';
  format: string[];
  fileSize?: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
  relatedResources?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subcategories?: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface LibraryStats {
  totalResources: number;
  totalAuthors: number;
  totalDownloads: number;
  totalPages: number;
  languages: string[];
  categories: number;
  lastUpdated: string;
  totalChapters: number;
  avgRating: number;
}

// Authors Database - Scalabile per migliaia di autori
export const authors: Author[] = [
  {
    id: 'howard-rheingold',
    name: 'Howard Rheingold',
    bio: 'Critico, scrittore e teorico americano specializzato nelle implicazioni culturali, sociali e politiche delle tecnologie di comunicazione moderne.',
    avatar: 'HR',
    website: 'https://rheingold.com',
    social: {
      twitter: '@hrheingold',
      linkedin: 'howard-rheingold'
    }
  },
  {
    id: 'charles-danoff',
    name: 'Charles Jeffrey Danoff',
    bio: 'Co-fondatore del progetto Peeragogy, esperto in apprendimento collaborativo e metodologie peer-to-peer.',
    avatar: 'CD',
    social: {
      github: 'charlesdanoff'
    }
  },
  {
    id: 'paola-ricaurte',
    name: 'Paola Ricaurte',
    bio: 'Ricercatrice e accademica specializzata in pedagogia digitale, tecnologie educative e giustizia sociale.',
    avatar: 'PR',
    social: {
      twitter: '@paolaricaurte'
    }
  },
  {
    id: 'charlotte-pierce',
    name: 'Charlotte Pierce',
    bio: 'Educatrice e facilitatrice esperta in design di esperienze di apprendimento collaborative.',
    avatar: 'CP'
  },
  {
    id: 'verena-roberts',
    name: 'Verena Roberts',
    bio: 'Specialista in comunità online e dinamiche di gruppo nell\'apprendimento digitale.',
    avatar: 'VR'
  },
  {
    id: 'roland-legrand',
    name: 'Roland Legrand',
    bio: 'Sviluppatore e ricercatore in tecnologie educative e piattaforme collaborative.',
    avatar: 'RL'
  },
  {
    id: 'anna-keune',
    name: 'Anna Keune',
    bio: 'Ricercatrice in scienze dell\'apprendimento e tecnologie educative innovative.',
    avatar: 'AK'
  },
  {
    id: 'giovanni-bianchi',
    name: 'Prof. Giovanni Bianchi',
    bio: 'Esperto in etica dell\'intelligenza artificiale e tecnologie educative responsabili.',
    avatar: 'GB',
    website: 'https://unibo.it/giovanni-bianchi'
  },
  {
    id: 'maria-rossi',
    name: 'Dr.ssa Maria Rossi',
    bio: 'Ricercatrice in scienze dell\'educazione e metodologie di apprendimento collaborativo.',
    avatar: 'MR',
    social: {
      linkedin: 'maria-rossi-education'
    }
  },
  {
    id: 'luca-ferrari',
    name: 'Dr. Luca Ferrari',
    bio: 'Specialista in tecnologie educative e sistemi di apprendimento adattivo.',
    avatar: 'LF'
  }
];

// Categories Database - Struttura scalabile per infinite categorie
export const categories: Category[] = [
  {
    id: 'peer-learning',
    name: 'Apprendimento Peer-to-Peer',
    description: 'Metodologie e pratiche per l\'apprendimento collaborativo tra pari',
    icon: 'Users',
    color: 'from-blue-500 to-indigo-600',
    subcategories: [
      { id: 'peeragogy', name: 'Peeragogy', description: 'Teoria e pratica della peeragogy' },
      { id: 'collaborative-learning', name: 'Apprendimento Collaborativo', description: 'Tecniche di collaborazione educativa' },
      { id: 'community-building', name: 'Costruzione Comunità', description: 'Creazione e gestione di comunità di apprendimento' },
      { id: 'peer-assessment', name: 'Valutazione tra Pari', description: 'Metodologie di valutazione collaborativa' }
    ]
  },
  {
    id: 'digital-pedagogy',
    name: 'Pedagogia Digitale',
    description: 'Innovazione educativa attraverso tecnologie digitali',
    icon: 'Monitor',
    color: 'from-green-500 to-teal-600',
    subcategories: [
      { id: 'educational-technology', name: 'Tecnologie Educative', description: 'Strumenti e piattaforme per l\'educazione' },
      { id: 'online-learning', name: 'Apprendimento Online', description: 'Metodologie per l\'educazione a distanza' },
      { id: 'blended-learning', name: 'Apprendimento Misto', description: 'Integrazione di modalità presenziali e digitali' },
      { id: 'mobile-learning', name: 'Mobile Learning', description: 'Apprendimento attraverso dispositivi mobili' }
    ]
  },
  {
    id: 'ai-education',
    name: 'AI nell\'Educazione',
    description: 'Intelligenza artificiale applicata all\'apprendimento e all\'insegnamento',
    icon: 'Brain',
    color: 'from-purple-500 to-pink-600',
    subcategories: [
      { id: 'ai-ethics', name: 'Etica AI', description: 'Uso responsabile dell\'AI in educazione' },
      { id: 'personalized-learning', name: 'Apprendimento Personalizzato', description: 'AI per la personalizzazione educativa' },
      { id: 'intelligent-tutoring', name: 'Tutoring Intelligente', description: 'Sistemi di tutoring basati su AI' },
      { id: 'learning-analytics', name: 'Learning Analytics', description: 'Analisi dei dati di apprendimento' }
    ]
  },
  {
    id: 'open-education',
    name: 'Educazione Aperta',
    description: 'Risorse educative aperte e accessibili a tutti',
    icon: 'Globe',
    color: 'from-orange-500 to-red-600',
    subcategories: [
      { id: 'oer', name: 'Risorse Educative Aperte', description: 'Contenuti educativi liberi e aperti' },
      { id: 'open-access', name: 'Accesso Aperto', description: 'Pubblicazioni scientifiche ad accesso libero' },
      { id: 'creative-commons', name: 'Creative Commons', description: 'Licenze aperte per contenuti educativi' },
      { id: 'open-source-tools', name: 'Strumenti Open Source', description: 'Software libero per l\'educazione' }
    ]
  },
  {
    id: 'research-methods',
    name: 'Metodologie di Ricerca',
    description: 'Approcci e metodi per la ricerca educativa',
    icon: 'Search',
    color: 'from-cyan-500 to-blue-600',
    subcategories: [
      { id: 'action-research', name: 'Ricerca-Azione', description: 'Metodologie di ricerca partecipativa' },
      { id: 'ethnography', name: 'Etnografia', description: 'Studi etnografici in contesti educativi' },
      { id: 'mixed-methods', name: 'Metodi Misti', description: 'Approcci qualitativi e quantitativi combinati' },
      { id: 'data-science', name: 'Data Science Educativa', description: 'Analisi di big data nell\'educazione' }
    ]
  },
  {
    id: 'innovation-education',
    name: 'Innovazione Educativa',
    description: 'Nuovi approcci e metodologie per l\'educazione del futuro',
    icon: 'Lightbulb',
    color: 'from-yellow-500 to-orange-600',
    subcategories: [
      { id: 'design-thinking', name: 'Design Thinking', description: 'Approcci creativi alla risoluzione di problemi' },
      { id: 'gamification', name: 'Gamification', description: 'Elementi di gioco nell\'apprendimento' },
      { id: 'microlearning', name: 'Microlearning', description: 'Apprendimento in piccole unità' },
      { id: 'adaptive-learning', name: 'Apprendimento Adattivo', description: 'Sistemi che si adattano al learner' }
    ]
  }
];

// ALPHA TEST: Peeragogy Handbook - Primo contenuto della biblioteca
export const peeragogyHandbook: Resource = {
  id: 'peeragogy-handbook-it',
  title: 'Manuale di Peeragogy',
  originalTitle: 'The Peeragogy Handbook',
  subtitle: 'Guida completa all\'apprendimento peer-to-peer - Alpha Test Content',
  authors: [
    authors.find(a => a.id === 'howard-rheingold')!,
    authors.find(a => a.id === 'charles-danoff')!,
    authors.find(a => a.id === 'paola-ricaurte')!,
    authors.find(a => a.id === 'charlotte-pierce')!,
    authors.find(a => a.id === 'verena-roberts')!,
    authors.find(a => a.id === 'roland-legrand')!,
    authors.find(a => a.id === 'anna-keune')!
  ],
  category: 'peer-learning',
  subcategory: 'peeragogy',
  type: 'handbook',
  access: 'free',
  version: '4.0-IT',
  pages: 350,
  language: 'Italiano',
  originalLanguage: 'Inglese',
  translatedBy: ['Biblioteca Digitale Pyragogica Team'],
  rating: 4.9,
  downloads: 15420,
  likes: 2340,
  bookmarks: 890,
  views: 45600,
  description: 'Il Manuale di Peeragogy è il primo contenuto della nostra biblioteca digitale scalabile. Questa traduzione italiana completa serve come alpha test per dimostrare le capacità della piattaforma di gestire contenuti complessi, multilingue e strutturati. Il manuale esplora come le persone possono imparare insieme utilizzando metodologie innovative e tecnologie digitali.',
  tags: [
    'peer learning',
    'collaborative education',
    'community building',
    'digital pedagogy',
    'open education',
    'social learning',
    'distributed learning',
    'educational innovation',
    'traduzione italiana',
    'alpha test'
  ],
  lastUpdated: '2025-01-27',
  publishedDate: '2024-01-15',
  featured: true,
  license: 'Creative Commons Attribution-ShareAlike 4.0',
  repository: 'https://github.com/Peeragogy/Peeragogy.github.io',
  website: 'https://peeragogy.org',
  difficulty: 'intermediate',
  status: 'complete',
  translationStatus: 'partial',
  format: ['PDF', 'HTML', 'EPUB', 'Interactive Web'],
  fileSize: '2.3 MB',
  prerequisites: ['Interesse per l\'educazione', 'Esperienza di base in apprendimento collaborativo'],
  learningOutcomes: [
    'Comprendere i principi fondamentali della peeragogy',
    'Applicare metodologie di apprendimento peer-to-peer',
    'Facilitare comunità di apprendimento collaborative',
    'Utilizzare tecnologie per l\'apprendimento distribuito',
    'Progettare esperienze educative collaborative'
  ],
  relatedResources: ['ai-ethics-education-guide', 'collaborative-learning-research'],
  chapters: [
    {
      id: 1,
      title: 'Introduzione',
      originalTitle: 'Introduction',
      subtitle: 'Benvenuti nel Manuale di Peeragogy',
      pages: '1-15',
      duration: '25 min',
      available: true,
      summary: 'Introduzione ai principi fondamentali della peeragogy e alla filosofia dell\'apprendimento collaborativo.',
      keyPoints: [
        'Definizione di peeragogy',
        'Principi dell\'apprendimento tra pari',
        'Storia e evoluzione del movimento',
        'Obiettivi del manuale'
      ],
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff'],
      tags: ['introduzione', 'principi', 'filosofia'],
      difficulty: 'beginner',
      lastUpdated: '2025-01-27',
      content: `# Introduzione alla Peeragogy

La peeragogy rappresenta un approccio rivoluzionario all'apprendimento che mette al centro la collaborazione tra pari. In questo capitolo introduttivo, esploriamo come l'apprendimento tradizionale stia evolvendo verso modelli più democratici e partecipativi.

## Che cos'è la Peeragogy?

La peeragogy non è semplicemente una metodologia didattica, ma una filosofia che riconosce il valore intrinseco della conoscenza distribuita e della co-creazione. Il termine stesso, coniato da Howard Rheingold, combina "peer" (pari) e "pedagogy" (pedagogia) per descrivere un approccio all'apprendimento dove tutti sono simultaneamente insegnanti e studenti.

## Principi Fondamentali

I principi fondamentali della peeragogy includono:

### Apprendimento Reciproco e Bidirezionale
Ogni partecipante contribuisce con le proprie conoscenze ed esperienze, creando un flusso continuo di scambio educativo.

### Condivisione della Responsabilità Educativa
La responsabilità dell'apprendimento non ricade su un singolo "esperto", ma è distribuita tra tutti i membri della comunità.

### Valorizzazione delle Diverse Prospettive
La diversità di background, esperienze e punti di vista è vista come una risorsa preziosa per l'arricchimento dell'apprendimento.

### Costruzione Collaborativa della Conoscenza
La conoscenza non viene semplicemente trasmessa, ma viene co-creata attraverso l'interazione e la collaborazione.

## Storia e Evoluzione

Il movimento della peeragogy ha radici profonde nella storia dell'educazione progressiva, ma ha trovato nuova vita nell'era digitale. Dalle prime comunità online di apprendimento agli attuali MOOC (Massive Open Online Courses) e alle piattaforme collaborative, la peeragogy ha continuato a evolversi.

## Questo Manuale come Alpha Test

Questo handbook rappresenta il primo contenuto della nostra biblioteca digitale scalabile. È stato scelto come alpha test per diverse ragioni:

- **Complessità strutturale**: 14 capitoli interconnessi
- **Multilingue**: traduzione dall'inglese all'italiano
- **Metadati ricchi**: autori, tag, difficoltà, prerequisiti
- **Contenuti interattivi**: collegamenti, riferimenti, esempi pratici
- **Community-driven**: sviluppato collaborativamente

## Architettura Scalabile

La piattaforma è progettata per crescere da questo singolo manuale a migliaia di risorse:

- **Sistema modulare**: ogni risorsa è indipendente ma interconnessa
- **Categorizzazione flessibile**: tassonomia espandibile
- **Metadati standardizzati**: struttura dati uniforme
- **Ricerca semantica**: AI-powered content discovery
- **Multiformat**: supporto per PDF, HTML, video, audio, dataset

---

*La peeragogy non è solo un modo di imparare, ma un modo di essere nel mondo che riconosce l'interconnessione e l'interdipendenza di tutti i processi di apprendimento.*`
    },
    {
      id: 2,
      title: 'Motivazione',
      originalTitle: 'Motivation',
      subtitle: 'Perché facciamo peeragogy',
      pages: '16-35',
      duration: '30 min',
      available: true,
      summary: 'Esplorazione delle motivazioni profonde che spingono verso l\'apprendimento collaborativo.',
      keyPoints: [
        'Motivazioni intrinseche vs estrinseche',
        'Il ruolo della curiosità',
        'Costruzione di comunità di apprendimento',
        'Superamento dell\'isolamento educativo'
      ],
      authors: ['Paola Ricaurte', 'Charlotte Pierce'],
      tags: ['motivazione', 'psicologia', 'comunità'],
      difficulty: 'beginner',
      lastUpdated: '2025-01-27',
      content: `# Motivazione: Il Cuore della Peeragogy

La motivazione è il motore dell'apprendimento peer-to-peer. In questo capitolo analizziamo cosa spinge le persone a partecipare attivamente in comunità di apprendimento collaborative e come questa motivazione può essere coltivata e sostenuta nel contesto di una biblioteca digitale scalabile.

## La Psicologia della Motivazione nell'Apprendimento

Le ricerche in psicologia dell'educazione mostrano che l'apprendimento tra pari soddisfa tre bisogni psicologici fondamentali identificati dalla teoria dell'autodeterminazione:

### Autonomia
La peeragogy offre ai partecipanti un controllo significativo sul proprio percorso di apprendimento. In una biblioteca digitale scalabile, questo si traduce in:
- **Scelta delle risorse**: accesso a migliaia di contenuti diversi
- **Percorsi personalizzati**: AI che suggerisce contenuti basati su interessi
- **Ritmo individuale**: nessuna pressione temporale esterna
- **Modalità preferite**: testo, video, audio, interattivo

### Competenza
Attraverso la partecipazione attiva e il feedback continuo dei pari, i partecipanti sviluppano un senso di competenza che è:
- **Autentico**: basato su applicazioni reali
- **Progressivo**: costruito attraverso sfide graduali
- **Riconosciuto**: validato dalla comunità
- **Trasferibile**: applicabile in contesti diversi
- **Misurabile**: attraverso analytics e peer assessment

### Connessione
Il bisogno di appartenenza e connessione sociale è profondamente soddisfatto nelle comunità peeragogiche attraverso:
- **Reti globali**: connessioni con learner di tutto il mondo
- **Interessi condivisi**: comunità attorno a specifici argomenti
- **Supporto reciproco**: aiuto nei momenti di difficoltà
- **Celebrazione condivisa**: riconoscimento dei successi

## Motivazioni in una Biblioteca Scalabile

### Diversità di Contenuti
Una biblioteca con migliaia di risorse offre motivazioni uniche:
- **Serendipità**: scoperta casuale di contenuti interessanti
- **Approfondimento**: possibilità di esplorare argomenti in dettaglio
- **Connessioni**: vedere come diversi argomenti si collegano
- **Evoluzione**: seguire l'evoluzione di un campo nel tempo

### Personalizzazione AI
L'intelligenza artificiale può aumentare la motivazione attraverso:
- **Raccomandazioni intelligenti**: contenuti che matchano perfettamente gli interessi
- **Adaptive learning**: difficoltà che si adatta al livello del learner
- **Progress tracking**: visualizzazione chiara dei progressi
- **Social learning**: connessioni con peer con interessi simili

## Il Ruolo della Curiosità nella Scoperta

La curiosità è forse il più potente motore dell'apprendimento peeragogico. In una biblioteca scalabile:

- **Esplorazione guidata**: AI che suggerisce percorsi di scoperta
- **Cross-pollination**: connessioni inaspettate tra discipline
- **Aggiornamenti continui**: nuovi contenuti che stimolano interesse
- **Community insights**: scoperte condivise dalla comunità

## Superare l'Isolamento attraverso la Scala

Uno dei problemi più significativi dell'educazione tradizionale è l'isolamento. Una biblioteca digitale scalabile affronta questo attraverso:

### Comunità Globali
- **Massa critica**: sempre qualcuno online per discussioni
- **Diversità culturale**: prospettive da tutto il mondo
- **Expertise distribuita**: accesso a esperti in ogni campo
- **Supporto 24/7**: aiuto disponibile in ogni fuso orario

### Interconnessione dei Contenuti
- **Linked knowledge**: contenuti che si riferiscono l'uno all'altro
- **Pathways**: percorsi di apprendimento che collegano risorse
- **Cross-references**: citazioni e collegamenti tra autori
- **Evolution tracking**: come le idee si sviluppano nel tempo

## Strategie per Mantenere la Motivazione a Scala

### Gamification Intelligente
- **Achievement systems**: riconoscimenti per milestone raggiunti
- **Leaderboards**: classifiche basate su contributi alla comunità
- **Badges**: riconoscimenti per competenze specifiche
- **Challenges**: sfide collaborative per la comunità

### Feedback Loops
- **Peer review**: valutazione reciproca dei contributi
- **Community ratings**: rating collettivi delle risorse
- **Progress sharing**: condivisione dei progressi con la comunità
- **Mentorship**: connessioni tra learner esperti e novizi

### Continuous Innovation
- **New content alerts**: notifiche per nuovi contenuti di interesse
- **Technology updates**: nuove funzionalità della piattaforma
- **Community events**: webinar, discussioni, progetti collaborativi
- **Research integration**: incorporazione di nuove ricerche

## Conclusione: Motivazione come Emergenza

In una biblioteca digitale scalabile, la motivazione non è qualcosa che deve essere imposta dall'esterno, ma emerge naturalmente dalla ricchezza e diversità dell'ecosistema. Quando migliaia di risorse di alta qualità sono disponibili, quando l'AI aiuta a scoprire contenuti rilevanti, quando comunità globali offrono supporto e stimolo, la motivazione fiorisce naturalmente.

La sfida non è creare motivazione, ma creare le condizioni perché emerga spontaneamente. Questo richiede:
- **Qualità dei contenuti**: solo risorse di alto valore
- **Facilità di scoperta**: strumenti di ricerca e raccomandazione eccellenti
- **Community health**: moderazione e supporto per mantenere un ambiente positivo
- **Continuous evolution**: aggiornamento e miglioramento costante della piattaforma

---

*In una biblioteca digitale scalabile, la motivazione nasce dalla realizzazione che la conoscenza umana è infinita e interconnessa, e che ogni persona può contribuire a questo grande progetto collettivo.*`
    },
    // Capitoli 3-14 con metadati completi ma contenuto ridotto per brevità
    {
      id: 3,
      title: 'Caso di Studio: 5PH1NX',
      originalTitle: 'Case Study: 5PH1NX',
      subtitle: 'Un\'avventura di apprendimento nel cyberspazio',
      pages: '36-55',
      duration: '35 min',
      available: true,
      summary: 'Studio di caso dettagliato di una comunità di apprendimento online autogestita che dimostra i principi di scalabilità.',
      keyPoints: [
        'Nascita e evoluzione di 5PH1NX',
        'Dinamiche di gruppo online',
        'Sfide e successi nella crescita',
        'Lezioni per piattaforme scalabili'
      ],
      authors: ['Verena Roberts', 'Roland Legrand'],
      tags: ['caso studio', 'comunità online', 'autogestione', 'scalabilità'],
      difficulty: 'intermediate',
      lastUpdated: '2025-01-27'
    },
    {
      id: 4,
      title: 'Pattern, Casi d\'Uso ed Esempi',
      originalTitle: 'Patterns, Use Cases, and Examples',
      subtitle: 'Applicazioni pratiche della peeragogy scalabile',
      pages: '56-85',
      duration: '45 min',
      available: true,
      summary: 'Raccolta di pattern ricorrenti e casi d\'uso pratici per implementare l\'apprendimento peer-to-peer in sistemi scalabili.',
      keyPoints: [
        'Pattern di facilitazione scalabili',
        'Strutture organizzative modulari',
        'Strumenti e tecnologie per la crescita',
        'Esempi di successo a grande scala'
      ],
      authors: ['Anna Keune', 'Community Contributors'],
      tags: ['pattern', 'casi uso', 'esempi pratici', 'scalabilità'],
      difficulty: 'intermediate',
      lastUpdated: '2025-01-27'
    },
    {
      id: 5,
      title: 'Peeragogy in Pratica',
      originalTitle: 'Peeragogy in Practice',
      subtitle: 'Come organizzare progetti peeragogici scalabili',
      pages: '86-120',
      duration: '50 min',
      available: true,
      summary: 'Guida pratica per organizzare e gestire progetti di apprendimento collaborativo che possano crescere nel tempo.',
      keyPoints: [
        'Fasi di sviluppo del progetto scalabile',
        'Ruoli e responsabilità in crescita',
        'Gestione dei conflitti a scala',
        'Valutazione e feedback distribuiti'
      ],
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff'],
      tags: ['pratica', 'organizzazione', 'gestione progetti', 'scalabilità'],
      difficulty: 'advanced',
      lastUpdated: '2025-01-27'
    },
    // Capitoli 6-14 con metadati ma senza contenuto completo
    {
      id: 6,
      title: 'Convening a Group',
      originalTitle: 'Convening a Group',
      subtitle: 'Avviare gruppi di apprendimento peer-to-peer',
      pages: '121-145',
      duration: '40 min',
      available: false,
      summary: 'Strategie per avviare e mantenere gruppi di apprendimento peer-to-peer in ambienti digitali scalabili.',
      keyPoints: [
        'Identificare partecipanti in comunità globali',
        'Creare spazi sicuri virtuali',
        'Facilitare le prime interazioni online',
        'Costruire fiducia a distanza'
      ],
      authors: ['Charlotte Pierce', 'Paola Ricaurte'],
      tags: ['facilitazione', 'community building', 'gruppi'],
      difficulty: 'intermediate'
    },
    {
      id: 7,
      title: 'K-12 Peeragogy',
      originalTitle: 'K-12 Peeragogy',
      subtitle: 'Peer learning nelle scuole',
      pages: '146-175',
      duration: '42 min',
      available: false,
      summary: 'Applicazione dei principi peeragogici nell\'educazione primaria e secondaria con supporto tecnologico.',
      keyPoints: [
        'Adattamento ai contesti scolastici',
        'Coinvolgimento degli insegnanti',
        'Progetti collaborativi digitali',
        'Valutazione peer-to-peer assistita da AI'
      ],
      authors: ['Anna Keune', 'Verena Roberts'],
      tags: ['scuola', 'K-12', 'educazione formale'],
      difficulty: 'intermediate'
    },
    {
      id: 8,
      title: 'P2P SOLE, Workplace, and Distributed Teams',
      originalTitle: 'P2P SOLE, Workplace, and Distributed Teams',
      subtitle: 'Peeragogy in contesti professionali distribuiti',
      pages: '176-205',
      duration: '38 min',
      available: false,
      summary: 'Implementazione dell\'apprendimento peer-to-peer in contesti professionali e team distribuiti globalmente.',
      keyPoints: [
        'Self-Organized Learning Environments scalabili',
        'Apprendimento sul posto di lavoro digitale',
        'Team virtuali e distribuiti',
        'Knowledge management collaborativo'
      ],
      authors: ['Roland Legrand', 'Community Contributors'],
      tags: ['workplace', 'team distribuiti', 'SOLE'],
      difficulty: 'advanced'
    },
    {
      id: 9,
      title: 'Researching Peeragogy',
      originalTitle: 'Researching Peeragogy',
      subtitle: 'Metodologie per studiare l\'apprendimento peer-to-peer',
      pages: '206-235',
      duration: '44 min',
      available: false,
      summary: 'Metodologie di ricerca per studiare e valutare l\'apprendimento collaborativo in ambienti digitali scalabili.',
      keyPoints: [
        'Approcci qualitativi e quantitativi',
        'Etnografia digitale a grande scala',
        'Action research distribuita',
        'Metriche di successo per piattaforme scalabili'
      ],
      authors: ['Paola Ricaurte', 'Anna Keune'],
      tags: ['ricerca', 'metodologie', 'valutazione'],
      difficulty: 'advanced'
    },
    {
      id: 10,
      title: 'Technologies, Services, and Platforms',
      originalTitle: 'Technologies, Services, and Platforms',
      subtitle: 'Strumenti digitali per peer learning scalabile',
      pages: '236-265',
      duration: '40 min',
      available: false,
      summary: 'Panoramica delle tecnologie e piattaforme che supportano l\'apprendimento peer-to-peer a grande scala.',
      keyPoints: [
        'Piattaforme collaborative scalabili',
        'Strumenti di comunicazione distribuita',
        'Sistemi di gestione della conoscenza',
        'Tecnologie emergenti per l\'educazione'
      ],
      authors: ['Howard Rheingold', 'Roland Legrand'],
      tags: ['tecnologie', 'piattaforme', 'strumenti'],
      difficulty: 'intermediate'
    },
    {
      id: 11,
      title: 'Forums',
      originalTitle: 'Forums',
      subtitle: 'Progettare spazi per l\'interazione peer scalabile',
      pages: '266-285',
      duration: '35 min',
      available: false,
      summary: 'Progettazione e gestione di forum e spazi di discussione per l\'apprendimento collaborativo a grande scala.',
      keyPoints: [
        'Architettura dell\'informazione scalabile',
        'Moderazione collaborativa distribuita',
        'Dinamiche di partecipazione in comunità grandi',
        'Sostenibilità delle comunità globali'
      ],
      authors: ['Verena Roberts', 'Charlotte Pierce'],
      tags: ['forum', 'discussioni', 'moderazione'],
      difficulty: 'intermediate'
    },
    {
      id: 12,
      title: 'Assessment',
      originalTitle: 'Assessment',
      subtitle: 'Valutazione dell\'apprendimento in contesti peer scalabili',
      pages: '286-310',
      duration: '38 min',
      available: false,
      summary: 'Metodologie di valutazione adatte all\'apprendimento peer-to-peer in ambienti digitali scalabili.',
      keyPoints: [
        'Valutazione formativa vs sommativa distribuita',
        'Peer assessment assistito da AI',
        'Self-assessment in comunità globali',
        'Portfolio e documentazione digitale'
      ],
      authors: ['Anna Keune', 'Paola Ricaurte'],
      tags: ['valutazione', 'assessment', 'portfolio'],
      difficulty: 'advanced'
    },
    {
      id: 13,
      title: 'Technologies for Peeragogy',
      originalTitle: 'Technologies for Peeragogy',
      subtitle: 'Tecnologie avanzate per l\'apprendimento collaborativo',
      pages: '311-335',
      duration: '42 min',
      available: false,
      summary: 'Approfondimento su tecnologie avanzate per supportare l\'apprendimento collaborativo scalabile.',
      keyPoints: [
        'AI e machine learning per l\'educazione',
        'Realtà virtuale e aumentata collaborative',
        'Blockchain per credenziali distribuite',
        'Internet of Things educativo'
      ],
      authors: ['Roland Legrand', 'Community Contributors'],
      tags: ['AI', 'VR', 'blockchain', 'IoT'],
      difficulty: 'advanced'
    },
    {
      id: 14,
      title: 'Action and Change in the Peeragogy Project',
      originalTitle: 'Action and Change in the Peeragogy Project',
      subtitle: 'Evoluzione e direzioni future della peeragogy scalabile',
      pages: '336-350',
      duration: '30 min',
      available: false,
      summary: 'Riflessioni sull\'evoluzione del progetto Peeragogy e direzioni future per l\'apprendimento collaborativo scalabile.',
      keyPoints: [
        'Storia del progetto e crescita',
        'Lezioni apprese sulla scalabilità',
        'Sfide attuali e future',
        'Visione per l\'educazione globale'
      ],
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff', 'Community Contributors'],
      tags: ['evoluzione', 'futuro', 'visione'],
      difficulty: 'intermediate'
    }
  ]
};

// Additional Resources - Esempi di contenuti futuri per dimostrare scalabilità
export const additionalResources: Resource[] = [
  {
    id: 'ai-ethics-education-guide',
    title: 'Guida all\'Etica AI nell\'Educazione',
    subtitle: 'Principi e pratiche per un uso responsabile dell\'intelligenza artificiale',
    authors: [authors.find(a => a.id === 'giovanni-bianchi')!],
    category: 'ai-education',
    subcategory: 'ai-ethics',
    type: 'guide',
    access: 'free',
    pages: 120,
    language: 'Italiano',
    rating: 4.8,
    likes: 567,
    bookmarks: 289,
    views: 12400,
    downloads: 3200,
    description: 'Una guida completa per educatori e istituzioni su come implementare l\'intelligenza artificiale nell\'educazione in modo etico e responsabile. Parte della biblioteca scalabile per dimostrare la gestione di contenuti diversificati.',
    tags: ['AI ethics', 'responsible AI', 'education technology', 'guidelines', 'institutional policy'],
    lastUpdated: '2025-01-20',
    publishedDate: '2024-12-15',
    featured: false,
    license: 'Creative Commons Attribution 4.0',
    difficulty: 'intermediate',
    status: 'complete',
    format: ['PDF', 'HTML', 'Interactive'],
    fileSize: '1.8 MB',
    prerequisites: ['Conoscenza base di AI', 'Esperienza in educazione'],
    learningOutcomes: [
      'Comprendere le implicazioni etiche dell\'AI in educazione',
      'Sviluppare policy per l\'uso responsabile dell\'AI',
      'Implementare sistemi AI trasparenti e fair'
    ],
    relatedResources: ['peeragogy-handbook-it', 'collaborative-learning-research']
  },
  {
    id: 'collaborative-learning-research',
    title: 'Ricerca sull\'Apprendimento Collaborativo',
    subtitle: 'Studi empirici e metodologie innovative per l\'era digitale',
    authors: [authors.find(a => a.id === 'maria-rossi')!],
    category: 'research-methods',
    subcategory: 'action-research',
    type: 'research',
    access: 'free',
    pages: 200,
    language: 'Italiano',
    rating: 4.7,
    likes: 423,
    bookmarks: 156,
    views: 8900,
    downloads: 2100,
    description: 'Raccolta di ricerche empiriche sull\'efficacia dell\'apprendimento collaborativo in diversi contesti educativi. Dimostra come la biblioteca possa gestire contenuti accademici e di ricerca.',
    tags: ['research', 'collaborative learning', 'empirical studies', 'methodology', 'data analysis'],
    lastUpdated: '2025-01-15',
    publishedDate: '2024-11-30',
    featured: false,
    license: 'Creative Commons Attribution-NonCommercial 4.0',
    difficulty: 'advanced',
    status: 'complete',
    format: ['PDF', 'Dataset', 'Supplementary Materials'],
    fileSize: '3.2 MB',
    prerequisites: ['Metodologie di ricerca', 'Statistica di base'],
    learningOutcomes: [
      'Analizzare ricerche sull\'apprendimento collaborativo',
      'Applicare metodologie di ricerca empirica',
      'Interpretare dati di ricerca educativa'
    ],
    relatedResources: ['peeragogy-handbook-it']
  },
  {
    id: 'digital-pedagogy-toolkit',
    title: 'Toolkit di Pedagogia Digitale',
    subtitle: 'Strumenti pratici per l\'innovazione educativa',
    authors: [authors.find(a => a.id === 'luca-ferrari')!],
    category: 'digital-pedagogy',
    subcategory: 'educational-technology',
    type: 'tool',
    access: 'community',
    pages: 80,
    language: 'Italiano',
    rating: 4.6,
    likes: 234,
    bookmarks: 89,
    views: 5600,
    downloads: 1200,
    description: 'Una collezione di strumenti digitali e metodologie per innovare la pratica educativa. Esempio di come la biblioteca possa includere risorse pratiche e toolkit.',
    tags: ['digital tools', 'pedagogy', 'innovation', 'practical guide', 'technology integration'],
    lastUpdated: '2025-01-10',
    publishedDate: '2024-10-20',
    featured: false,
    license: 'Creative Commons Attribution-ShareAlike 4.0',
    difficulty: 'beginner',
    status: 'in-progress',
    format: ['Interactive Web', 'Mobile App', 'PDF'],
    fileSize: '1.2 MB',
    prerequisites: ['Competenze digitali di base'],
    learningOutcomes: [
      'Utilizzare strumenti digitali per l\'educazione',
      'Progettare esperienze di apprendimento innovative',
      'Integrare tecnologia e pedagogia'
    ]
  }
];

// Library Statistics - Aggiornate per riflettere la natura scalabile
export const libraryStats: LibraryStats = {
  totalResources: 4, // Crescerà nel tempo
  totalAuthors: 10,
  totalDownloads: 21920,
  totalPages: 750,
  totalChapters: 14, // Solo dal Peeragogy Handbook
  languages: ['Italiano', 'Inglese'],
  categories: 6,
  avgRating: 4.75,
  lastUpdated: '2025-01-27'
};

// Export all resources
export const allResources: Resource[] = [peeragogyHandbook, ...additionalResources];

// Utility functions per la gestione scalabile
export const getResourcesByCategory = (categoryId: string): Resource[] => {
  return allResources.filter(resource => resource.category === categoryId);
};

export const getFeaturedResources = (): Resource[] => {
  return allResources.filter(resource => resource.featured);
};

export const getResourcesByAccess = (access: 'free' | 'premium' | 'community'): Resource[] => {
  return allResources.filter(resource => resource.access === access);
};

export const getResourcesByType = (type: string): Resource[] => {
  return allResources.filter(resource => resource.type === type);
};

export const getResourcesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Resource[] => {
  return allResources.filter(resource => resource.difficulty === difficulty);
};

export const getResourcesByLanguage = (language: string): Resource[] => {
  return allResources.filter(resource => resource.language === language);
};

export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase();
  return allResources.filter(resource => 
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    resource.authors.some(author => author.name.toLowerCase().includes(lowercaseQuery)) ||
    (resource.chapters && resource.chapters.some(chapter => 
      chapter.title.toLowerCase().includes(lowercaseQuery) ||
      chapter.summary.toLowerCase().includes(lowercaseQuery)
    ))
  );
};

export const getRelatedResources = (resourceId: string): Resource[] => {
  const resource = allResources.find(r => r.id === resourceId);
  if (!resource || !resource.relatedResources) return [];
  
  return allResources.filter(r => resource.relatedResources!.includes(r.id));
};

export const getResourcesByAuthor = (authorId: string): Resource[] => {
  return allResources.filter(resource => 
    resource.authors.some(author => author.id === authorId)
  );
};

// Funzioni per analytics e insights
export const getLibraryInsights = () => {
  const totalViews = allResources.reduce((sum, resource) => sum + (resource.views || 0), 0);
  const totalLikes = allResources.reduce((sum, resource) => sum + (resource.likes || 0), 0);
  const avgRating = allResources.reduce((sum, resource) => sum + resource.rating, 0) / allResources.length;
  
  return {
    totalViews,
    totalLikes,
    avgRating: Math.round(avgRating * 10) / 10,
    mostPopular: allResources.sort((a, b) => (b.views || 0) - (a.views || 0))[0],
    newestResource: allResources.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())[0]
  };
};