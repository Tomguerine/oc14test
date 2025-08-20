import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DataTable } from '../components'
import type { RootState } from '../app/store'
import type { Employee } from '../features/employees/employeesSlice'

export default function EmployeeList() {
  const data = useSelector((state: RootState) => state.employees.employees)

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

  return <DataTable columns={columns} data={data as Employee[]} />
}

