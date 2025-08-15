import reducer, { addEmployee, updateEmployee, removeEmployee } from './employeesSlice'

const initial = []

it('adds an employee to state', () => {
  const employee = { id: '1', firstName: 'John', lastName: 'Doe', department: 'Sales' }
  const state = reducer(initial, addEmployee(employee))
  expect(state).toHaveLength(1)
  expect(state[0].firstName).toBe('John')
})

it('updates an existing employee', () => {
  const start = [{ id: '1', firstName: 'John', lastName: 'Doe', department: 'Sales' }]
  const updated = { id: '1', firstName: 'Johnny', lastName: 'Doe', department: 'Sales' }
  const state = reducer(start, updateEmployee(updated))
  expect(state[0].firstName).toBe('Johnny')
})

it('removes an employee', () => {
  const start = [{ id: '1', firstName: 'John', lastName: 'Doe', department: 'Sales' }]
  const state = reducer(start, removeEmployee('1'))
  expect(state).toHaveLength(0)
})
