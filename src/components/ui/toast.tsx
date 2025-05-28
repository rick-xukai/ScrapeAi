"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, AlertCircle, X } from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, type, title, message };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getColors = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-green-200/50 bg-white/90 dark:bg-gray-800/90 dark:border-green-700/50 shadow-green-100/50 dark:shadow-green-900/20";
      case "info":
        return "border-blue-200/50 bg-white/90 dark:bg-gray-800/90 dark:border-blue-700/50 shadow-blue-100/50 dark:shadow-blue-900/20";
      case "warning":
        return "border-orange-200/50 bg-white/90 dark:bg-gray-800/90 dark:border-orange-700/50 shadow-orange-100/50 dark:shadow-orange-900/20";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 space-y-2 max-w-sm sm:max-w-sm ml-auto">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                w-full border rounded-xl shadow-xl backdrop-blur-sm
                ${getColors(toast.type)}
              `}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(toast.type)}
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white break-words leading-tight">
                      {toast.title}
                    </p>
                    <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300 break-words leading-relaxed">
                      {toast.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => removeToast(toast.id)}
                      className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
} 