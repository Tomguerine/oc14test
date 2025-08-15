document.addEventListener('DOMContentLoaded', () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const table = document.getElementById('employee-table');

    const columns = [
        { title: 'First Name', data: 'firstName' },
        { title: 'Last Name', data: 'lastName' },
        { title: 'Start Date', data: 'startDate' },
        { title: 'Department', data: 'department' },
        { title: 'Date of Birth', data: 'dateOfBirth' },
        { title: 'Street', data: 'street' },
        { title: 'City', data: 'city' },
        { title: 'State', data: 'state' },
        { title: 'Zip Code', data: 'zipCode' },
    ];

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach((col) => {
        const th = document.createElement('th');
        th.textContent = col.title;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    employees.forEach((emp) => {
        const row = document.createElement('tr');
        columns.forEach((col) => {
            const td = document.createElement('td');
            td.textContent = emp[col.data];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
});