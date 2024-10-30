import { configureStore } from '@reduxjs/toolkit'
import exerciseReducer from "../feature/exercise/exerciseSlice"

export const store = configureStore({
  reducer: {
    exercise: exerciseReducer,
  },
})