import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { seedEmployees } from '../features/employees/seedData'

// Employee representation
interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  state: string
  zipCode: string
  department: string
  startDate?: string
  dateOfBirth?: string
}

const STORAGE_KEY = 'employees:v1'

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}

export default function CurrentEmployees() {
  const [data, setData] = useState<Employee[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading')
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 300)
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees))
        setData(seedEmployees)
        setStatus('ready')
      } else {
        const parsed: Employee[] = JSON.parse(stored)
        setData(parsed)
        setStatus(parsed.length ? 'ready' : 'empty')
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    setGlobalFilter(debouncedSearch)
  }, [debouncedSearch])

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: ({ column }) => (
          <button type="button" onClick={column.getToggleSortingHandler()}>
            First Name{column.getIsSorted() === 'asc' ? ' \u25B2' : column.getIsSorted() === 'desc' ? ' \u25BC' : ''}
          </button>
        ),
      },
      {
        accessorKey: 'lastName',
        header: ({ column }) => (
          <button type="button" onClick={column.getToggleSortingHandler()}>
            Last Name{column.getIsSorted() === 'asc' ? ' \u25B2' : column.getIsSorted() === 'desc' ? ' \u25BC' : ''}
          </button>
        ),
      },
      {
        accessorKey: 'department',
        header: ({ column }) => (
          <button type="button" onClick={column.getToggleSortingHandler()}>
            Department{column.getIsSorted() === 'asc' ? ' \u25B2' : column.getIsSorted() === 'desc' ? ' \u25BC' : ''}
          </button>
        ),
      },
      {
        accessorKey: 'startDate',
        header: ({ column }) => (
          <button type="button" onClick={column.getToggleSortingHandler()}>
            Start Date{column.getIsSorted() === 'asc' ? ' \u25B2' : column.getIsSorted() === 'desc' ? ' \u25BC' : ''}
          </button>
        ),
        cell: info =>
          info.getValue<string>()
            ? format(new Date(info.getValue<string>()), 'dd/MM/yyyy')
            : '',
      },
      {
        accessorKey: 'dateOfBirth',
        header: ({ column }) => (
          <button type="button" onClick={column.getToggleSortingHandler()}>
            Date of Birth{column.getIsSorted() === 'asc' ? ' \u25B2' : column.getIsSorted() === 'desc' ? ' \u25BC' : ''}
          </button>
        ),
        cell: info =>
          info.getValue<string>()
            ? format(new Date(info.getValue<string>()), 'dd/MM/yyyy')
            : '',
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error')
    return <p role="alert">Error loading employees.</p>
  if (status === 'empty')
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Current Employees</h2>
        <p>No employees found.</p>
        <Link to="/">Create Employee</Link>
      </div>
    )

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Current Employees</h2>
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6 space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search..."
            aria-label="Search employees"
            className="border p-2"
          />
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="border p-2"
            >
              {[5, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full" role="table">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} role="row">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      role="columnheader"
                      scope="col"
                      className="px-4 py-2 text-left"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} role="row" className="odd:bg-gray-100">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} role="cell" className="px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border p-2"
          >
            Previous
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border p-2"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/">Create Employee</Link>
      </div>
    </>
  )
}

