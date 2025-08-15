import { Routes, Route } from 'react-router-dom'
import CreateEmployee from '../pages/CreateEmployee'
import EmployeeList from '../pages/EmployeeList'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/employees" element={<EmployeeList />} />
    </Routes>
  )
}
