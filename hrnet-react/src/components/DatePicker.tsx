import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { DatePickerProps as ReactDatePickerBaseProps } from 'react-datepicker'

interface DatePickerProps extends Omit<
  ReactDatePickerBaseProps,
  'selected' | 'onChange' | 'id' | 'selectsRange' | 'selectsMultiple'
> {
  id: string
  label: string
  selected: Date | null
  onChange: (date: Date | null) => void
  selectsRange?: never
  selectsMultiple?: never
  showYearDropdown?: boolean
  scrollableYearDropdown?: boolean
  yearDropdownItemNumber?: number
}

export default function DatePicker({
  id,
  label,
  selected,
  onChange,
  showYearDropdown = true,
  scrollableYearDropdown = true,
  ...props
}: DatePickerProps) {
  const Picker = ReactDatePicker as any
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <Picker
        id={id}
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        showYearDropdown={showYearDropdown}
        scrollableYearDropdown={scrollableYearDropdown}
        {...props}
        maxDate={new Date()}
      />
    </div>
  )
}
