import { useState } from 'react'
import * as Select from '@radix-ui/react-select'

type Option = { value: string; label: string }

type DropdownProps = {
  id: string
  label: string
  options: Option[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

function Dropdown({ id, label, options, value, onValueChange, placeholder }: DropdownProps) {
  const [live, setLive] = useState('')
  return (
    <div>
      <label id={`${id}-label`} htmlFor={`${id}-trigger`}>
        {label}
      </label>
      <Select.Root
        value={value}
        onValueChange={v => {
          onValueChange?.(v)
          setLive(`${label} ${v} selected`)
        }}
        onOpenChange={o => setLive(o ? `${label} menu opened` : `${label} menu closed`)}
      >
        <Select.Trigger
          id={`${id}-trigger`}
          className="inline-flex items-center justify-between gap-1 border px-2 py-1"
          aria-labelledby={`${id}-label`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>▾</Select.Icon>
        </Select.Trigger>
        <Select.Content className="bg-white border shadow" role="listbox">
          <Select.Viewport>
            {options.map(option => (
              <Select.Item key={option.value} value={option.value} className="px-2 py-1">
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
      <div id={`${id}-live`} aria-live="polite" className="sr-only">
        {live}
      </div>
    </div>
  )
}

export { Dropdown }
export default Dropdown
