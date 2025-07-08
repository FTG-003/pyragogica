# Architettura Iniziale – Biblioteca Piragogica

## Overview
Biblioteca Piragogica è una piattaforma full-stack per l'apprendimento peer-to-peer, che integra:
- **Frontend React**: UI modulare, chat multi-personalità, visualizzazione risorse
- **Backend Node/Express**: API, orchestrazione AI, autenticazione, logging
- **Flowise RAG**: Motore di Retrieval-Augmented Generation, indicizzazione e retrieval documenti
- **Knowledge Base**: Documenti PDF, markdown, risorse educative indicizzate in un vector store

## Componenti Principali
- **Frontend (React + Tailwind)**
  - Chatbot multi-personalità
  - Selettore AI persona
  - Visualizzazione risposte AI con fonti
  - Login, notifiche, navigazione
- **Backend (Node.js/Express)**
  - API REST (proxy verso AI, Flowise, vector store)
  - Autenticazione (JWT/OAuth, rate limit, logging)
  - Gestione sessione e orchestrazione richieste
- **Flowise RAG**
  - Flusso Q&A: loader PDF/markdown → chunking → embedding → vector DB
  - Retrieval documenti e generazione risposta via LLM (OpenAI/Gemini)
  - Esposto via API REST (es. /chat, /query)
- **Knowledge Base**
  - Documenti PDF, markdown, risorse peeragogiche
  - Vector store (Pinecone, Weaviate, o integrato Flowise)

## Flusso Dati Principale
1. Utente invia domanda dal frontend (sceglie personalità AI)
2. Frontend chiama backend API (includendo persona scelta)
3. Backend inoltra la domanda a Flowise RAG (API REST)
4. Flowise esegue retrieval documenti, genera risposta con fonti
5. Backend riceve risposta, la valida/logga e la inoltra al frontend
6. Frontend mostra risposta e fonti all'utente

## Principi Pedagogici e CRT nel Design
- **AI come peer**: L'AI agisce come partner di apprendimento, non solo strumento
- **Trasparenza**: Fonti sempre mostrate, processi spiegati
- **Adaptive Scaffolding**: Supporto adattivo, personalità AI diverse
- **Sincronizzazione**: Feedback visivo, ritmo cognitivo monitorato
- **Co-design**: Architettura pensata per evolvere con feedback comunità

## Diagramma Architetturale

```mermaid
graph TD
  subgraph Frontend (React)
    A[Utente/Browser]
    B[Selettore Persona AI]
    C[Chat UI]
    D[Login/Notifiche]
  end
  subgraph Backend (Node/Express)
    E[API REST]
    F[Autenticazione]
    G[Orchestrazione/Proxy]
    H[Logging/Sessione]
  end
  subgraph Flowise RAG
    I[Loader PDF/MD]
    J[Chunking/Embedding]
    K[Vector Store]
    L[Retrieval]
    M[LLM (OpenAI/Gemini)]
  end
  subgraph Knowledge Base
    N[PDF/Markdown/Docs]
  end

  A-->|Domanda + Persona|C
  C-->|API call|E
  E-->|Verifica|F
  E-->|Proxy domanda|G
  G-->|API REST|L
  L-->|Query|K
  K-->|Chunk|J
  J-->|Estrazione|I
  I-->|Caricamento|N
  L-->|Contesto|M
  M-->|Risposta+Fonti|G
  G-->|Risposta|E
  E-->|Risposta|C
  C-->|Mostra risposta|A
  H-->|Log|E
```

---

**Nota:**
- L'architettura è modulare e pronta per evolvere (es. orchestrazione multi-agente, nuovi loader, nuove AI persona)
- Ogni componente può essere containerizzato per deploy scalabile
- I principi pedagogici e CRT sono integrati a livello di design e UX 