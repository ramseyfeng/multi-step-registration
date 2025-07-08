import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function fillStep1BasicInfo({
  firstName,
  lastName,
  dob, // expects 'MM/DD/YYYY' or 'MMDDYYYY'
}: {
  firstName: string
  lastName: string
  dob: string // e.g., '01/01/2000' or '01012000'
}) {
  // Wait for the lazy-loaded Step1BasicInfo component to render
  await waitFor(() => expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument())
  await userEvent.clear(screen.getByLabelText(/First Name/i))
  await userEvent.type(screen.getByLabelText(/First Name/i), firstName)
  await userEvent.clear(screen.getByLabelText(/Last Name/i))
  await userEvent.type(screen.getByLabelText(/Last Name/i), lastName)
  const dobInput = screen.getByLabelText(/Date of Birth/i)
  await userEvent.click(dobInput)
  // Type only digits if dob is in 'MMDDYYYY' format, else type as is
  await userEvent.keyboard(dob)
  expect(dobInput).toHaveValue(dob)
  await userEvent.click(screen.getByRole('button', { name: /next/i }))
  expect(screen.queryByText(/Date of birth is required/i)).not.toBeInTheDocument()
}
export async function fillStep2PersonalDetails({
  country,
  gender,
}: {
  country: string
  gender: string
}) {
  await waitFor(() => expect(screen.getByLabelText(/Country/i)).toBeInTheDocument())
  await userEvent.click(screen.getByLabelText(/Country/i))
  await userEvent.click(await screen.findByRole('option', { name: country }))
  await userEvent.click(screen.getByLabelText(/Gender/i))
  await userEvent.click(await screen.findByRole('option', { name: gender }))
  await userEvent.click(screen.getByRole('button', { name: /next/i }))
}

export async function fillStep3AccountSetup({
  email,
  password,
}: {
  email: string
  password: string
}) {
  await waitFor(() => expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument())
  await userEvent.clear(screen.getByLabelText(/Email Address/i))
  await userEvent.type(screen.getByLabelText(/Email Address/i), email)
  await userEvent.clear(screen.getByLabelText(/Password/i))
  await userEvent.type(screen.getByLabelText(/Password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /next/i }))
}

export async function goToConfirmationStep() {
  await waitFor(() => expect(screen.getByText(/Confirm your details/i)).toBeInTheDocument())
}
