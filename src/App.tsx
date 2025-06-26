import { RegistrationForm } from './components/registration'
import './App.css'
import { ToastProvider } from './providers/toast'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ToastProvider>
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
            <RegistrationForm />
          </div>
        </ToastProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  )
}

export default App
