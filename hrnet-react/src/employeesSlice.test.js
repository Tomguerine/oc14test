import reducer, { addEmployee } from './features/employees/employeesSlice'

const initial = { employees: [] }

it('adds an employee to state with a generated id', () => {
  const employee = { firstName: 'John', lastName: 'Doe', department: 'Sales' }
  const state = reducer(initial, addEmployee(employee))
  expect(state.employees).toHaveLength(1)
  expect(state.employees[0]).toMatchObject({
    firstName: 'John',
    lastName: 'Doe',
    department: 'Sales',
    id: expect.any(String),
  })
})
