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

/* eslint-disable no-unused-vars */
interface IdleWindow extends Window {
  requestIdleCallback?: (cb: () => void) => number
  cancelIdleCallback?: (id: number) => void
}
/* eslint-enable no-unused-vars */

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
  const workerRef = useRef<Worker | null>(null)
  const [
    sortConfig,
    setSortConfig,
  ] = useState<{ key: keyof Employee; direction: 'asc' | 'desc' } | null>(null)

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
        const idle = window as IdleWindow
        if ('requestIdleCallback' in window) {
          idle.requestIdleCallback?.(scheduleParse)
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
      {
        key: 'startDate',
        header: 'Start Date',
        format: (value: string | undefined) =>
          value ? format(new Date(value), 'dd/MM/yyyy') : '',
      },
      { key: 'department', header: 'Department' },
      {
        key: 'dateOfBirth',
        header: 'Date of Birth',
        format: (value: string | undefined) =>
          value ? format(new Date(value), 'dd/MM/yyyy') : '',
      },
      { key: 'street', header: 'Street' },
      { key: 'city', header: 'City' },
      { key: 'state', header: 'State' },
      { key: 'zipCode', header: 'Zip Code' },
    ],
    [],
  )

  useEffect(() => {
    if (typeof Worker === 'undefined') return
    const worker = new Worker(
      new URL('../workers/employeeWorker.ts', import.meta.url),
    )
    workerRef.current = worker
    worker.onmessage = e => {
      setFilteredData(e.data as Employee[])
    }
    return () => {
      worker.terminate()
    }
  }, [])

  useEffect(() => {
    const schedule = () => {
      if (workerRef.current) {
        workerRef.current.postMessage({
          employees: data,
          sortConfig,
          globalFilter,
        })
      } else {
        const sorted = sortConfig
          ? [...data].sort((a, b) => {
              const aVal = a[sortConfig.key]
              const bVal = b[sortConfig.key]
              const cmp = String(aVal).localeCompare(String(bVal))
              return sortConfig.direction === 'asc' ? cmp : -cmp
            })
          : data
        const lower = globalFilter.toLowerCase()
        const filtered = globalFilter
          ? sorted.filter(emp =>
              Object.values(emp).some(val =>
                String(val).toLowerCase().includes(lower),
              ),
            )
          : sorted
        setFilteredData(filtered)
      }
    }
    const idle = window as IdleWindow
    const id = idle.requestIdleCallback
      ? idle.requestIdleCallback(schedule)
      : window.setTimeout(schedule, 0)
    return () => {
      if (idle.cancelIdleCallback) idle.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [data, globalFilter, sortConfig])

  useEffect(() => {
    const recalc = () => {
      const total = filteredData.length
      const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
      const end = Math.min(
        total,
        start + Math.ceil(viewportHeight / rowHeight) + overscan,
      )
      setVirtualRows(filteredData.slice(start, end))
      setPaddingTop(start * rowHeight)
      setPaddingBottom((total - end) * rowHeight)
    }
    const idle = window as IdleWindow
    const id = idle.requestIdleCallback
      ? idle.requestIdleCallback(recalc)
      : window.setTimeout(recalc, 0)
    return () => {
      if (idle.cancelIdleCallback) idle.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [filteredData, scrollTop])

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
                          aria-sort={
                            sortConfig?.key === col.key
                              ? sortConfig.direction === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                          }
                          onClick={() =>
                            setSortConfig(prev => {
                              if (prev?.key === col.key)
                                return {
                                  key: col.key as keyof Employee,
                                  direction:
                                    prev.direction === 'asc' ? 'desc' : 'asc',
                                }
                              return {
                                key: col.key as keyof Employee,
                                direction: 'asc',
                              }
                            })
                          }
                          className="px-4 py-2 text-left cursor-pointer select-none"
                        >
                          {col.header}{' '}
                          {sortConfig?.key === col.key && (
                            <span aria-hidden="true">
                              {sortConfig.direction === 'asc' ? '▲' : '▼'}
                            </span>
                          )}
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
