# 🚀 Guida Implementazione Pyragogica Open Source + Monetizzazione

## 📋 Overview

Questa guida spiega come implementare il sistema di monetizzazione e autenticazione per Pyragogica utilizzando Neon Database e Netlify Functions.

## 🗄️ Setup Neon Database

### 1. Installazione Extension Netlify

```bash
# Installa l'extension Neon per Netlify
netlify plugins:install @netlify/plugin-neon

# Verifica l'installazione
netlify plugins:list
```

### 2. Creazione Database

```bash
# Crea un nuovo database Neon
netlify neon:create pyragogica-db

# Connetti al database
netlify neon:connect

# Verifica la connessione
netlify neon:status
```

### 3. Schema Database

Esegui il seguente SQL nel database Neon:

```sql
-- Users table (gestita da Netlify Auth)
-- netlify_users

-- User plans e subscriptions
CREATE TABLE user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_type VARCHAR(20) NOT NULL DEFAULT 'free',
  query_count INTEGER DEFAULT 0,
  query_limit INTEGER DEFAULT 100,
  features JSONB DEFAULT '[]',
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics per query
CREATE TABLE query_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  query_text TEXT,
  persona VARCHAR(50),
  response_time INTEGER,
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User documents (per upload feature)
CREATE TABLE user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'processing',
  vector_id VARCHAR(255), -- Pinecone vector ID
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rate limiting tracking
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  endpoint VARCHAR(100),
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes per performance
CREATE INDEX idx_user_plans_user_id ON user_plans(user_id);
CREATE INDEX idx_query_analytics_user_id ON query_analytics(user_id);
CREATE INDEX idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX idx_rate_limits_user_window ON rate_limits(user_id, window_start);

-- Triggers per updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_plans_updated_at 
    BEFORE UPDATE ON user_plans 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_documents_updated_at 
    BEFORE UPDATE ON user_documents 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Row Level Security (RLS)

```sql
-- Abilita RLS su tutte le tabelle
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Policies per user_plans
CREATE POLICY "Users can view own plan" ON user_plans
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own plan" ON user_plans
  FOR UPDATE USING (user_id = auth.uid());

-- Policies per query_analytics
CREATE POLICY "Users can view own analytics" ON query_analytics
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own analytics" ON query_analytics
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policies per user_documents
CREATE POLICY "Users can view own documents" ON user_documents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own documents" ON user_documents
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own documents" ON user_documents
  FOR UPDATE USING (user_id = auth.uid());

-- Policies per rate_limits
CREATE POLICY "Users can view own rate limits" ON rate_limits
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own rate limits" ON rate_limits
  FOR INSERT WITH CHECK (user_id = auth.uid());
```

## 🔧 Configurazione Environment Variables

### 1. Netlify Dashboard

Vai su Netlify Dashboard > Site Settings > Environment Variables e aggiungi:

```env
# Neon Database
NEON_DATABASE_URL=postgresql://user:pass@host/db

# Flowise API
FLOWISE_API_URL=https://flowise.pyragogy.org/api/v1
FLOWISE_API_KEY=your-flowise-api-key

# JWT Secret (per produzione)
JWT_SECRET=your-super-secret-jwt-key

# Pinecone (per vector store)
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX_NAME=pyragogica-docs
```

### 2. Local Development

Crea un file `.env.local` nel frontend:

```env
VITE_NEON_DATABASE_URL=postgresql://user:pass@host/db
VITE_NETLIFY_SITE_ID=your-site-id
```

## 🚀 Deployment

### 1. Build e Deploy

```bash
# Build del frontend
cd frontend
npm run build

# Deploy su Netlify
netlify deploy --prod

# Verifica functions
netlify functions:list
```

### 2. Verifica Database

```bash
# Verifica connessione database
netlify neon:status

# Test functions
curl -X POST https://your-site.netlify.app/.netlify/functions/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@pyragogica.com","password":"pyragogica2025"}'
```

## 🧪 Testing

### 1. Test Autenticazione

```bash
# Test login
curl -X POST https://your-site.netlify.app/.netlify/functions/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@pyragogica.com","password":"pyragogica2025"}'

# Test profile
curl -X GET https://your-site.netlify.app/.netlify/functions/auth/profile \
  -H "Authorization: Bearer your-token"
```

### 2. Test RAG Query

```bash
# Test query RAG
curl -X POST https://your-site.netlify.app/.netlify/functions/rag/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"question":"Ciao, come stai?","persona":"socratic"}'
```

### 3. Test Rate Limiting

```bash
# Test rate limit check
curl -X POST https://your-site.netlify.app/.netlify/functions/auth/check-limit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"endpoint":"rag_query"}'
```

## 📊 Monitoraggio

### 1. Netlify Functions Logs

```bash
# Visualizza logs functions
netlify functions:logs

# Logs specifici per auth
netlify functions:logs --function auth

# Logs specifici per rag
netlify functions:logs --function rag
```

### 2. Database Analytics

```sql
-- Query più utilizzate
SELECT query_text, COUNT(*) as usage_count
FROM query_analytics
GROUP BY query_text
ORDER BY usage_count DESC
LIMIT 10;

-- Performance media per persona
SELECT persona, AVG(response_time) as avg_response_time
FROM query_analytics
GROUP BY persona;

-- Utilizzo per piano
SELECT up.plan_type, COUNT(qa.id) as total_queries
FROM user_plans up
LEFT JOIN query_analytics qa ON up.user_id = qa.user_id
GROUP BY up.plan_type;
```

## 🔒 Sicurezza

### 1. JWT Token Management

```javascript
// In auth.js function
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 2. Rate Limiting

```javascript
// In rag.js function
const rateLimit = {
  windowMs: 30 * 24 * 60 * 60 * 1000, // 30 giorni
  max: (req) => {
    const userPlan = getUserPlan(req.headers.authorization);
    return userPlan.limits.queries;
  }
};
```

### 3. Input Validation

```javascript
// Validate input
const { question, persona } = body;

if (!question || question.length > 1000) {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid question length' })
  };
}

if (!['socratic', 'academic', 'divulgative', 'critical'].includes(persona)) {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid persona' })
  };
}
```

## 💰 Monetizzazione

### 1. Piano Pricing

```javascript
const PLAN_LIMITS = {
  free: { queries: 100, window: 'month' },
  pro: { queries: 1000, window: 'month' },
  team: { queries: 5000, window: 'month' },
  enterprise: { queries: -1, window: 'month' }
};

const FEATURE_FLAGS = {
  free: ['basic_rag', '3_personalities'],
  pro: ['basic_rag', '4_personalities', 'document_upload', 'analytics'],
  team: ['basic_rag', '4_personalities', 'document_upload', 'analytics', 'api_access', 'collaboration'],
  enterprise: ['basic_rag', '4_personalities', 'document_upload', 'analytics', 'api_access', 'collaboration', 'white_label', 'custom_training']
};
```

### 2. Stripe Integration (Futuro)

```javascript
// In una nuova function payments.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const { planType, userId } = JSON.parse(event.body);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: getStripePriceId(planType),
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.URL}/cancel`,
    metadata: {
      userId,
      planType
    }
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id })
  };
};
```

## 🚀 Prossimi Passi

1. **Integrazione Stripe** per pagamenti
2. **Email notifications** per upgrade/downgrade
3. **Admin dashboard** per gestione utenti
4. **Analytics avanzate** con grafici
5. **API documentation** per sviluppatori
6. **White label** per enterprise
7. **Mobile app** React Native

---

*Questa implementazione fornisce una base solida per la monetizzazione di Pyragogica mantenendo la flessibilità dell'open source.* 