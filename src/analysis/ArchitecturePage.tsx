import React from 'react';
import { Database, Brain, Users, Shield, Zap, ArrowRight, Server, Cloud, Lock } from 'lucide-react';

const ArchitecturePage = () => {
  const architectureComponents = [
    {
      id: 'frontend',
      name: 'Frontend Interface',
      description: 'React/TypeScript con design system modulare',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      details: ['Componenti riutilizzabili', 'Design responsive', 'Accessibility WCAG 2.1', 'PWA Support']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      description: 'Orchestrazione e routing delle richieste',
      icon: Server,
      color: 'from-green-500 to-teal-500',
      details: ['Rate limiting', 'Authentication', 'Request routing', 'Load balancing']
    },
    {
      id: 'rag-system',
      name: 'RAG Engine',
      description: 'Sistema di retrieval e generazione aumentata',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      details: ['Vector embeddings', 'Semantic search', 'Context augmentation', 'Multi-model support']
    },
    {
      id: 'content-db',
      name: 'Content Database',
      description: 'Repository centralizzato dei contenuti educativi',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      details: ['PostgreSQL', 'Full-text search', 'Metadata indexing', 'Version control']
    },
    {
      id: 'vector-store',
      name: 'Vector Store',
      description: 'Database vettoriale per embeddings semantici',
      icon: Zap,
      color: 'from-indigo-500 to-purple-500',
      details: ['Pinecone/Weaviate', 'Similarity search', 'Dimensionality reduction', 'Real-time indexing']
    },
    {
      id: 'auth-service',
      name: 'Authentication',
      description: 'Gestione identità e autorizzazioni',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      details: ['OAuth 2.0', 'JWT tokens', 'Role-based access', 'Multi-factor auth']
    }
  ];

  const dataFlow = [
    {
      step: 1,
      title: 'Richiesta Utente',
      description: 'L\'utente invia una query attraverso l\'interfaccia web',
      icon: Users
    },
    {
      step: 2,
      title: 'Autenticazione',
      description: 'Verifica delle credenziali e dei permessi di accesso',
      icon: Shield
    },
    {
      step: 3,
      title: 'Query Processing',
      description: 'Elaborazione della query e creazione degli embeddings',
      icon: Brain
    },
    {
      step: 4,
      title: 'Vector Search',
      description: 'Ricerca semantica nel database vettoriale',
      icon: Zap
    },
    {
      step: 5,
      title: 'Content Retrieval',
      description: 'Recupero dei contenuti rilevanti dal database',
      icon: Database
    },
    {
      step: 6,
      title: 'Response Generation',
      description: 'Generazione della risposta augmentata',
      icon: Server
    }
  ];

  const techStack = {
    frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Query'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    ai: ['OpenAI GPT-4', 'Langchain', 'Pinecone', 'Hugging Face', 'FAISS'],
    infrastructure: ['AWS/Azure', 'Kubernetes', 'Nginx', 'CloudFlare', 'Monitoring']
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Architettura Tecnica</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Un sistema scalabile e modulare per la gestione intelligente dei contenuti educativi 
          con integrazione RAG avanzata.
        </p>
      </div>

      {/* Architecture Overview */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Componenti del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureComponents.map((component) => {
            const Icon = component.icon;
            return (
              <div
                key={component.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${component.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{component.name}</h3>
                <p className="text-slate-600 mb-4">{component.description}</p>
                <div className="space-y-2">
                  {component.details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                      <span className="text-sm text-slate-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Flow */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Flusso di Elaborazione RAG</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-y-1/2 hidden lg:block"></div>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 relative">
            {dataFlow.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-2 -right-2 w-6 h-6 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 z-20">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                  {index < dataFlow.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Stack Tecnologico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(techStack).map(([category, technologies]) => (
            <div key={category} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 capitalize">
                {category === 'ai' ? 'AI/ML' : category}
              </h3>
              <div className="space-y-3">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-slate-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RAG Architecture Detail */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-8 text-center">Architettura RAG Dettagliata</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Knowledge Base</h3>
            <div className="space-y-2 text-slate-300">
              <p>• Contenuti educativi indicizzati</p>
              <p>• Metadati strutturati</p>
              <p>• Tassonomie disciplinari</p>
              <p>• Versionamento contenuti</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Embedding Engine</h3>
            <div className="space-y-2 text-slate-300">
              <p>• Trasformazione testo → vettori</p>
              <p>• Modelli multilingue</p>
              <p>• Chunking intelligente</p>
              <p>• Ottimizzazione semantica</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Response Generator</h3>
            <div className="space-y-2 text-slate-300">
              <p>• Personalità multiple</p>
              <p>• Context awareness</p>
              <p>• Adaptive prompting</p>
              <p>• Quality validation</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Sicurezza e Privacy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Protezione Dati</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• Crittografia end-to-end</li>
                <li>• Anonimizzazione query</li>
                <li>• GDPR compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Controllo Accessi</h4>
              <ul className="space-y-1 text-slate-300">
                <li>• Role-based permissions</li>
                <li>• Content-level security</li>
                <li>• Audit logging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scalability & Performance */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
          <div className="text-slate-600">Uptime Target</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2"><200ms</div>
          <div className="text-slate-600">Response Time</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
          <div className="text-slate-600">Concurrent Users</div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;