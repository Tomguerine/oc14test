import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmployeesList from './pages/EmployeesList'
import NotFound from './pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<EmployeesList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
