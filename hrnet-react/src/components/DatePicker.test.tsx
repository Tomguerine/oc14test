import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import DatePicker from './DatePicker'

test('renders label and handles change', () => {
  const handleChange = vi.fn()
  render(
    <DatePicker
      id="test-date"
      label="Test Date"
      selected={null}
      onChange={handleChange}
    />
  )
  const input = screen.getByLabelText(/test date/i)
  fireEvent.change(input, { target: { value: '2024-01-01' } })
  expect(handleChange).toHaveBeenCalled()
})
