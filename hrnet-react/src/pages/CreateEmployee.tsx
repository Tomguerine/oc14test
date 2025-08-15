import { useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from '../components/DatePicker'
import Dropdown from '../components/Dropdown'
import Modal from '../components/Modal'
import { addEmployee } from '../employeesSlice.js'

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const departments = [
  'Sales',
  'Marketing',
  'Engineering',
  'Human Resources',
  'Legal',
]

export default function CreateEmployee() {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [startDate, setStartDate] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [department, setDepartment] = useState('')
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!firstName.trim()) newErrors.firstName = 'First name is required'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email'
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!startDate) newErrors.startDate = 'Start date is required'
    if (!street.trim()) newErrors.street = 'Street is required'
    if (!city.trim()) newErrors.city = 'City is required'
    if (!stateValue) newErrors.state = 'State is required'
    if (!zipCode.trim()) newErrors.zipCode = 'Zip code is required'
    else if (!/^\d{5}$/.test(zipCode)) newErrors.zipCode = 'Zip code must be 5 digits'
    if (!department) newErrors.department = 'Department is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    dispatch(
      addEmployee({
        firstName,
        lastName,
        email,
        dateOfBirth,
        startDate,
        street,
        city,
        state: stateValue,
        zipCode,
        department,
      })
    )
    setOpen(true)
    setFirstName('')
    setLastName('')
    setEmail('')
    setDateOfBirth('')
    setStartDate('')
    setStreet('')
    setCity('')
    setStateValue('')
    setZipCode('')
    setDepartment('')
    setErrors({})
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            aria-invalid={errors.firstName ? 'true' : 'false'}
            aria-describedby="firstName-error"
          />
          {errors.firstName && (
            <span id="firstName-error" role="alert">
              {errors.firstName}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            aria-invalid={errors.lastName ? 'true' : 'false'}
            aria-describedby="lastName-error"
          />
          {errors.lastName && (
            <span id="lastName-error" role="alert">
              {errors.lastName}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span id="email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <DatePicker
          id="dateOfBirth"
          label="Date of Birth"
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
          required
          aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
          aria-describedby="dob-error"
        />
        {errors.dateOfBirth && (
          <span id="dob-error" role="alert">
            {errors.dateOfBirth}
          </span>
        )}
        <DatePicker
          id="startDate"
          label="Start Date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
          aria-invalid={errors.startDate ? 'true' : 'false'}
          aria-describedby="startDate-error"
        />
        {errors.startDate && (
          <span id="startDate-error" role="alert">
            {errors.startDate}
          </span>
        )}
        <div>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            value={street}
            onChange={e => setStreet(e.target.value)}
            required
            aria-invalid={errors.street ? 'true' : 'false'}
            aria-describedby="street-error"
          />
          {errors.street && (
            <span id="street-error" role="alert">
              {errors.street}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
            aria-invalid={errors.city ? 'true' : 'false'}
            aria-describedby="city-error"
          />
          {errors.city && (
            <span id="city-error" role="alert">
              {errors.city}
            </span>
          )}
        </div>
        <Dropdown
          id="state"
          label="State"
          options={states.map(s => ({ value: s, label: s }))}
          value={stateValue}
          onValueChange={setStateValue}
          placeholder="Select state"
        />
        {errors.state && (
          <span id="state-error" role="alert">
            {errors.state}
          </span>
        )}
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            required
            inputMode="numeric"
            pattern="\\d{5}"
            aria-invalid={errors.zipCode ? 'true' : 'false'}
            aria-describedby="zip-error"
          />
          {errors.zipCode && (
            <span id="zip-error" role="alert">
              {errors.zipCode}
            </span>
          )}
        </div>
        <Dropdown
          id="department"
          label="Department"
          options={departments.map(d => ({ value: d, label: d }))}
          value={department}
          onValueChange={setDepartment}
          placeholder="Select department"
        />
        {errors.department && (
          <span id="department-error" role="alert">
            {errors.department}
          </span>
        )}
        <button type="submit">Save</button>
      </form>
      <Modal open={open} onOpenChange={setOpen} title="Employee Created">
        The employee has been added to the list.
      </Modal>
    </>
  )
}

