# employee-table-react

A small React component for displaying employees in a table.

## Installation

```bash
npm install employee-table-react
# or
yarn add employee-table-react
```

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
