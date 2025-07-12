const { Pool } = require('pg');

// Configurazione database Neon
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Plan limits configuration
const PLAN_LIMITS = {
  free: { queries: 100, window: 'month' },
  pro: { queries: 1000, window: 'month' },
  team: { queries: 5000, window: 'month' },
  enterprise: { queries: -1, window: 'month' } // illimitato
};

// Feature flags per piano
const FEATURE_FLAGS = {
  free: ['basic_rag', '3_personalities'],
  pro: ['basic_rag', '4_personalities', 'document_upload', 'analytics'],
  team: ['basic_rag', '4_personalities', 'document_upload', 'analytics', 'api_access', 'collaboration'],
  enterprise: ['basic_rag', '4_personalities', 'document_upload', 'analytics', 'api_access', 'collaboration', 'white_label', 'custom_training']
};

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, path } = event;
    const body = event.body ? JSON.parse(event.body) : {};

    // Route handling
    switch (path) {
      case '/.netlify/functions/auth/login':
        return await handleLogin(body, headers);
      
      case '/.netlify/functions/auth/register':
        return await handleRegister(body, headers);
      
      case '/.netlify/functions/auth/profile':
        return await handleGetProfile(event.headers.authorization, headers);
      
      case '/.netlify/functions/auth/plan':
        return await handleGetPlan(event.headers.authorization, headers);
      
      case '/.netlify/functions/auth/check-limit':
        return await handleCheckLimit(event.headers.authorization, body, headers);
      
      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint not found' })
        };
    }
  } catch (error) {
    console.error('Auth function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Login handler
async function handleLogin(body, headers) {
  const { email, password } = body;

  if (!email || !password) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Email and password required' })
    };
  }

  try {
    // Per ora, demo login (in produzione usare bcrypt)
    if (email === 'demo@pyragogica.com' && password === 'pyragogica2025') {
      const user = {
        id: 'demo-user-id',
        email: 'demo@pyragogica.com',
        plan: 'free',
        features: FEATURE_FLAGS.free
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          user,
          token: 'demo-token-' + Date.now(),
          message: 'Login successful'
        })
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid credentials' })
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Login failed' })
    };
  }
}

// Register handler
async function handleRegister(body, headers) {
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Email, password and name required' })
    };
  }

  try {
    // In produzione: hash password e salva nel database
    const user = {
      id: 'new-user-' + Date.now(),
      email,
      name,
      plan: 'free',
      features: FEATURE_FLAGS.free
    };

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        user,
        token: 'new-token-' + Date.now(),
        message: 'Registration successful'
      })
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Registration failed' })
    };
  }
}

// Get user profile
async function handleGetProfile(authHeader, headers) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  try {
    // Demo user profile
    const user = {
      id: 'demo-user-id',
      email: 'demo@pyragogica.com',
      name: 'Demo User',
      plan: 'free',
      features: FEATURE_FLAGS.free,
      queryCount: 45,
      queryLimit: PLAN_LIMITS.free.queries
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ user })
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get profile' })
    };
  }
}

// Get user plan
async function handleGetPlan(authHeader, headers) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  try {
    const plan = {
      type: 'free',
      limits: PLAN_LIMITS.free,
      features: FEATURE_FLAGS.free,
      currentUsage: {
        queries: 45,
        documents: 0
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ plan })
    };
  } catch (error) {
    console.error('Get plan error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get plan' })
    };
  }
}

// Check rate limit
async function handleCheckLimit(authHeader, body, headers) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  const { endpoint } = body;

  try {
    // Demo rate limit check
    const limit = {
      allowed: true,
      remaining: 55,
      reset: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 giorni
      limit: PLAN_LIMITS.free.queries
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ limit })
    };
  } catch (error) {
    console.error('Check limit error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to check limit' })
    };
  }
} 