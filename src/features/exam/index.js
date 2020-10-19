import React from 'react';
import './exam.scss'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MainPage from './pages/page.main'
import AddPage from './pages/page.add'
import Detail from './pages/page.detail'

//import PropTypes from 'prop-types';

// ExamIndex.propTypes = {

// };


const listExam = [
    { id: '01', code: 'MD01', subject: 'Toán', course: '2019-2020', time: '15 phút' },
    { id: '02', code: 'MD01', subject: 'Toán', course: '2019-2020', time: '15 phút' },
    { id: '03', code: 'MD01', subject: 'Toán', course: '2019-2020', time: '15 phút' },
    { id: '04', code: 'MD01', subject: 'Toán', course: '2019-2020', time: '15 phút' }
]
function ExamIndex(props) {
    const match = useRouteMatch()
    return (
        <div className='wrap-exam'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <MainPage listExam={listExam} />} />
                <Route path={`${match.url}/add`} component={AddPage} />
                <Route path={`${match.url}/detail/:_id`} component={Detail} />
            </Switch>
        </div>
    );
}

export default ExamIndex;