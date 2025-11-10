import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectU: null,
}

export const selectUserSlice = createSlice({
    name: 'selectUserInfo',
    initialState,
    reducers: {
        selectU: (state, action) => {
            state.selectU = action.payload
        },
    },
})

export const { selectU } = selectUserSlice.actions

export default selectUserSlice.reducer