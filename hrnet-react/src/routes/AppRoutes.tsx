import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import CreateEmployee from '../pages/CreateEmployee'

=======
import CreateEmployee from '../pages/CreateEmployee'
const CurrentEmployees = lazy(() => import('../pages/CurrentEmployees'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route
        path="/employees"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <CurrentEmployees />
          </Suspense>
        }
      />
    </Routes>
  )
}
