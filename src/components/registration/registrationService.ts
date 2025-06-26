import type { RegistrationFormValues } from './registrationTypes'

export const mockRegistrationService = async (
  data: RegistrationFormValues
): Promise<{ success: boolean }> => {
  // In real application, this would be an API call to the backend, no need to disable TS checks here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...dataWithoutPassword } = data
  console.log('Mock registration data', dataWithoutPassword)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success
      resolve({ success: true })
    }, 1200)
  })
}
