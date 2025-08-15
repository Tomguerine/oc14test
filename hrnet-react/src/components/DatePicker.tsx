import { InputHTMLAttributes } from 'react'

type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export default function DatePicker({ label, id, ...props }: DatePickerProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="date" id={id} {...props} />
    </div>
  )
}


export default DatePicker
