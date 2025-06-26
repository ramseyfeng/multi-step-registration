// import type { RegistrationFormValues } from './registrationTypes'

export const mockRegistrationService = async () // data: RegistrationFormValues
: Promise<{ success: boolean }> => {
  // Avoid logging the password
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success
      resolve({ success: true })
    }, 1200)
  })
}
