import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  department: string
  startDate?: string
  dateOfBirth?: string
}

export interface EmployeesState {
  employees: Employee[]
}

const storedEmployees = localStorage.getItem('employees')
const initialState: EmployeesState = {
  employees: storedEmployees ? JSON.parse(storedEmployees) : [],
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload)
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
  },
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
