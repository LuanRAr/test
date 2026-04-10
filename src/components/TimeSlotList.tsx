import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Copy, Clock, Users } from 'lucide-react';
import { TimeBlock } from '../utils/mockData';
interface TimeSlotListProps {
  date: Date;
  blocks: TimeBlock[];
  onEdit: (block: TimeBlock) => void;
  onDelete: (blockId: string) => void;
}
export function TimeSlotList({
  date,
  blocks,
  onEdit,
  onDelete
}: TimeSlotListProps) {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const dayBlocks = blocks.
  filter((b) => b.date === dateStr).
  sort((a, b) => a.startTime.localeCompare(b.startTime));
  if (dayBlocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200 border-dashed">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
          <Clock className="text-slate-400" size={24} />
        </div>
        <h3 className="text-sm font-medium text-slate-900">
          Nenhum horário configurado
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Clique em "Novo Horário" para adicionar.
        </p>
      </div>);

  }
  return (
    <div className="space-y-4">
      {dayBlocks.map((block, index) => {
        const total = block.appointments.length;
        const occupied = block.appointments.filter(
          (a) => a.status === 'occupied'
        ).length;
        const hasOccupied = occupied > 0;
        return (
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}
            key={block.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-teal-300 transition-colors group">
            
            <div className="p-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {block.startTime}{' '}
                    <span className="text-slate-400 font-normal mx-1">até</span>{' '}
                    {block.endTime}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${hasOccupied ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    
                    {hasOccupied ? 'Parcialmente Ocupado' : 'Livre'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-slate-400" />
                    {block.duration}min / consulta
                    {block.breakInterval > 0 &&
                    <span className="text-slate-400">
                        ({block.breakInterval}min int.)
                      </span>
                    }
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} className="text-slate-400" />
                    {occupied}/{total} agendados
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(block)}
                  className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                  title="Editar bloco">
                  
                  <Edit2 size={16} />
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                  title="Duplicar bloco">
                  
                  <Copy size={16} />
                </button>
                <button
                  onClick={() => !hasOccupied && onDelete(block.id)}
                  disabled={hasOccupied}
                  className={`p-2 rounded-md transition-colors ${hasOccupied ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                  title={
                  hasOccupied ?
                  'Não é possível excluir horários com agendamentos' :
                  'Excluir bloco'
                  }>
                  
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Mini preview of slots */}
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto custom-scrollbar">
              {block.appointments.map((apt) =>
              <div
                key={apt.id}
                className={`shrink-0 px-2 py-1 rounded text-xs font-medium border ${apt.status === 'occupied' ? 'bg-blue-100 border-blue-200 text-blue-800' : apt.status === 'blocked' ? 'bg-red-100 border-red-200 text-red-800' : 'bg-white border-emerald-200 text-emerald-700'}`}
                title={apt.patientName || 'Disponível'}>
                
                  {apt.time}
                </div>
              )}
            </div>
          </motion.div>);

      })}
    </div>);

}