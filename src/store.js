import { configureStore } from '@reduxjs/toolkit'
import classReducer from 'features/_class/classSlice'
import subjectReducer from 'features/subject/subjectSlice'
import khoiReducer from 'features/khoi/khoiSlice'
import questionReducer from 'features/question/questionSlice'
import examReducer from 'features/exam/examSlice'
import userlogin from 'components/userSlice'

const rootReducer = {
    _class: classReducer,
    subjects: subjectReducer,
    khoi: khoiReducer,
    questions: questionReducer,
    exams: examReducer,
    userLogin: userlogin
}

const store = configureStore({
    reducer: rootReducer
})

export default store