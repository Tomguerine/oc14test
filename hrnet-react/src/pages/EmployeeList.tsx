import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { RootState } from '../app/store'
import type { Employee } from '../features/employees/employeesSlice'
import { seedEmployees } from '../features/employees/seedData'
import type { ColumnDef } from '@tanstack/react-table'
import DataTable from '../components/DataTable'


export default function EmployeeList() {
  const data = useSelector((state: RootState) => state.employees.employees)

  const handleReset = () => {
    localStorage.removeItem('employees:v1')
    localStorage.setItem('employees:v1', JSON.stringify(seedEmployees))
    window.location.reload()
  }

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      { header: 'First Name', accessorKey: 'firstName' },
      { header: 'Last Name', accessorKey: 'lastName' },
      { header: 'Department', accessorKey: 'department' },
      { header: 'Start Date', accessorKey: 'startDate' },
      { header: 'Date of Birth', accessorKey: 'dateOfBirth' },
      { header: 'Street', accessorKey: 'street' },
      { header: 'City', accessorKey: 'city' },
      { header: 'State', accessorKey: 'state' },
      { header: 'Zip Code', accessorKey: 'zipCode' },
    ],
    [],
  )

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">
        Current Employees
      </h2>
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="mt-4 text-center space-x-4">
        <Link to="/">Create Employee</Link>
        <button onClick={handleReset}>Reset data</button>
      </div>
    </>
  )
}

