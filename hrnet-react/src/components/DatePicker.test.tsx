import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import DatePicker from './DatePicker'

test('shows year dropdown and handles year selection', () => {
  const handleChange = vi.fn()
  const { container } = render(
    <DatePicker
      id="test-date"
      label="Test Date"
      selected={new Date('2020-01-01')}
      onChange={handleChange}
    />
  )
  const input = screen.getByLabelText(/test date/i)
  fireEvent.click(input)

  expect(
    container.querySelector('.react-datepicker__year-dropdown-container')
  ).not.toBeNull()

  const yearReadView = container.querySelector(
    '.react-datepicker__year-read-view'
  ) as HTMLElement
  fireEvent.click(yearReadView)

  const yearOption = Array.from(
    container.querySelectorAll('.react-datepicker__year-option')
  ).find(
    (opt) =>
      !opt.classList.contains('react-datepicker__year-option--selected_year') &&
      !opt.querySelector('.react-datepicker__navigation')
  ) as HTMLElement
  fireEvent.click(yearOption)

  const day = container.querySelector(
    '.react-datepicker__day--001:not(.react-datepicker__day--outside-month)'
  ) as HTMLElement
  fireEvent.click(day)

  expect(handleChange).toHaveBeenCalled()
})
