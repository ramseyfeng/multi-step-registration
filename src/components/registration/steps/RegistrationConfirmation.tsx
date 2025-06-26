import { Typography, Avatar } from '@mui/material'
import type { RegistrationFormValues } from '../registrationTypes.ts'
import DateFormatter from '../../common/DateFormatter'

interface RegistrationConfirmationProps {
  values: RegistrationFormValues
}

function formatKeyName(key: string) {
  // In real applications, it could be a more sophisticated localization solution
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
}

export default function RegistrationConfirmation({
  values,
}: Readonly<RegistrationConfirmationProps>) {
  return (
    <div className="flex flex-col items-center w-full">
      <Typography variant="h6" className="mb-2 w-full text-center">
        Confirm your details:
      </Typography>
      <div className="w-full max-w-xl mx-auto px-2">
        <ul className="mb-2 p-0">
          {Object.entries(values).map(([k, v]) => {
            if (k === 'profilePicUrl' && v) {
              return (
                <li key={k} className="flex items-center mb-2 justify-center flex-wrap">
                  <div className="w-40 min-w-[120px] text-right pr-2 font-semibold">
                    Avatar picture:
                  </div>
                  <div className="flex-1 min-w-[120px] flex items-center text-left justify-center sm:justify-start">
                    <Avatar src={v as string} alt="Profile" sx={{ width: 32, height: 32 }} />
                  </div>
                </li>
              )
            }
            if (k === 'profilePic') return null
            if (k === 'password') return null
            if (k === 'dob' && typeof v === 'number') {
              return (
                <li key={k} className="flex items-center mb-2 justify-center flex-wrap">
                  <div className="w-40 min-w-[120px] text-right pr-2 font-semibold">
                    Date of Birth:
                  </div>
                  <div className="flex-1 min-w-[120px] text-left justify-center sm:justify-start">
                    <DateFormatter value={v} />
                  </div>
                </li>
              )
            }
            return (
              <li key={k} className="flex items-center mb-2 justify-center flex-wrap">
                <div className="w-40 min-w-[120px] text-right pr-2 font-semibold capitalize">
                  {formatKeyName(k)}:
                </div>
                <div className="flex-1 min-w-[120px] text-left justify-center sm:justify-start break-words overflow-auto max-w-xs">
                  {v as string}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
