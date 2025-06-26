import type { RegistrationFormValues } from './registrationTypes'

export const mockRegistrationService = async (
  data: RegistrationFormValues
): Promise<{ success: boolean }> => {
  console.log('Submitting registration data:', data)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success
      resolve({ success: true })
    }, 1200)
  })
}
