import { Typography } from '@mui/material'

export default function RegistrationComplete() {
  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow text-center">
      <Typography variant="h4" color="success.main" gutterBottom>
        Registration Complete!
      </Typography>
      <Typography variant="body1" className="mb-3">
        Thank you for registering. Your account has been created successfully.
      </Typography>
    </div>
  )
}
