import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Employee {
  id: number
  [key: string]: any
}

interface EmployeesState {
  list: Employee[]
}

const initialState: EmployeesState = { list: [] }

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.list.push(action.payload)
    },
  },
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
