import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import employeesReducer from '../features/employees/employeesSlice'

const employeesPersistConfig = {
  key: 'employees',
  storage,
}

const persistedEmployeesReducer = persistReducer(employeesPersistConfig, employeesReducer)

export const store = configureStore({
  reducer: {
    employees: persistedEmployeesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
