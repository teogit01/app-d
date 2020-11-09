import React, { useEffect } from 'react';
import callApi from 'api/apiCaller'
// import PropTypes from 'prop-types';

// ClassIndex.propTypes = {

// };
import './_class.scss'

import PageMain from './pages/page.main'
import PageDetail from './pages/page.detail'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
function ClassIndex(props) {
    const match = useRouteMatch()
    return (
        <div className='wrap-class'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
                <Route path={`${match.url}/detail/:id`} component={() => <PageDetail />} />
            </Switch>
        </div>
    );
}

export default ClassIndex;