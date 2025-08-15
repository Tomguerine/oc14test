import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <nav>
      <Link to="/create-employee">Create Employee</Link>
      <Link to="/employees">View Current Employees</Link>
    </nav>
  )
}
