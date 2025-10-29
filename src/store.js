import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import MessageSlice from './Slices/messageSlice'

export const store = configureStore({
  reducer: {
    userSlice,
    MessageSlice,
  },
})