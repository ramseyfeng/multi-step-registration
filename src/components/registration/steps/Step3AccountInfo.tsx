import { Box, TextField } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import type { RegistrationFormValues } from '../registrationTypes.ts'

interface Step3AccountInfoProps {
  control: Control<RegistrationFormValues>
  errors: FieldErrors<RegistrationFormValues>
}

export default function Step3AccountInfo({ control, errors }: Readonly<Step3AccountInfoProps>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
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
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
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
