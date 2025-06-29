# Biblioteca Digitale Pyragogica - Core System

Una piattaforma digitale scalabile per risorse educative di alta qualità con sistema RAG (Retrieval-Augmented Generation) integrato.

## 🎯 Caratteristiche Principali

### 📚 Contenuti Reali Integrati
- **Peeragogy Handbook V3** - Originale inglese completo (240 pagine)
- **Traduzione italiana** - Versione localizzata con contenuti estesi
- **Vector Store locale** - 10+ documenti semanticamente indicizzati
- **Ricerca intelligente** - AI-powered content discovery

### 🤖 Sistema RAG Production-Ready
- **4 Personalità AI** - Accademico, Divulgatore, Critico, Socratico
- **Modelli gratuiti** - Phi-3, Gemma, Llama 3, Mistral via OpenRouter
- **API sicure** - Gestione locale delle chiavi, sessioni separate
- **Contenuti verificabili** - Citazioni precise con pagine e autori

### 🏗️ Architettura Scalabile
- **Modulare** - Progettata per crescere da 1 a 1000+ risorse
- **Multilingue** - Supporto nativo per traduzioni
- **Categorizzazione flessibile** - Tassonomia espandibile
- **Metadati ricchi** - Struttura dati complessa e standardizzata

## 🚀 Tecnologie

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **AI Integration**: OpenRouter, OpenAI, Anthropic
- **Vector Store**: Implementazione locale con ricerca semantica
- **State Management**: React Hooks + Local Storage
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Struttura del Progetto (Ottimizzata)

```
src/
├── components/          # Componenti riutilizzabili
│   ├── ui/             # UI components moderni
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   ├── ResourceCard.tsx
│   └── ToastNotification.tsx
├── pages/              # Pagine principali
│   ├── HomePage.tsx
│   ├── LibraryPage.tsx
│   └── ChatbotPage.tsx
├── services/           # Servizi (RAG, API)
│   └── ragService.ts
├── data/               # Contenuti e vector store
│   ├── libraryContent.ts
│   ├── peeragogyExtractor.ts
│   └── vectorStore.ts
├── ai-prompts/         # Personalità AI
│   ├── academic.ts
│   ├── critical.ts
│   ├── divulgative.ts
│   └── socratic.ts
└── hooks/              # Custom hooks
    └── useLibraryState.ts
```

## 🔧 Setup e Installazione

### Prerequisiti
- Node.js 18+
- npm o yarn

### Installazione
```bash
# Clone del repository
git clone [repository-url]
cd biblioteca-digitale-pyragogica

# Installazione dipendenze
npm install

# Avvio development server
npm run dev
```

### Configurazione API
1. Apri l'applicazione
2. Vai su "Configurazione" nell'AI Assistant
3. Seleziona un provider (consigliato: OpenRouter)
4. Inserisci la tua API key
5. Scegli un modello (disponibili opzioni gratuite)

## 📚 Contenuti Disponibili

### Peeragogy Handbook V3 (Inglese)
- **240 pagine** di contenuto originale
- **5 capitoli** con testo completo
- **10+ autori** principali
- **Licenza**: Creative Commons Attribution-ShareAlike 4.0

### Manuale di Peeragogy (Italiano)
- **350 pagine** tradotte
- **2 capitoli** con contenuto completo
- **Traduzione professionale** dall'inglese
- **Metadati estesi** per ogni sezione

## 🤖 Sistema RAG

### Vector Store Locale
- **Contenuti reali** estratti dal PDF
- **Ricerca semantica** basata su keyword matching
- **Metadati ricchi** (autore, pagina, sezione, versione)
- **Multilingue** (inglese e italiano)

### Personalità AI
1. **🎓 Accademico** - Rigoroso, metodico, basato su evidenze
2. **💡 Divulgatore** - Semplice, coinvolgente, pratico
3. **🧠 Critico** - Analitico, questionante, stimolante
4. **🤔 Socratico** - Conversazionale, guidante, riflessivo

### Modelli Supportati
- **Gratuiti**: Phi-3, Gemma 7B, Llama 3 8B, Mistral 7B
- **Premium**: GPT-4o, Claude 3.5 Sonnet, Gemini Pro

## 🔒 Sicurezza e Privacy

- **API key locali** - Memorizzate solo nel browser
- **Sessioni separate** - Ogni utente ha configurazioni isolate
- **Nessun tracking** - Dati non condivisi con server esterni
- **Open source** - Codice completamente trasparente

## 📊 Comandi Sistema

- `/status` - Stato configurazione e vector store
- `/providers` - Lista provider disponibili
- `/models` - Modelli del provider corrente
- `/vectorstore` - Info contenuti Peeragogy
- `/clear` - Cancella cronologia
- `/help` - Guida completa

## 🚀 Deployment

### Build Production
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deployment Platforms
- Netlify (consigliato)
- Vercel
- GitHub Pages
- Qualsiasi hosting statico

## 📈 Performance

### Ottimizzazioni Implementate
- **Code splitting** automatico
- **Lazy loading** per componenti e route
- **Bundle optimization** con Vite
- **React.memo** per componenti pesanti
- **Vector store locale** per ricerca veloce

### Metriche Target
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB (gzipped)
- **Lighthouse Score**: > 90

## 🗂️ Archivio

I seguenti elementi sono stati archiviati per ottimizzare le performance:

- **Documentazione**: Audit reports, roadmap, changelog
- **Analisi**: Componenti di analisi business
- **Backend**: Server Node.js (se non utilizzato)
- **Stili alternativi**: CSS non utilizzati

Questi file sono disponibili nella cartella `archive/` se necessari.

## 📄 Licenze

- **Codice**: MIT License
- **Contenuti Peeragogy**: Creative Commons Attribution-ShareAlike 4.0
- **Risorse aggiuntive**: Varie (vedi documentazione archiviata)

---

**Versione**: 2.0.0 - Core System Ottimizzato
**Ultimo aggiornamento**: 2025-01-27
**Status**: ✅ Production Ready - Ottimizzato per Performance