import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import PageMain from './pages/page.main'

function Index(props) {
    const match = useRouteMatch()
    console.log('d', match)
    return (
        <div className='feature-de-thi'>

            <Switch>
                <Route path={`${match.url}`} exac component={() => <PageMain />} />
                {/* <Route path={`${match.url}`} exac component={() => <PageMain />} /> */}
            </Switch>
        </div>
    );
}

export default Index;