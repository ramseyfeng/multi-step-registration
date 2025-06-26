import { type ChangeEvent, useState } from 'react'
import { Box, Button, Stepper, Step, StepLabel, Typography, Avatar } from '@mui/material'
import { useForm } from 'react-hook-form'
import Step1BasicInfo from './Step1BasicInfo.tsx'
import Step2PersonalDetails from './Step2PersonalDetails.tsx'
import Step3AccountInfo from './Step3AccountInfo.tsx'
import type { RegistrationFormValues } from './registrationTypes.ts'
import {
  COUNTRIES,
  GENDERS,
  REGISTRATION_STEPS,
  REGISTRATION_STEPS_DATA,
} from './registrationConstants'

function RegistrationForm() {
  const totalSteps = Object.keys(REGISTRATION_STEPS).length
  type FieldName =
    | keyof RegistrationFormValues
    | 'basicInfo.firstName'
    | 'basicInfo.lastName'
    | 'basicInfo.dob'
    | 'detail.country'
    | 'detail.gender'
    | 'detail.profilePic'
    | 'detail.profilePicUrl'
    | 'accountInfo.email'
    | 'accountInfo.password'
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      basicInfo: {
        firstName: '',
        lastName: '',
        dob: null,
      },
      detail: {
        country: '',
        gender: '',
        profilePic: null,
        profilePicUrl: '',
      },
      accountInfo: {
        email: '',
        password: '',
      },
    },
    mode: 'onTouched',
  })
  const [activeStep, setActiveStep] = useState(0)

  // File change handler for react-hook-form
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setValue('detail.profilePic', e.target.files[0])
      setValue('detail.profilePicUrl', URL.createObjectURL(e.target.files[0]))
    }
  }

  // Step navigation with validation
  const handleNext = async () => {
    let stepFields: FieldName[] = []
    if (activeStep === REGISTRATION_STEPS.BasicInfo)
      stepFields = ['basicInfo.firstName', 'basicInfo.lastName', 'basicInfo.dob']
    if (activeStep === REGISTRATION_STEPS.PersonalDetails)
      stepFields = ['detail.country', 'detail.gender']
    if (activeStep === REGISTRATION_STEPS.AccountSetup)
      stepFields = ['accountInfo.email', 'accountInfo.password']
    const valid = await trigger(stepFields)
    if (valid) setActiveStep((prev) => prev + 1)
  }
  const handleBack = () => setActiveStep((prev) => prev - 1)

  const onSubmit = (data: RegistrationFormValues) => {
    // handle final submit
    console.log('Form submitted:', data)
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        bgcolor: 'white',
        color: 'black',
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {Object.values(REGISTRATION_STEPS).map((step) => (
          <Step key={REGISTRATION_STEPS_DATA[step].label}>
            <StepLabel>{REGISTRATION_STEPS_DATA[step].label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
          {activeStep === REGISTRATION_STEPS.BasicInfo && (
            <Step1BasicInfo control={control} errors={errors.basicInfo ?? {}} />
          )}
          {activeStep === REGISTRATION_STEPS.PersonalDetails && (
            <Step2PersonalDetails
              control={control}
              errors={errors.detail ?? {}}
              countries={COUNTRIES}
              genders={GENDERS}
              onFileChange={handleFileChange}
            />
          )}
          {activeStep === REGISTRATION_STEPS.AccountSetup && (
            <Step3AccountInfo
              control={control}
              errors={errors.accountInfo ?? {}}
              onBack={() => setActiveStep((prev) => prev - 1)}
              onNext={handleSubmit(() => setActiveStep((prev) => prev + 1))}
            />
          )}
          {activeStep === REGISTRATION_STEPS.Confirmation && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Confirm your details:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                {Object.entries(getValues().basicInfo).map(([k, v]) => (
                  <li key={k}>
                    <strong>{k}:</strong>{' '}
                    {v instanceof Date ? v.toLocaleDateString() : (v as string)}
                  </li>
                ))}
                {Object.entries(getValues().detail).map(([k, v]) =>
                  k === 'profilePicUrl' && v ? (
                    <li key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong>Profile Picture:</strong>
                      <Avatar src={v as string} alt="Profile" sx={{ width: 32, height: 32 }} />
                    </li>
                  ) : (
                    k !== 'profilePic' && (
                      <li key={k}>
                        <strong>{k}:</strong> {v as string}
                      </li>
                    )
                  )
                )}
                {Object.entries(getValues().accountInfo).map(([k, v]) => (
                  <li key={k}>
                    <strong>{k}:</strong> {v as string}
                  </li>
                ))}
              </Box>
            </Box>
          )}
        </form>
      </Box>
      <Box
        sx={{
          minHeight: 64,
          maxHeight: 80,
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {activeStep > 0 && activeStep < totalSteps && (
          <Button variant="outlined" onClick={handleBack} sx={{ minWidth: 100 }}>
            Back
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        {activeStep < totalSteps && (
          <Button variant="contained" onClick={handleNext} sx={{ minWidth: 100 }}>
            Next
          </Button>
        )}
        {activeStep === REGISTRATION_STEPS.Confirmation && (
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ minWidth: 100 }}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default RegistrationForm
