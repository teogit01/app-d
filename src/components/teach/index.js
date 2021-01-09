import React from 'react';
import './index.scss'
import { Switch, useRouteMatch, Route } from 'react-router-dom';

import PageMain from './pages/page.main'

function Index(props) {
    const match = useRouteMatch()
    return (
        <div className='page-teacher'>
            <Switch>
                <Route path={`${match.url}`} component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default Index;