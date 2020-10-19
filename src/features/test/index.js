import React from 'react';

import Switch from 'react-bootstrap/esm/Switch';
import { Route, useRouteMatch } from 'react-router-dom';

import './test.scss'
import MainPage from './pages/page.main'
import PageAdd from './pages/page.add'

// import PropTypes from 'prop-types';

// TextIndex.propTypes = {

// };

const listTest = [
    { id: '01', name: 'test1' },
    { id: '02', name: 'test1' }
]
function TextIndex(props) {
    const match = useRouteMatch()
    return (
        <div className='wrap-test'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <MainPage listTest={listTest} />} />
                <Route path={`${match.url}/add`} component={() => <PageAdd />} />
            </Switch>
        </div>
    );
}

export default TextIndex;