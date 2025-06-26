import { render, screen, fireEvent } from '@testing-library/react'
import { ToastProvider } from '../../src/providers/ToastProvider.tsx'
import { RegistrationForm } from '../../src/components/registration'
import {
  fillStep1BasicInfo,
  fillStep2PersonalDetails,
  fillStep3AccountSetup,
  goToConfirmationStep,
} from './registrationTestUtils'
import { type ReactElement } from 'react'

// Helper to render with ToastProvider
function renderWithProvider(ui: ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>)
}

describe('RegistrationForm', () => {
  it('renders all steps and submits successfully', async () => {
    renderWithProvider(<RegistrationForm />)
    await fillStep1BasicInfo({ firstName: 'John', lastName: 'Doe', dob: '2000-01-01' })
    await fillStep2PersonalDetails({ country: 'United States', gender: 'Male' })
    await fillStep3AccountSetup({ email: 'john@example.com', password: 'password123' })
    await goToConfirmationStep()
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    // Toast should appear
    await screen.findByText(/Registration successful/i, {}, { timeout: 3000 })
  })
  it('shows validation errors if required fields are missing', async () => {
    renderWithProvider(<RegistrationForm />)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0)
  })
  it('shows error for invalid email and short password', async () => {
    renderWithProvider(<RegistrationForm />)
    await fillStep1BasicInfo({ firstName: 'Jane', lastName: 'Smith', dob: '1990-01-01' })
    await fillStep2PersonalDetails({ country: 'United States', gender: 'Male' })
    await fillStep3AccountSetup({ email: 'bademail', password: '123' })
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument()
    expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument()
  })
})
