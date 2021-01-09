import React from 'react';
import './index.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageMain from './pages/page.main'

function AdminIndex() {
    const match = useRouteMatch()
    return (
        <div className="page-admin">
            <Switch>
                <Route path={`${match.url}`} component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default AdminIndex;