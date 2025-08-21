import type { Employee } from './employeesSlice'

export const seedEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    street: '123 Elm St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    department: 'Sales',
    startDate: '2020-01-01',
    dateOfBirth: '1990-01-01',
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    street: '456 Oak Ave',
    city: 'Shelbyville',
    state: 'IL',
    zipCode: '62565',
    department: 'Engineering',
    startDate: '2019-03-15',
    dateOfBirth: '1988-07-22',
  },
]
