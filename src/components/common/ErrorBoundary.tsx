import React from 'react'
import { Typography } from '@mui/material'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can report errors to the server here
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <Typography variant="h4" color="error" gutterBottom>
            出现了一个错误
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {this.state.error?.message || '未知错误'}
          </Typography>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
