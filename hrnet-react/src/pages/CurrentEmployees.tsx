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
  const [filteredData, setFilteredData] = useState<Employee[]>([])
  const [virtualRows, setVirtualRows] = useState<Employee[]>([])
  const [paddingTop, setPaddingTop] = useState(0)
  const [paddingBottom, setPaddingBottom] = useState(0)

  useEffect(() => {
    let cancelled = false

    const parseAndSet = (stored: string) => {
      try {
        const parsed: Employee[] = JSON.parse(stored)
        if (!cancelled) {
          setData(parsed)
          setStatus(parsed.length ? 'ready' : 'empty')
        }
      } catch (e) {
        console.error(e)
        if (!cancelled) setStatus('error')
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees))
        setData(seedEmployees)
        setStatus('ready')
      } else {
        const scheduleParse = () => parseAndSet(stored)
        if ('requestIdleCallback' in window) {
          ;(window as any).requestIdleCallback(scheduleParse)
        } else {
          setTimeout(scheduleParse, 0)
        }
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
    }

    return () => {
      cancelled = true
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

  useEffect(() => {
    const recalc = () => {
      const lower = globalFilter.toLowerCase()
      const filtered = globalFilter
        ? data.filter(emp =>
            Object.values(emp).some(val =>
              String(val).toLowerCase().includes(lower),
            ),
          )
        : data
      setFilteredData(filtered)
      const total = filtered.length
      const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
      const end = Math.min(
        total,
        start + Math.ceil(viewportHeight / rowHeight) + overscan,
      )
      setVirtualRows(filtered.slice(start, end))
      setPaddingTop(start * rowHeight)
      setPaddingBottom((total - end) * rowHeight)
    }

    const id = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(recalc)
      : window.setTimeout(recalc, 0)
    return () => {
      if ((window as any).cancelIdleCallback)
        (window as any).cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [data, globalFilter, scrollTop])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  const rows = filteredData.length ? virtualRows : data
  const topPad = filteredData.length ? paddingTop : 0
  const bottomPad = filteredData.length ? paddingBottom : 0

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Current Employees</h2>
      {status === 'error' ? (
        <p role="alert" className="text-center">
          Error loading employees.
        </p>
      ) : status === 'empty' ? (
        <div className="text-center space-y-4">
          <p>No employees found.</p>
          <Link to="/">Create Employee</Link>
        </div>
      ) : (
        <>
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
              {status === 'loading' ? (
                <p>Loading...</p>
              ) : (
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
                    {topPad > 0 && (
                      <tr>
                        <td style={{ height: topPad }} colSpan={columns.length} />
                      </tr>
                    )}
                    {rows.map(emp => (
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
                    {bottomPad > 0 && (
                      <tr>
                        <td style={{ height: bottomPad }} colSpan={columns.length} />
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link to="/">Create Employee</Link>
          </div>
        </>
      )}
    </>
  )
}
