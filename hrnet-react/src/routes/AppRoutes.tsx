import { Routes, Route } from 'react-router-dom'
import CreateEmployee from '../pages/CreateEmployee'
import CurrentEmployees from '../pages/CurrentEmployees'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/employees" element={<CurrentEmployees />} />
    </Routes>
  )
}
