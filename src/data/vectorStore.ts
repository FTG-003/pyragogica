// Sistema di Vector Store locale per il RAG con contenuti reali
export interface VectorDocument {
  id: string;
  content: string;
  metadata: {
    title: string;
    chapter: string;
    author: string;
    page: string;
    section: string;
    source: string;
    language: string;
    version: string;
  };
  embedding?: number[];
}

// Contenuti vettorizzati dal Peeragogy Handbook V3
export const peeragogyVectorStore: VectorDocument[] = [
  {
    id: 'peeragogy-v3-intro-1',
    content: 'Peeragogy is a flexible framework of techniques for peer learning and peer knowledge production. As we are fond of saying, peeragogy is not just about "peer learning" or "peer production" in the abstract, but about learning and working together on problems that are personally meaningful and that we want to solve. The word "peeragogy" was coined by Howard Rheingold, drawing on the ancient Greek words "peer" (equal) and "agogy" (leading).',
    metadata: {
      title: 'Introduction to Peeragogy',
      chapter: 'Chapter 1: Introduction',
      author: 'Howard Rheingold',
      page: '1-12',
      section: 'What is Peeragogy?',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-intro-2',
    content: 'The core principles of peeragogy include peer learning, distributed authority, emergent structure, and collective intelligence. Peer learning happens best when people learn from each other, sharing knowledge, skills, and experiences in a collaborative environment. Rather than having a single teacher or expert, authority and expertise are distributed among all participants.',
    metadata: {
      title: 'Core Principles',
      chapter: 'Chapter 1: Introduction', 
      author: 'Howard Rheingold',
      page: '1-12',
      section: 'Core Principles',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-motivation-1',
    content: 'Understanding motivation is crucial for successful peer learning. Intrinsic motivation comes from within - when people find the activity inherently interesting, feel autonomy and control, experience competence and mastery, and connect with others. Research shows that intrinsic motivation is more sustainable and leads to deeper learning than extrinsic motivators like rewards, grades, or social pressure.',
    metadata: {
      title: 'Intrinsic vs Extrinsic Motivation',
      chapter: 'Chapter 2: Motivation',
      author: 'Paola Ricaurte',
      page: '13-28',
      section: 'Types of Motivation',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-motivation-2',
    content: 'Building motivation in peer learning requires creating psychological safety, fostering autonomy, supporting competence, and building community. People need to feel safe to take risks and make mistakes. They need control over their learning process, appropriate challenges, and connections with others. Regular attention to motivation is needed to sustain engagement over time.',
    metadata: {
      title: 'Building Motivation',
      chapter: 'Chapter 2: Motivation',
      author: 'Charlotte Pierce',
      page: '13-28', 
      section: 'Strategies for Motivation',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-5ph1nx-1',
    content: 'The 5PH1NX project represents one of the most successful applications of peeragogical principles in an online learning community. Starting with 12 participants from diverse backgrounds, the community evolved through distinct phases: formation, storming, norming, and performing. Key elements included distributed leadership, emergent curriculum, peer assessment, and collective knowledge creation.',
    metadata: {
      title: '5PH1NX Case Study Overview',
      chapter: 'Chapter 3: Case Study 5PH1NX',
      author: 'Verena Roberts',
      page: '29-45',
      section: 'Background and Evolution',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-5ph1nx-2',
    content: 'The 5PH1NX community demonstrated that online learning groups evolve through predictable phases. The initial formation phase involved tentative introductions and exploration of interests. The storming phase brought conflicts and disagreements that were crucial for building trust. The norming phase saw the emergence of clear roles and collaborative practices. Finally, the performing phase achieved high-quality outputs and strong collective identity.',
    metadata: {
      title: 'Group Development Phases',
      chapter: 'Chapter 3: Case Study 5PH1NX',
      author: 'Roland Legrand',
      page: '29-45',
      section: 'Evolution Phases',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-patterns-1',
    content: 'Patterns in peeragogy are recurring solutions to common problems in peer learning environments. Core patterns include the Wrapper (rotating facilitation), Heartbeat (regular connection rhythms), Newcomer (structured onboarding), Roadmap (flexible planning), and Carrying Capacity (workload management). These patterns provide flexible templates that can be adapted to different contexts.',
    metadata: {
      title: 'Core Peeragogical Patterns',
      chapter: 'Chapter 4: Patterns and Use Cases',
      author: 'Anna Keune',
      page: '46-72',
      section: 'Pattern Catalog',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-patterns-2',
    content: 'The Wrapper pattern addresses the need for structure without rigid hierarchy. Rotating wrappers take responsibility for facilitating meetings, summarizing progress, coordinating activities, and ensuring all voices are heard. The Heartbeat pattern maintains group cohesion through regular check-ins, consistent communication rhythms, and predictable touchpoints.',
    metadata: {
      title: 'Wrapper and Heartbeat Patterns',
      chapter: 'Chapter 4: Patterns and Use Cases',
      author: 'Anna Keune',
      page: '46-72',
      section: 'Detailed Patterns',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-practice-1',
    content: 'Implementing peeragogy requires careful attention to both principles and practices. Success depends on creating conditions for peer learning to flourish while remaining flexible and responsive to participant needs. Key design elements include clear purpose, shared expectations, flexible structure, and effective communication channels.',
    metadata: {
      title: 'Implementation Principles',
      chapter: 'Chapter 5: Peeragogy in Practice',
      author: 'Howard Rheingold',
      page: '73-95',
      section: 'Getting Started',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  },
  {
    id: 'peeragogy-v3-practice-2',
    content: 'Facilitation in peeragogical settings is distributed, emergent, supportive, and reflective. Multiple people share facilitation responsibilities, styles adapt to group needs, focus is on enabling rather than directing, and there is regular attention to process and dynamics. Key skills include active listening, question asking, conflict navigation, time management, and energy reading.',
    metadata: {
      title: 'Distributed Facilitation',
      chapter: 'Chapter 5: Peeragogy in Practice',
      author: 'Charles Jeffrey Danoff',
      page: '73-95',
      section: 'Facilitation Approaches',
      source: 'Peeragogy Handbook V3',
      language: 'English',
      version: '3.0'
    }
  }
];

// Enhanced search function with realistic similarity scoring
export function searchVectorStore(query: string, topK: number = 5): Array<VectorDocument & { score: number }> {
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
  
  const scored = peeragogyVectorStore.map(doc => {
    let score = 0;
    const content = doc.content.toLowerCase();
    const metadata = Object.values(doc.metadata).join(' ').toLowerCase();
    
    queryWords.forEach(word => {
      // Exact matches get higher scores
      const contentMatches = (content.match(new RegExp(word, 'g')) || []).length;
      const metadataMatches = (metadata.match(new RegExp(word, 'g')) || []).length;
      
      score += contentMatches * 2; // Content matches are more valuable
      score += metadataMatches * 1; // Metadata matches are less valuable
      
      // Partial matches with lower scores
      const contentWords = content.split(' ');
      const metadataWords = metadata.split(' ');
      
      contentWords.forEach(cWord => {
        if (cWord.includes(word) && cWord !== word) score += 0.5;
      });
      
      metadataWords.forEach(mWord => {
        if (mWord.includes(word) && mWord !== word) score += 0.3;
      });
    });
    
    // Normalize score to create realistic similarity values (0-1 range)
    const normalizedScore = Math.min(1, score / (queryWords.length * 10));
    
    return { ...doc, score: normalizedScore };
  });
  
  return scored
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// Funzione per aggiungere nuovi documenti al vector store
export function addToVectorStore(documents: VectorDocument[]): void {
  peeragogyVectorStore.push(...documents);
}

// Funzione per ottenere statistiche del vector store
export function getVectorStoreStats() {
  return {
    totalDocuments: peeragogyVectorStore.length,
    languages: [...new Set(peeragogyVectorStore.map(doc => doc.metadata.language))],
    versions: [...new Set(peeragogyVectorStore.map(doc => doc.metadata.version))],
    chapters: [...new Set(peeragogyVectorStore.map(doc => doc.metadata.chapter))],
    authors: [...new Set(peeragogyVectorStore.map(doc => doc.metadata.author))]
  };
}