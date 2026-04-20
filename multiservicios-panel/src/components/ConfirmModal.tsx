import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  danger = false,
}) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-pop">
        <div className="modal-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#fdeaea" />
            <path d="M24 14v12" stroke="#e53935" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="32" r="1.5" fill="#e53935" />
          </svg>
        </div>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-desc">{description}</div>
        <div className="modal-actions">
          <button className="modal-btn danger" onClick={onConfirm}>{confirmText}</button>
          <button className="modal-btn" onClick={onCancel}>{cancelText}</button>
        </div>
      </div>
      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(30,34,40,0.18); z-index: 9999;
          display: flex; align-items: center; justify-content: center;
        }
        .modal-content {
          background: #fff; border-radius: 18px; box-shadow: 0 4px 32px #0002;
          padding: 36px 32px 28px 32px; min-width: 340px; max-width: 90vw;
          display: flex; flex-direction: column; align-items: center;
          animation: pop-in 0.32s cubic-bezier(.6,-0.28,.74,.05) both;
        }
        .modal-icon { margin-bottom: 12px; }
        .modal-title {
          font-size: 22px; font-weight: 800; color: #222a36; margin-bottom: 8px;
        }
        .modal-desc {
          color: #444; font-size: 16px; margin-bottom: 28px; text-align: center;
        }
        .modal-actions {
          display: flex; gap: 12px; width: 100%; justify-content: center;
        }
        .modal-btn {
          padding: 10px 28px; border-radius: 8px; border: none; font-size: 16px;
          font-weight: 700; background: #f5f5f5; color: #222a36; cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .modal-btn.danger {
          background: #e53935; color: #fff;
        }
        .modal-btn.danger:hover {
          background: #b71c1c;
        }
        .modal-btn:not(.danger):hover {
          background: #ececec;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
