import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, PieChart, Target, Calendar, Zap, Star } from 'lucide-react';

const EconomicsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [projectionYears, setProjectionYears] = useState(3);

  const pricingTiers = [
    {
      id: 'free',
      name: 'Community',
      price: 0,
      users: '0-∞',
      features: ['Accesso contenuti base (70%)', 'AI Assistant limitato (5 query/giorno)', 'Community forum', 'Contenuti open source'],
      color: 'from-slate-500 to-slate-600',
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29,
      users: 'Individuale',
      features: ['Accesso completo biblioteca', 'AI Assistant illimitato', 'Tutte le personalità AI', 'Download contenuti', 'Analytics personali'],
      color: 'from-indigo-500 to-purple-600',
      popular: true
    },
    {
      id: 'team',
      name: 'Team Very',
      price: 99,
      users: '5-20 membri',
      features: ['Tutto di Professional', 'Spazi collaborativi privati', 'Content creation tools', 'Advanced analytics', 'Priority support'],
      color: 'from-purple-500 to-pink-600',
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      users: 'Illimitati',
      features: ['White-label solution', 'Custom AI training', 'API access', 'Dedicated support', 'Custom integrations'],
      color: 'from-pink-500 to-red-600',
      popular: false
    }
  ];

  const revenueStreams = [
    {
      name: 'Abbonamenti',
      percentage: 65,
      revenue: '$2.1M',
      description: 'Recurring revenue da piani Professional e Team',
      growth: '+23%',
      color: 'bg-blue-500'
    },
    {
      name: 'Content Premium',
      percentage: 20,
      revenue: '$650K',
      description: 'Vendita contenuti esclusivi e corsi specializzati',
      growth: '+18%',
      color: 'bg-green-500'
    },
    {
      name: 'Enterprise',
      percentage: 12,
      revenue: '$390K',
      description: 'Licenze e customizzazioni per aziende',
      growth: '+45%',
      color: 'bg-purple-500'
    },
    {
      name: 'API & Integrations',
      percentage: 3,
      revenue: '$95K',
      description: 'Revenue sharing con piattaforma partner',
      growth: '+12%',
      color: 'bg-orange-500'
    }
  ];

  const costStructure = [
    { category: 'AI & Infrastructure', percentage: 35, amount: '$875K', description: 'OpenAI API, cloud hosting, CDN' },
    { category: 'Personnel', percentage: 30, amount: '$750K', description: 'Salari team tecnico e content' },
    { category: 'Content Acquisition', percentage: 15, amount: '$375K', description: 'Licensing, autor royalties' },
    { category: 'Marketing & Sales', percentage: 12, amount: '$300K', description: 'Digital marketing, partnerships' },
    { category: 'Operations', percentage: 8, amount: '$200K', description: 'Legal, accounting, misc' }
  ];

  const projections = {
    1: { users: 2500, revenue: 850000, costs: 620000, profit: 230000 },
    2: { users: 8200, revenue: 2100000, costs: 1450000, profit: 650000 },
    3: { users: 18500, revenue: 4200000, costs: 2500000, profit: 1700000 },
    4: { users: 35000, revenue: 7500000, costs: 4200000, profit: 3300000 },
    5: { users: 58000, revenue: 12500000, costs: 6800000, profit: 5700000 }
  };

  const kpis = [
    { name: 'ARR', value: '$3.2M', change: '+65%', icon: DollarSign, color: 'text-green-600' },
    { name: 'CAC', value: '$47', change: '-12%', icon: Users, color: 'text-blue-600' },
    { name: 'LTV', value: '$340', change: '+28%', icon: TrendingUp, color: 'text-purple-600' },
    { name: 'Churn Rate', value: '3.2%', change: '-0.8%', icon: Target, color: 'text-red-600' }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Modello Economico</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Strategia di monetizzazione sostenibile basata su abbonamenti freemium 
          e contenuti premium per la Biblioteca Digitale Pyragogica
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{kpi.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  <p className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-xl ${kpi.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Tiers */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Piani di Abbonamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-white rounded-2xl shadow-lg p-6 border-2 transition-all ${
                selectedPlan === tier.id ? 'border-indigo-500 transform scale-105' : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => setSelectedPlan(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Popolare</span>
                  </span>
                </div>
              )}
              
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tier.color} mb-4`}>
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900">${tier.price}</span>
                <span className="text-slate-600">/mese</span>
              </div>
              <p className="text-slate-600 text-sm mb-6">{tier.users}</p>
              
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></div>
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                selectedPlan === tier.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
                {tier.price === 0 ? 'Inizia Gratis' : 'Scegli Piano'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Revenue Streams</h3>
          <div className="space-y-6">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{stream.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{stream.revenue}</span>
                    <span className="text-green-600 text-sm font-medium">{stream.growth}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`${stream.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${stream.percentage}%` }}
                  />
                </div>
                <p className="text-slate-600 text-sm">{stream.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Cost Structure</h3>
          <div className="space-y-6">
            {costStructure.map((cost, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{cost.category}</span>
                  <span className="font-bold text-slate-900">{cost.amount}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${cost.percentage}%` }}
                  />
                </div>
                <p className="text-slate-600 text-sm">{cost.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Proiezioni Finanziarie</h3>
          <div className="flex items-center space-x-4">
            <label htmlFor="projection-years" className="text-slate-300">Anni:</label>
            <select
              id="projection-years"
              value={projectionYears}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg"
            >
              <option value={3}>3 anni</option>
              <option value={5}>5 anni</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: projectionYears }, (_, i) => i + 1).map((year) => {
            const data = projections[year as keyof typeof projections];
            return (
              <div key={year} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold mb-4">Anno {year}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold">{data.users.toLocaleString()}</p>
                    <p className="text-slate-300 text-sm">Utenti</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(data.revenue)}</p>
                    <p className="text-slate-300 text-sm">Revenue</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{formatCurrency(data.profit)}</p>
                    <p className="text-slate-300 text-sm">Profit</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unit Economics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Customer Acquisition Cost</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">$47</p>
          <p className="text-slate-600">Costo per acquisire un nuovo utente pagante</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Customer Lifetime Value</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">$340</p>
          <p className="text-slate-600">Valore totale generato per cliente</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">LTV/CAC Ratio</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">7.2x</p>
          <p className="text-slate-600">Efficienza del modello di business</p>
        </div>
      </div>

      {/* Funding Strategy */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-8 text-center">Strategia di Finanziamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4">Seed Round</h4>
            <div className="space-y-2 text-indigo-200">
              <p>• $500K target</p>
              <p>• 12-18 mesi runway</p>
              <p>• MVP + traction</p>
              <p>• Angel investors</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4">Series A</h4>
            <div className="space-y-2 text-indigo-200">
              <p>• $2M target</p>
              <p>• Scaling team</p>
              <p>• Market expansion</p>
              <p>• VC partnership</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold mb-4">Growth</h4>
            <div className="space-y-2 text-indigo-200">
              <p>• $5M+ rounds</p>
              <p>• International expansion</p>
              <p>• Advanced AI features</p>
              <p>• Strategic partnerships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicsPage;