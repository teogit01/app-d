import React from 'react';

import './user.scss'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PageMain from './pages/page.main'
import PageTeach from './pages/page.teach.js'
import PageTeachDetail from './pages/page.teach-detail.js'

import PageStudent from './pages/page.student'
import PageStudentDetail from './pages/page.student-detail'

// import PropTypes from 'prop-types';

// UserIndex.propTypes = {

// };

const listTeach = [
    { _id: 'id1', code: 'ma', name: 'giao vien 1' },
    { _id: 'id2', code: 'ma', name: 'giao vien 2' },
    { _id: 'id3', code: 'ma', name: 'giao vien 3' },
    { _id: 'id4', code: 'ma', name: 'giao vien 4' },
    { _id: 'id5', code: 'ma', name: 'giao vien 5' },
]
const listStudent = [
    { _id: 'id1', code: 'ma', name: 'giao vien 1' },
    { _id: 'id2', code: 'ma', name: 'giao vien 2' },
    { _id: 'id3', code: 'ma', name: 'giao vien 3' },
    { _id: 'id4', code: 'ma', name: 'giao vien 4' },
    { _id: 'id5', code: 'ma', name: 'giao vien 5' },
]
function UserIndex(props) {
    const match = useRouteMatch()
    return (
        <div className='wrap-user'>
            <div>

            </div>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
                <Route path={`${match.url}/teach`} exact component={() => <PageTeach listTeach={listTeach} />} />
                <Route path={`${match.url}/teach/:_id`} component={() => <PageTeachDetail />} />

                <Route path={`${match.url}/student`} exact component={() => <PageStudent listStudent={listStudent} />} />
                <Route path={`${match.url}/student/:_id`} component={() => <PageStudentDetail />} />
            </Switch>
        </div>
    );
}

export default UserIndex;