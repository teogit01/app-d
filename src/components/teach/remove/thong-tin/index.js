import React from 'react';
import './components/css/thong-tin.scss'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import PageMain from './pages/page.main'

function Index() {
    const match = useRouteMatch()
    return (
        <div className='feature-thong-tin'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default Index;