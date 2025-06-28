export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  pages: string;
  duration: string;
  available: boolean;
  content?: string;
  summary: string;
  keyPoints: string[];
  authors: string[];
}

export interface PeeragogyHandbook {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  category: string;
  type: string;
  version: string;
  pages: number;
  language: string;
  rating: number;
  downloads: number;
  likes: number;
  bookmarks: number;
  description: string;
  chapters: Chapter[];
  tags: string[];
  lastUpdated: string;
  featured: boolean;
  isbn?: string;
  license: string;
  repository: string;
}

export const peeragogyHandbook: PeeragogyHandbook = {
  id: 'peeragogy-handbook',
  title: 'The Peeragogy Handbook',
  subtitle: 'A comprehensive guide to peer learning and collaboration',
  authors: [
    'Howard Rheingold',
    'Charles Jeffrey Danoff',
    'Paola Ricaurte',
    'Charlotte Pierce',
    'Verena Roberts',
    'Roland Legrand',
    'Anna Keune',
    'Community Contributors'
  ],
  category: 'peeragogy',
  type: 'free',
  version: '4.0',
  pages: 350,
  language: 'English/Italian',
  rating: 4.9,
  downloads: 15420,
  likes: 2340,
  bookmarks: 890,
  description: 'Il Peeragogy Handbook è una guida completa all\'apprendimento tra pari e alla collaborazione. Questo libro open source esplora come le persone possono imparare insieme in modo efficace, utilizzando tecnologie digitali e metodologie innovative. Basato su anni di ricerca e pratica collaborativa, offre strumenti concreti per facilitare l\'apprendimento peer-to-peer in contesti educativi, professionali e comunitari.',
  license: 'Creative Commons Attribution-ShareAlike 4.0',
  repository: 'https://github.com/Peeragogy/Peeragogy.github.io',
  chapters: [
    {
      id: 1,
      title: 'Introduction',
      subtitle: 'Welcome to the Peeragogy Handbook',
      pages: '1-15',
      duration: '25 min',
      available: true,
      summary: 'Introduzione ai principi fondamentali della peeragogy e alla filosofia dell\'apprendimento collaborativo.',
      keyPoints: [
        'Definizione di peeragogy',
        'Principi dell\'apprendimento tra pari',
        'Storia e evoluzione del movimento',
        'Obiettivi del handbook'
      ],
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff'],
      content: `La peeragogy rappresenta un approccio rivoluzionario all'apprendimento che mette al centro la collaborazione tra pari. 
      
      In questo capitolo introduttivo, esploriamo come l'apprendimento tradizionale stia evolvendo verso modelli più democratici e partecipativi. La peeragogy non è semplicemente una metodologia didattica, ma una filosofia che riconosce il valore intrinseco della conoscenza distribuita e della co-creazione.

      I principi fondamentali includono:
      - Apprendimento reciproco e bidirezionale
      - Condivisione della responsabilità educativa
      - Valorizzazione delle diverse prospettive
      - Costruzione collaborativa della conoscenza

      Questo handbook è nato dalla collaborazione di educatori, ricercatori e practitioner di tutto il mondo, rappresentando un esempio vivente dei principi che descrive.`
    },
    {
      id: 2,
      title: 'Motivation',
      subtitle: 'Why we do peeragogy',
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
      content: `La motivazione è il motore dell'apprendimento peer-to-peer. In questo capitolo analizziamo cosa spinge le persone a partecipare attivamente in comunità di apprendimento collaborative.

      Le ricerche mostrano che l'apprendimento tra pari soddisfa bisogni fondamentali:
      - Autonomia: controllo sul proprio percorso di apprendimento
      - Competenza: sviluppo di abilità attraverso la pratica
      - Connessione: senso di appartenenza a una comunità

      La peeragogy trasforma l'educazione da processo passivo a esperienza attiva e coinvolgente.`
    },
    {
      id: 3,
      title: 'Case Study: 5PH1NX',
      subtitle: 'A learning adventure in cyberspace',
      pages: '36-55',
      duration: '35 min',
      available: true,
      summary: 'Studio di caso dettagliato di una comunità di apprendimento online autogestita.',
      keyPoints: [
        'Nascita e evoluzione di 5PH1NX',
        'Dinamiche di gruppo online',
        'Sfide e successi',
        'Lezioni apprese'
      ],
      authors: ['Verena Roberts', 'Roland Legrand'],
      content: `5PH1NX rappresenta un esempio paradigmatico di come una comunità di apprendimento possa emergere spontaneamente online.

      Nato come esperimento di apprendimento collaborativo, 5PH1NX ha dimostrato come:
      - L'autoorganizzazione può emergere naturalmente
      - La diversità di background arricchisce l'apprendimento
      - La tecnologia facilita ma non determina la collaborazione
      - La persistenza e l'adattabilità sono chiavi del successo

      Questo caso studio offre insights preziosi per chiunque voglia avviare iniziative simili.`
    },
    {
      id: 4,
      title: 'Patterns, Use Cases, and Examples',
      subtitle: 'Practical applications of peeragogy',
      pages: '56-85',
      duration: '45 min',
      available: true,
      summary: 'Raccolta di pattern ricorrenti e casi d\'uso pratici nell\'apprendimento peer-to-peer.',
      keyPoints: [
        'Pattern di facilitazione',
        'Strutture organizzative',
        'Strumenti e tecnologie',
        'Esempi di successo'
      ],
      authors: ['Anna Keune', 'Community Contributors'],
      content: `I pattern rappresentano soluzioni ricorrenti a problemi comuni nell'apprendimento collaborativo.

      Pattern principali identificati:
      - Wrapper: strutturare l'esperienza di apprendimento
      - Heartbeat: mantenere il ritmo della comunità
      - Carrying Capacity: gestire la crescita sostenibile
      - Newcomer: integrare nuovi membri

      Ogni pattern include descrizione, contesto d'uso, e esempi pratici di implementazione.`
    },
    {
      id: 5,
      title: 'Peeragogy in Practice',
      subtitle: 'How to organize a peeragogy project',
      pages: '86-120',
      duration: '50 min',
      available: true,
      summary: 'Guida pratica per organizzare e gestire progetti di apprendimento collaborativo.',
      keyPoints: [
        'Fasi di sviluppo del progetto',
        'Ruoli e responsabilità',
        'Gestione dei conflitti',
        'Valutazione e feedback'
      ],
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff'],
      content: `Organizzare un progetto di peeragogy richiede attenzione a dinamiche umane e strutture organizzative.

      Fasi chiave:
      1. Formazione: definire obiettivi e aspettative
      2. Storming: navigare conflitti e differenze
      3. Norming: stabilire regole e procedure
      4. Performing: raggiungere obiettivi collaborativi

      La chiave è bilanciare struttura e flessibilità, permettendo emergenza e autoorganizzazione.`
    },
    {
      id: 6,
      title: 'Convening a Group',
      subtitle: 'Getting started with peer learning',
      pages: '121-145',
      duration: '40 min',
      available: true,
      summary: 'Strategie per avviare e mantenere gruppi di apprendimento peer-to-peer.',
      keyPoints: [
        'Identificare partecipanti',
        'Creare spazi sicuri',
        'Facilitare le prime interazioni',
        'Costruire fiducia'
      ],
      authors: ['Charlotte Pierce', 'Paola Ricaurte'],
      content: `Avviare un gruppo di apprendimento collaborativo è un'arte che combina intuizione sociale e competenze organizzative.

      Elementi essenziali:
      - Chiarezza di intenti e obiettivi
      - Diversità di prospettive e competenze
      - Spazi fisici o virtuali accoglienti
      - Rituali di connessione e condivisione

      Il successo dipende dalla capacità di creare un ambiente dove tutti si sentano valorizzati e ascoltati.`
    },
    {
      id: 7,
      title: 'K-12 Peeragogy',
      subtitle: 'Peer learning in schools',
      pages: '146-175',
      duration: '42 min',
      available: true,
      summary: 'Applicazione dei principi peeragogici nell\'educazione primaria e secondaria.',
      keyPoints: [
        'Adattamento ai contesti scolastici',
        'Coinvolgimento degli insegnanti',
        'Progetti collaborativi',
        'Valutazione peer-to-peer'
      ],
      authors: ['Anna Keune', 'Verena Roberts'],
      content: `L'integrazione della peeragogy nelle scuole richiede un ripensamento dei ruoli tradizionali di insegnanti e studenti.

      Strategie efficaci:
      - Progetti interdisciplinari collaborativi
      - Peer tutoring e mentoring
      - Valutazione tra pari strutturata
      - Spazi di apprendimento flessibili

      Gli insegnanti diventano facilitatori dell'apprendimento piuttosto che trasmettitori di conoscenza.`
    },
    {
      id: 8,
      title: 'P2P SOLE, Workplace, and Distributed Teams',
      subtitle: 'Peeragogy in professional contexts',
      pages: '176-205',
      duration: '38 min',
      available: true,
      summary: 'Implementazione dell\'apprendimento peer-to-peer in contesti professionali e team distribuiti.',
      keyPoints: [
        'Self-Organized Learning Environments',
        'Apprendimento sul posto di lavoro',
        'Team virtuali e distribuiti',
        'Knowledge management collaborativo'
      ],
      authors: ['Roland Legrand', 'Community Contributors'],
      content: `Il mondo del lavoro moderno richiede apprendimento continuo e collaborazione distribuita.

      Applicazioni professionali:
      - Communities of Practice aziendali
      - Peer learning sessions
      - Cross-functional collaboration
      - Remote team building

      La peeragogy offre strumenti per trasformare il workplace in un ambiente di apprendimento continuo.`
    },
    {
      id: 9,
      title: 'Researching Peeragogy',
      subtitle: 'Methods and approaches for studying peer learning',
      pages: '206-235',
      duration: '44 min',
      available: true,
      summary: 'Metodologie di ricerca per studiare e valutare l\'apprendimento collaborativo.',
      keyPoints: [
        'Approcci qualitativi e quantitativi',
        'Etnografia digitale',
        'Action research',
        'Metriche di successo'
      ],
      authors: ['Paola Ricaurte', 'Anna Keune'],
      content: `La ricerca in peeragogy richiede metodologie innovative che catturino la complessità dell'apprendimento collaborativo.

      Approcci metodologici:
      - Ricerca partecipativa
      - Analisi delle reti sociali
      - Etnografia delle comunità online
      - Mixed methods research

      L'obiettivo è comprendere non solo cosa funziona, ma perché e in quali contesti.`
    },
    {
      id: 10,
      title: 'Technologies, Services, and Platforms',
      subtitle: 'Digital tools for peer learning',
      pages: '236-265',
      duration: '40 min',
      available: true,
      summary: 'Panoramica delle tecnologie e piattaforme che supportano l\'apprendimento peer-to-peer.',
      keyPoints: [
        'Piattaforme collaborative',
        'Strumenti di comunicazione',
        'Sistemi di gestione della conoscenza',
        'Tecnologie emergenti'
      ],
      authors: ['Howard Rheingold', 'Roland Legrand'],
      content: `La tecnologia è un enabler fondamentale per la peeragogy moderna, ma deve essere scelta e utilizzata consapevolmente.

      Categorie di strumenti:
      - Comunicazione sincrona e asincrona
      - Condivisione e co-creazione di contenuti
      - Gestione di progetti collaborativi
      - Valutazione e feedback peer-to-peer

      L'importante è che la tecnologia serva la pedagogia, non il contrario.`
    },
    {
      id: 11,
      title: 'Forums',
      subtitle: 'Designing spaces for peer interaction',
      pages: '266-285',
      duration: '35 min',
      available: true,
      summary: 'Progettazione e gestione di forum e spazi di discussione per l\'apprendimento collaborativo.',
      keyPoints: [
        'Architettura dell\'informazione',
        'Moderazione collaborativa',
        'Dinamiche di partecipazione',
        'Sostenibilità delle comunità'
      ],
      authors: ['Verena Roberts', 'Charlotte Pierce'],
      content: `I forum rappresentano spazi cruciali per l'apprendimento asincrono e la costruzione di conoscenza collettiva.

      Principi di design:
      - Struttura chiara e navigabile
      - Regole di partecipazione condivise
      - Meccanismi di quality control
      - Incentivi alla partecipazione attiva

      Un forum ben progettato diventa un repository vivente di conoscenza comunitaria.`
    },
    {
      id: 12,
      title: 'Assessment',
      subtitle: 'Evaluating learning in peer contexts',
      pages: '286-310',
      duration: '38 min',
      available: true,
      summary: 'Metodologie di valutazione adatte all\'apprendimento peer-to-peer.',
      keyPoints: [
        'Valutazione formativa vs sommativa',
        'Peer assessment',
        'Self-assessment',
        'Portfolio e documentazione'
      ],
      authors: ['Anna Keune', 'Paola Ricaurte'],
      content: `La valutazione in contesti peeragogici richiede approcci innovativi che valorizzino il processo oltre al prodotto.

      Strategie di assessment:
      - Rubric collaborative
      - Peer review strutturato
      - Reflection journals
      - Learning analytics

      L'obiettivo è supportare l'apprendimento continuo piuttosto che semplicemente misurarlo.`
    },
    {
      id: 13,
      title: 'Technologies for Peeragogy',
      subtitle: 'Advanced digital tools and platforms',
      pages: '311-335',
      duration: '42 min',
      available: true,
      summary: 'Approfondimento su tecnologie avanzate per supportare l\'apprendimento collaborativo.',
      keyPoints: [
        'AI e machine learning',
        'Realtà virtuale e aumentata',
        'Blockchain per credenziali',
        'Internet of Things educativo'
      ],
      authors: ['Roland Legrand', 'Community Contributors'],
      content: `Le tecnologie emergenti offrono nuove possibilità per l'apprendimento peer-to-peer.

      Innovazioni promettenti:
      - Sistemi di raccomandazione intelligenti
      - Ambienti immersivi per la collaborazione
      - Credenziali digitali verificabili
      - Sensori per learning analytics

      La sfida è integrare queste tecnologie mantenendo focus sui principi peeragogici.`
    },
    {
      id: 14,
      title: 'Action and Change in the Peeragogy Project',
      subtitle: 'Evolution and future directions',
      pages: '336-350',
      duration: '30 min',
      available: true,
      summary: 'Riflessioni sull\'evoluzione del progetto Peeragogy e direzioni future.',
      keyPoints: [
        'Storia del progetto',
        'Lezioni apprese',
        'Sfide attuali',
        'Visione futura'
      ],
      authors: ['Howard Rheingold', 'Charles Jeffrey Danoff', 'Community Contributors'],
      content: `Il progetto Peeragogy stesso è un esempio vivente dei principi che promuove.

      Evoluzione del progetto:
      - Dalla prima edizione alle versioni successive
      - Crescita della comunità globale
      - Adattamento a nuovi contesti e tecnologie
      - Impatto su educazione e formazione

      Il futuro della peeragogy dipende dalla capacità di adattarsi mantenendo i valori fondamentali.`
    }
  ],
  tags: [
    'peer learning',
    'collaborative education',
    'community building',
    'digital pedagogy',
    'open education',
    'social learning',
    'distributed learning',
    'educational innovation'
  ],
  lastUpdated: '2024-01-15',
  featured: true
};

export const additionalPeeragogyResources = [
  {
    id: 'peeragogy-patterns',
    title: 'Peeragogy Pattern Language',
    author: 'Peeragogy Community',
    category: 'peeragogy',
    type: 'free',
    duration: '2h 30min',
    rating: 4.8,
    participants: 890,
    likes: 456,
    bookmarks: 234,
    description: 'Una collezione strutturata di pattern ricorrenti nell\'apprendimento peer-to-peer, con esempi pratici e linee guida per l\'implementazione.',
    tags: ['patterns', 'design', 'methodology', 'best practices'],
    featured: false
  },
  {
    id: 'peeragogy-workbook',
    title: 'Peeragogy Workbook',
    author: 'Charlotte Pierce, Anna Keune',
    category: 'peeragogy',
    type: 'free',
    duration: '1h 45min',
    rating: 4.7,
    participants: 1240,
    likes: 678,
    bookmarks: 345,
    description: 'Esercizi pratici e attività per implementare i principi peeragogici in contesti educativi e professionali.',
    tags: ['exercises', 'activities', 'practical', 'implementation'],
    featured: false
  },
  {
    id: 'peer-learning-research',
    title: 'Research in Peer Learning',
    author: 'Paola Ricaurte, Academic Community',
    category: 'peer-learning',
    type: 'premium',
    duration: '3h 15min',
    rating: 4.9,
    participants: 567,
    likes: 789,
    bookmarks: 456,
    description: 'Raccolta di ricerche accademiche e studi empirici sull\'efficacia dell\'apprendimento tra pari in diversi contesti.',
    tags: ['research', 'academic', 'empirical studies', 'effectiveness'],
    featured: false
  },
  {
    id: 'ai-ethics-education',
    title: 'AI Ethics in Peer Learning',
    author: 'Prof. Giovanni Bianchi, Ethics Committee',
    category: 'ai-ethics',
    type: 'premium',
    duration: '2h 45min',
    rating: 4.8,
    participants: 432,
    likes: 567,
    bookmarks: 289,
    description: 'Analisi delle implicazioni etiche dell\'intelligenza artificiale nell\'educazione peer-to-peer e linee guida per un uso responsabile.',
    tags: ['AI ethics', 'responsible AI', 'education technology', 'guidelines'],
    featured: false
  }
];