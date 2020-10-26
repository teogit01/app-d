import { createSlice } from '@reduxjs/toolkit'

const subject = createSlice({
    name: 'Subjects',
    initialState: [],
    reducers: {
        loadSubject: (state, action) => {
            return action.payload
        },
        addSubject: (state, action) => {
            state.push(action.payload)
        },
        removeSubject: (state, action) => {
            return state.filter(subject => subject._id !== action.payload)
        }
    }
})

const { reducer, actions } = subject
export const { loadSubject, addSubject, removeSubject } = actions
export default reducer