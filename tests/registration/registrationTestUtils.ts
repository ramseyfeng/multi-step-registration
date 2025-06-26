import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function fillStep1BasicInfo({
  firstName,
  lastName,
  dob,
}: {
  firstName: string
  lastName: string
  dob: string
}) {
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: firstName } })
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: lastName } })
  fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: dob } })
  fireEvent.click(screen.getByRole('button', { name: /next/i }))
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
  fireEvent.click(screen.getByRole('button', { name: /next/i }))
}

export async function fillStep3AccountSetup({
  email,
  password,
}: {
  email: string
  password: string
}) {
  await waitFor(() => expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument())
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: email } })
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } })
  fireEvent.click(screen.getByRole('button', { name: /next/i }))
}

export async function goToConfirmationStep() {
  await waitFor(() => expect(screen.getByText(/Confirm your details/i)).toBeInTheDocument())
}
