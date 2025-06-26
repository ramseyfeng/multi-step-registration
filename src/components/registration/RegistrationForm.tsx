import { type ChangeEvent, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import Step1BasicInfo from './steps/Step1BasicInfo.tsx'
import Step2PersonalDetails from './steps/Step2PersonalDetails.tsx'
import Step3AccountInfo from './steps/Step3AccountInfo.tsx'
import RegistrationComplete from './RegistrationComplete'
import RegistrationStepper from './RegistrationStepper'
import type { RegistrationFormValues } from './registrationTypes.ts'
import { REGISTRATION_DEFAULT_VALUES } from './registrationTypes.ts'
import { COUNTRIES, GENDERS, REGISTRATION_STEPS } from './registrationConstants'
import { mockRegistrationService } from './registrationService'
import { useToast } from '@/providers/toast'
import RegistrationConfirmation from './steps/RegistrationConfirmation'

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
    defaultValues: REGISTRATION_DEFAULT_VALUES,
    mode: 'onTouched',
  })
  const [activeStep, setActiveStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const toast = useToast()

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

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmitting(true)
    try {
      const result = await mockRegistrationService(data)
      if (result.success) {
        toast.toastSuccess('Registration successful!')
        setRegistrationSuccess(true)
      } else {
        toast.toastError('Registration failed. Please try again.')
      }
    } catch (e) {
      console.error('Registration error:', e)
      toast.toastError('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (registrationSuccess) {
    return <RegistrationComplete />
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        bgcolor: 'white',
        color: 'black',
        p: 4,
        borderRadius: 4,
        boxShadow: 4,
        mx: 'auto',
        mt: 6,
      }}
    >
      <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 4, letterSpacing: 1 }}>
        Registration
      </Typography>
      <RegistrationStepper activeStep={activeStep} />
      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: '#f9f9fb',
          borderRadius: 2,
          p: 3,
          minHeight: 320,
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
            <RegistrationConfirmation values={getValues()} />
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
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        {activeStep < REGISTRATION_STEPS.Confirmation && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
        {activeStep === REGISTRATION_STEPS.Confirmation && (
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={submitting}
            loading={submitting}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default RegistrationForm
