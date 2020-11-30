import { createSlice } from '@reduxjs/toolkit'

const login = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        loadUser: (state, action) => {
            return action.payload
        },
        addUser: (state, action) => {
            return action.payload
        }
    }
})

const { reducer, actions } = login
export const { loadUser, addUser } = actions
export default reducer