import React from 'react';
import { TimeBlock } from '../utils/mockData';
interface WeeklyViewProps {
  selectedDate: Date;
  blocks: TimeBlock[];
  onSelectSlot: (block: TimeBlock) => void;
  onCreateSlot: (date: Date, hour: string) => void;
}
export function WeeklyView({
  selectedDate,
  blocks,
  onSelectSlot,
  onCreateSlot
}: WeeklyViewProps) {
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Sunday
  const weekDays = Array.from({
    length: 7
  }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
  const hours = Array.from({
    length: 17
  }).map((_, i) => i + 6); // 06:00 to 22:00
  const getBlocksForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return blocks.filter((b) => b.date === dateStr);
  };
  const calculateTop = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return (h - 6) * 60 + m;
  };
  const calculateHeight = (start: string, end: string) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return eh * 60 + em - (sh * 60 + sm);
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
        <div className="w-16 shrink-0 border-r border-slate-200" />
        {weekDays.map((date, i) => {
          const isToday = new Date().toDateString() === date.toDateString();
          return (
            <div
              key={i}
              className="flex-1 text-center py-3 border-r border-slate-200 last:border-r-0">
              
              <p className="text-xs font-medium text-slate-500 uppercase">
                {
                ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][
                date.getDay()]

                }
              </p>
              <p
                className={`text-lg font-semibold mt-0.5 ${isToday ? 'text-teal-600' : 'text-slate-900'}`}>
                
                {date.getDate()}
              </p>
            </div>);

        })}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-white">
        <div className="flex min-h-[1020px]">
          {' '}
          {/* 17 hours * 60px */}
          {/* Time labels */}
          <div className="w-16 shrink-0 border-r border-slate-200 bg-white relative z-10">
            {hours.map((h) =>
            <div key={h} className="h-[60px] relative">
                <span className="absolute -top-2.5 right-2 text-xs text-slate-400 font-medium">
                  {String(h).padStart(2, '0')}:00
                </span>
              </div>
            )}
          </div>
          {/* Days columns */}
          {weekDays.map((date, dayIdx) => {
            const dayBlocks = getBlocksForDate(date);
            return (
              <div
                key={dayIdx}
                className="flex-1 border-r border-slate-100 last:border-r-0 relative">
                
                {/* Grid lines */}
                {hours.map((h) =>
                <div
                  key={h}
                  className="h-[60px] border-b border-slate-100 cursor-pointer hover:bg-teal-50/50 transition-colors"
                  onClick={() =>
                  onCreateSlot(date, `${String(h).padStart(2, '0')}:00`)
                  } />

                )}

                {/* Blocks */}
                {dayBlocks.map((block) => {
                  const top = calculateTop(block.startTime);
                  const height = calculateHeight(block.startTime, block.endTime);
                  const hasOccupied = block.appointments.some(
                    (a) => a.status === 'occupied'
                  );
                  return (
                    <div
                      key={block.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSlot(block);
                      }}
                      className={`absolute left-1 right-1 rounded-md border p-1.5 overflow-hidden cursor-pointer shadow-sm transition-transform hover:scale-[1.02] z-20 ${hasOccupied ? 'bg-blue-50 border-blue-200 hover:border-blue-300' : 'bg-emerald-50 border-emerald-200 hover:border-emerald-300'}`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`
                      }}>
                      
                      <div
                        className={`text-xs font-bold ${hasOccupied ? 'text-blue-800' : 'text-emerald-800'}`}>
                        
                        {block.startTime} - {block.endTime}
                      </div>
                      {height > 40 &&
                      <div
                        className={`text-[10px] mt-0.5 leading-tight ${hasOccupied ? 'text-blue-600' : 'text-emerald-600'}`}>
                        
                          {block.duration}m • {block.appointments.length} vagas
                        </div>
                      }
                    </div>);

                })}
              </div>);

          })}
        </div>
      </div>
    </div>);

}