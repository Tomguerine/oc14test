import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

export default function EmployeesList() {
  const data = useSelector(state => state.employees.list)
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'startDate', header: 'Start Date' },
      { accessorKey: 'dateOfBirth', header: 'Date of Birth' },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="mb-4">
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          aria-label="Search employees"
        />
      </div>

      <table role="grid">
        <thead role="rowgroup">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} role="row">
              {headerGroup.headers.map(header => {
                const toggleSort = header.column.getToggleSortingHandler()
                const canSort = header.column.getCanSort()
                return (
                  <th
                    key={header.id}
                    role="columnheader"
                    tabIndex={canSort ? 0 : -1}
                    onClick={toggleSort}
                    onKeyDown={e => {
                      if (canSort && (e.key === 'Enter' || e.key === ' ')) {
                        toggleSort(e)
                      }
                    }}
                    style={{ cursor: canSort ? 'pointer' : 'default' }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' \u2191',
                      desc: ' \u2193',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody role="rowgroup">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} role="row" tabIndex={0}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} role="gridcell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-2">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  )
}

