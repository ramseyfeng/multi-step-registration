import { Stepper, Step, StepLabel } from '@mui/material'
import { REGISTRATION_STEPS, REGISTRATION_STEPS_DATA } from './registrationConstants'

interface RegistrationStepperProps {
  activeStep: number
}

export default function RegistrationStepper({ activeStep }: Readonly<RegistrationStepperProps>) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
      {Object.values(REGISTRATION_STEPS).map((step) => (
        <Step key={REGISTRATION_STEPS_DATA[step].label}>
          <StepLabel>{REGISTRATION_STEPS_DATA[step].label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
