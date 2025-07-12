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
  enterprise: { queries: -1, window: 'month' }
};

// Feature flags per piano
const FEATURE_FLAGS = {
  free: ['basic_rag', '3_personalities'],
  pro: ['basic_rag', '4_personalities', 'document_upload', 'analytics'],
  team: ['basic_rag', '4_personalities', 'document_upload', 'analytics', 'api_access', 'collaboration'],
  enterprise: ['basic_rag', '4_personalities', 'document_upload', 'analytics', 'api_access', 'collaboration', 'white_label', 'custom_training']
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

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

    switch (path) {
      case '/.netlify/functions/rag/query':
        return await handleRAGQuery(event.headers.authorization, body, headers);
      
      case '/.netlify/functions/rag/analytics':
        return await handleGetAnalytics(event.headers.authorization, headers);
      
      case '/.netlify/functions/rag/upload':
        return await handleDocumentUpload(event.headers.authorization, body, headers);
      
      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint not found' })
        };
    }
  } catch (error) {
    console.error('RAG function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Handle RAG query with rate limiting
async function handleRAGQuery(authHeader, body, headers) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  const { question, persona } = body;

  if (!question || !persona) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Question and persona required' })
    };
  }

  try {
    // Check rate limit
    const rateLimitCheck = await checkRateLimit(authHeader, 'rag_query');
    if (!rateLimitCheck.allowed) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          error: 'Rate limit exceeded',
          limit: rateLimitCheck
        })
      };
    }

    // Get user plan
    const userPlan = await getUserPlan(authHeader);
    if (!userPlan) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid user plan' })
      };
    }

    // Check if persona is allowed for user plan
    const allowedPersonas = getPersonasForPlan(userPlan.type);
    if (!allowedPersonas.includes(persona)) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ 
          error: 'Persona not available for your plan',
          availablePersonas: allowedPersonas
        })
      };
    }

    // Forward to Flowise API
    const startTime = Date.now();
    const flowiseResponse = await forwardToFlowise(question, persona);
    const responseTime = Date.now() - startTime;

    // Save analytics
    await saveAnalytics(authHeader, {
      query_text: question,
      persona,
      response_time: responseTime,
      tokens_used: flowiseResponse.tokens || 0
    });

    // Update query count
    await updateQueryCount(authHeader);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: flowiseResponse,
        analytics: {
          responseTime,
          tokensUsed: flowiseResponse.tokens || 0,
          remainingQueries: rateLimitCheck.remaining - 1
        }
      })
    };

  } catch (error) {
    console.error('RAG query error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Query failed' })
    };
  }
}

// Forward request to Flowise
async function forwardToFlowise(question, persona) {
  try {
    const response = await fetch(process.env.FLOWISE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLOWISE_API_KEY}`
      },
      body: JSON.stringify({
        question,
        persona,
        overrideConfig: {
          sessionId: `pyragogica-${Date.now()}`
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Flowise API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Flowise API error:', error);
    // Fallback response
    return {
      text: `Mi dispiace, al momento non riesco a processare la tua domanda. Errore: ${error.message}`,
      tokens: 0
    };
  }
}

// Check rate limit for user
async function checkRateLimit(authHeader, endpoint) {
  try {
    // Demo rate limit check
    const userId = extractUserId(authHeader);
    const userPlan = await getUserPlan(authHeader);
    
    if (!userPlan) {
      return { allowed: false, remaining: 0 };
    }

    const limit = PLAN_LIMITS[userPlan.type]?.queries || 100;
    const currentCount = 45; // Demo value, in production query database

    return {
      allowed: currentCount < limit,
      remaining: Math.max(0, limit - currentCount),
      limit,
      reset: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    return { allowed: false, remaining: 0 };
  }
}

// Get user plan
async function getUserPlan(authHeader) {
  try {
    // Demo user plan
    return {
      type: 'free',
      features: FEATURE_FLAGS.free,
      queryCount: 45
    };
  } catch (error) {
    console.error('Get user plan error:', error);
    return null;
  }
}

// Get personas for plan
function getPersonasForPlan(planType) {
  switch (planType) {
    case 'free':
      return ['socratic', 'academic', 'divulgative'];
    case 'pro':
    case 'team':
    case 'enterprise':
      return ['socratic', 'academic', 'divulgative', 'critical'];
    default:
      return ['socratic'];
  }
}

// Save analytics
async function saveAnalytics(authHeader, analytics) {
  try {
    const userId = extractUserId(authHeader);
    
    // In production, save to Neon database
    console.log('Saving analytics:', { userId, ...analytics });
    
    return true;
  } catch (error) {
    console.error('Save analytics error:', error);
    return false;
  }
}

// Update query count
async function updateQueryCount(authHeader) {
  try {
    const userId = extractUserId(authHeader);
    
    // In production, update query count in database
    console.log('Updating query count for user:', userId);
    
    return true;
  } catch (error) {
    console.error('Update query count error:', error);
    return false;
  }
}

// Extract user ID from auth header
function extractUserId(authHeader) {
  // Demo implementation
  return 'demo-user-id';
}

// Get analytics for user
async function handleGetAnalytics(authHeader, headers) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  try {
    // Demo analytics
    const analytics = {
      totalQueries: 45,
      queriesThisMonth: 12,
      averageResponseTime: 1200,
      mostUsedPersona: 'socratic',
      monthlyUsage: [
        { month: 'Jan', queries: 8 },
        { month: 'Feb', queries: 12 },
        { month: 'Mar', queries: 15 },
        { month: 'Apr', queries: 10 }
      ]
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ analytics })
    };
  } catch (error) {
    console.error('Get analytics error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get analytics' })
    };
  }
}

// Handle document upload
async function handleDocumentUpload(authHeader, body, headers) {
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization required' })
    };
  }

  const { filename, fileSize, fileType } = body;

  if (!filename || !fileSize) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Filename and file size required' })
    };
  }

  try {
    // Check if user plan allows document upload
    const userPlan = await getUserPlan(authHeader);
    if (!userPlan.features.includes('document_upload')) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ 
          error: 'Document upload not available for your plan',
          upgradeRequired: true
        })
      };
    }

    // Demo document upload
    const document = {
      id: 'doc-' + Date.now(),
      filename,
      fileSize,
      fileType,
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ 
        document,
        message: 'Document uploaded successfully'
      })
    };
  } catch (error) {
    console.error('Document upload error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Upload failed' })
    };
  }
} 