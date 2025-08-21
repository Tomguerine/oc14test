import { render, screen, fireEvent } from '@testing-library/react'
import CreateEmployee from './CreateEmployee'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

const dispatch = vi.fn()
vi.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}))

describe.skip('CreateEmployee form', () => {
  beforeEach(() => dispatch.mockClear())

  it('validates required fields before submit', () => {
    render(
      <BrowserRouter>
        <CreateEmployee />
      </BrowserRouter>
    )
    const form = screen.getByRole('form') as HTMLFormElement
    expect(form.checkValidity()).toBe(false)

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: '2000-01-01' },
    })
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2020-01-01' },
    })

    expect(form.checkValidity()).toBe(true)
    fireEvent.submit(form)
    expect(dispatch).toHaveBeenCalled()
  })

  it('shows confirmation dialog on successful submit', async () => {
    render(
      <BrowserRouter>
        <CreateEmployee />
      </BrowserRouter>
    )


    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Jane' },
    })
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Smith' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/date of birth/i), {
      target: { value: '2000-01-01' },
    })
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2020-01-01' },
    })

    fireEvent.click(screen.getByRole('button', { name: /save/i }))
    expect(await screen.findByRole('dialog')).toHaveTextContent(/employee created/i)
  })
})
