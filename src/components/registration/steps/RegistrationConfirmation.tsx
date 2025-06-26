import { Box, Typography, Avatar } from '@mui/material'
import type { RegistrationFormValues } from '../registrationTypes.ts'

interface RegistrationConfirmationProps {
  values: RegistrationFormValues
}

export default function RegistrationConfirmation({
  values,
}: Readonly<RegistrationConfirmationProps>) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Confirm your details:
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
        {Object.entries(values).map(([k, v]) =>
          k === 'profilePicUrl' && v ? (
            <li key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong>Profile Picture:</strong>
              <Avatar src={v as string} alt="Profile" sx={{ width: 32, height: 32 }} />
            </li>
          ) : (
            k !== 'profilePic' && (
              <li key={k}>
                <strong>{k}:</strong> {v instanceof Date ? v.toLocaleDateString() : v}
              </li>
            )
          )
        )}
      </Box>
    </Box>
  )
}
