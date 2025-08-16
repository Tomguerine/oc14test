# HRNet React

## Project overview and purpose
HRNet React is the front-end for the company's internal HR management tool. It lets users create and view employee records using a modern React + Vite stack. The project showcases type-safe state management, accessible UI primitives, and modular components.

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Testing
```bash
npm test
```

## Notes
### Global state management
State is centralised with [Redux Toolkit](https://redux-toolkit.js.org/). The store lives in `src/app/store.ts` and uses `redux-persist` to retain data across sessions.

### Accessibility
UI components leverage [Radix UI](https://www.radix-ui.com/) and semantic HTML to ensure keyboard and screen reader support. Dynamic content updates announce through `aria-live` regions.

### Component usage
Employee data is displayed with the `<EmployeeTable />` component provided by an external package.

## External component package
The table component is maintained separately in [`packages/employee-table-react`](../packages/employee-table-react) and published to npm as [`employee-table-react`](https://www.npmjs.com/package/employee-table-react).
