import { createSlice, nanoid } from '@reduxjs/toolkit'

/**
 * @typedef {Object} Employee
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} department
 * @property {string} [startDate]
 * @property {string} [dateOfBirth]
 */

const loadEmployees = () => {
  try {
    const serialized = localStorage.getItem('employees')
    if (!serialized) return []
    return JSON.parse(serialized)
  } catch {
    return []
  }
}

const initialState = { list: loadEmployees() }

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: {
      reducer(state, action) {
        state.list.push(action.payload)
      },
      prepare(employee) {
        return { payload: { id: nanoid(), ...employee } }
      },
    },
    updateEmployee(state, action) {
      const index = state.list.findIndex(e => e.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    removeEmployee(state, action) {
      state.list = state.list.filter(e => e.id !== action.payload)
    },
  },
})

export const { addEmployee, updateEmployee, removeEmployee } = employeesSlice.actions
export default employeesSlice.reducer
