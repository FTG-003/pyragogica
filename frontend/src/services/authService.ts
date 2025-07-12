export interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'free' | 'pro' | 'team' | 'enterprise';
  features: string[];
  queryCount?: number;
  queryLimit?: number;
}

export interface Plan {
  type: 'free' | 'pro' | 'team' | 'enterprise';
  limits: {
    queries: number;
    window: string;
  };
  features: string[];
  currentUsage: {
    queries: number;
    documents: number;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

class AuthService {
  private baseUrl = '/.netlify/functions';
  private token: string | null = null;

  constructor() {
    // Recupera token dal localStorage
    this.token = localStorage.getItem('pyragogica_token');
  }

  // Login
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      
      // Salva token
      this.token = data.token;
      localStorage.setItem('pyragogica_token', data.token);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data: AuthResponse = await response.json();
      
      // Salva token
      this.token = data.token;
      localStorage.setItem('pyragogica_token', data.token);
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Get user profile
  async getProfile(): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get profile');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Get user plan
  async getPlan(): Promise<Plan> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/plan`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get plan');
      }

      const data = await response.json();
      return data.plan;
    } catch (error) {
      console.error('Get plan error:', error);
      throw error;
    }
  }

  // Check rate limit
  async checkLimit(endpoint: string): Promise<{
    allowed: boolean;
    remaining: number;
    limit: number;
    reset: Date;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/check-limit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify({ endpoint }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to check limit');
      }

      const data = await response.json();
      return {
        ...data.limit,
        reset: new Date(data.limit.reset),
      };
    } catch (error) {
      console.error('Check limit error:', error);
      throw error;
    }
  }

  // Logout
  logout(): void {
    this.token = null;
    localStorage.removeItem('pyragogica_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Check if user has feature
  hasFeature(feature: string): boolean {
    // Demo implementation - in production check user plan
    const demoFeatures = ['basic_rag', '3_personalities'];
    return demoFeatures.includes(feature);
  }

  // Check if user can use persona
  canUsePersona(persona: string): boolean {
    // Demo implementation - in production check user plan
    const allowedPersonas = ['socratic', 'academic', 'divulgative'];
    return allowedPersonas.includes(persona);
  }

  // Get available personas for user
  getAvailablePersonas(): string[] {
    // Demo implementation - in production check user plan
    return ['socratic', 'academic', 'divulgative'];
  }
}

export const authService = new AuthService();
export default authService; 