export type SlotStatus = 'available' | 'occupied' | 'blocked';

export interface Appointment {
  id: string;
  time: string;
  patientName?: string;
  status: SlotStatus;
}

export interface TimeBlock {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  duration: number; // minutes
  breakInterval: number; // minutes
  appointments: Appointment[];
}

// Helper to get today's date string in YYYY-MM-DD
const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

export const initialBlocks: TimeBlock[] = [
{
  id: 'blk-1',
  date: todayStr,
  startTime: '08:00',
  endTime: '12:00',
  duration: 30,
  breakInterval: 0,
  appointments: [
  {
    id: 'apt-1',
    time: '08:00',
    patientName: 'Maria Silva',
    status: 'occupied'
  },
  {
    id: 'apt-2',
    time: '08:30',
    patientName: 'João Santos',
    status: 'occupied'
  },
  { id: 'apt-3', time: '09:00', status: 'available' },
  { id: 'apt-4', time: '09:30', status: 'available' },
  {
    id: 'apt-5',
    time: '10:00',
    patientName: 'Ana Costa',
    status: 'occupied'
  },
  { id: 'apt-6', time: '10:30', status: 'blocked' },
  { id: 'apt-7', time: '11:00', status: 'available' },
  { id: 'apt-8', time: '11:30', status: 'available' }]

},
{
  id: 'blk-2',
  date: todayStr,
  startTime: '14:00',
  endTime: '18:00',
  duration: 20,
  breakInterval: 5,
  appointments: Array.from({ length: 9 }).map((_, i) => {
    const hour = 14 + Math.floor(i * 25 / 60);
    const min = i * 25 % 60;
    return {
      id: `apt-pm-${i}`,
      time: `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
      status: 'available'
    };
  })
},
{
  id: 'blk-3',
  date: tomorrowStr,
  startTime: '09:00',
  endTime: '12:00',
  duration: 45,
  breakInterval: 15,
  appointments: [
  { id: 'apt-tm-1', time: '09:00', status: 'available' },
  {
    id: 'apt-tm-2',
    time: '10:00',
    patientName: 'Carlos Oliveira',
    status: 'occupied'
  },
  { id: 'apt-tm-3', time: '11:00', status: 'available' }]

}];


export const generateTimeSlots = (
start: string,
end: string,
duration: number,
breakInt: number) =>
{
  const slots = [];
  let [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);

  let currentMins = startH * 60 + startM;
  const endMins = endH * 60 + endM;

  while (currentMins + duration <= endMins) {
    const h = Math.floor(currentMins / 60);
    const m = currentMins % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    currentMins += duration + breakInt;
  }
  return slots;
};