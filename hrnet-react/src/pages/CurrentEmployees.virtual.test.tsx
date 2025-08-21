import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CurrentEmployees from './CurrentEmployees'

describe('CurrentEmployees virtualization', () => {
  beforeEach(() => {
    const employees = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      firstName: `First${i}`,
      lastName: `Last${i}`,
      email: `user${i}@example.com`,
      street: '1 St',
      city: 'City',
      state: 'CA',
      zipCode: '12345',
      department: 'Sales',
      startDate: '2020-01-01',
      dateOfBirth: '1990-01-01',
    }))
    localStorage.setItem('employees:v1', JSON.stringify(employees))
  })

  it('renders limited rows despite large dataset', async () => {
    const { container } = render(
      <MemoryRouter>
        <CurrentEmployees />
      </MemoryRouter>,
    )
    await waitFor(() => {
      expect(container.querySelectorAll('tbody tr').length).toBeLessThan(1000)
    })
  })
})
