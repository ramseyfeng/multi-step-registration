// registrationTypes.ts

export interface RegistrationFormValues {
  basicInfo: {
    firstName: string
    lastName: string
    dob: Date | null
  }
  detail: {
    country: string
    gender: string
    profilePic: File | null
    profilePicUrl: string
  }
  accountInfo: {
    email: string
    password: string
  }
}
