import React from 'react';
import './notify.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import PageMain from './pages/page.main'
import PageAdd from './pages/page.add'

function NotifyIndex() {
    const match = useRouteMatch()
    return (
        <div className='wrap-page-notify'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
                <Route path={`${match.url}/add`} component={() => <PageAdd />} />
            </Switch>
        </div>
    );
}

export default NotifyIndex;