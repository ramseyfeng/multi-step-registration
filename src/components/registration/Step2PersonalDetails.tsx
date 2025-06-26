import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  FormHelperText,
} from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import React from 'react'
import type { RegistrationFormValues } from './registrationTypes'

interface Step2PersonalDetailsProps {
  control: Control<RegistrationFormValues>
  errors: FieldErrors<RegistrationFormValues>
  countries: string[]
  genders: string[]
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Step2PersonalDetails({
  control,
  errors,
  countries,
  genders,
  onFileChange,
}: Readonly<Step2PersonalDetailsProps>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth required error={!!errors?.country}>
        <InputLabel>Country</InputLabel>
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Country is required' }}
          render={({ field }) => (
            <Select {...field} label="Country">
              {countries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors?.country && <FormHelperText>{errors.country.message as string}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth required error={!!errors?.gender}>
        <InputLabel>Gender</InputLabel>
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Gender is required' }}
          render={({ field }) => (
            <Select {...field} label="Gender">
              {genders.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors?.gender && <FormHelperText>{errors.gender.message as string}</FormHelperText>}
      </FormControl>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Controller
          name="profilePicUrl"
          control={control}
          render={({ field }) =>
            field.value ? (
              <Avatar src={field.value} alt="Profile" sx={{ width: 56, height: 56 }} />
            ) : (
              <></>
            )
          }
        />
        <Button variant="outlined" component="label">
          Upload Profile Picture
          <input type="file" accept="image/*" hidden onChange={onFileChange} />
        </Button>
      </Box>
    </Box>
  )
}
