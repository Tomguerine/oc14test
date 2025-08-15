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

const employeesSlice = createSlice({
  name: 'employees',
  initialState: loadEmployees(),
  reducers: {
    addEmployee: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(employee) {
        return { payload: { id: nanoid(), ...employee } }
      },
    },
    updateEmployee(state, action) {
      const index = state.findIndex(e => e.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removeEmployee(state, action) {
      return state.filter(e => e.id !== action.payload)
    },
  },
})

export const { addEmployee, updateEmployee, removeEmployee } = employeesSlice.actions
export default employeesSlice.reducer
