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
  downloadUrl?: string;
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

// Enhanced Authors Database with V3 contributors
export const authors: Author[] = [
  {
    id: 'howard-rheingold',
    name: 'Howard Rheingold',
    bio: 'Critico, scrittore e teorico americano specializzato nelle implicazioni culturali, sociali e politiche delle tecnologie di comunicazione moderne. Fondatore del concetto di peeragogy.',
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
    id: 'lisa-snow-macdonald',
    name: 'Lisa Snow MacDonald',
    bio: 'Esperta in design educativo e facilitazione di comunità di apprendimento.',
    avatar: 'LSM'
  },
  {
    id: 'christopher-neal',
    name: 'Christopher Tillman Neal',
    bio: 'Ricercatore in pedagogia collaborativa e tecnologie per l\'apprendimento.',
    avatar: 'CTN'
  },
  {
    id: 'bryan-alexander',
    name: 'Bryan Alexander',
    bio: 'Futurista dell\'educazione e esperto in tecnologie educative emergenti.',
    avatar: 'BA',
    website: 'https://bryanalexander.org'
  },
  // Additional authors for scalability demonstration
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

// Import extracted content from V3
import { extractedPeeragogyV3, convertToLibraryFormat } from './peeragogyExtractor';

// MAIN RESOURCE: Peeragogy Handbook V3 (English Original)
export const peeragogyHandbookV3 = convertToLibraryFormat(extractedPeeragogyV3);

// EXISTING RESOURCE: Peeragogy Handbook IT (Translation)
export const peeragogyHandbookIT: Resource = {
  id: 'peeragogy-handbook-it',
  title: 'Manuale di Peeragogy',
  originalTitle: 'The Peeragogy Handbook',
  subtitle: 'Guida completa all\'apprendimento peer-to-peer - Traduzione Italiana',
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
  description: 'Traduzione italiana completa del Manuale di Peeragogy. Questa guida esplora come le persone possono imparare insieme utilizzando metodologie innovative e tecnologie digitali, fornendo sia fondamenti teorici che tecniche pratiche.',
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
    'manuale completo'
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
  relatedResources: ['peeragogy-handbook-v3-en'],
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
      lastUpdated: '2025-01-27'
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
      lastUpdated: '2025-01-27'
    }
    // Additional chapters would be added here
  ]
};

// Additional Resources for scalability demonstration
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
    description: 'Una guida completa per educatori e istituzioni su come implementare l\'intelligenza artificiale nell\'educazione in modo etico e responsabile.',
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
    relatedResources: ['peeragogy-handbook-v3-en', 'peeragogy-handbook-it']
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
    description: 'Raccolta di ricerche empiriche sull\'efficacia dell\'apprendimento collaborativo in diversi contesti educativi.',
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
    relatedResources: ['peeragogy-handbook-v3-en']
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
    description: 'Una collezione di strumenti digitali e metodologie per innovare la pratica educativa.',
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

// Library Statistics - Updated with V3 content
export const libraryStats: LibraryStats = {
  totalResources: 4, // V3 English + IT Translation + 2 additional
  totalAuthors: 13,
  totalDownloads: 46720, // Updated with V3 downloads
  totalPages: 990, // V3 (240) + IT (350) + others (400)
  totalChapters: 19, // V3 (5 detailed) + IT (2 detailed) + others
  languages: ['Italiano', 'Inglese'],
  categories: 6,
  avgRating: 4.75,
  lastUpdated: '2025-01-27'
};

// Export all resources including V3
export const allResources: Resource[] = [
  peeragogyHandbookV3, // NEW: Original V3 English
  peeragogyHandbookIT, // EXISTING: Italian translation
  ...additionalResources
];

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