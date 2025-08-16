import reducer, { addEmployee } from './features/employees/employeesSlice'

const initial = { employees: [] }

it('adds an employee to state', () => {
  const employee = { id: '1', firstName: 'John', lastName: 'Doe', department: 'Sales' }
  const state = reducer(initial, addEmployee(employee))
  expect(state.employees).toHaveLength(1)
  expect(state.employees[0].firstName).toBe('John')
})
