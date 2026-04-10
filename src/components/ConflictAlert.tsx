import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
interface ConflictAlertProps {
  conflict: {
    time: string;
    message: string;
  } | null;
  onResolve: () => void;
  onCancel: () => void;
}
export function ConflictAlert({
  conflict,
  onResolve,
  onCancel
}: ConflictAlertProps) {
  return (
    <AnimatePresence>
      {conflict &&
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          marginBottom: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto',
          marginBottom: 16
        }}
        exit={{
          opacity: 0,
          height: 0,
          marginBottom: 0
        }}
        className="overflow-hidden">
        
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle
            className="text-amber-500 shrink-0 mt-0.5"
            size={20} />
          
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-800">
                Conflito de Horário Detectado
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                O horário {conflict.time} conflita com: {conflict.message}.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                onClick={onResolve}
                className="text-xs font-medium bg-amber-100 text-amber-800 px-3 py-1.5 rounded hover:bg-amber-200 transition-colors">
                
                  Sobrescrever Horários
                </button>
                <button
                onClick={onCancel}
                className="text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors">
                
                  Cancelar
                </button>
              </div>
            </div>
            <button
            onClick={onCancel}
            className="text-amber-400 hover:text-amber-600">
            
              <X size={16} />
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}