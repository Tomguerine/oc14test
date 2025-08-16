import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/** Representation of an employee record */
export interface Employee {
  /** Unique identifier */
  id: string
  /** Employee's first name */
  firstName: string
  /** Employee's last name */
  lastName: string
  /** Department within the organisation */
  department: string
  /** Employment start date */
  startDate?: string
  /** Date of birth */
  dateOfBirth?: string
}

/** State structure for the employees slice */
export interface EmployeesState {
  /** Collection of all employees */
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
    addEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newEmployee: Employee = { id: crypto.randomUUID(), ...action.payload }
      state.employees.push(newEmployee)
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
  },
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
