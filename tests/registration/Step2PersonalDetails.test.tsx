import { render, screen } from '@testing-library/react'
import Step2PersonalDetails from '@/components/registration/steps/Step2PersonalDetails'
import { useForm } from 'react-hook-form'
import type { RegistrationFormValues } from '@/components/registration/registrationTypes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { vi } from 'vitest'

function renderWithForm() {
  const Wrapper = () => {
    const methods = useForm<RegistrationFormValues>({
      defaultValues: {
        firstName: '',
        lastName: '',
        dob: null,
        country: '',
        gender: '',
        profilePic: null,
        profilePicUrl: '',
        email: '',
        password: '',
      },
    })
    const countries = ['USA', 'Canada']
    const genders = ['Male', 'Female']
    const onFileChange = vi.fn()
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Step2PersonalDetails
          control={methods.control}
          errors={{}}
          countries={countries}
          genders={genders}
          onFileChange={onFileChange}
        />
      </LocalizationProvider>
    )
  }
  render(<Wrapper />)
}

describe('Step2PersonalDetails', () => {
  it('renders the personal details step', () => {
    renderWithForm()
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument()
  })
})
