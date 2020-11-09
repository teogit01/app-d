import { createSlice } from '@reduxjs/toolkit'

const question = createSlice({
    name: 'Subjects',
    initialState: [],
    reducers: {
        loadQuestion: (state, action) => {
            return action.payload
        },
        addQuestion: (state, action) => {
            state.push(action.payload)
        },
        removeQuestion: (state, action) => {
            return state.filter(question => question._id !== action.payload)
        }
    }
})

const { reducer, actions } = question
export const { loadQuestion, addQuestion, removeQuestion } = actions
export default reducer