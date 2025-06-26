import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ToastProvider } from '@/providers/toast'
import { RegistrationForm } from '@/components/registration'
import {
  fillStep1BasicInfo,
  fillStep2PersonalDetails,
  fillStep3AccountSetup,
  goToConfirmationStep,
} from './registrationTestUtils'
import { type ReactElement } from 'react'

// Helper to render with ToastProvider
function renderWithProvider(ui: ReactElement) {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastProvider>{ui}</ToastProvider>
    </LocalizationProvider>
  )
}

describe('RegistrationForm', () => {
  it('renders all steps and submits successfully', async () => {
    renderWithProvider(<RegistrationForm />)
    await fillStep1BasicInfo({ firstName: 'John', lastName: 'Doe', dob: '2000-01-01' })
    await fillStep2PersonalDetails({ country: 'United States', gender: 'Male' })
    await fillStep3AccountSetup({ email: 'john@example.com', password: 'password123' })
    await goToConfirmationStep()
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    // Toast should appear
    await screen.findByText(/Registration successful/i, {}, { timeout: 3000 })
  })
  it('shows validation errors if required fields are missing', async () => {
    renderWithProvider(<RegistrationForm />)
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
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
  it('navigates forward and backward through steps using Next and Back buttons', async () => {
    renderWithProvider(<RegistrationForm />)

    // Step 1: Basic Info
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    await userEvent.type(screen.getByLabelText(/First Name/i), 'Test')
    await userEvent.type(screen.getByLabelText(/Last Name/i), 'User')
    await userEvent.type(screen.getByLabelText(/Date of Birth/i), '2000-01-01')
    await userEvent.click(screen.getByRole('button', { name: /next/i }))

    // Step 2: Personal Details
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument()
    await userEvent.click(screen.getByLabelText(/Country/i))
    await userEvent.click(await screen.findByRole('option', { name: 'United States' }))
    await userEvent.click(screen.getByLabelText(/Gender/i))
    await userEvent.click(await screen.findByRole('option', { name: 'Male' }))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))

    // Step 3: Account Info
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123')

    // Go back to Step 2
    await userEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument()

    // Go back to Step 1
    await userEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()

    // Go forward again to Step 2
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument()
  })
})
