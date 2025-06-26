import { createContext } from 'react'

export interface ToastContextType {
  toastSuccess: (message: string) => void
  toastError: (message: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
