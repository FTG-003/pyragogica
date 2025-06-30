# 🌟 Biblioteca Digitale Pyragogica

> Hub di conoscenza interattiva per apprendimento peer-to-peer con sistema RAG avanzato

[![Deploy Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 **Demo Live**

**🔗 [pyragogy.org](https://pyragogy.org)**

## ✨ **Caratteristiche Principali**

### 🧠 **Sistema RAG Multi-Personalità**
- **4 Personalità AI**: Accademico, Divulgatore, Critico, Socratico
- **Modelli Gratuiti**: Phi-3, Gemma, Llama 3, Mistral via OpenRouter
- **API Sicure**: Gestione locale delle chiavi, nessun server backend

### 📚 **Hub di Conoscenza Interattiva**
- **Contenuti Open & Premium**: Distinzione chiara tra accesso libero e a pagamento
- **Apprendimento Peer-to-Peer**: Metodologie collaborative
- **Etica AI**: Principi per intelligenza artificiale responsabile
- **Co-creazione Cognitiva**: Tecniche di intelligenza collettiva

### 🎨 **Design Moderno**
- **Mobile-First**: Responsive su tutti i dispositivi
- **Animazioni Fluide**: Micro-interazioni coinvolgenti
- **Palette Colorata**: Design vibrante e professionale
- **Accessibilità**: WCAG 2.1 compliant

## 🛠️ **Tecnologie**

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: OpenRouter, OpenAI, Anthropic
- **Icons**: Lucide React
- **Deployment**: Netlify

## 🚀 **Quick Start**

### **Prerequisiti**
- Node.js 18+
- npm 8+

### **Installazione**
```bash
# Clone del repository
git clone https://github.com/pyragogy/biblioteca-digitale.git
cd biblioteca-digitale

# Installazione dipendenze
npm install

# Avvio development server
npm run dev
```

### **Build Production**
```bash
# Build ottimizzato
npm run build

# Preview build locale
npm run preview
```

## 🔧 **Configurazione**

### **API Keys**
L'applicazione richiede API keys per funzionare:

1. **OpenRouter** (Raccomandato - modelli gratuiti disponibili)
   - Registrati su [openrouter.ai](https://openrouter.ai)
   - Ottieni la tua API key
   - Inseriscila nell'interfaccia di configurazione

2. **OpenAI** (Opzionale)
   - API key da [platform.openai.com](https://platform.openai.com)

3. **Anthropic** (Opzionale)
   - API key da [console.anthropic.com](https://console.anthropic.com)

### **Sicurezza**
- ✅ API keys memorizzate **solo localmente** nel browser
- ✅ Nessun server backend richiesto
- ✅ Sessioni isolate per ogni utente
- ✅ Nessun tracking o analytics invasivi

## 📖 **Come Usare**

### **1. Configurazione Iniziale**
- Apri l'applicazione
- Vai su "Configurazione" nell'AI Assistant
- Inserisci la tua API key (consigliato: OpenRouter)
- Seleziona un modello (disponibili opzioni gratuite)

### **2. Esplora la Biblioteca**
- Naviga tra i contenuti open e premium
- Usa i filtri per trovare risorse specifiche
- Leggi descrizioni dettagliate e metadati

### **3. Interagisci con l'AI**
- Scegli una delle 4 personalità AI
- Fai domande sui contenuti
- Ricevi risposte personalizzate con fonti

### **4. Comandi Sistema**
- `/status` - Verifica configurazione
- `/help` - Guida completa
- `/clear` - Cancella cronologia

## 🌍 **Deploy**

### **Netlify (Raccomandato)**
1. Fork questo repository
2. Connetti a Netlify
3. Deploy automatico da `main` branch
4. Configurazione in `netlify.toml`

### **Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **GitHub Pages**
```bash
npm run build
# Upload cartella dist/
```

## 🤝 **Contribuire**

1. Fork del repository
2. Crea un branch (`git checkout -b feature/amazing-feature`)
3. Commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 📄 **Licenza**

Questo progetto è sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per dettagli.

## 🙏 **Riconoscimenti**

- **Peeragogy Handbook** - Contenuti educativi di base
- **OpenRouter** - Accesso a modelli AI gratuiti
- **Lucide** - Iconografia moderna
- **Tailwind CSS** - Framework di styling

## 📞 **Supporto**

- **Website**: [pyragogy.org](https://pyragogy.org)
- **Issues**: [GitHub Issues](https://github.com/pyragogy/biblioteca-digitale/issues)
- **Email**: support@pyragogy.org

---

**Versione**: 1.0.0 - Production Ready  
**Ultimo aggiornamento**: 2025-01-27  
**Status**: ✅ Deploy Ready