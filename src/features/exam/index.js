import React from 'react';
import './exam.scss'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MainPage from './pages/page.main'
import AddPage from './pages/page.add'
import Detail from './pages/page.detail'
// import callApi from 'api/apiCaller';
//import { useDispatch, useSelector } from 'react-redux';
//import { loadExam } from './examSlice'

//import PropTypes from 'prop-types';

// ExamIndex.propTypes = {

// };

function ExamIndex() {
    const match = useRouteMatch()
    //const dispatch = useDispatch()        
    return (
        <div className='wrap-exam'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <MainPage />} />
                <Route path={`${match.url}/add`} component={AddPage} />
                <Route path={`${match.url}/detail/:_id`} component={Detail} />
            </Switch>
        </div>
    );
}

export default ExamIndex;