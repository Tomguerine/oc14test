import { useEffect, useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import Modal from '../components/Modal'
import DatePicker from '../components/DatePicker'
import { addEmployee } from '../features/employees/employeesSlice'
import type { AppDispatch } from '../app/store'

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
  const dispatch = useDispatch<AppDispatch>()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [department, setDepartment] = useState('')
  const [open, setOpen] = useState(false)
  const [createdEmployee, setCreatedEmployee] = useState<{
    firstName: string
    lastName: string
  } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [announcement, setAnnouncement] = useState('')

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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    if (!firstName || !lastName) {
      const msg = 'First and last name are required.'
      setError(msg)
      setAnnouncement(msg)
      return
    }
    setError('')
    const formatDate = (d: Date | null) =>
      d ? d.toISOString().split('T')[0] : ''
    dispatch(
      addEmployee({
        firstName,
        lastName,
        email,
        dateOfBirth: formatDate(dateOfBirth),
        startDate: formatDate(startDate),
        street,
        city,
        state: stateValue,
        zipCode,
        department,
      })
    )
    setCreatedEmployee({ firstName, lastName })
    setOpen(true)
    setFirstName('')
    setLastName('')
    setEmail('')
    setDateOfBirth(null)
    setStartDate(null)
    setStreet('')
    setCity('')
    setStateValue('')
    setZipCode('')
    setDepartment('')
    setErrors({})
  }

  useEffect(() => {
    if (open) {
      setAnnouncement('Employee created dialog opened')
    } else {
      setAnnouncement('Employee created dialog closed')
    }
  }, [open])

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow rounded p-6 space-y-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">HRnet</h1>
          <Link to="/employees" className="text-lg block">View Current Employees</Link>
          <h2 className="text-2xl font-semibold mt-2">Create Employee</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div aria-live="polite" className="sr-only">
            {announcement}
          </div>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}

        <div className="flex flex-col gap-1">
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
            <span id="firstName-error" role="alert" className="error">
              {errors.firstName}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
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
            <span id="lastName-error" role="alert" className="error">
              {errors.lastName}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
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
            <span id="email-error" role="alert" className="error">
              {errors.email}
            </span>
          )}
        </div>
        <DatePicker
          id="dateOfBirth"
          label="Date of Birth"
          selected={dateOfBirth}
          onChange={date => {
            setDateOfBirth(date)
            setAnnouncement(
              `Date of birth set to ${
                date ? date.toISOString().split('T')[0] : ''
              }`
            )
          }}
          required
          aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
          aria-describedby="dob-error"
        />

        {errors.dateOfBirth && (
          <span id="dob-error" role="alert" className="error">
            {errors.dateOfBirth}
          </span>
        )}

        <DatePicker
          id="startDate"
          label="Start Date"
          selected={startDate}
          onChange={setStartDate}
          required
          aria-invalid={errors.startDate ? 'true' : 'false'}
          aria-describedby="startDate-error"
        />

        {errors.startDate && (
          <span id="startDate-error" role="alert" className="error">
            {errors.startDate}
          </span>
        )}

        <div className="flex flex-col gap-1">
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
            <span id="street-error" role="alert" className="error">
              {errors.street}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
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
            <span id="city-error" role="alert" className="error">
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
          <span id="state-error" role="alert" className="error">
            {errors.state}
          </span>
        )}

        <div className="flex flex-col gap-1">
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
            <span id="zip-error" role="alert" className="error">
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
          <span id="department-error" role="alert" className="error">
            {errors.department}
          </span>
        )}

        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded">
          Save
        </button>
        </form>
      </div>
      <Modal
        open={open}
        onOpenChange={o => {
          setOpen(o)
          if (!o) setCreatedEmployee(null)
        }}
        title="Employee Created"
      >
        {createdEmployee
          ? `${createdEmployee.firstName} ${createdEmployee.lastName} a été ajouté(e)`
          : 'The employee has been added to the list.'}
      </Modal>
    </>
  )
}

