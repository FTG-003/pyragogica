import React, { useState, useEffect } from 'react';
import authService, { User, Plan } from '../services/authService';
import ragService from '../services/ragService';

interface UserPlanManagerProps {
  onPlanChange?: (plan: Plan) => void;
}

export const UserPlanManager: React.FC<UserPlanManagerProps> = ({ onPlanChange }) => {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!authService.isAuthenticated()) {
        setLoading(false);
        return;
      }

      const [userData, planData] = await Promise.all([
        authService.getProfile(),
        authService.getPlan()
      ]);

      setUser(userData);
      setPlan(planData);
      onPlanChange?.(planData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'free': return 'text-gray-600 bg-gray-100';
      case 'pro': return 'text-blue-600 bg-blue-100';
      case 'team': return 'text-purple-600 bg-purple-100';
      case 'enterprise': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'free': return '🆓';
      case 'pro': return '⭐';
      case 'team': return '👥';
      case 'enterprise': return '🏢';
      default: return '📋';
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'basic_rag': return '🤖';
      case '3_personalities': return '🎭';
      case '4_personalities': return '🎭';
      case 'document_upload': return '📄';
      case 'analytics': return '📊';
      case 'api_access': return '🔌';
      case 'collaboration': return '🤝';
      case 'white_label': return '🏷️';
      case 'custom_training': return '🎯';
      default: return '✅';
    }
  };

  const getFeatureName = (feature: string) => {
    switch (feature) {
      case 'basic_rag': return 'RAG Base';
      case '3_personalities': return '3 Personalità AI';
      case '4_personalities': return '4 Personalità AI';
      case 'document_upload': return 'Upload Documenti';
      case 'analytics': return 'Analytics Avanzate';
      case 'api_access': return 'Accesso API';
      case 'collaboration': return 'Collaborazione Team';
      case 'white_label': return 'White Label';
      case 'custom_training': return 'Training Personalizzato';
      default: return feature;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!authService.isAuthenticated()) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-yellow-600 text-lg mr-2">⚠️</div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Accesso Richiesto</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Accedi per visualizzare il tuo piano e le funzionalità disponibili.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600 text-lg mr-2">❌</div>
          <div>
            <h3 className="text-sm font-medium text-red-800">Errore</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !plan) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">Nessun dato utente disponibile</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* User Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.name || user.email}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(plan.type)}`}>
            {getPlanIcon(plan.type)} {plan.type.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Dettagli Piano</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Usage */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Utilizzo</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Query questo mese:</span>
                <span className="font-medium">
                  {plan.currentUsage.queries} / {plan.limits.queries === -1 ? '∞' : plan.limits.queries}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Documenti caricati:</span>
                <span className="font-medium">{plan.currentUsage.documents}</span>
              </div>
              
              {/* Progress bar */}
              {plan.limits.queries !== -1 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((plan.currentUsage.queries / plan.limits.queries) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* Limits */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Limiti</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Query mensili:</span>
                <span className="font-medium">
                  {plan.limits.queries === -1 ? 'Illimitate' : plan.limits.queries}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Finestra:</span>
                <span className="font-medium capitalize">{plan.limits.window}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-900 mb-3">Funzionalità Disponibili</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2 text-sm">
              <span className="text-lg">{getFeatureIcon(feature)}</span>
              <span className="text-gray-700">{getFeatureName(feature)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {plan.type === 'free' && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">
              🚀 Sblocca Funzionalità Avanzate
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Passa a un piano Pro per accedere a upload documenti, analytics e molto altro!
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Scopri i Piani Pro
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button 
          onClick={loadUserData}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          🔄 Aggiorna
        </button>
        <button 
          onClick={() => authService.logout()}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default UserPlanManager; 