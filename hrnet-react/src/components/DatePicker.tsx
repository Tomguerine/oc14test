
type DatePickerProps = {
  value?: string
  onChange?: (value: string) => void
}

function DatePicker({ value, onChange }: DatePickerProps) {
  return <input type="date" value={value} onChange={(e) => onChange?.(e.target.value)} />
}

export { DatePicker }
export default DatePicker
