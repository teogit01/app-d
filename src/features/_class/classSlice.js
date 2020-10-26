import { createSlice } from '@reduxjs/toolkit'

const _class = createSlice({
    name: '_classes',
    initialState: [],
    reducers: {
        loadClass: (state, action) => {
            return action.payload
        },
        addClass: (state, action) => {
            state.push(action.payload)
        },
        removeClass: (state, action) => {
            return state.filter(_class => _class._id !== action.payload)
        }
    }
})

const { reducer, actions } = _class
export const { loadBranch, addBranch, removeBranch } = actions
export default reducer