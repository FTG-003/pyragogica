import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
  show: boolean;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  show
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-900',
          messageColor: 'text-green-700'
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          messageColor: 'text-red-700'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900',
          messageColor: 'text-yellow-700'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900',
          messageColor: 'text-blue-700'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-700'
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          ${config.bgColor} ${config.borderColor} border rounded-xl shadow-lg p-4 max-w-sm w-full
          transform transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-start space-x-3">
          <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold ${config.titleColor}`}>
              {title}
            </h4>
            {message && (
              <p className={`text-sm mt-1 ${config.messageColor}`}>
                {message}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className={`${config.iconColor} hover:opacity-70 transition-opacity duration-200 flex-shrink-0`}
            aria-label="Chiudi notifica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const ToastContainer = useCallback(() => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastNotification
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
          show={true}
        />
      ))}
    </div>
  ), [toasts, removeToast]);

  return {
    showToast,
    ToastContainer,
    success: useCallback((title: string, message?: string, duration?: number) => 
      showToast('success', title, message, duration), [showToast]),
    error: useCallback((title: string, message?: string, duration?: number) => 
      showToast('error', title, message, duration), [showToast]),
    warning: useCallback((title: string, message?: string, duration?: number) => 
      showToast('warning', title, message, duration), [showToast]),
    info: useCallback((title: string, message?: string, duration?: number) => 
      showToast('info', title, message, duration), [showToast])
  };
};

export default ToastNotification;