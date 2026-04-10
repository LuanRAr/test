import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ScheduleManager } from './pages/ScheduleManager';
import { Bell, Search, CheckCircle2 } from 'lucide-react';
export function App() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center text-sm text-slate-500">
            <span>Gestão Clínica</span>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">Horários</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <CheckCircle2 size={14} />
              Sincronizado
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-600 transition-colors">
                <Search size={20} />
              </button>
              <button className="hover:text-slate-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <ScheduleManager />
          </div>
        </div>
      </main>
    </div>);

}