import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const match = useRouteMatch()
    const history = useHistory()
    const redirect = (param) => {
        history.push(`${match.url}/${param}`)
    }

    return (
        <div className='page-main'>
            <div className='tai-khoan-gv' onClick={() => redirect('giao-vien')}>
                Giáo viên
            </div>

            <div className='tai-khoan-sv' onClick={() => redirect('sinh-vien')}>
                Sinh viên
            </div>
        </div>
    );
}

export default PageMain;