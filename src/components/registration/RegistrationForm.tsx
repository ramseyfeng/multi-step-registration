import { lazy, Suspense, type ChangeEvent, useState, useContext } from 'react'
import { Box, Button, Typography } from '@mui/material/'
import { useForm } from 'react-hook-form'
import RegistrationStepper from './RegistrationStepper'
import type { RegistrationFormValues } from './registrationTypes.ts'
import { REGISTRATION_DEFAULT_VALUES } from './registrationTypes.ts'
import { COUNTRIES, GENDERS, REGISTRATION_STEPS } from './registrationConstants'
import { mockRegistrationService } from './registrationService'
import { ToastContext } from '@/providers/toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircularProgress from '@mui/material/CircularProgress'

// Lazy load step components
const Step1BasicInfo = lazy(() => import('./steps/Step1BasicInfo'))
const Step2PersonalDetails = lazy(() => import('./steps/Step2PersonalDetails'))
const Step3AccountInfo = lazy(() => import('./steps/Step3AccountInfo'))
const RegistrationConfirmation = lazy(() => import('./steps/RegistrationConfirmation'))
const RegistrationComplete = lazy(() => import('./RegistrationComplete'))

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
  const toast = useContext(ToastContext)

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
        toast?.toastSuccess('Registration successful!')
        setRegistrationSuccess(true)
      } else {
        toast?.toastError('Registration failed. Please try again.')
      }
    } catch (e) {
      console.error('Registration error:', e)
      toast?.toastError('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (registrationSuccess) {
    return (
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-8">
            <CircularProgress color="primary" />
          </div>
        }
      >
        <RegistrationComplete />
      </Suspense>
    )
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
          <Suspense
            fallback={
              <div className="w-full flex justify-center py-8">
                <CircularProgress color="primary" />
              </div>
            }
          >
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
          </Suspense>
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
        className="w-full"
      >
        {activeStep > 0 && (
          <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        )}
        <Box className="flex-1" />
        {activeStep < REGISTRATION_STEPS.Confirmation && (
          <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
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
            startIcon={<CheckCircleIcon />}
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
