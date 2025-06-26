import { render, screen, waitFor } from '@testing-library/react'
import { ToastProvider } from '@/providers/toast/ToastProvider'
import { ToastContext } from '@/providers/toast/ToastContext'
import { useContext } from 'react'
import { act } from 'react'

function TestComponent() {
  const toast = useContext(ToastContext)
  if (!toast) return null
  return (
    <>
      <button onClick={() => toast.toastSuccess('Success message!')}>Show Success</button>
      <button onClick={() => toast.toastError('Error message!')}>Show Error</button>
    </>
  )
}

describe('ToastProvider', () => {
  it('renders toasts when triggered', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    // Trigger success toast
    await act(async () => {
      screen.getByText('Show Success').click()
    })
    expect(screen.getByText('Success message!')).toBeInTheDocument()
    // Trigger error toast
    await act(async () => {
      screen.getByText('Show Error').click()
    })
    expect(screen.getByText('Error message!')).toBeInTheDocument()
  })

  it('removes toast after timeout', async () => {
    render(
      <ToastProvider autoHideDuration={100}>
        <TestComponent />
      </ToastProvider>
    )
    await act(async () => {
      screen.getByText('Show Success').click()
    })
    expect(screen.getByText('Success message!')).toBeInTheDocument()
    // Wait for the toast to be removed from the DOM
    await waitFor(
      () => {
        expect(screen.queryByText('Success message!')).not.toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  }, 5000)

  it('removes toast on user action', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    )
    await act(async () => {
      screen.getByText('Show Success').click()
    })
    expect(screen.getByText('Success message!')).toBeInTheDocument()
    // Find and click the close button (assuming it has aria-label 'Close')
    const closeBtn = screen.getByLabelText(/close/i)
    await act(async () => {
      closeBtn.click()
    })
    // Wait for the toast to be removed from the DOM
    await waitFor(
      () => {
        expect(screen.queryByText('Success message!')).not.toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  }, 10000)
})
