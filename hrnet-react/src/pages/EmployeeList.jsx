import { useSelector } from 'react-redux'

export default function EmployeeList() {
  const employees = useSelector(state => state.employees.list)

  return (
    <ul>
      {employees.map(emp => (
        <li key={emp.id}>{emp.firstName}</li>
      ))}
    </ul>
  )
}
