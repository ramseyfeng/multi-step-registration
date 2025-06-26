export const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other']

export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say']

export const REGISTRATION_STEPS = {
  BasicInfo: 0,
  PersonalDetails: 1,
  AccountSetup: 2,
  Confirmation: 3,
}

export const REGISTRATION_STEPS_DATA = {
  [REGISTRATION_STEPS.BasicInfo]: {
    step: REGISTRATION_STEPS.BasicInfo,
    label: 'Basic Information',
  },
  [REGISTRATION_STEPS.PersonalDetails]: {
    step: REGISTRATION_STEPS.PersonalDetails,
    label: 'Personal Details',
  },
  [REGISTRATION_STEPS.AccountSetup]: {
    step: REGISTRATION_STEPS.AccountSetup,
    label: 'Account Setup',
  },
  [REGISTRATION_STEPS.Confirmation]: {
    step: REGISTRATION_STEPS.Confirmation,
    label: 'Confirmation',
  },
}
