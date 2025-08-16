import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import '../styles/DataTable.css'

/**
 * Props for the generic {@link DataTable} component.
 * @property columns - Column definitions for the table
 * @property data - Data records to display
 */
type DataTableProps<T> = {
  columns: ColumnDef<T, unknown>[]
  data: T[]
}

/**
 * Renders a table using TanStack Table for sorting and rendering.
 */
function DataTable<T>({ columns, data }: DataTableProps<T>) {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

  return (
    <table className="data-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { DataTable }
export default DataTable
