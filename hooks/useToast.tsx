"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type Toast = {
  id: number;
  message: string;
};

type ToastContextValue = {
  showSuccess: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showSuccess = useCallback((message: string) => {
    if (!message) return;
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    // Auto dismiss after 3 seconds
    setTimeout(() => removeToast(id), 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showSuccess }}>
      {children}
      {/* Toast viewport */}
      <div className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto min-w-[220px] max-w-xs rounded-md border border-emerald-500 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500 shadow-lg"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

