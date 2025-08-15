import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import DatePicker from '../components/DatePicker'
import { addEmployee } from '../features/employees/employeesSlice'

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
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [startDate, setStartDate] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [department, setDepartment] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      addEmployee({
        firstName,
        lastName,
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
    setDateOfBirth('')
    setStartDate('')
    setStreet('')
    setCity('')
    setStateValue('')
    setZipCode('')
    setDepartment('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <DatePicker id="dateOfBirth" label="Date of Birth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
        <DatePicker id="startDate" label="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <div>
          <label htmlFor="street">Street</label>
          <input id="street" value={street} onChange={e => setStreet(e.target.value)} />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input id="city" value={city} onChange={e => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <Select.Root value={stateValue} onValueChange={setStateValue}>
            <Select.Trigger id="state">
              <Select.Value placeholder="Select state" />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                {states.map(s => (
                  <Select.Item key={s} value={s}>
                    <Select.ItemText>{s}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" value={zipCode} onChange={e => setZipCode(e.target.value)} />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <Select.Root value={department} onValueChange={setDepartment}>
            <Select.Trigger id="department">
              <Select.Value placeholder="Select department" />
            </Select.Trigger>
            <Select.Content>
              <Select.Viewport>
                {departments.map(d => (
                  <Select.Item key={d} value={d}>
                    <Select.ItemText>{d}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
        <button type="submit">Save</button>
      </form>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Employee Created</Dialog.Title>
            <Dialog.Description>The employee has been added to the list.</Dialog.Description>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

