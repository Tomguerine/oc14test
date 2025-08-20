import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { ReactDatePickerProps } from 'react-datepicker'

interface DatePickerProps extends Omit<ReactDatePickerProps, 'selected' | 'onChange' | 'id'> {
  id: string
  label: string
  selected: Date | null
  onChange: (date: Date | null) => void
}

export default function DatePicker({ id, label, selected, onChange, ...props }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <ReactDatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        {...props}
      />
    </div>
  )
}
