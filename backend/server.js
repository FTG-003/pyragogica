const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const winston = require('winston');
require('dotenv').config();

// Garantisce che fetch sia disponibile anche in CommonJS
if (typeof fetch === 'undefined') {
  global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
}

const app = express();
const PORT = process.env.PORT || 4000;

// Configurazione logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'pyragogica-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Middleware di sicurezza
app.use(helmet());
app.use(cors({
  origin: ['https://library.pyragogy.org', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 5, // 5 richieste per minuto per IP
  message: {
    error: 'Troppe richieste AI. Riprova tra un minuto.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware di autenticazione placeholder
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Per questo test, accettiamo un token hardcoded
  const validTokens = ['test-token-123', 'demo-user-token'];
  
  if (!token || !validTokens.includes(token)) {
    logger.warn('Tentativo di accesso non autorizzato', { 
      ip: req.ip, 
      userAgent: req.get('User-Agent'),
      endpoint: req.path 
    });
    return res.status(401).json({ error: 'Token di accesso richiesto' });
  }

  req.user = { id: 'demo-user', role: 'authenticated' };
  next();
};

// Validazione input
const validateQuery = (req, res, next) => {
  const { query } = req.body;
  
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query richiesta e deve essere una stringa' });
  }
  
  if (query.length > 1000) {
    return res.status(400).json({ error: 'Query troppo lunga (max 1000 caratteri)' });
  }
  
  // Rimuovi caratteri potenzialmente pericolosi
  const sanitizedQuery = query.replace(/[<>\"'&]/g, '');
  req.body.query = sanitizedQuery;
  
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      openai: !!process.env.OPENAI_API_KEY,
      pinecone: !!process.env.PINECONE_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    }
  };
  
  logger.info('Health check richiesto', { ip: req.ip });
  res.json(healthStatus);
});

// Endpoint per chiamate OpenAI
app.post('/api/ai/openai', aiLimiter, authenticateToken, validateQuery, async (req, res) => {
  try {
    const { messages, model, temperature, maxTokens } = req.body;
    
    logger.info('Richiesta OpenAI', { 
      user: req.user.id, 
      model, 
      queryLength: req.body.query?.length 
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages,
        temperature: temperature || 0.7,
        max_tokens: maxTokens || 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error('Errore OpenAI API', { 
        status: response.status, 
        error: errorData,
        user: req.user.id 
      });
      return res.status(response.status).json({ 
        error: 'Errore nel servizio AI',
        details: errorData.error?.message || 'Errore sconosciuto'
      });
    }

    const data = await response.json();
    logger.info('Risposta OpenAI completata', { 
      user: req.user.id,
      tokensUsed: data.usage?.total_tokens 
    });
    
    res.json(data);
  } catch (error) {
    logger.error('Errore interno OpenAI', { error: error.message, user: req.user.id });
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// Endpoint per chiamate Gemini
app.post('/api/ai/gemini', aiLimiter, authenticateToken, validateQuery, async (req, res) => {
  try {
    const { contents, model, generationConfig } = req.body;
    
    logger.info('Richiesta Gemini', { 
      user: req.user.id, 
      model,
      queryLength: req.body.query?.length 
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-1.5-flash'}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        generationConfig: generationConfig || {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error('Errore Gemini API', { 
        status: response.status, 
        error: errorData,
        user: req.user.id 
      });
      return res.status(response.status).json({ 
        error: 'Errore nel servizio AI',
        details: errorData.error?.message || 'Errore sconosciuto'
      });
    }

    const data = await response.json();
    logger.info('Risposta Gemini completata', { user: req.user.id });
    
    res.json(data);
  } catch (error) {
    logger.error('Errore interno Gemini', { error: error.message, user: req.user.id });
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// Endpoint per query Pinecone
app.post('/api/vector/query', aiLimiter, authenticateToken, async (req, res) => {
  try {
    const { vector, topK, includeMetadata } = req.body;
    
    logger.info('Query Pinecone', { 
      user: req.user.id, 
      topK: topK || 5 
    });

    const response = await fetch(`${process.env.PINECONE_HOST}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.PINECONE_API_KEY
      },
      body: JSON.stringify({
        vector,
        topK: topK || 5,
        includeMetadata: includeMetadata !== false,
        includeValues: false
      })
    });

    if (!response.ok) {
      logger.warn('Pinecone non disponibile, usando fallback', { 
        status: response.status,
        user: req.user.id 
      });
      
      // Fallback data
      const fallbackData = {
        matches: [
          {
            id: 'peeragogy-intro-1',
            score: 0.95,
            metadata: {
              title: 'Introduction to Peeragogy',
              chapter: 'Chapter 1: Introduction',
              author: 'Howard Rheingold',
              page: '1-15',
              section: 'What is Peeragogy?',
              content: 'Peeragogy is a flexible framework of techniques for peer learning and peer knowledge production.'
            }
          }
        ]
      };
      
      return res.json(fallbackData);
    }

    const data = await response.json();
    logger.info('Query Pinecone completata', { 
      user: req.user.id,
      resultsCount: data.matches?.length || 0 
    });
    
    res.json(data);
  } catch (error) {
    logger.error('Errore Pinecone', { error: error.message, user: req.user.id });
    res.status(500).json({ error: 'Errore nel servizio vector store' });
  }
});

// Endpoint per autenticazione demo
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Credenziali demo
  if (username === 'demo' && password === 'pyragogica2025') {
    logger.info('Login demo effettuato', { username });
    res.json({ 
      token: 'demo-user-token',
      user: { id: 'demo-user', username: 'demo', role: 'authenticated' }
    });
  } else {
    logger.warn('Tentativo di login fallito', { username, ip: req.ip });
    res.status(401).json({ error: 'Credenziali non valide' });
  }
});

// Endpoint proxy per Flowise
app.post('/api/ai/flowise', async (req, res) => {
  // Accetta sia 'question' che 'query' come campo
  const question = req.body.question || req.body.query;
  const persona = req.body.persona;
  console.log('Richiesta ricevuta per Flowise:', question, 'Persona:', persona);
  if (!question || typeof question !== 'string') {
    console.error('Richiesta Flowise senza campo question/query:', req.body);
    return res.status(400).json({ error: 'Campo question (o query) richiesto e deve essere una stringa' });
  }
  // Se la personalità è presente, la includo come prefisso nel prompt
  let prompt = question;
  if (persona && typeof persona === 'string') {
    prompt = `[PERSONALITÀ: ${persona}] ${question}`;
  }
  const chatflowid = '9c4a9fce-a2dd-4e4f-a4b7-1bc72b9b9191';
  const apiKey = process.env.FLOWISE_API_KEY || 'VFbQZT_5p-bLh45Ox3UOl4wi6CkAmw3e8X9UCXXHWAE';
  try {
    console.log('Invio richiesta a Flowise:', prompt);
    const response = await fetch(`https://flowise.pyragogy.org/api/v1/prediction/${chatflowid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ question: prompt })
    });
    console.log('Risposta ricevuta da Flowise, status:', response.status);
    const contentType = response.headers.get('content-type');
    const text = await response.text();
    console.log('Risposta Flowise (raw):', text);
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Flowise ha risposto con contenuto non JSON:', text);
      return res.status(502).json({ error: 'Risposta non valida da Flowise', details: text });
    }
    const data = JSON.parse(text);
    if (!response.ok) {
      console.error('Flowise proxy error:', data);
      return res.status(response.status).json({ error: data.error || 'Flowise error', status: response.status });
    }
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy server error', details: err.message });
  }
});

// Endpoint proxy per OpenRouter
app.post('/api/ai/openrouter', async (req, res) => {
  const { model, messages, temperature, max_tokens } = req.body;
  const apiKey = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : process.env.OPENROUTER_API_KEY;
  if (!model || !messages) {
    return res.status(400).json({ error: 'Model e messages sono richiesti' });
  }
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
        'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
        'X-Title': 'Pyragogica RAG System'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 1000
      })
    });
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('OpenRouter ha risposto con contenuto non JSON:', text);
      return res.status(502).json({ error: 'Risposta non valida da OpenRouter', details: text });
    }
    const data = await response.json();
    if (!response.ok) {
      console.error('OpenRouter proxy error:', data);
      return res.status(response.status).json({ error: data.error || 'OpenRouter error', status: response.status });
    }
    res.json(data);
  } catch (err) {
    console.error('Proxy OpenRouter error:', err);
    res.status(500).json({ error: 'Proxy server error', details: err.message });
  }
});

// Endpoint proxy per Anthropic
app.post('/api/ai/anthropic', async (req, res) => {
  const { model, messages, temperature, max_tokens } = req.body;
  const apiKey = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : process.env.ANTHROPIC_API_KEY;
  if (!model || !messages) {
    return res.status(400).json({ error: 'Model e messages sono richiesti' });
  }
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        ...(apiKey ? { 'x-api-key': apiKey } : {})
      },
      body: JSON.stringify({
        model,
        max_tokens: max_tokens || 1000,
        temperature: temperature || 0.7,
        messages
      })
    });
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Anthropic ha risposto con contenuto non JSON:', text);
      return res.status(502).json({ error: 'Risposta non valida da Anthropic', details: text });
    }
    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic proxy error:', data);
      return res.status(response.status).json({ error: data.error || 'Anthropic error', status: response.status });
    }
    res.json(data);
  } catch (err) {
    console.error('Proxy Anthropic error:', err);
    res.status(500).json({ error: 'Proxy server error', details: err.message });
  }
});

// Middleware di gestione errori
app.use((error, req, res, next) => {
  logger.error('Errore non gestito', { 
    error: error.message, 
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  
  res.status(500).json({ 
    error: 'Errore interno del server',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('Endpoint non trovato', { url: req.url, method: req.method, ip: req.ip });
  res.status(404).json({ error: 'Endpoint non trovato' });
});

app.listen(PORT, () => {
  logger.info(`Server Pyragogica Backend avviato sulla porta ${PORT}`, {
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;