import React from 'react';
import { TimeBlock } from '../utils/mockData';
interface StatsCardsProps {
  blocks: TimeBlock[];
}
export function StatsCards({ blocks }: StatsCardsProps) {
  const allAppointments = blocks.flatMap((b) => b.appointments);
  const total = allAppointments.length;
  const available = allAppointments.filter(
    (a) => a.status === 'available'
  ).length;
  const occupied = allAppointments.filter((a) => a.status === 'occupied').length;
  const blocked = allAppointments.filter((a) => a.status === 'blocked').length;
  const occupancyRate =
  total > 0 ? Math.round(occupied / (total - blocked) * 100) : 0;
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm font-medium text-slate-500 mb-1">
          Total de Vagas
        </p>
        <p className="text-2xl font-bold text-slate-900">{total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Disponíveis
        </p>
        <p className="text-2xl font-bold text-slate-900">{available}</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Ocupadas
        </p>
        <p className="text-2xl font-bold text-slate-900">{occupied}</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm font-medium text-slate-500 mb-1">
          Taxa de Ocupação
        </p>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-bold text-slate-900">{occupancyRate}%</p>
          <div className="flex-1 h-2 bg-slate-100 rounded-full mb-1.5 overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{
                width: `${occupancyRate}%`
              }} />
            
          </div>
        </div>
      </div>
    </div>);

}