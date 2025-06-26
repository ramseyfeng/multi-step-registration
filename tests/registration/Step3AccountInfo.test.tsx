import { render, screen } from '@testing-library/react'
import Step3AccountInfo from '@/components/registration/steps/Step3AccountInfo'
import { useForm } from 'react-hook-form'
import type { RegistrationFormValues } from '@/components/registration/registrationTypes'
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
    const onBack = vi.fn()
    const onNext = vi.fn()
    return (
      <Step3AccountInfo control={methods.control} errors={{}} onBack={onBack} onNext={onNext} />
    )
  }
  render(<Wrapper />)
}

describe('Step3AccountInfo', () => {
  it('renders the account info step', () => {
    renderWithForm()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
  })
})
