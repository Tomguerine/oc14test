import * as Select from '@radix-ui/react-select'

/** Option item for the {@link Dropdown} component */
type Option = { value: string; label: string }

/**
 * Props for the {@link Dropdown} component.
 * @property options - Options rendered in the list
 * @property value - Currently selected value
 * @property onValueChange - Callback when selection changes
 * @property placeholder - Placeholder text when no value is selected
 */
type DropdownProps = {
  options: Option[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

/**
 * Lightweight select component built on Radix UI's Select primitive.
 */
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
