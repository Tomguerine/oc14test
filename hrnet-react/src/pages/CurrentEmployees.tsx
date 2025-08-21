import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { seedEmployees } from '../features/employees/seedData'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const rowHeight = 40
  const overscan = 5
  const viewportHeight = 400

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

  const columns = useMemo(
    () => [
      { key: 'firstName', header: 'First Name' },
      { key: 'lastName', header: 'Last Name' },
      { key: 'department', header: 'Department' },
      {
        key: 'startDate',
        header: 'Start Date',
        format: (value: string | undefined) =>
          value ? format(new Date(value), 'dd/MM/yyyy') : '',
      },
      {
        key: 'dateOfBirth',
        header: 'Date of Birth',
        format: (value: string | undefined) =>
          value ? format(new Date(value), 'dd/MM/yyyy') : '',
      },
    ],
    [],
  )

  const filteredData = useMemo(() => {
    if (!globalFilter) return data
    const lower = globalFilter.toLowerCase()
    return data.filter(emp =>
      Object.values(emp).some(val =>
        String(val).toLowerCase().includes(lower),
      ),
    )
  }, [data, globalFilter])

  const totalRows = filteredData.length
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const endIndex = Math.min(
    totalRows,
    startIndex + Math.ceil(viewportHeight / rowHeight) + overscan,
  )
  const virtualRows = filteredData.slice(startIndex, endIndex)
  const paddingTop = startIndex * rowHeight
  const paddingBottom = (totalRows - endIndex) * rowHeight

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p role="alert">Error loading employees.</p>
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
        </div>
        <div
          className="overflow-auto max-h-96"
          ref={containerRef}
          onScroll={handleScroll}
          style={{ height: `${viewportHeight}px` }}
        >
          <table className="min-w-full" role="table">
            <thead>
              <tr role="row">
                {columns.map(col => (
                  <th
                    key={col.key}
                    role="columnheader"
                    scope="col"
                    className="px-4 py-2 text-left"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: paddingTop }} colSpan={columns.length} />
                </tr>
              )}
              {virtualRows.map(emp => (
                <tr key={emp.id} role="row" className="odd:bg-gray-100">
                  {columns.map(col => (
                    <td key={col.key} role="cell" className="px-4 py-2">
                      {col.format
                        ? col.format(emp[col.key as keyof Employee] as string)
                        : (emp[col.key as keyof Employee] as string)}
                    </td>
                  ))}
                </tr>
              ))}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: paddingBottom }} colSpan={columns.length} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/">Create Employee</Link>
      </div>
    </>
  )
}
