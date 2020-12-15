import React from 'react';
import './components/css/thi.scss'
import PageMain from './pages/page.main'
import { Switch, Route, useRouteMatch } from 'react-router-dom';

function Index() {
    const match = useRouteMatch()
    return (
        <div className='feature-thi'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default Index;