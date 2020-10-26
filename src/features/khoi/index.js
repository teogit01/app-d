import React from 'react';
import './khoi.scss'

import PageMain from './pages/page.main.js'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';

// KhoiIndex.propTypes = {

// };

function KhoiIndex(props) {
    const match = useRouteMatch()
    return (
        <div className='wrap-page-khoi'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default KhoiIndex;