import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmployeesList from './pages/EmployeesList'
import CreateEmployee from './pages/CreateEmployee'
import NotFound from './pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<EmployeesList />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
