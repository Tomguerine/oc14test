import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './employeesSlice.js'

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
})

store.subscribe(() => {
  try {
    const serialized = JSON.stringify(store.getState().employees)
    localStorage.setItem('employees', serialized)
  } catch {
    // ignore write errors
  }
})

export default store
