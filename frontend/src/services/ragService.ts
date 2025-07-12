import authService from './authService';

export interface RAGResponse {
  text: string;
  sources?: string[];
  tokens?: number;
}

export interface RAGAnalytics {
  responseTime: number;
  tokensUsed: number;
  remainingQueries: number;
}

export interface AnalyticsData {
  totalQueries: number;
  queriesThisMonth: number;
  averageResponseTime: number;
  mostUsedPersona: string;
  monthlyUsage: Array<{
    month: string;
    queries: number;
  }>;
}

export interface DocumentUpload {
  id: string;
  filename: string;
  fileSize: number;
  fileType: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
}

class RAGService {
  private baseUrl = '/.netlify/functions';

  // Send RAG query with rate limiting
  async query(question: string, persona: string): Promise<{
    response: RAGResponse;
    analytics: RAGAnalytics;
  }> {
    try {
      // Check authentication
      if (!authService.isAuthenticated()) {
        throw new Error('Authentication required');
      }

      // Check if persona is available for user
      if (!authService.canUsePersona(persona)) {
        throw new Error(`Persona '${persona}' not available for your plan`);
      }

      // Check rate limit
      const limitCheck = await authService.checkLimit('rag_query');
      if (!limitCheck.allowed) {
        throw new Error(`Rate limit exceeded. Reset at ${limitCheck.reset.toLocaleString()}`);
      }

      const response = await fetch(`${this.baseUrl}/rag/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify({ question, persona }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Query failed');
      }

      const data = await response.json();
      return {
        response: data.response,
        analytics: data.analytics,
      };
    } catch (error) {
      console.error('RAG query error:', error);
      throw error;
    }
  }

  // Get analytics for user
  async getAnalytics(): Promise<AnalyticsData> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.baseUrl}/rag/analytics`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get analytics');
      }

      const data = await response.json();
      return data.analytics;
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }

  // Upload document
  async uploadDocument(file: File): Promise<DocumentUpload> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Authentication required');
      }

      // Check if user has document upload feature
      if (!authService.hasFeature('document_upload')) {
        throw new Error('Document upload not available for your plan');
      }

      const response = await fetch(`${this.baseUrl}/rag/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify({
          filename: file.name,
          fileSize: file.size,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      return data.document;
    } catch (error) {
      console.error('Document upload error:', error);
      throw error;
    }
  }

  // Get available personas for current user
  getAvailablePersonas(): string[] {
    return authService.getAvailablePersonas();
  }

  // Check if user can upload documents
  canUploadDocuments(): boolean {
    return authService.hasFeature('document_upload');
  }

  // Check if user can access analytics
  canAccessAnalytics(): boolean {
    return authService.hasFeature('analytics');
  }

  // Get user's current plan info
  async getCurrentPlanInfo() {
    try {
      const plan = await authService.getPlan();
      const limit = await authService.checkLimit('rag_query');
      
      return {
        plan,
        limit,
        canUpload: this.canUploadDocuments(),
        canAccessAnalytics: this.canAccessAnalytics(),
        availablePersonas: this.getAvailablePersonas(),
      };
    } catch (error) {
      console.error('Get plan info error:', error);
      throw error;
    }
  }

  // Demo function for testing without authentication
  async demoQuery(question: string, persona: string): Promise<RAGResponse> {
    try {
      // Simulate API call to backend
      const response = await fetch('http://localhost:4000/api/ai/flowise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, persona }),
      });

      if (!response.ok) {
        throw new Error('Demo query failed');
      }

      const data = await response.json();
      return {
        text: data.text || 'Demo response',
        sources: data.sources || [],
        tokens: data.tokens || 0,
      };
    } catch (error) {
      console.error('Demo query error:', error);
      // Fallback response
      return {
        text: `Demo response per: "${question}" con personalità ${persona}. Questa è una risposta di test.`,
        sources: ['demo-source'],
        tokens: 50,
      };
    }
  }
}

export const ragService = new RAGService();
export default ragService;