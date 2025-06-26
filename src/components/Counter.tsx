import { useState } from 'react'
import '../App.css'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default Counter
