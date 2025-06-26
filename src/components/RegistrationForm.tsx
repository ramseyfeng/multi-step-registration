import { type ChangeEvent, useState } from 'react'
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Avatar,
  type SelectChangeEvent,
} from '@mui/material'
import Step1BasicInfo from './Step1BasicInfo'
import Step2PersonalDetails from './Step2PersonalDetails'
import Step3AccountInfo from './Step3AccountInfo'

const steps = ['Basic Information', 'Personal Details', 'Account Setup', 'Confirmation']

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other']
const genders = ['Male', 'Female', 'Other', 'Prefer not to say']

function RegistrationForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState({
    basicInfo: {
      firstName: '',
      lastName: '',
      dob: null as Date | null,
    },
    detail: {
      country: '',
      gender: '',
      profilePic: null as File | null,
      profilePicUrl: '',
    },
    accountInfo: {
      email: '',
      password: '',
    },
  })
  type Step1Errors = { firstName?: string; lastName?: string; dob?: string }
  type Step2Errors = { country?: string; gender?: string }
  type Step3Errors = { email?: string; password?: string }

  const [step1Errors, setStep1Errors] = useState<Step1Errors>({})
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({})
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({})

  // Validation for each step
  const validateStep = (): boolean => {
    if (activeStep === 0) {
      const errors: Step1Errors = {}
      if (!form.basicInfo.firstName) errors.firstName = 'First name is required'
      if (!form.basicInfo.lastName) errors.lastName = 'Last name is required'
      if (!form.basicInfo.dob) errors.dob = 'Date of birth is required'
      setStep1Errors(errors)
      return Object.keys(errors).length === 0
    } else if (activeStep === 1) {
      const errors: Step2Errors = {}
      if (!form.detail.country) errors.country = 'Country is required'
      if (!form.detail.gender) errors.gender = 'Gender is required'
      setStep2Errors(errors)
      return Object.keys(errors).length === 0
    } else if (activeStep === 2) {
      const errors: Step3Errors = {}
      if (!form.accountInfo.email) errors.email = 'Email is required'
      if (!form.accountInfo.password) errors.password = 'Password is required'
      setStep3Errors(errors)
      return Object.keys(errors).length === 0
    }
    return true
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({
        ...prev,
        detail: {
          ...prev.detail,
          profilePic: e.target.files![0],
          profilePicUrl: URL.createObjectURL(e.target.files![0]),
        },
      }))
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (activeStep === 0) {
      setForm((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, [name]: value } }))
    } else if (activeStep === 2) {
      setForm((prev) => ({ ...prev, accountInfo: { ...prev.accountInfo, [name]: value } }))
    }
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, detail: { ...prev.detail, [name as string]: value as string } }))
  }

  const handleDateChange = (date: Date | null) => {
    setForm((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, dob: date } }))
  }

  const handleNext = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1)
  }
  const handleBack = () => setActiveStep((prev) => prev - 1)

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'white',
        color: 'black',
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Step1BasicInfo
          values={form.basicInfo}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onNext={handleNext}
          errors={step1Errors}
        />
      )}
      {activeStep === 1 && (
        <Step2PersonalDetails
          values={form.detail}
          countries={countries}
          genders={genders}
          onSelectChange={handleSelectChange}
          onFileChange={handleFileChange}
          onBack={handleBack}
          onNext={handleNext}
          errors={step2Errors}
        />
      )}
      {activeStep === 2 && (
        <Step3AccountInfo
          values={form.accountInfo}
          onInputChange={handleInputChange}
          onBack={handleBack}
          onNext={handleNext}
          errors={step3Errors}
        />
      )}
      {activeStep === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Confirm your details:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li>
              <strong>First Name:</strong> {form.basicInfo.firstName}
            </li>
            <li>
              <strong>Last Name:</strong> {form.basicInfo.lastName}
            </li>
            <li>
              <strong>Date of Birth:</strong>{' '}
              {form.basicInfo.dob ? form.basicInfo.dob.toLocaleDateString() : ''}
            </li>
            <li>
              <strong>Country:</strong> {form.detail.country}
            </li>
            <li>
              <strong>Gender:</strong> {form.detail.gender}
            </li>
            <li>
              <strong>Email:</strong> {form.accountInfo.email}
            </li>
            {form.detail.profilePicUrl && (
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong>Profile Picture:</strong>
                <Avatar
                  src={form.detail.profilePicUrl}
                  alt="Profile"
                  sx={{ width: 32, height: 32 }}
                />
              </li>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default RegistrationForm
