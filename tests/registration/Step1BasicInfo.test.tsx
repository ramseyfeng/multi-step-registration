import { render, screen } from '@testing-library/react'
import Step1BasicInfo from '@/components/registration/steps/Step1BasicInfo'
import { useForm } from 'react-hook-form'
import type { RegistrationFormValues } from '@/components/registration/registrationTypes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function renderWithForm() {
  const Wrapper = () => {
    const methods = useForm<RegistrationFormValues>({})
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Step1BasicInfo control={methods.control} errors={{}} />
      </LocalizationProvider>
    )
  }
  render(<Wrapper />)
}

describe('Step1BasicInfo', () => {
  it('renders the basic info step', () => {
    renderWithForm()
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
    // DatePicker may not have a label, so just check for the component existence if needed
  })
})
