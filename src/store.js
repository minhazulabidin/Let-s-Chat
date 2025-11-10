import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import MessageSlice from './Slices/messageSlice'
import selectUserSlice  from './Slices/selectUser'

export const store = configureStore({
  reducer: {
    userSlice,
    MessageSlice,
    selectUserSlice
  },
})