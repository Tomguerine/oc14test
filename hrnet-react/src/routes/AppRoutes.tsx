import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const CreateEmployee = lazy(() => import('../pages/CreateEmployee'))
const CurrentEmployees = lazy(() => import('../pages/CurrentEmployees'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employees" element={<CurrentEmployees />} />
      </Routes>
    </Suspense>
  )
}
