import { useState } from 'react'
import { REGISTRATION_STEPS } from './registrationConstants'

export function useRegistrationSteps() {
  const [activeStep, setActiveStep] = useState(0)
  const totalSteps = Object.keys(REGISTRATION_STEPS).length

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setActiveStep(step)
    }
  }

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1))
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0))

  return {
    activeStep,
    goToStep,
    nextStep,
    prevStep,
    totalSteps,
  }
}
