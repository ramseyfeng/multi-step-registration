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
  type FieldName = keyof RegistrationFormValues
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
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
    mode: 'onTouched',
  })
  const [activeStep, setActiveStep] = useState(0)

  // File change handler for react-hook-form
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setValue('profilePic', e.target.files[0])
      setValue('profilePicUrl', URL.createObjectURL(e.target.files[0]))
    }
  }

  // Step navigation with validation
  const handleNext = async () => {
    let stepFields: FieldName[] = []
    if (activeStep === REGISTRATION_STEPS.BasicInfo) stepFields = ['firstName', 'lastName', 'dob']
    if (activeStep === REGISTRATION_STEPS.PersonalDetails) stepFields = ['country', 'gender']
    if (activeStep === REGISTRATION_STEPS.AccountSetup) stepFields = ['email', 'password']
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
            <Step1BasicInfo control={control} errors={errors} />
          )}
          {activeStep === REGISTRATION_STEPS.PersonalDetails && (
            <Step2PersonalDetails
              control={control}
              errors={errors}
              countries={COUNTRIES}
              genders={GENDERS}
              onFileChange={handleFileChange}
            />
          )}
          {activeStep === REGISTRATION_STEPS.AccountSetup && (
            <Step3AccountInfo
              control={control}
              errors={errors}
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
                {Object.entries(getValues()).map(([k, v]) =>
                  k === 'profilePicUrl' && v ? (
                    <li key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong>Profile Picture:</strong>
                      <Avatar src={v as string} alt="Profile" sx={{ width: 32, height: 32 }} />
                    </li>
                  ) : (
                    k !== 'profilePic' && (
                      <li key={k}>
                        <strong>{k}:</strong> {v instanceof Date ? v.toLocaleDateString() : v}
                      </li>
                    )
                  )
                )}
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
        {activeStep > 0 && activeStep < REGISTRATION_STEPS.Confirmation && (
          <Button variant="outlined" onClick={handleBack} sx={{ minWidth: 100 }}>
            Back
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        {activeStep < REGISTRATION_STEPS.Confirmation && (
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
