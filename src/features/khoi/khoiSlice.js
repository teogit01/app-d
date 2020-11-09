import { createSlice } from '@reduxjs/toolkit'

const khoi = createSlice({
    name: 'Khoi',
    initialState: [],
    reducers: {
        loadKhoi: (state, action) => {
            return action.payload
        },
        addKhoi: (state, action) => {
            state.push(action.payload)
        },
        removeKhoi: (state, action) => {
            return state.filter(khoi => khoi._id !== action.payload)
        }
    }
})

const { reducer, actions } = khoi
export const { loadKhoi, addKhoi, removeKhoi } = actions
export default reducer