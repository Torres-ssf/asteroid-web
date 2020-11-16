import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(toast: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const toast = {
        id: v4(),
        type,
        title,
        description,
      };

      setToastMessages(oldState => [...oldState, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToastMessages(oldState => oldState.filter(toast => toast.id !== id));
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={toastMessages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
