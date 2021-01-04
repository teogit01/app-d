import React from 'react';
import './feature-cau-hoi.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageMain from 'features/cau-hoi/pages/page.main'

function Index() {
    const match = useRouteMatch()
    return (
        <div className='feature-cauhoi'>
            <Switch>
                <Route path={`${match.url}`} component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default Index;