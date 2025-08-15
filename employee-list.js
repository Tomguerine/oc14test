document.addEventListener('DOMContentLoaded', function () {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const table = document.getElementById('employee-table');

    const columns = [
        { title: 'First Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        { title: 'Start Date', key: 'startDate' },
        { title: 'Department', key: 'department' },
        { title: 'Date of Birth', key: 'dateOfBirth' },
        { title: 'Street', key: 'street' },
        { title: 'City', key: 'city' },
        { title: 'State', key: 'state' },
        { title: 'Zip Code', key: 'zipCode' }
    ];

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach(function (col) {
        const th = document.createElement('th');
        th.textContent = col.title;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    employees.forEach(function (emp) {
        const row = document.createElement('tr');
        columns.forEach(function (col) {
            const td = document.createElement('td');
            td.textContent = emp[col.key];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
});

