import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CurrentEmployees from './CurrentEmployees'

describe('CurrentEmployees headers', () => {
  beforeEach(() => {
    localStorage.removeItem('employees:v1')
  })

  it('renders all column headers', async () => {
    render(
      <MemoryRouter>
        <CurrentEmployees />
      </MemoryRouter>,
    )

    const headers = [
      /First Name/i,
      /Last Name/i,
      /Start Date/i,
      /Department/i,
      /Date of Birth/i,
      /Street/i,
      /City/i,
      /State/i,
      /Zip Code/i,
    ]

    for (const header of headers) {
      expect(
        await screen.findByRole('columnheader', { name: header }),
      ).toBeInTheDocument()
    }
  })
})

