import * as Select from '@radix-ui/react-select'

type Option = { value: string; label: string }

type DropdownProps = {
  options: Option[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

function Dropdown({ options, value, onValueChange, placeholder }: DropdownProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between gap-1 border px-2 py-1">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>▾</Select.Icon>
      </Select.Trigger>
      <Select.Content className="bg-white border shadow">
        <Select.Viewport>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value} className="px-2 py-1">
              <Select.ItemText>{option.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}

export { Dropdown }
export default Dropdown
