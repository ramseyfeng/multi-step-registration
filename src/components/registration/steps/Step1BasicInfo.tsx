import { Box, TextField } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { RegistrationFormValues } from '../registrationTypes.ts'

interface Step1BasicInfoProps {
  control: Control<RegistrationFormValues>
  errors: FieldErrors<RegistrationFormValues>
}

export default function Step1BasicInfo({ control, errors }: Readonly<Step1BasicInfoProps>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="firstName"
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
        name="lastName"
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
        name="dob"
        control={control}
        rules={{ required: 'Date of birth is required' }}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Date of Birth"
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: !!errors?.dob,
                helperText: errors?.dob?.message as string,
              },
            }}
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date ? date.getTime() : null)}
          />
        )}
      />
    </Box>
  )
}
