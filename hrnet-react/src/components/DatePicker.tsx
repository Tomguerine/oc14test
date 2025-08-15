import { InputHTMLAttributes } from 'react'

/**
 * Props for the {@link DatePicker} component.
 * Combines standard input props with a required label.
 */
export type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Label displayed for the date input */
  label: string
}

/**
 * Renders a date input with an associated label.
 */
export default function DatePicker({ label, id, ...props }: DatePickerProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="date" id={id} {...props} />
    </div>
  )
}
