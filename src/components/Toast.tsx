import { CheckCircle2, AlertCircle, ExternalLink, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
  txHash?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-slate-200 rounded-lg p-3.5 shadow-lg flex items-start justify-between gap-3 animate-in slide-in-from-bottom-3 duration-150"
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            {toast.type === 'info' && (
              <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                i
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-slate-900">{toast.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{toast.message}</p>
              {toast.txHash && (
                <a
                  href={`https://amoy.polygonscan.com/tx/${toast.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 hover:underline mt-1.5"
                >
                  <span>View on Polygonscan</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
