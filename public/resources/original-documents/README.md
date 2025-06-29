# Risorse Originali - Biblioteca Digitale Pyragogica

Questa cartella contiene le risorse originali della Biblioteca Digitale Pyragogica, organizzate per formato e tipologia.

## 📁 Struttura delle Cartelle

### `/pdf/`
Documenti PDF originali:
- Manuali completi
- Guide specializzate
- Ricerche accademiche
- Report e studi

### `/epub/`
Libri elettronici in formato EPUB:
- Versioni ottimizzate per e-reader
- Contenuti interattivi
- Formattazione avanzata

### `/audio/`
Contenuti audio:
- Audiolibri
- Podcast educativi
- Registrazioni di conferenze
- Interviste con esperti

### `/video/`
Contenuti video:
- Corsi video completi
- Webinar e seminari
- Tutorial pratici
- Documentari educativi

## 🔗 Integrazione con il Sistema RAG

Le risorse in questa cartella sono:

1. **Indicizzate automaticamente** dal sistema RAG per la ricerca semantica
2. **Referenziate dinamicamente** dall'AI Assistant quando rilevanti
3. **Scaricabili direttamente** dagli utenti attraverso l'interfaccia
4. **Categorizzate** secondo la tassonomia della biblioteca

## 📋 Linee Guida per l'Aggiunta di Risorse

### Nomenclatura File
```
[categoria]-[titolo-breve]-[versione].[estensione]
```

Esempi:
- `peeragogy-handbook-v4.0-it.pdf`
- `ai-ethics-guide-v1.2.epub`
- `collaborative-learning-research-2024.pdf`

### Metadati Richiesti
Per ogni risorsa aggiunta, aggiornare anche:
- `src/data/libraryContent.ts` con i metadati della risorsa
- Descrizione, autori, tags, difficoltà
- Link al file nella cartella appropriata

### Formati Supportati
- **PDF**: Documenti principali, ricerche, manuali
- **EPUB**: Libri elettronici ottimizzati
- **MP3/M4A**: Audio di alta qualità
- **MP4/WEBM**: Video ottimizzati per web
- **TXT/MD**: Testi semplici e markdown

## 🔒 Licenze e Copyright

Tutte le risorse devono:
- Avere licenze compatibili (Creative Commons, Open Source, etc.)
- Includere attribuzione corretta agli autori
- Rispettare i diritti di copyright
- Essere documentate nel file `LICENSES.md`

## 🚀 Automazione

Il sistema è progettato per:
- **Auto-discovery**: Rilevamento automatico di nuove risorse
- **Metadata extraction**: Estrazione automatica di metadati dai file
- **Index updating**: Aggiornamento automatico dell'indice di ricerca
- **Link generation**: Generazione automatica di link di download

## 📊 Statistiche Attuali

- **Risorse totali**: 0 (da popolare)
- **Dimensione totale**: 0 MB
- **Formati disponibili**: 4 cartelle preparate
- **Ultimo aggiornamento**: 2025-01-27

---

**Nota**: Questa struttura è progettata per scalare da poche risorse a migliaia, mantenendo organizzazione e performance ottimali.