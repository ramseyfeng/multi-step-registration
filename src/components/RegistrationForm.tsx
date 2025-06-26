import { type ChangeEvent, useState } from 'react'
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Avatar,
  type SelectChangeEvent,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const steps = ['Basic Information', 'Personal Details', 'Account Setup', 'Confirmation']

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Other']
const genders = ['Male', 'Female', 'Other', 'Prefer not to say']

function RegistrationForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: null as Date | null,
    country: '',
    gender: '',
    profilePic: null as File | null,
    profilePicUrl: '',
    email: '',
    password: '',
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({
        ...prev,
        profilePic: e.target.files![0],
        profilePicUrl: URL.createObjectURL(e.target.files![0]),
      }))
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Separate handlers for different element types to avoid TS errors
  /*
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target
    if (name === 'profilePic' && files?.[0]) {
      setForm((prev) => ({
        ...prev,
        profilePic: files[0],
        profilePicUrl: URL.createObjectURL(files[0]),
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }
*/

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    if (name) {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleDateChange = (date: Date | null) => {
    setForm((prev) => ({ ...prev, dob: date }))
  }

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'white',
        color: 'black',
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleInputChange}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={form.dob}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, name: 'dob' } }}
            />
          </LocalizationProvider>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Box>
      )}
      {activeStep === 1 && (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              label="Country"
              name="country"
              value={form.country}
              onChange={handleSelectChange}
            >
              {countries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" name="gender" value={form.gender} onChange={handleSelectChange}>
              {genders.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" component="label" sx={{ alignSelf: 'flex-start' }}>
            Upload Profile Picture
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {form.profilePicUrl && (
            <Avatar src={form.profilePicUrl} alt="Profile" sx={{ width: 56, height: 56, mt: 1 }} />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Box>
      )}
      {activeStep === 2 && (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleInputChange}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </Box>
      )}
      {activeStep === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Confirm your details:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li>
              <strong>First Name:</strong> {form.firstName}
            </li>
            <li>
              <strong>Last Name:</strong> {form.lastName}
            </li>
            <li>
              <strong>Date of Birth:</strong> {form.dob ? form.dob.toLocaleDateString() : ''}
            </li>
            <li>
              <strong>Country:</strong> {form.country}
            </li>
            <li>
              <strong>Gender:</strong> {form.gender}
            </li>
            <li>
              <strong>Email:</strong> {form.email}
            </li>
            {form.profilePicUrl && (
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong>Profile Picture:</strong>
                <Avatar src={form.profilePicUrl} alt="Profile" sx={{ width: 32, height: 32 }} />
              </li>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default RegistrationForm
