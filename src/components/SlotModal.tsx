import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { TimeBlock, generateTimeSlots } from '../utils/mockData';
interface SlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (block: Partial<TimeBlock>) => void;
  initialData?: TimeBlock | null;
  selectedDate: Date;
}
export function SlotModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  selectedDate
}: SlotModalProps) {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');
  const [duration, setDuration] = useState(30);
  const [breakInterval, setBreakInterval] = useState(0);
  const [repeat, setRepeat] = useState('none');
  const [previewSlots, setPreviewSlots] = useState<string[]>([]);
  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
      setDuration(initialData.duration);
      setBreakInterval(initialData.breakInterval);
    } else {
      setStartTime('08:00');
      setEndTime('12:00');
      setDuration(30);
      setBreakInterval(0);
    }
  }, [initialData, isOpen]);
  useEffect(() => {
    if (startTime && endTime && duration > 0) {
      try {
        const slots = generateTimeSlots(
          startTime,
          endTime,
          duration,
          breakInterval
        );
        setPreviewSlots(slots);
      } catch (e) {
        setPreviewSlots([]);
      }
    }
  }, [startTime, endTime, duration, breakInterval]);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      startTime,
      endTime,
      duration,
      breakInterval,
      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    });
  };
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              {initialData ? 'Editar Horário' : 'Novo Horário'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
              
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSave}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            {/* Date Info */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <CalendarIcon className="text-teal-600" size={20} />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">
                  Data Selecionada
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedDate.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Hora Início
                </label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Hora Fim
                </label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                
              </div>
            </div>

            {/* Configs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Duração da Consulta
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white">
                  
                  <option value={15}>15 minutos</option>
                  <option value={20}>20 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>1 hora</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Intervalo entre consultas
                </label>
                <select
                  value={breakInterval}
                  onChange={(e) => setBreakInterval(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white">
                  
                  <option value={0}>Sem intervalo</option>
                  <option value={5}>5 minutos</option>
                  <option value={10}>10 minutos</option>
                  <option value={15}>15 minutos</option>
                </select>
              </div>
            </div>

            {/* Repeat */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Repetição
              </label>
              <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white">
                
                <option value="none">Não repetir</option>
                <option value="daily">Diariamente</option>
                <option value="weekly">
                  Semanalmente (mesmo dia da semana)
                </option>
              </select>
            </div>

            {/* Preview */}
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex items-center gap-2 text-teal-800 font-medium mb-3">
                <Clock size={18} />
                Pré-visualização ({previewSlots.length} vagas)
              </div>
              <div className="flex flex-wrap gap-2">
                {previewSlots.length > 0 ?
                previewSlots.map((slot, i) =>
                <span
                  key={i}
                  className="px-2 py-1 bg-white border border-teal-200 text-teal-700 rounded text-xs font-medium shadow-sm">
                  
                      {slot}
                    </span>
                ) :

                <span className="text-sm text-teal-600 flex items-center gap-1">
                    <AlertCircle size={14} /> Horários inválidos
                  </span>
                }
              </div>
            </div>
          </form>

          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={previewSlots.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
              
              Salvar Horários
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);

}