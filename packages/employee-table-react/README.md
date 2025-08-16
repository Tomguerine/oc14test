# employee-table-react

A collection of reusable React components for HRnet, including an employee table and form widgets.

## Installation

```bash
npm install employee-table-react
# or
yarn add employee-table-react
```

## Components

- `EmployeeTable` – display employees in a table.
- `Dropdown` – select options from a list.
- `DatePicker` – choose dates.
- `Modal` – render content in a dialog.
- `DataTable` – generic table for arbitrary data.

## Usage

```jsx
import React from 'react';
import { EmployeeTable } from 'employee-table-react';

const employees = [
  { id: 1, firstName: 'John', lastName: 'Doe', department: 'Sales' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', department: 'HR' }
];

export default function App() {
  return <EmployeeTable employees={employees} />;
}
```

## Publishing

This package can be published to npm using:

```bash
npm publish
```

Make sure you are logged in with the correct npm account.
