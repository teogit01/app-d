import React from 'react';

import MenuLeft from 'components/admin/menu-left'
import Header from 'components/admin/header'
import Content from 'components/admin/content'
import { useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';

// AdminIndex.propTypes = {

// };

function AdminIndex(props) {
    const match = useRouteMatch()
    return (
        <div className="admin">
            <div className='admin__menu'>
                <MenuLeft />
            </div>

            {/*-------------------------------------*/}

            <div className='admin__main'>
                {/* content of menu */}

                <div className='content'>
                    <Header />

                    <Content match={match} />

                </div>
            </div>

        </div>
    );
}

export default AdminIndex;