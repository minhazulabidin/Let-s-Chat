import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        userInfo: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { userInfo } = userSlice.actions

export default userSlice.reducer