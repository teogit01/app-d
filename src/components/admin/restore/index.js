import React from 'react';

import { BrowserRouter as Router, useRouteMatch } from 'react-router-dom'

import MenuLeft from 'admin/components/commons/MenuLeft';
import RouteOfMenu from 'admin/components/commons/RouteOfMenu';

function Main() {
    let match = useRouteMatch()
    return (
        <Router>

            <div className="admin">

                <div className='admin__menu'>
                    {/* <MenuLeft /> */}
                </div>

                {/*-------------------------------------*/}

                <div className='admin__main'>
                    {/* content of menu */}

                    <div className='content'>

                        {/* <RouteOfMenu match={match} /> */}

                    </div>
                </div>

            </div>

        </Router>
    );
}

export default Main;
