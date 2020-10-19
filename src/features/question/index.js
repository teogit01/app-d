import React from 'react';
import './question.scss'

import MainPage from './pages/page.main'
import AddPage from './pages/page.add'
import PageDetail from './pages/page.detail'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
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
    return (
        <div className='wrap-question'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <MainPage listQuestion={listQuestion} />} />
                <Route path={`${match.url}/add`} component={AddPage} />
                <Route path={`${match.url}/detail/:_id`} component={PageDetail} />
            </Switch>
        </div>
    );
}

export default QuestionIndex;