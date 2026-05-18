import React, { useState } from 'react';
import { 
  BarChart3, 
  Kanban, 
  Table, 
  Clock, 
  TrendingUp, 
  Target, 
  Layers, 
  Bot, 
  Zap, 
  MessageSquare, 
  Users, 
  DollarSign, 
  Activity, 
  PieChart, 
  GitGraph, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  Plus,
  ChevronRight,
  Filter,
  Search,
  MessageCircle,
  FileText,
  Phone,
  Video,
  Settings,
  Share2,
  Rocket,
  Send,
  Landmark,
  Building2,
  Network,
  Shield,
  Trello,
  Brain
} from 'lucide-react';

// --- Monday.com App ---
export const MondayApp = () => {
  const [activeView, setActiveView] = useState<'table' | 'kanban' | 'gantt'>('table');
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-brand-purple/10 text-brand-purple rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Marketing Plan 2024</h2>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <span>Workspace Principal</span>
              <span>/</span>
              <span>Boards de Produção</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <button 
              onClick={() => setActiveView('table')}
              className={`p-1.5 rounded-md transition-all ${activeView === 'table' ? 'bg-white dark:bg-slate-800 shadow-sm text-brand-purple' : 'text-slate-400'}`}
            >
              <Table className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveView('kanban')}
              className={`p-1.5 rounded-md transition-all ${activeView === 'kanban' ? 'bg-white dark:bg-slate-800 shadow-sm text-brand-purple' : 'text-slate-400'}`}
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-purple text-white rounded-lg text-xs font-bold hover:scale-105 active:scale-95 transition-all">
            <Zap className="w-3 h-3" /> Automações
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search items..." className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-xs focus:ring-1 focus:ring-brand-purple outline-none w-64" />
            </div>
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors text-slate-500">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">U{i}</div>
              ))}
            </div>
            <button className="w-7 h-7 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-brand-purple hover:text-brand-purple transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-black/5 dark:border-white/10">
                <th className="p-3 text-[10px] font-bold uppercase text-slate-500 w-12 text-center">#</th>
                <th className="p-3 text-[10px] font-bold uppercase text-slate-500">Item Name</th>
                <th className="p-3 text-[10px] font-bold uppercase text-slate-500">Assignee</th>
                <th className="p-3 text-[10px] font-bold uppercase text-slate-500">Status</th>
                <th className="p-3 text-[10px] font-bold uppercase text-slate-500">Priority</th>
                <th className="p-3 text-[10px] font-bold uppercase text-slate-500">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {[
                { id: 1, name: 'Q2 Strategy Research', status: 'Working on it', priority: 'High', color: 'bg-orange-500' },
                { id: 2, name: 'Social Media Assets', status: 'Done', priority: 'Medium', color: 'bg-green-500' },
                { id: 3, name: 'Landing Page v2', status: 'Stuck', priority: 'Critical', color: 'bg-red-500' },
                { id: 4, name: 'Email Campaign Setup', status: 'Working on it', priority: 'Low', color: 'bg-orange-500' },
              ].map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="p-3 text-center text-slate-400 text-xs">{item.id}</td>
                  <td className="p-3 text-sm font-medium">{item.name}</td>
                  <td className="p-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">JD</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded text-[10px] font-bold text-white ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs font-bold text-slate-500">{item.priority}</td>
                  <td className="p-3">
                    <div className="w-24 h-5 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-3/4 bg-brand-purple/20"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="w-full p-3 text-xs font-bold text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors border-t border-black/5 dark:border-white/5">
            + New Item
          </button>
        </div>
      </div>

      {/* Sidekick Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-lg">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Monday Sidekick IA</p>
            <p className="text-xs text-slate-500 font-medium">Você tem 3 tarefas em atraso que afetam o cronograma crítico.</p>
          </div>
        </div>
        <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase text-brand-purple hover:bg-brand-purple hover:text-white transition-all shadow-sm">
          Otimizar Plano
        </button>
      </div>
    </div>
  );
};

// --- RD Station App ---
export const RDStationApp = () => {
  const [activeTab, setActiveTab] = useState<'marketing' | 'crm'>('marketing');
  
  return (
    <div className="flex flex-col h-full bg-[#F5F7FA] dark:bg-slate-950">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <div className="w-20 bg-[#122A42] flex flex-col items-center py-6 gap-6 shrink-0">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all">
            <Activity className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <button onClick={() => setActiveTab('marketing')} className={`p-3 rounded-xl transition-all ${activeTab === 'marketing' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}>
              <Rocket className="w-5 h-5" />
            </button>
            <button onClick={() => setActiveTab('crm')} className={`p-3 rounded-xl transition-all ${activeTab === 'crm' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-white'}`}>
              <MessageSquare className="w-5 h-5" />
            </button>
            <div className="p-3 text-slate-400 hover:text-white cursor-pointer">
              <Users className="w-5 h-5" />
            </div>
            <div className="p-3 text-slate-400 hover:text-white cursor-pointer">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="p-3 text-slate-400">
            <Settings className="w-5 h-5" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTab === 'marketing' ? (
            <>
              <div className="px-10 py-8 bg-white dark:bg-slate-900 border-b border-black/5 dark:border-white/10">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 underline decoration-sky-500 decoration-4 underline-offset-8">Converge Funnel</h1>
                <p className="text-sm text-slate-500 mt-4 font-medium italic">Marketing + CRM em uma base de dados única.</p>
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {/* Funnel Visualizer */}
                <div className="flex items-stretch h-32 gap-1 px-4">
                   <div className="flex-1 bg-sky-500 relative flex items-center justify-center rounded-l-2xl group overflow-hidden">
                      <div className="text-center z-10">
                        <p className="text-[10px] font-bold text-white/60 uppercase">Atração</p>
                        <p className="text-xl font-bold text-white">4.2k</p>
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/10"></div>
                   </div>
                   <div className="flex-[0.8] bg-sky-600 relative flex items-center justify-center group overflow-hidden">
                      <div className="text-center z-10">
                        <p className="text-[10px] font-bold text-white/60 uppercase">Qualificação</p>
                        <p className="text-xl font-bold text-white">850</p>
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black/10"></div>
                   </div>
                   <div className="flex-[0.6] bg-sky-700 relative flex items-center justify-center rounded-r-2xl group overflow-hidden">
                      <div className="text-center z-10">
                        <p className="text-[10px] font-bold text-white/60 uppercase">Conversão</p>
                        <p className="text-xl font-bold text-white">42</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                       <Zap className="w-4 h-4 text-amber-500" />
                       IA "Rê" - Atividades
                    </h3>
                    <div className="space-y-3">
                       <div className="p-3 bg-sky-50 dark:bg-sky-500/10 rounded-xl border border-sky-100 dark:border-sky-500/20">
                          <p className="text-xs font-bold text-sky-700 dark:text-sky-300">Sugestão de Segmentação</p>
                          <p className="text-[10px] text-sky-600 dark:text-sky-400 mt-1">Identifiquei 12 leads com padrão de interesse em 'SaaS Enterprise'. Criar campanha?</p>
                       </div>
                       <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-black/5 dark:border-white/5">
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Resumo de Transcrição</p>
                          <p className="text-[10px] text-slate-500 mt-1">Chamada com 'Impacto Soluções' resumida: Próximo passo → Proposta em 48h.</p>
                       </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
                    <h3 className="text-sm font-bold mb-4">Métricas de Saúde</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">CAC Atual</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">R$ 145</p>
                       </div>
                       <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">LTV Médio</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">R$ 2.4k</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full bg-[#E5E9F0] dark:bg-slate-950">
              {/* WhatsApp Mockup Interface */}
              <div className="w-1/3 border-r border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 overflow-y-auto">
                 <div className="p-4 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40">
                   <input type="text" placeholder="Buscar conversas..." className="w-full px-4 py-2 bg-white dark:bg-slate-800 border-none rounded-xl text-xs shadow-sm" />
                 </div>
                 {[
                   { name: 'João Silva', msg: 'Aumentamos o budget?', time: '14:20', active: true },
                   { name: 'Maria Oliveira', msg: 'Pode enviar o PDF?', time: '12:05' },
                   { name: 'Carlos Souza', msg: 'Marcamos para amanhã.', time: 'Ontem' },
                 ].map((c, i) => (
                   <div key={i} className={`p-4 flex items-start gap-3 border-b border-black/5 dark:border-white/5 cursor-pointer ${c.active ? 'bg-sky-50 dark:bg-sky-500/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-xs font-bold truncate">{c.name}</p>
                          <p className="text-[9px] text-slate-400">{c.time}</p>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{c.msg}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="flex-1 flex flex-col relative">
                 <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                      <div>
                        <p className="text-xs font-bold">João Silva</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest leading-none">Online</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                      <Phone className="w-4 h-4 cursor-pointer hover:text-sky-500" />
                      <Video className="w-4 h-4 cursor-pointer hover:text-sky-500" />
                      <Search className="w-4 h-4 cursor-pointer hover:text-sky-500" />
                    </div>
                 </div>
                 <div className="flex-1 p-6 relative">
                    <div className="absolute inset-0 bg-[#E5E9F0]/50 dark:bg-slate-950/50 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="bg-white dark:bg-slate-800 max-w-[70%] p-3 rounded-2xl rounded-tl-none shadow-sm text-xs relative">
                       Boa tarde, João! Conferiu o plano que conversamos?
                       <p className="text-[9px] text-slate-400 mt-1 text-right">14:15</p>
                    </div>
                    <div className="bg-sky-500 text-white max-w-[70%] p-3 rounded-2xl rounded-tr-none shadow-sm text-xs ml-auto mt-4 relative">
                       Aumentamos o budget? Notei que o CPC subiu.
                       <p className="text-[9px] text-white/60 mt-1 text-right">14:20</p>
                    </div>
                 </div>
                 <div className="p-4 bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <Plus className="w-5 h-5 text-slate-400 cursor-pointer" />
                      <input type="text" placeholder="Escreva uma mensagem..." className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs" />
                      <Send className="w-5 h-5 text-sky-500 cursor-pointer" />
                    </div>
                 </div>

                 {/* RD CRM Overlay Sidebar (The invisible CRM) */}
                 <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-l border-black/10 dark:border-white/10 shadow-xl p-6 transform transition-transform">
                    <div className="flex items-center gap-2 mb-6 text-sky-600 dark:text-sky-400">
                       <Activity className="w-4 h-4 font-bold" />
                       <h4 className="text-[10px] font-bold uppercase tracking-widest">RD Station CRM</h4>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-2 tracking-tighter">Etapa do Funil</p>
                          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-bold">
                             <option>Qualificação</option>
                             <option>Apresentação</option>
                             <option>Proposta</option>
                          </select>
                       </div>
                       <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mb-2 tracking-tighter">Tarefa do Dia</p>
                          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20">
                             <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300">Agendar Demonstração</p>
                             <p className="text-[9px] text-amber-600 dark:text-amber-500 mt-1">João demonstrou interesse em customizações.</p>
                          </div>
                       </div>
                       <button className="w-full py-3 bg-sky-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-sky-500/20">
                          Ganhar Negócio
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Treasy App ---
export const TreasyApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#1A1C1E] text-white">
      {/* Navbar UI */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
             <Landmark className="w-6 h-6 text-emerald-500" />
             <span className="font-bold text-lg tracking-tighter italic">TREASY</span>
          </div>
          <nav className="flex gap-6">
            <button className="text-xs font-bold uppercase tracking-widest text-emerald-500 border-b-2 border-emerald-500 pb-1">Cockpit</button>
            <button className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">Planejamento (OBZ)</button>
            <button className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">DRE / DFC</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ERP Conectado
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="mb-10">
           <h1 className="text-3xl font-bold tracking-tight">Arquitetura de Orçamento Base Zero</h1>
           <p className="text-slate-400 mt-2 text-sm max-w-xl">Modelo Software + Metodologia: Cada departamento opera como uma unidade orçamentária independente sob governança RBAC.</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
           {/* Organograma RBAC */}
           <div className="col-span-2 bg-[#25282C] rounded-[40px] border border-white/5 p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Building2 className="w-32 h-32" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-slate-500">Fluxo de Governança (RBAC)</h3>
              <div className="flex flex-col items-center gap-8">
                 <div className="w-48 p-4 bg-emerald-500 rounded-2xl flex flex-col items-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <span className="text-[10px] font-bold text-black/40 uppercase">Nível 1</span>
                    <span className="font-bold">Administração</span>
                 </div>
                 <div className="flex gap-8">
                    {[1, 2].map(i => (
                      <div key={i} className="w-40 p-3 bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center">
                        <span className="text-[9px] font-bold opacity-40 uppercase">Departamento</span>
                        <span className="font-bold text-sm">Célula {i}</span>
                      </div>
                    ))}
                 </div>
                 <div className="grid grid-cols-4 gap-4 w-full">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="p-3 bg-white/[0.03] border border-dashed border-white/10 rounded-xl flex flex-col items-center shadow-inner">
                        <span className="text-[8px] font-bold opacity-30 uppercase">Gestor</span>
                        <span className="font-bold text-[10px]">Analista {i}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Vertical BI */}
           <div className="flex flex-col gap-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[32px] flex-1">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-emerald-500 uppercase">DRE (Análise Vertical)</h3>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: 'Receita Bruta', val: '1.2M', pct: '100%' },
                      { label: 'CMV', val: '-420k', pct: '35%', color: 'text-red-400' },
                      { label: 'Margem Contrib.', val: '780k', pct: '65%' },
                      { label: 'EBITDA', val: '240k', pct: '20%' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span>{item.label}</span>
                          <span className={item.color}>{item.val}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: item.pct }}></div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-[32px] flex-1">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-blue-400 uppercase">DFC (Fluxo de Caixa)</h3>
                    <GitGraph className="w-4 h-4 text-blue-400" />
                 </div>
                 <div className="h-24 flex items-end gap-1 px-2">
                    {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
                 <div className="flex justify-between items-center mt-4">
                    <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest font-mono">Saldo Previsto</p>
                    <p className="text-sm font-bold text-blue-400">R$ 512.430,22</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- eKyte App ---
export const EKyteApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#FAFBFF] dark:bg-slate-950 font-sans">
      <div className="h-20 bg-white dark:bg-slate-900 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-10 shadow-sm relative z-10">
        <div className="flex items-center gap-12">
           <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-brand-purple rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-100">eKyte</span>
           </div>
           <nav className="flex gap-8">
              {['Estratégia', 'Produção', 'Publicação', 'Otimização'].map(item => (
                <button key={item} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-purple transition-all relative group py-2">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-purple transition-all group-hover:w-full"></span>
                </button>
              ))}
           </nav>
        </div>
        <div className="flex items-center gap-4">
           <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl cursor-not-allowed opacity-50">
             <BarChart3 className="w-5 h-5 text-slate-400" />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-purple/5 text-brand-purple rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                <Bot className="w-3 h-3" /> Motor de IA Ativo
             </div>
             <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Gestão de Performance DMM</h1>
             <p className="text-lg text-slate-500 mt-2">Inteligência preditiva aplicada ao core do marketing digital.</p>
          </header>

          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-8 bg-white dark:bg-slate-900 rounded-[40px] border border-black/5 dark:border-white/10 p-10 shadow-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold">Visão de Otimização (BI Integrado)</h3>
                  <div className="flex gap-2">
                     <span className="p-2 bg-blue-500/10 text-blue-600 rounded-lg"><TrendingUp className="w-4 h-4" /></span>
                     <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><Filter className="w-4 h-4" /></span>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">CPL Médio (IA Predição)</span>
                           <span className="text-emerald-500 text-[10px] font-bold">-12% vs Ontem</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-bold text-brand-purple tracking-tighter">R$ 4,82</span>
                           <span className="text-xs text-slate-500 font-medium">Meta: R$ 5,50</span>
                        </div>
                     </div>
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase">ROAS Estimado</span>
                           <span className="text-brand-purple text-[10px] font-bold">+0.4x</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tighter">3.82x</span>
                           <span className="text-xs text-slate-500 font-medium">Breakpoint: 2.5x</span>
                        </div>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="aspect-square rounded-full border-[1.5rem] border-slate-50 dark:border-slate-800 flex items-center justify-center relative">
                        <div className="absolute inset-0 border-[1.5rem] border-brand-purple rounded-full border-t-transparent border-l-transparent transform -rotate-45"></div>
                        <div className="text-center">
                           <p className="text-3xl font-bold">82%</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase">Qualidade</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-span-4 bg-gradient-to-br from-brand-purple to-indigo-700 rounded-[40px] p-10 text-white shadow-2xl flex flex-col justify-between">
               <div className="p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-md">
                  <Bot className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-xl font-bold leading-tight mb-4">Insigths de IA Ativos</h3>
                  <div className="space-y-4">
                     <p className="text-xs text-white/70 italic bg-black/10 p-3 rounded-2xl border border-white/10">"O criativo #24 em Facebook Ads está com retenção 30% acima da média. Recomendo escalar budget em 2x."</p>
                     <p className="text-xs text-white/70 italic bg-black/10 p-3 rounded-2xl border border-white/10">"Queda de performance detectada no checkout. Verificar latência de API."</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[40px] text-white flex items-center justify-between relative overflow-hidden group border border-white/10">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="flex gap-12 relative z-10">
                <div className="text-center border-r border-white/10 pr-12">
                   <p className="text-[9px] font-bold text-brand-purple uppercase mb-2 tracking-widest">Produção</p>
                   <p className="text-2xl font-bold">120h</p>
                   <p className="text-[10px] text-white/40">Apontadas/Mês</p>
                </div>
                <div className="text-center border-r border-white/10 pr-12">
                   <p className="text-[9px] font-bold text-brand-purple uppercase mb-2 tracking-widest">Rentabilidade</p>
                   <p className="text-2xl font-bold">42%</p>
                   <p className="text-[10px] text-white/40">Margem por Cliente</p>
                </div>
                <div className="text-center">
                   <p className="text-[9px] font-bold text-brand-purple uppercase mb-2 tracking-widest">Publicação</p>
                   <p className="text-2xl font-bold">14</p>
                   <p className="text-[10px] text-white/40">P.I. Enviadas</p>
                </div>
             </div>
             <button className="px-8 py-3 bg-brand-purple rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg transform group-hover:translate-x-2 transition-all">
                Painel Estratégico
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MentorWeb App ---
export const MentorWebApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#F3F4F6] dark:bg-slate-950">
      {/* Top Menu (Painel de Estratégia) */}
      <div className="h-14 bg-white dark:bg-slate-900 border-b border-black/5 dark:border-white/10 flex items-center justify-center gap-12 px-8 overflow-x-auto shrink-0">
        <button className="flex items-center gap-2 text-xs font-bold text-brand-purple border-b-2 border-brand-purple h-full px-2">
          <Network className="w-4 h-4" /> Mapa Estratégico
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors h-full px-2">
          <Activity className="w-4 h-4" /> OKRs Ativos
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors h-full px-2">
          <BarChart3 className="w-4 h-4" /> Visão Global (BSC)
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
             <div>
                <h1 className="text-4xl font-bold text-[#1F2937] dark:text-slate-100 tracking-tight">Governança Estratégica</h1>
                <p className="text-slate-500 mt-2 font-medium italic">Monitorando anomalias estratégicas e auditando resoluções.</p>
             </div>
             <div className="flex gap-4">
                <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-6">
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Status Global</p>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                         <span className="text-xl font-bold text-emerald-500">Saudável</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* KPI Anomaly Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-red-500/20 shadow-xl overflow-hidden shadow-red-500/5">
               <div className="p-6 bg-red-500 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Anomalia Crítica</span>
                  </div>
                  <span className="text-[10px] font-bold opacity-60">ID: #ANO-42</span>
               </div>
               <div className="p-8">
                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">KPI em Falha</p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Taxa de Conversão Leads</h3>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-2xl font-bold text-red-500">2.1%</span>
                       <span className="text-[10px] font-bold text-slate-400">vs Meta de 3.5%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-black/5 dark:border-white/5 mb-8">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Protocolo Acionado</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-purple">
                       <Shield className="w-4 h-4" /> 5W2H + FCA Obrigatório
                    </div>
                  </div>
                  <button className="w-full py-4 bg-slate-900 dark:bg-brand-purple text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Iniciar Resolução
                  </button>
               </div>
            </div>

            {/* Strategic Map Preview */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] border border-black/5 dark:border-white/10 p-8 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                     <Target className="w-4 h-4 text-brand-purple" />
                     Mapeamento (Balanced Scorecard)
                  </h3>
                  <button className="text-[10px] font-bold text-brand-purple uppercase hover:underline">Ver Mapa Completo</button>
               </div>
               
               <div className="space-y-6">
                 {[
                   { label: 'Financeiro', color: 'bg-emerald-500', status: 'Em Dia', sub: 'EBITDA, Fluxo de Caixa' },
                   { label: 'Clientes', color: 'bg-sky-500', status: 'Atenção', sub: 'NPS, Churn Rate', warning: true },
                   { label: 'Processos', color: 'bg-brand-purple', status: 'Em Dia', sub: 'Lead Time, OKR Operacional' },
                   { label: 'Aprendizado', color: 'bg-amber-500', status: 'Em Dia', sub: 'Turnover, Training Score' },
                 ].map((p, i) => (
                   <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer group">
                      <div className={`w-3 h-12 ${p.color} rounded-full`}></div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold">{p.label}</h4>
                         <p className="text-[10px] text-slate-400 font-medium">{p.sub}</p>
                      </div>
                      <div className="text-right">
                         <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${p.warning ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                           {p.status}
                         </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-purple transform group-hover:translate-x-1 transition-all" />
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Compliance Feed */}
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-[40px] border border-black/5 dark:border-white/10 p-10 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2">
                   <GitGraph className="w-5 h-5 text-slate-400" />
                   Audit Trail (Governança e Compliance)
                </h3>
             </div>
             <div className="space-y-6">
                {[
                  { time: '10:02 AM', icon: <FileText className="w-4 h-4" />, msg: 'Plano 5W2H gerado automaticamente para "Lead Drop".', user: 'System' },
                  { time: '10:15 AM', icon: <CheckCircle2 className="w-4 h-4" />, msg: 'Aprovação do Gestor Financeiro concedida para budget emergencial.', user: 'Admin' },
                  { time: '10:42 AM', icon: <Activity className="w-4 h-4" />, msg: 'Execução de Plano de Ação iniciada pela célula de Performance.', user: 'eKyte Bot' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                     <span className="text-[9px] font-mono text-slate-400 pt-1 shrink-0">{item.time}</span>
                     <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg shrink-0 text-brand-purple">
                        {item.icon}
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.msg}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Origem: {item.user}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komvos Mind App ---
export const KomvosMindApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white font-sans">
       <div className="flex-1 flex flex-col justify-center items-center p-12 text-center">
          <div className="w-24 h-24 bg-brand-purple rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(139,92,246,0.5)] animate-pulse">
             <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Komvos Mind</h1>
          <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-12">
             A consciência central do seu ecossistema. Processando dados de Monday, RD, eKyte, Treasy e Mentor em tempo real.
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
             {[
               { label: 'Eficiência Operacional', value: '94%', color: 'text-emerald-400' },
               { label: 'Saúde Pós-Venda', value: '88%', color: 'text-sky-400' },
               { label: 'Taxa de Conversão', value: '12.5%', color: 'text-brand-purple' },
               { label: 'Índice de Governança', value: '98', color: 'text-amber-400' },
             ].map((stat, i) => (
               <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
               </div>
             ))}
          </div>
       </div>
       <div className="p-8 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
             <Bot className="w-5 h-5 text-brand-purple" />
             <input type="text" placeholder="Pergunte qualquer coisa sobre o seu negócio..." className="flex-1 bg-transparent border-none focus:outline-none text-sm" />
             <Send className="w-5 h-5 text-slate-400 cursor-pointer hover:text-brand-purple transition-colors" />
          </div>
       </div>
    </div>
  );
};
