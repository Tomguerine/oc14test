import React from 'react';

export default function EmployeeTable({ employees = [] }) {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id || `${e.firstName}-${e.lastName}`}>
            <td>{e.firstName}</td>
            <td>{e.lastName}</td>
            <td>{e.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
