import React from 'react';
import './feature-nhom.scss'
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import PageMain from './pages/page.main'

Index.propTypes = {

};

function Index(props) {
    const match = useRouteMatch()
    return (
        <div className='feature-nhom'>
            <Switch>
                <Route path={`${match.url}`} component={() => <PageMain />} />
            </Switch>
        </div>
    );
}

export default Index;