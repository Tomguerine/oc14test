import { useState, useRef, useEffect, InputHTMLAttributes } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string

  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DatePicker({ id, label, value, onChange, ...rest }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const initial = value ? new Date(value) : new Date()
  const [month, setMonth] = useState(initial.getMonth())
  const [year, setYear] = useState(initial.getFullYear())
  const selectedDay = value ? new Date(value).getDate() : undefined
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dayRefs = useRef<(HTMLButtonElement | null)[]>([])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleSelect = (day: number) => {
    const iso = new Date(year, month, day).toISOString().split('T')[0]
    onChange({ target: { value: iso } } as React.ChangeEvent<HTMLInputElement>)
    setOpen(false)
  }

  const focusDay = (day: number) => {
    const btn = dayRefs.current[day]
    if (btn) {
      btn.focus()
    }
  }

  const handleKeyDown = (day: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    let newDay = day
    switch (e.key) {
      case 'ArrowRight':
        newDay = day + 1
        break
      case 'ArrowLeft':
        newDay = day - 1
        break
      case 'ArrowDown':
        newDay = day + 7
        break
      case 'ArrowUp':
        newDay = day - 7
        break
      case 'Home':
        newDay = 1
        break
      case 'End':
        newDay = daysInMonth
        break
      default:
        return
    }
    if (newDay >= 1 && newDay <= daysInMonth) {
      e.preventDefault()
      focusDay(newDay)
    }
  }

  useEffect(() => {
    if (open) {
      const day = selectedDay ?? 1
      setTimeout(() => focusDay(day), 0)
    }
  }, [open, month, year])

  const handleMonthChange = (dir: number) => {
    setMonth(m => {
      const newMonth = m + dir
      if (newMonth < 0) {
        setYear(y => y - 1)
        return 11
      }
      if (newMonth > 11) {
        setYear(y => y + 1)
        return 0
      }
      return newMonth
    })
  }

  const renderGrid = () => {
    const cells = []
    for (let i = 0; i < 42; i++) {
      const day = i - firstDay + 1
      if (day < 1 || day > daysInMonth) {
        cells.push(<td key={i}></td>)
      } else {
        cells.push(
          <td key={i} className="p-1 text-center">
            <button
              ref={el => (dayRefs.current[day] = el)}
              onKeyDown={handleKeyDown(day)}
              onClick={() => handleSelect(day)}
              aria-selected={selectedDay === day}
              aria-label={`${monthNames[month]} ${day}, ${year}`}
              className="w-8 h-8"
            >
              {day}
            </button>
          </td>
        )
      }
    }
    const rows = []
    for (let r = 0; r < 6; r++) {
      rows.push(<tr key={r}>{cells.slice(r * 7, r * 7 + 7)}</tr>)
    }
    return rows
  }

  /**
   * Renders a date input with an associated label.
   */
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          value={value}
          readOnly
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          {...rest}
        />
        <button type="button" aria-label={`Choose ${label}`} onClick={() => setOpen(true)}>
          📅
        </button>
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow"
            aria-label={`${label} calendar`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={() => handleMonthChange(-1)} aria-label="Previous month">
                ‹
              </button>
              <div>{monthNames[month]} {year}</div>
              <button type="button" onClick={() => handleMonthChange(1)} aria-label="Next month">
                ›
              </button>
            </div>
            <table role="grid" aria-label="Calendar" className="mb-2">
              <thead>
                <tr>
                  {weekDays.map(d => (
                    <th key={d}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderGrid()}</tbody>
            </table>
            <Dialog.Close className="mt-2">Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
