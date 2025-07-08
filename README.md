# 🌟 Biblioteca Digitale Pyragogica

> Hub di conoscenza interattiva per apprendimento peer-to-peer con sistema RAG avanzato

[![Deploy Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📁 Struttura del Progetto

```
/
├── backend/     → Codice backend (API, server, DB, ecc.)
├── frontend/    → Codice frontend (SPA React, assets, build, ecc.)
├── docs/        → Documentazione, PDF, note, immagini, wireframe...
├── README.md    → Questa guida
```

---

## 📦 Cartelle Principali

### [`/frontend/`](./frontend/)
- **React SPA** (src/)
- **Assets pubblici** (public/)
- **Config**: vite, tailwind, eslint, netlify, ecc.
- **Build/Deploy**: Netlify
- **Guida**: [Build & Deploy su Netlify](./frontend/README.md) _(da creare)_

### [`/backend/`](./backend/)
- **Node.js/Express API**
- **Config**: server, logging, sicurezza
- **Avvio/Deploy**: Coolify, Docker, PM2
- **Guida**: [Avvio & Deploy Backend](./backend/README.md) _(da creare)_

### [`/docs/`](./docs/)
- **Documentazione tecnica**
- **PDF, media, note, wireframe**
- **API, tutorial, strategie UI**

---

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev # sviluppo
npm run build # produzione
```
Deploy consigliato: **Netlify** ([guida](./frontend/README.md))

### Backend
```bash
cd backend
npm install
npm run start # produzione
npm run dev   # sviluppo
```
Deploy consigliato: **Coolify** o **Docker** ([guida](./backend/README.md))

---

## 📄 Documentazione

- [docs/ARCHITETTURA.md](./docs/ARCHITETTURA.md)
- [docs/ROADMAP_DEPLOY.md](./docs/ROADMAP_DEPLOY.md)
- [docs/codebase-analysis.md](./docs/codebase-analysis.md)
- [docs/deployment-report.md](./docs/deployment-report.md)
- [docs/UI_STRATEGY.md](./docs/UI_STRATEGY.md)
- [docs/original-documents/](./docs/original-documents/) _(PDF, media)_

---

## 🤝 Contribuire

1. Fork del repository
2. Crea un branch (`git checkout -b feature/amazing-feature`)
3. Commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

---

**Versione**: 2.0.0 (modular refactor)
**Ultimo aggiornamento**: 2025-01-27
**Status**: ✅ Modular Ready