import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Employee {
  id: number
  [key: string]: any
}

const initialState: Employee[] = []

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.push(action.payload)
    },
  },
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
