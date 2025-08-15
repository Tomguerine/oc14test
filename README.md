# HRnet React

This repository hosts the React implementation of HRnet. The legacy jQuery version has been removed in favour of a modern component based architecture.

## Plugin Package

Reusable UI pieces are published via the `hrnet-react` plugin package (available in the `hrnet-react` directory). Install it in other projects with:

```
npm install hrnet-react
```

The package exposes the following components:

### `<Dropdown />`
| Prop | Type | Description |
| --- | --- | --- |
| `options` | `{ value: string; label: string }[]` | Options displayed in the list |
| `value` | `string` | Currently selected value |
| `onValueChange` | `(value: string) => void` | Callback triggered when selection changes |
| `placeholder` | `string` | Placeholder text when no value selected |

### `<DatePicker />`
| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Label shown next to the input |
| `id` | `string` | Unique identifier for the input |
| `...rest` | `InputHTMLAttributes<HTMLInputElement>` | Any other `<input>` props are forwarded |

### `<Modal />`
| Prop | Type | Description |
| --- | --- | --- |
| `trigger` | `ReactNode` | Element that opens the modal when clicked |
| `title` | `ReactNode` | Optional heading displayed at the top |
| `children` | `ReactNode` | Modal content |
| `open` | `boolean` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | Called whenever open state changes |

### `<DataTable />`
| Prop | Type | Description |
| --- | --- | --- |
| `columns` | `ColumnDef<T, any>[]` | Column definitions |
| `data` | `T[]` | Row data |

## Migration Notes

- The former jQuery implementation has been removed.
- React components power all UI features using modern libraries such as Vite, Radix UI and TanStack Table.
- Reports comparing performance before and after the migration, as well as test outputs, are available in [`docs/`](docs/).
