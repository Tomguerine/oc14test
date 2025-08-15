# HRnet

Welcome to HRnet! This is our company's internal application to create and view employee records.

## Accessibility testing

- Keyboard navigation was exercised across pages to confirm a logical focus order.
- ARIA roles and labels were reviewed and adjusted where necessary.
- Color contrast of interactive elements meets or exceeds the 4.5:1 ratio.
- An attempt was made to run automated `axe` checks, but the CLI package could not be installed in this environment.

Dynamic content such as form errors, modal open/close actions and date changes now announce updates through `aria-live` regions.

## Development

All application code lives in the `hrnet-react` directory and is written in TypeScript.

### Install

```bash
cd hrnet-react
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Test

```bash
npm run lint
```

=======
# HRnet React

## Manual Test Scenarios

- **Dates**: verify leap years and invalid dates (e.g., February 29 on non-leap years) when creating employees.
- **Long names**: enter first and last names over 256 characters to ensure inputs and table cells handle long text.
- **Empty searches**: perform searches with empty or whitespace strings and confirm the table resets without errors.
- **Large datasets**: import or create thousands of employee records to observe performance, pagination, and sorting behavior.

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
