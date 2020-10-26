import { configureStore } from '@reduxjs/toolkit'
import classReducer from 'features/_class/classSlice'
import subjectReducer from 'features/subject/subjectSlice'

const rootReducer = {
    _class: classReducer,
    subjects: subjectReducer

}

const store = configureStore({
    reducer: rootReducer
})

export default store