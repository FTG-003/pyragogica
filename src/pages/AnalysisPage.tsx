import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Users, DollarSign, Clock, Shield, Zap } from 'lucide-react';

const AnalysisPage = () => {
  const [activeSection, setActiveSection] = useState('swot');

  const swotData = {
    strengths: [
      { icon: Target, title: 'Nicchia Innovativa', description: 'Focus unico su peer-to-peer learning e AI etica', impact: 'Alto' },
      { icon: Zap, title: 'Tecnologia RAG', description: 'Sistema avanzato di retrieval augmentato', impact: 'Alto' },
      { icon: Users, title: 'Community Esistente', description: 'Base Pyragogy già consolidata', impact: 'Medio' },
      { icon: Shield, title: 'Etica AI', description: 'Approccio trasparente e responsabile', impact: 'Alto' }
    ],
    weaknesses: [
      { icon: DollarSign, title: 'Costi Sviluppo', description: 'Investimento iniziale significativo per RAG', impact: 'Alto' },
      { icon: Clock, title: 'Time to Market', description: 'Complessità tecnica rallenta sviluppo', impact: 'Medio' },
      { icon: Users, title: 'Team Limitato', description: 'Risorse umane specializzate necessarie', impact: 'Medio' },
      { icon: Target, title: 'Mercato Nascente', description: 'Segmento ancora in formazione', impact: 'Medio' }
    ],
    opportunities: [
      { icon: TrendingUp, title: 'Crescita EdTech', description: 'Mercato in espansione del 16% annuo', impact: 'Alto' },
      { icon: Shield, title: 'Domanda Etica AI', description: 'Crescente attenzione a AI responsabile', impact: 'Alto' },
      { icon: Users, title: 'Remote Learning', description: 'Trend consolidato post-pandemia', impact: 'Alto' },
      { icon: DollarSign, title: 'Funding Disponibile', description: 'Investimenti in AI educativa in crescita', impact: 'Medio' }
    ],
    threats: [
      { icon: Users, title: 'Big Tech Competition', description: 'Google, Microsoft con risorse massive', impact: 'Alto' },
      { icon: Shield, title: 'Regolamentazione AI', description: 'Normative in evoluzione', impact: 'Medio' },
      { icon: Clock, title: 'Obsolescenza Tecnologica', description: 'Rapida evoluzione modelli AI', impact: 'Medio' },
      { icon: DollarSign, title: 'Costi Operativi AI', description: 'Aumento costi computazionali', impact: 'Medio' }
    ]
  };

  const valueCanvas = {
    customerJobs: ['Apprendere nuove competenze', 'Trovare contenuti affidabili', 'Collaborare con pari', 'Sviluppare pensiero critico'],
    painPoints: ['Sovraccarico informazioni', 'Qualità contenuti variabile', 'Isolamento nell\'apprendimento', 'Mancanza di personalizzazione'],
    gainCreators: ['AI personalizzata', 'Community attiva', 'Contenuti curati', 'Approccio etico'],
    painRelievers: ['Filtri intelligenti', 'Validazione qualità', 'Spazi collaborativi', 'Raccomandazioni contestuali'],
    products: ['Biblioteca digitale', 'AI Assistant multi-personalità', 'Tools collaborativi', 'Sistema RAG']
  };

  const competitiveAnalysis = [
    { name: 'Coursera', strengths: 'Scale, brand', weaknesses: 'Non peer-focused', opportunity: 'Personalizzazione limitata' },
    { name: 'Khan Academy', strengths: 'Gratuito, qualità', weaknesses: 'Non collaborativo', opportunity: 'AI integration' },
    { name: 'Discord/Slack', strengths: 'Community, tools', weaknesses: 'Non educativo', opportunity: 'Content structure' },
    { name: 'GitHub', strengths: 'Collaboration, devs', weaknesses: 'Tech-only', opportunity: 'Educational focus' }
  ];

  const riskAssessment = [
    { risk: 'Competizione Big Tech', probability: 'Alta', impact: 'Alto', mitigation: 'Focus nicchia, partnership strategiche' },
    { risk: 'Adozione lenta', probability: 'Media', impact: 'Alto', mitigation: 'MVP validation, marketing mirato' },
    { risk: 'Costi AI elevati', probability: 'Media', impact: 'Medio', mitigation: 'Modelli ibridi, ottimizzazione' },
    { risk: 'Problemi privacy', probability: 'Bassa', impact: 'Alto', mitigation: 'Privacy by design, compliance' }
  ];

  const sections = [
    { id: 'swot', name: 'Analisi SWOT', icon: Target },
    { id: 'value', name: 'Value Canvas', icon: Users },
    { id: 'competition', name: 'Competitor Analysis', icon: TrendingUp },
    { id: 'risks', name: 'Risk Assessment', icon: Shield }
  ];

  const renderSWOT = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Strengths */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Punti di Forza
        </h3>
        <div className="space-y-4">
          {swotData.strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900">{item.title}</h4>
                  <p className="text-green-700 text-sm">{item.description}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    item.impact === 'Alto' ? 'bg-green-200 text-green-800' : 'bg-green-100 text-green-700'
                  }`}>
                    Impatto {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
          <TrendingDown className="w-5 h-5 mr-2" />
          Punti di Debolezza
        </h3>
        <div className="space-y-4">
          {swotData.weaknesses.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Icon className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900">{item.title}</h4>
                  <p className="text-red-700 text-sm">{item.description}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    item.impact === 'Alto' ? 'bg-red-200 text-red-800' : 'bg-red-100 text-red-700'
                  }`}>
                    Impatto {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Opportunità
        </h3>
        <div className="space-y-4">
          {swotData.opportunities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">{item.title}</h4>
                  <p className="text-blue-700 text-sm">{item.description}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    item.impact === 'Alto' ? 'bg-blue-200 text-blue-800' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Impatto {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Threats */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200">
        <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Minacce
        </h3>
        <div className="space-y-4">
          {swotData.threats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Icon className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-900">{item.title}</h4>
                  <p className="text-orange-700 text-sm">{item.description}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    item.impact === 'Alto' ? 'bg-orange-200 text-orange-800' : 'bg-orange-100 text-orange-700'
                  }`}>
                    Impatto {item.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderValueCanvas = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Customer Profile</h3>
        
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-4">Customer Jobs</h4>
          <ul className="space-y-2">
            {valueCanvas.customerJobs.map((job, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-800">{job}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-900 mb-4">Pain Points</h4>
          <ul className="space-y-2">
            {valueCanvas.painPoints.map((pain, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-800">{pain}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Value Proposition</h3>
        
        <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
          <h4 className="font-bold text-green-900 mb-4">Gain Creators</h4>
          <ul className="space-y-2">
            {valueCanvas.gainCreators.map((gain, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-800">{gain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
          <h4 className="font-bold text-purple-900 mb-4">Pain Relievers</h4>
          <ul className="space-y-2">
            {valueCanvas.painRelievers.map((reliever, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-800">{reliever}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-4">Products & Services</h4>
          <ul className="space-y-2">
            {valueCanvas.products.map((product, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-indigo-800">{product}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCompetition = () => (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-slate-900">Competitor</th>
              <th className="px-6 py-4 text-left font-bold text-slate-900">Punti di Forza</th>
              <th className="px-6 py-4 text-left font-bold text-slate-900">Debolezze</th>
              <th className="px-6 py-4 text-left font-bold text-slate-900">Nostra Opportunità</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {competitiveAnalysis.map((competitor, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">{competitor.name}</td>
                <td className="px-6 py-4 text-green-700">{competitor.strengths}</td>
                <td className="px-6 py-4 text-red-700">{competitor.weaknesses}</td>
                <td className="px-6 py-4 text-blue-700">{competitor.opportunity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Positioning Strategico</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1st</div>
            <div className="text-indigo-200">AI Ethics in Education</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">Unique</div>
            <div className="text-indigo-200">Peer-to-Peer Focus</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">Advanced</div>
            <div className="text-indigo-200">RAG Technology</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRisks = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {riskAssessment.map((risk, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">{risk.risk}</h3>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  risk.probability === 'Alta' ? 'bg-red-100 text-red-800' :
                  risk.probability === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Probabilità {risk.probability}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  risk.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                  risk.impact === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Impatto {risk.impact}
                </span>
              </div>
            </div>
            <p className="text-slate-600 mb-4">
              <strong>Strategia di Mitigazione:</strong> {risk.mitigation}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Risk Management Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Prevent</h4>
            <p className="text-slate-600 text-sm">Identificazione precoce</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Monitor</h4>
            <p className="text-slate-600 text-sm">Tracking continuo</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Respond</h4>
            <p className="text-slate-600 text-sm">Azione rapida</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Adapt</h4>
            <p className="text-slate-600 text-sm">Apprendimento continuo</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Analisi Strategica</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Valutazione completa di opportunità, rischi e posizionamento competitivo 
          per la Biblioteca Digitale Pyragogica
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 shadow-md hover:shadow-lg'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mb-16">
        {activeSection === 'swot' && renderSWOT()}
        {activeSection === 'value' && renderValueCanvas()}
        {activeSection === 'competition' && renderCompetition()}
        {activeSection === 'risks' && renderRisks()}
      </div>
    </div>
  );
};

export default AnalysisPage;