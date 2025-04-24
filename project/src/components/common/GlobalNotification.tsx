import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

// In a real app, this would be a global state or context
let notifications: Notification[] = [];
let notificationListeners: ((notifications: Notification[]) => void)[] = [];

// Add notification
export const addNotification = (type: NotificationType, message: string) => {
  const id = Math.random().toString(36).substring(2, 9);
  notifications = [...notifications, { id, type, message }];
  notificationListeners.forEach(listener => listener(notifications));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(id);
  }, 5000);
  
  return id;
};

// Remove notification
export const removeNotification = (id: string) => {
  notifications = notifications.filter(notification => notification.id !== id);
  notificationListeners.forEach(listener => listener(notifications));
};

const GlobalNotification: React.FC = () => {
  const [currentNotifications, setCurrentNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    const listener = (notifications: Notification[]) => {
      setCurrentNotifications([...notifications]);
    };
    
    notificationListeners.push(listener);
    return () => {
      notificationListeners = notificationListeners.filter(l => l !== listener);
    };
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-secondary-500" />;
    }
  };

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-l-success-500';
      case 'error':
        return 'bg-error-50 border-l-error-500';
      case 'warning':
        return 'bg-warning-50 border-l-warning-500';
      case 'info':
      default:
        return 'bg-secondary-50 border-l-secondary-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {currentNotifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`rounded-lg shadow-md border-l-4 ${getBgColor(notification.type)}`}
          >
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-slate-800">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlobalNotification;