import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, LayoutGrid } from 'lucide-react';
import { Calendar } from '../components/Calendar';
import { WeeklyView } from '../components/WeeklyView';
import { TimeSlotList } from '../components/TimeSlotList';
import { SlotModal } from '../components/SlotModal';
import { StatsCards } from '../components/StatsCards';
import { ConflictAlert } from '../components/ConflictAlert';
import { Toast, ToastType } from '../components/Toast';
import { initialBlocks, TimeBlock, generateTimeSlots } from '../utils/mockData';
export function ScheduleManager() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [blocks, setBlocks] = useState<TimeBlock[]>(initialBlocks);
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<TimeBlock | null>(null);
  // Feedback State
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [conflict, setConflict] = useState<{
    time: string;
    message: string;
    pendingBlock: any;
  } | null>(null);
  const showToast = (message: string, type: ToastType) => {
    setToast({
      message,
      type,
      isVisible: true
    });
    if (type === 'success') {
      setTimeout(() => {
        setToast({
          message: 'Sincronizando com portal web e WhatsApp...',
          type: 'syncing',
          isVisible: true
        });
        setTimeout(
          () =>
          setToast((prev) => ({
            ...prev,
            isVisible: false
          })),
          2000
        );
      }, 2000);
    }
  };
  const handleSaveSlot = (blockData: Partial<TimeBlock>) => {
    // Simple conflict check
    const dateStr = blockData.date!;
    const existingBlocks = blocks.filter(
      (b) => b.date === dateStr && b.id !== editingBlock?.id
    );
    const hasConflict = existingBlocks.some((b) => {
      return (
        blockData.startTime! >= b.startTime &&
        blockData.startTime! < b.endTime ||
        blockData.endTime! > b.startTime && blockData.endTime! <= b.endTime);

    });
    if (hasConflict) {
      setConflict({
        time: `${blockData.startTime} - ${blockData.endTime}`,
        message: 'Bloco de horário já existente neste período',
        pendingBlock: blockData
      });
      setIsModalOpen(false);
      return;
    }
    saveConfirmedSlot(blockData);
  };
  const saveConfirmedSlot = (blockData: any) => {
    const slots = generateTimeSlots(
      blockData.startTime,
      blockData.endTime,
      blockData.duration,
      blockData.breakInterval
    );
    const appointments = slots.map((time, i) => ({
      id: `new-apt-${Date.now()}-${i}`,
      time,
      status: 'available' as const
    }));
    if (editingBlock) {
      setBlocks(
        blocks.map((b) =>
        b.id === editingBlock.id ?
        {
          ...b,
          ...blockData,
          appointments
        } :
        b
        )
      );
      showToast('Horário atualizado com sucesso!', 'success');
    } else {
      const newBlock: TimeBlock = {
        id: `blk-${Date.now()}`,
        ...blockData,
        appointments
      };
      setBlocks([...blocks, newBlock]);
      showToast('Horários salvos com sucesso!', 'success');
    }
    setIsModalOpen(false);
    setEditingBlock(null);
    setConflict(null);
  };
  const handleDeleteSlot = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    showToast('Horário removido com sucesso.', 'success');
  };
  const openNewModal = (date?: Date, time?: string) => {
    if (date) setSelectedDate(date);
    setEditingBlock(
      time ?
      {
        startTime: time,
        endTime: `${parseInt(time) + 1}:00`,
        duration: 30,
        breakInterval: 0
      } as any :
      null
    );
    setIsModalOpen(true);
  };
  return (
    <div className="h-full flex flex-col">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gestão de Horários
          </h1>
          <p className="text-slate-500 mt-1">
            Configure sua disponibilidade para agendamentos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex items-center">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${viewMode === 'monthly' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
              
              <CalendarIcon size={16} /> Mensal
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${viewMode === 'weekly' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
              
              <LayoutGrid size={16} /> Semanal
            </button>
          </div>
          <button
            onClick={() => openNewModal()}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
            
            <Plus size={18} /> Novo Horário
          </button>
        </div>
      </div>

      <StatsCards
        blocks={blocks.filter(
          (b) =>
          b.date ===
          `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
        )} />
      

      <ConflictAlert
        conflict={conflict}
        onResolve={() => saveConfirmedSlot(conflict?.pendingBlock)}
        onCancel={() => {
          setConflict(null);
          setIsModalOpen(true);
        }} />
      

      {/* Main Content Area */}
      <div className="flex-1 min-h-0">
        {viewMode === 'monthly' ?
        <div className="flex gap-6 h-full">
            {/* Left Panel - Calendar */}
            <div className="w-[380px] shrink-0 flex flex-col gap-6">
              <Calendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              blocks={blocks} />
            
            </div>

            {/* Right Panel - Slots */}
            <div className="flex-1 flex flex-col bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  Horários para {selectedDate.toLocaleDateString('pt-BR')}
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <TimeSlotList
                date={selectedDate}
                blocks={blocks}
                onEdit={(b) => {
                  setEditingBlock(b);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteSlot} />
              
              </div>
            </div>
          </div> :

        <WeeklyView
          selectedDate={selectedDate}
          blocks={blocks}
          onSelectSlot={(b) => {
            setEditingBlock(b);
            setSelectedDate(new Date(b.date + 'T12:00:00'));
            setIsModalOpen(true);
          }}
          onCreateSlot={openNewModal} />

        }
      </div>

      <SlotModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBlock(null);
        }}
        onSave={handleSaveSlot}
        initialData={editingBlock}
        selectedDate={selectedDate} />
      

      <Toast
        {...toast}
        onClose={() =>
        setToast((prev) => ({
          ...prev,
          isVisible: false
        }))
        } />
      
    </div>);

}