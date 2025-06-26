import { RegistrationForm } from './components/registration'
import './App.css'
import { ToastProvider } from './providers/ToastProvider.tsx'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
        <RegistrationForm />
      </div>
    </ToastProvider>
  )
}

export default App
