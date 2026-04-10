import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TimeBlock } from '../utils/mockData';
interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  blocks: TimeBlock[];
}
export function Calendar({
  selectedDate,
  onSelectDate,
  blocks
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );
  const nextMonth = () =>
  setCurrentMonth(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  );
  const prevMonth = () =>
  setCurrentMonth(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
  );
  const goToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelectDate(today);
  };
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const days = Array.from(
    {
      length: daysInMonth
    },
    (_, i) => i + 1
  );
  const blanks = Array.from(
    {
      length: firstDayOfMonth
    },
    (_, i) => i
  );
  const getDayStatus = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayBlocks = blocks.filter((b) => b.date === dateStr);
    if (dayBlocks.length === 0) return null;
    const allApts = dayBlocks.flatMap((b) => b.appointments);
    if (allApts.some((a) => a.status === 'blocked')) return 'blocked';
    if (allApts.some((a) => a.status === 'occupied')) return 'occupied';
    return 'available';
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToday}
            className="text-xs font-medium text-teal-600 hover:text-teal-700 px-2 py-1 rounded hover:bg-teal-50 transition-colors">
            
            Hoje
          </button>
          <div className="flex items-center border border-slate-200 rounded-md overflow-hidden">
            <button
              onClick={prevMonth}
              className="p-1.5 hover:bg-slate-50 text-slate-600 transition-colors">
              
              <ChevronLeft size={16} />
            </button>
            <div className="w-px h-4 bg-slate-200" />
            <button
              onClick={nextMonth}
              className="p-1.5 hover:bg-slate-50 text-slate-600 transition-colors">
              
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) =>
        <div
          key={day}
          className="text-center text-xs font-medium text-slate-500 py-2">
          
            {day}
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((b) =>
        <div key={`blank-${b}`} className="aspect-square" />
        )}
        {days.map((day) => {
          const isSelected =
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === currentMonth.getMonth() &&
          selectedDate.getFullYear() === currentMonth.getFullYear();
          const isToday =
          new Date().getDate() === day &&
          new Date().getMonth() === currentMonth.getMonth() &&
          new Date().getFullYear() === currentMonth.getFullYear();
          const status = getDayStatus(day);
          return (
            <button
              key={day}
              onClick={() =>
              onSelectDate(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
              )
              }
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all
                ${isSelected ? 'bg-teal-600 text-white font-semibold shadow-md' : 'hover:bg-slate-50 text-slate-700'}
                ${isToday && !isSelected ? 'text-teal-600 font-bold bg-teal-50' : ''}
              `}>
              
              <span>{day}</span>
              {status &&
              <div className="absolute bottom-1.5 flex gap-0.5">
                  <span
                  className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : status === 'available' ? 'bg-emerald-500' : status === 'occupied' ? 'bg-blue-500' : 'bg-red-500'}`} />
                
                </div>
              }
            </button>);

        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Disponível
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" /> Ocupado
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Bloqueado
        </div>
      </div>
    </div>);

}