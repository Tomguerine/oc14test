import { render, screen } from '@testing-library/react'
import DataTable from './DataTable'

test('renders table headers and data', () => {
  interface Person {
    firstName: string
    lastName: string
  }

  const columns = [
    { header: 'First Name', accessorKey: 'firstName' },
    { header: 'Last Name', accessorKey: 'lastName' },
  ]

  const data: Person[] = [{ firstName: 'John', lastName: 'Doe' }]

  render(<DataTable<Person> columns={columns} data={data} />)

  expect(screen.getByText('First Name')).toBeInTheDocument()
  expect(screen.getByText('John')).toBeInTheDocument()
})
