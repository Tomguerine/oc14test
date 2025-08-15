import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../employeesSlice.js'

export default function CreateEmployee() {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!firstName) return
    dispatch(addEmployee({ firstName }))
    setFirstName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <button type="submit">Add Employee</button>
    </form>
  )
}
