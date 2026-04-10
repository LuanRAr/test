import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
export type ToastType = 'success' | 'error' | 'syncing';
interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}
export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible && type !== 'syncing') {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, type, onClose]);
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: {
            duration: 0.2
          }
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg border border-slate-200">
        
          {type === 'success' &&
        <CheckCircle2 className="text-emerald-500" size={20} />
        }
          {type === 'error' && <XCircle className="text-red-500" size={20} />}
          {type === 'syncing' &&
        <RefreshCw className="text-teal-500 animate-spin" size={20} />
        }

          <span className="text-sm font-medium text-slate-700">{message}</span>

          {type !== 'syncing' &&
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-slate-600">
          
              <XCircle size={16} />
            </button>
        }
        </motion.div>
      }
    </AnimatePresence>);

}