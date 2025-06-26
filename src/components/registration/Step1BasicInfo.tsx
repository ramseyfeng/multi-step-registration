import { Box, Button, TextField } from '@mui/material'
import { type ChangeEvent } from 'react'

interface Step1BasicInfoProps {
  values: {
    firstName: string
    lastName: string
    dob: Date | null
  }
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onDateChange: (date: Date | null) => void
  onNext: () => void
  errors: {
    firstName?: string
    lastName?: string
    dob?: string
  }
}

export default function Step1BasicInfo({
  values,
  onInputChange,
  onDateChange,
  onNext,
  errors,
}: Readonly<Step1BasicInfoProps>) {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={values.firstName}
        onChange={onInputChange}
        fullWidth
        required
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={values.lastName}
        onChange={onInputChange}
        fullWidth
        required
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      {/* DatePicker should be wrapped in LocalizationProvider in parent */}
      <TextField
        label="Date of Birth"
        name="dob"
        type="date"
        value={values.dob ? values.dob.toISOString().substring(0, 10) : ''}
        onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : null)}
        fullWidth
        required
        error={!!errors.dob}
        helperText={errors.dob}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
