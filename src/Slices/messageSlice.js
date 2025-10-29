import { createSlice } from '@reduxjs/toolkit'
import Message from './../Pages/Message';

const initialState = {
    user: null,
}

export const messageSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        selectUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { selectUser } = messageSlice.actions

export default messageSlice.reducer