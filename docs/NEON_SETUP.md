# 🗄️ Neon Database Setup per Pyragogica

## 📋 Overview

Neon fornisce PostgreSQL serverless integrato con Netlify per Pyragogica.

## 🚀 Setup Neon

### **1. Installazione Extension Netlify**
```bash
# Install Neon extension
netlify plugins:install @netlify/plugin-neon
```

### **2. Configurazione Database**
```bash
# Crea nuovo database Neon
netlify neon:create pyragogica-db

# Connetti al database
netlify neon:connect
```

### **3. Schema Database**

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

### **4. Row Level Security (RLS)**

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

## 🔧 Configurazione Frontend

### **1. Environment Variables**
```env
# .env.local
VITE_NEON_DATABASE_URL=postgresql://user:pass@host/db
VITE_NETLIFY_SITE_ID=your-site-id
```

### **2. Netlify Functions**
```javascript
// netlify/functions/auth.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event, context) => {
  // Auth logic
};
```

## 📊 Plan Limits Configuration

```sql
-- Insert default plans
INSERT INTO user_plans (user_id, plan_type, query_limit, features) VALUES
  (auth.uid(), 'free', 100, '["basic_rag", "3_personalities"]'),
  (auth.uid(), 'pro', 1000, '["basic_rag", "4_personalities", "document_upload", "analytics"]'),
  (auth.uid(), 'team', 5000, '["basic_rag", "4_personalities", "document_upload", "analytics", "api_access", "collaboration"]'),
  (auth.uid(), 'enterprise', -1, '["basic_rag", "4_personalities", "document_upload", "analytics", "api_access", "collaboration", "white_label", "custom_training"]');
```

## 🚀 Deployment

```bash
# Deploy con Neon
netlify deploy --prod

# Verifica database
netlify neon:status
```

---

*Questo setup fornisce un database PostgreSQL completo e scalabile per Pyragogica.* 