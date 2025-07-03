import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  FormHelperText,
} from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import React from 'react'
import type { RegistrationFormValues } from '../registrationTypes.ts'

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      {/* Avatar Upload Centered */}
      <Controller
        name="profilePicUrl"
        control={control}
        render={({ field }) => (
          <label
            htmlFor="avatar-upload"
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              src={field.value || undefined}
              alt="Profile"
              sx={{
                width: 80,
                height: 80,
                mb: 1,
                bgcolor: !field.value ? '#e0e0e0' : undefined,
              }}
            >
              {!field.value && <span style={{ fontSize: 32, color: '#aaa' }}>?</span>}
            </Avatar>
            <input id="avatar-upload" type="file" accept="image/*" hidden onChange={onFileChange} />
            <FormHelperText sx={{ textAlign: 'center', mt: 1 }}>
              Click the avatar to upload a profile picture (optional)
            </FormHelperText>
          </label>
        )}
      />
      {/* Country Field */}
      <FormControl fullWidth required error={!!errors?.country}>
        <InputLabel id="country-label">Country</InputLabel>
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Country is required' }}
          render={({ field }) => (
            <Select {...field} labelId="country-label" label="Country">
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
      {/* Gender Field */}
      <FormControl fullWidth required error={!!errors?.gender}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'Gender is required' }}
          render={({ field }) => (
            <Select {...field} labelId="gender-label" label="Gender">
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
    </Box>
  )
}
