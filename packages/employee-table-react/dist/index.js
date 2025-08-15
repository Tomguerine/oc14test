import React from 'react';

function EmployeeTable({ employees = [] }) {
  return React.createElement(
    "table",
    { className: "employee-table" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement("th", null, "First Name"),
        React.createElement("th", null, "Last Name"),
        React.createElement("th", null, "Department")
      )
    ),
    React.createElement(
      "tbody",
      null,
      employees.map((e) =>
        React.createElement(
          "tr",
          { key: e.id || `${e.firstName}-${e.lastName}` },
          React.createElement("td", null, e.firstName),
          React.createElement("td", null, e.lastName),
          React.createElement("td", null, e.department)
        )
      )
    )
  );
}

export { EmployeeTable };
export default EmployeeTable;
