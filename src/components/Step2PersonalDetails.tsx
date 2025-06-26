import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  FormHelperText,
  type SelectChangeEvent,
} from '@mui/material'

interface Step2PersonalDetailsProps {
  values: {
    country: string
    gender: string
    profilePicUrl: string
  }
  countries: string[]
  genders: string[]
  onSelectChange: (event: SelectChangeEvent<string>) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBack: () => void
  onNext: () => void
  errors: {
    country?: string
    gender?: string
    profilePicUrl?: string
  }
}

export default function Step2PersonalDetails({
  values,
  countries,
  genders,
  onSelectChange,
  onFileChange,
  onBack,
  onNext,
  errors,
}: Step2PersonalDetailsProps) {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth required error={!!errors.country}>
        <InputLabel>Country</InputLabel>
        <Select label="Country" name="country" value={values.country} onChange={onSelectChange}>
          {countries.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth required error={!!errors.gender}>
        <InputLabel>Gender</InputLabel>
        <Select label="Gender" name="gender" value={values.gender} onChange={onSelectChange}>
          {genders.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
      </FormControl>
      <Button variant="outlined" component="label" sx={{ alignSelf: 'flex-start' }}>
        Upload Profile Picture
        <input type="file" name="profilePic" accept="image/*" hidden onChange={onFileChange} />
      </Button>
      {values.profilePicUrl && (
        <Avatar src={values.profilePicUrl} alt="Profile" sx={{ width: 56, height: 56, mt: 1 }} />
      )}
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
