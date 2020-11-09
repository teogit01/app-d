import { createSlice } from '@reduxjs/toolkit'

const exam = createSlice({
    name: 'Subjects',
    initialState: [],
    reducers: {
        loadExam: (state, action) => {
            return action.payload
        },
        addExam: (state, action) => {
            state.push(action.payload)
        },
        removeExam: (state, action) => {
            return state.filter(exam => exam._id !== action.payload)
        }
    }
})

const { reducer, actions } = exam
export const { loadExam, addExam, removeExam } = actions
export default reducer