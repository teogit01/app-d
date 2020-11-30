import React from 'react';
import './components/css/feautre-cau-hoi.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageMain from './pages/page.main'
import PropTypes from 'prop-types';

Index.propTypes = {

};

function Index(props) {
    const match = useRouteMatch()
    return (
        <div className='page-cau-hoi'>
            <Switch>
                <Route path={`${match.url}`} component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default Index;