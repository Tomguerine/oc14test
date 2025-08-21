import React, { useMemo, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { RootState } from '../app/store'
import type { Employee } from '../features/employees/employeesSlice'
import { seedEmployees } from '../features/employees/seedData'

const DataTable = React.lazy(() => import('employee-table-react-tom'))

export default function EmployeeList() {
  const data = useSelector((state: RootState) => state.employees.employees)

  const handleReset = () => {
    localStorage.removeItem('employees:v1')
    localStorage.setItem('employees:v1', JSON.stringify(seedEmployees))
    window.location.reload()
  }

  const columns = useMemo(
    () => [
      { header: 'First Name', accessor: 'firstName' },
      { header: 'Last Name', accessor: 'lastName' },
      { header: 'Department', accessor: 'department' },
      { header: 'Start Date', accessor: 'startDate' },
      { header: 'Date of Birth', accessor: 'dateOfBirth' },
    ],
    [],
  )

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">
        Current Employees
      </h2>
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data as Employee[]} />
        </Suspense>
      </div>
      <div className="mt-4 text-center space-x-4">
        <Link to="/">Create Employee</Link>
        <button onClick={handleReset}>Reset data</button>
      </div>
    </>
  )
}

