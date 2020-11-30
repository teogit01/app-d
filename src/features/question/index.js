import React, { useEffect, useState } from 'react';
import './question.scss'

import MainPage from './pages/page.main'
import AddPage from './pages/page.add'
import PageDetail from './pages/page.detail'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import callApi from 'api/apiCaller';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuestion } from './questionSlice';
import { loadSubject } from 'features/subject/subjectSlice';
// import PropTypes from 'prop-types';

// QuestionIndex.propTypes = {

// };

const listQuestion = [
    { _id: '01', name: 'cau hoi 1' },
    { _id: '02', name: 'cau hoi 2' },
    { _id: '03', name: 'cau hoi 3' },
]
function QuestionIndex(props) {
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        const LoadQuestion = async () => {
            let data = await callApi('cau-hoi')
            setQuestions(data.data)
            //dispatch(loadQuestion(data.data))
        }
        const LoadSubject = async () => {
            let data = await callApi('mon')
            dispatch(loadSubject(data.data))
        }
        LoadQuestion()
        LoadSubject()
    }, [])
    const subject_s = useSelector(state => state.subjects)
    let optionsSubject = []
    if (subject_s) {
        subject_s.map(item => {
            optionsSubject.push({ value: item._id, label: item.ten })
        })
    }

    // handle add
    const handleAdd = (question) => {
        //let newQuestion = questions
        //newQuestion.push(question)
        setQuestions(question)
    }
    return (
        <div className='wrap-question'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <MainPage listQuestion={questions} />} />
                <Route path={`${match.url}/add`} component={() => <AddPage optionsSubject={optionsSubject} add={handleAdd} />} />
                <Route path={`${match.url}/detail/:_id`} component={PageDetail} />
            </Switch>
        </div>
    );
}

export default QuestionIndex;