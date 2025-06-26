import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

interface ToastContextType {
  toastSuccess: (message: string) => void
  toastError: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success')

  const toastSuccess = useCallback((msg: string) => {
    setMessage(msg)
    setSeverity('success')
    setOpen(true)
  }, [])

  const toastError = useCallback((msg: string) => {
    setMessage(msg)
    setSeverity('error')
    setOpen(true)
  }, [])

  const handleClose = (_?: unknown, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <ToastContext.Provider value={{ toastSuccess, toastError }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
