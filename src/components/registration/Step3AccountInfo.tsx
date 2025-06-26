import { Box, Button, TextField } from '@mui/material'

interface Step3AccountInfoProps {
  values: {
    email: string
    password: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBack: () => void
  onNext: () => void
  errors: {
    email?: string
    password?: string
  }
}

export default function Step3AccountInfo({
  values,
  onInputChange,
  onBack,
  onNext,
  errors,
}: Step3AccountInfoProps) {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={onInputChange}
        fullWidth
        required
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={onInputChange}
        fullWidth
        required
        error={!!errors.password}
        helperText={errors.password}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
