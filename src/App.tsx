import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-6xl font-bold mb-6 text-gray-800 dark:text-white">
        Vite + React + Tailwind
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          count is {count}
        </button>
        <p className="text-gray-700 dark:text-gray-300">
          Edit <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
