# HRnet
Welcome to HRnet! This is our company's internal application to create and view employee records.

## Manual Test Scenarios

- **Dates**: verify leap years and invalid dates (e.g., February 29 on non-leap years) when creating employees.
- **Long names**: enter first and last names over 256 characters to ensure inputs and table cells handle long text.
- **Empty searches**: perform searches with empty or whitespace strings and confirm the table resets without errors.
- **Large datasets**: import or create thousands of employee records to observe performance, pagination, and sorting behavior.

