import { Box, TextField } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import type { RegistrationFormValues } from './registrationTypes'

interface Step3AccountInfoProps {
  control: Control<RegistrationFormValues>
  errors: FieldErrors<RegistrationFormValues>
  onBack: () => void
  onNext: () => void
}

export default function Step3AccountInfo({ control, errors }: Readonly<Step3AccountInfoProps>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email Address"
            type="email"
            fullWidth
            required
            error={!!errors?.email}
            helperText={errors?.email?.message as string}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            required
            error={!!errors?.password}
            helperText={errors?.password?.message as string}
          />
        )}
      />
    </Box>
  )
}
