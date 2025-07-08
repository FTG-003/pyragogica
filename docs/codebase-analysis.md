# Codebase Analysis Report

## 1. Project Overview
- **Summary**: Biblioteca Pyragogica è una piattaforma educativa digitale con focus su apprendimento peer-to-peer, AI assistant multi-personalità e accesso a risorse (PDF, guide, ricerche). L'app è full-stack (React frontend, Node/Express backend) e integra logica RAG (Retrieval-Augmented Generation) per risposte AI contestuali.
- **Main Folders/Components**:
  - `src/`: Frontend React (UI, pages, hooks, services, ai-prompts)
  - `backend/`: Node.js/Express server (API, AI proxy, vector store, auth)
  - `public/resources/`: Documenti PDF e media
  - `docs/`: Documentazione strategica UI

## 2. Frontend Logic
- **Main UI Components**:
  - `App.tsx`: Entry point, routing, login gate, navigation, toast notifications
  - `pages/`: HomePage, LibraryPage, ChatbotPage (caricate dinamicamente)
  - `components/ui/`: ModernButton, KnowledgeCard, ConstellationNav, ecc. (UI moderna, gradienti, responsive)
  - `components/ToastNotification.tsx`: Sistema di notifiche contestuali
  - `services/ragService.ts`: Gestione provider AI, modelli, sessione, chiamate RAG
  - `ai-prompts/`: Prompt di sistema per personalità AI (accademico, divulgativo, ecc.)
  - `data/`: Contenuti strutturati, estrattori, vector store

- **State/Prop Flow**:
  - Stato globale gestito in `App.tsx` (autenticazione, pagina corrente)
  - Navigazione gestita via stato locale, non React Router
  - RAGService gestisce sessione, provider, modelli, cronologia conversazione
  - Le pagine e i componenti ricevono props per navigazione e callback

- **Problems & Improvements**:
  - **Routing**: Manca React Router, la navigazione è gestita a mano (potenziale refactor per SPA/SEO)
  - **Login**: Login gate solo frontend (password hardcoded, no backend/session reali)
  - **State**: Non c'è global state management (es. Redux/Zustand), ma la scala attuale lo consente
  - **Educational Logic**: I contenuti educativi sono statici, non c'è quiz/lesson engine dinamico
  - **RAG**: Lato frontend, la logica RAG è astratta in `ragService.ts` ma non è chiaro se usata in tutte le pagine

## 3. Backend/API Analysis
- **Server Endpoints**:
  - `/api/ai/openai`: Proxy verso OpenAI (richiede token demo, validazione, logging, rate limit)
  - `/api/ai/gemini`: Proxy verso Gemini API
  - `/api/vector/query`: Query Pinecone (o fallback), autenticazione demo
  - `/api/auth/login`: Demo login (username/password hardcoded, ritorna token demo)
  - `/health`: Health check (stato servizi, env, uptime)
- **Data Flow & Logic**:
  - Sicurezza: Helmet, CORS, rate limit, logging avanzato (Winston)
  - Autenticazione: Solo demo, nessuna sessione persistente/real user
  - Vector Store: Supporto Pinecone, fallback dati statici
  - AI Proxy: Gestione errori, logging, validazione input
- **Missing/Broken**:
  - **No real user management**: Solo login demo, nessun JWT/sessione reale
  - **No direct Flowise endpoint**: Non c'è endpoint `/chat` o `/query` per Flowise, ma la struttura è pronta per aggiungerlo
  - **No file upload/ingest**: I documenti sono statici, non c'è pipeline di ingest dinamica

## 4. Flowise RAG Integration
- **Current Status**:
  - Non ci sono chiamate dirette a Flowise REST API, ma la logica RAG è astratta e pronta per essere collegata
  - Il backend supporta proxy verso OpenAI/Gemini/Pinecone, ma non Flowise out-of-the-box
- **Suggested Integration Points**:
  - **Backend**: Aggiungere endpoint `/api/ai/flowise` che fa proxy verso Flowise REST API (`/chat` o `/query`)
  - **Frontend**: In `ragService.ts`, aggiungere un provider `flowise` con configurazione baseUrl, modelli, e key (se serve)
  - **Configurazione**: Consentire all'utente di selezionare Flowise come provider AI, inserire API key/URL da UI
- **Step-by-step Guide**:
  1. **Backend**:
     - Aggiungi endpoint Express `/api/ai/flowise` che inoltra richieste a Flowise (con validazione, logging, auth demo)
     - Esempio:
       ```js
       app.post('/api/ai/flowise', aiLimiter, authenticateToken, validateQuery, async (req, res) => {
         // Inoltra a FLOWISE_URL/rest-api/chat
       });
       ```
  2. **Frontend**:
     - In `ragService.ts`, aggiungi provider:
       ```ts
       {
         id: 'flowise',
         name: 'Flowise',
         baseUrl: 'http://localhost:3000/api/v1', // o URL cloud
         models: [{ id: 'default', name: 'Flowise Default', provider: 'flowise', free: true, ... }],
         keyFormat: '',
         description: 'Flowise RAG API',
         requiresKey: false
       }
       ```
     - Permetti selezione provider Flowise da UI
     - Adatta la funzione di chiamata API per supportare il formato richiesto da Flowise (`/chat` o `/query`)
  3. **Test**:
     - Verifica end-to-end: prompt → backend → Flowise → risposta → frontend
     - Logga errori e fallback

## 5. Optimization Suggestions
- **Architecture**:
  - Introdurre React Router per navigazione SPA e deep linking
  - Separare meglio logica di autenticazione (JWT, sessioni vere, logout)
  - Pipeline di ingest dinamica per nuovi documenti (upload, parsing, indicizzazione)
- **Code Refactoring**:
  - Centralizzare la gestione provider AI (incluso Flowise) in un unico modulo
  - Estrarre la logica di sessione utente in un hook custom/global context
  - Refactor dei servizi per supportare più backend AI in modo plug-and-play
- **Security/Performance**:
  - Implementare autenticazione reale (JWT, OAuth)
  - Rate limit più granulare per endpoint AI
  - Validazione input/output più robusta (XSS, prompt injection)
  - Caching delle risposte AI e dei risultati vector store
  - Logging privacy-aware (no dati sensibili nei log)

---

**In sintesi:**
Il progetto è ben strutturato per una piattaforma educativa AI-driven, con una base moderna e pronta per l'integrazione RAG/Flowise. Mancano alcune funzionalità chiave (auth reale, upload, endpoint Flowise), ma la modularità del codice consente un'integrazione rapida e scalabile. 