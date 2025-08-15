import { Link } from 'react-router-dom'

export default function EmployeesList() {
  return (
    <div>
      <div>Employees list</div>
      <Link to="/create-employee">Home</Link>
    </div>
  )
}
