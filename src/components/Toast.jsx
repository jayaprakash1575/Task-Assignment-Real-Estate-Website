import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts = [], onRemoveToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div 
            key={toast.id} 
            className={`toast ${isSuccess ? 'toast-success' : isWarning ? 'toast-warning' : ''}`}
          >
            {isSuccess && <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />}
            {isWarning && <AlertCircle size={18} color="#f59e0b" style={{ flexShrink: 0 }} />}
            {!isSuccess && !isWarning && <Info size={18} color="#60a5fa" style={{ flexShrink: 0 }} />}

            <div style={{ flexGrow: 1, fontSize: '0.875rem' }}>{toast.message}</div>

            <button 
              type="button"
              onClick={() => onRemoveToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              aria-label="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
