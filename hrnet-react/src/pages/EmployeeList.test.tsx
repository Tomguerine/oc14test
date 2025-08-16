import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import EmployeeList from './EmployeeList'

type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  state: string
  zipCode: string
  department: string
}

function renderWithData(data: Employee[]) {
  const store = configureStore({
    reducer: { employees: () => ({ employees: data }) },
  })
  render(
    <Provider store={store}>
      <EmployeeList />
    </Provider>
  )
}

describe('EmployeeList table', () => {
  it('sorts by first name', () => {
    const data = [
      {
        id: 1,
        firstName: 'Bob',
        lastName: 'B',
        email: 'bob@example.com',
        street: '1 St',
        city: 'City',
        state: 'CA',
        zipCode: '12345',
        department: 'Sales',
      },
      {
        id: 2,
        firstName: 'Alice',
        lastName: 'A',
        email: 'alice@example.com',
        street: '1 St',
        city: 'City',
        state: 'CA',
        zipCode: '12345',
        department: 'Sales',
      },
    ]
    renderWithData(data)
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows[0]).toHaveTextContent('Bob')

    fireEvent.click(screen.getByRole('columnheader', { name: /first name/i }))
    const sortedRows = screen.getAllByRole('row').slice(1)
    expect(sortedRows[0]).toHaveTextContent('Alice')
  })

  it('filters globally', () => {
    const data = [
      {
        id: 1,
        firstName: 'Bob',
        lastName: 'B',
        email: 'bob@example.com',
        street: '1 St',
        city: 'City',
        state: 'CA',
        zipCode: '12345',
        department: 'Sales',
      },
      {
        id: 2,
        firstName: 'Alice',
        lastName: 'A',
        email: 'alice@example.com',
        street: '1 St',
        city: 'City',
        state: 'CA',
        zipCode: '12345',
        department: 'Sales',
      },
    ]
    renderWithData(data)
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'Ali' },
    })
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows).toHaveLength(1)
    expect(rows[0]).toHaveTextContent('Alice')
  })

  it('paginates results', () => {
    const data = Array.from({ length: 11 }, (_, i) => ({
      id: i + 1,
      firstName: `Name${i + 1}`,
      lastName: 'Last',
      email: `name${i + 1}@example.com`,
      street: '1 St',
      city: 'City',
      state: 'CA',
      zipCode: '12345',
      department: 'Sales',
    }))
    renderWithData(data)
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(10)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(1)
  })

  it('is accessible via table role', () => {
    renderWithData([])
    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
