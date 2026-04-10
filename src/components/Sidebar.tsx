import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  Settings,
  LogOut } from
'lucide-react';
export function Sidebar() {
  const navItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    active: false
  },
  {
    icon: Calendar,
    label: 'Agenda',
    active: false
  },
  {
    icon: Clock,
    label: 'Horários',
    active: true
  },
  {
    icon: Users,
    label: 'Pacientes',
    active: false
  },
  {
    icon: Settings,
    label: 'Configurações',
    active: false
  }];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-teal-600 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
            <Clock size={20} />
          </div>
          MedSys
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${item.active ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              
              <Icon
                size={18}
                className={item.active ? 'text-teal-600' : 'text-slate-400'} />
              
              {item.label}
            </button>);

        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            src="https://i.pravatar.cc/150?u=dr.silva"
            alt="Dr. Silva"
            className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300" />
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              Dr. Roberto Silva
            </p>
            <p className="text-xs text-slate-500 truncate">Cardiologista</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>);

}