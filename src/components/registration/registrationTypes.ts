export interface RegistrationFormValues {
  firstName: string
  lastName: string
  dob: number | null
  country: string
  gender: string
  profilePic: File | null
  profilePicUrl: string
  email: string
  password: string
}

export const REGISTRATION_DEFAULT_VALUES: RegistrationFormValues = {
  firstName: '',
  lastName: '',
  dob: null,
  country: '',
  gender: '',
  profilePic: null,
  profilePicUrl: '',
  email: '',
  password: '',
}
