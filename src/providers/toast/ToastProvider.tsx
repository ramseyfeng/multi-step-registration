import { useState, useCallback, type ReactNode, useMemo } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { ToastContext } from './ToastContext'

export const ToastProvider = ({
  children,
  autoHideDuration = 4000,
}: {
  children: ReactNode
  autoHideDuration?: number
}) => {
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

  const contextValue = useMemo(() => ({ toastSuccess, toastError }), [toastSuccess, toastError])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
          {message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
