import * as React from 'react';
import { useAppStore } from '../../store';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';

export function Toaster() {
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(
              'flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-md',
              {
                'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-950 dark:text-slate-50':
                  !toast.type || toast.type === 'info',
                'bg-green-50/90 dark:bg-green-950/90 border-green-200 dark:border-green-900 text-green-900 dark:text-green-50':
                  toast.type === 'success',
                'bg-red-50/90 dark:bg-red-950/90 border-red-200 dark:border-red-900 text-red-900 dark:text-red-50':
                  toast.type === 'error',
                'bg-amber-50/90 dark:bg-amber-950/90 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-50':
                  toast.type === 'warning',
              }
            )}
          >
            <div className="shrink-0">
              {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
              {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
              {toast.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
              {(!toast.type || toast.type === 'info') && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-lg p-1 opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
