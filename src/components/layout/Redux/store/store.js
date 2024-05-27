import { configureStore } from '@reduxjs/toolkit'
import AddUser from '../feature/Searchslice'
export const store = configureStore({
  reducer: {
    app:AddUser
  },
})


