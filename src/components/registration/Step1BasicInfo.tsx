import { Box, TextField } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import type { RegistrationFormValues } from './registrationTypes'

interface Step1BasicInfoProps {
  control: Control<RegistrationFormValues>
  errors: FieldErrors<RegistrationFormValues['basicInfo']>
}

export default function Step1BasicInfo({ control, errors }: Step1BasicInfoProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="basicInfo.firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            required
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message as string}
          />
        )}
      />
      <Controller
        name="basicInfo.lastName"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            required
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message as string}
          />
        )}
      />
      <Controller
        name="basicInfo.dob"
        control={control}
        rules={{ required: 'Date of birth is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Date of Birth"
            type="date"
            fullWidth
            required
            error={!!errors?.dob}
            helperText={errors?.dob?.message as string}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            value={
              field.value
                ? field.value instanceof Date
                  ? field.value.toISOString().substring(0, 10)
                  : field.value
                : ''
            }
            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
          />
        )}
      />
    </Box>
  )
}
