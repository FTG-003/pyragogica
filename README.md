# Biblioteca Digitale Pyragogica - Production Ready

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

## 📁 Struttura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
├── pages/              # Pagine principali
├── services/           # Servizi (RAG, API)
├── data/               # Contenuti e vector store
├── ai-prompts/         # Personalità AI
└── hooks/              # Custom hooks

public/
└── resources/          # Risorse originali (PDF, EPUB, etc.)
    └── original-documents/
        ├── pdf/        # Documenti PDF
        ├── epub/       # Libri elettronici
        ├── audio/      # Contenuti audio
        └── video/      # Contenuti video
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

### Risorse Aggiuntive
- Guida Etica AI nell'Educazione
- Ricerca sull'Apprendimento Collaborativo
- Toolkit di Pedagogia Digitale

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

## 🎨 Design System

### Principi
- **Minimalismo elegante** - Design pulito e funzionale
- **Accessibilità** - WCAG 2.1 compliant
- **Responsive** - Ottimizzato per tutti i dispositivi
- **Performance** - Caricamento rapido e fluido

### Palette Colori
- **Primario**: Indigo 600 → Purple 600
- **Secondario**: Slate 50 → Slate 900
- **Accenti**: Green, Blue, Orange, Red per stati

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

## 📈 Roadmap

### Fase 1 (Attuale) ✅
- Peeragogy Handbook V3 integrato
- Sistema RAG funzionante
- 4 personalità AI
- Vector store locale

### Fase 2 (Prossima)
- Estrazione automatica PDF
- Più contenuti tradotti
- Miglioramenti vector store
- API REST per integrazioni

### Fase 3 (Futura)
- 50+ risorse educative
- Supporto multilingue esteso
- Community features
- Mobile app

## 🤝 Contribuzioni

1. Fork del repository
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenze

- **Codice**: MIT License
- **Contenuti Peeragogy**: Creative Commons Attribution-ShareAlike 4.0
- **Risorse aggiuntive**: Varie (vedi `public/resources/original-documents/LICENSES.md`)

## 📞 Supporto

- **Issues**: [GitHub Issues]
- **Documentazione**: [Link alla documentazione]
- **Community**: [Link alla community]

---

**Versione**: 1.3.0 - Production Ready con Contenuti Reali
**Ultimo aggiornamento**: 2025-01-27
**Status**: ✅ Stabile e pronto per la produzione