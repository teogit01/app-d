import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const history = useHistory()
    const match = useRouteMatch()
    const redirect = (user) => {
        history.push(`${match.url}/${user}`)
    }
    return (
        <div className='page-main'>
            <div className='gv' onClick={() => redirect('teach')} >
                Giáo Viên
            </div>
            <div className='sv' onClick={() => redirect('student')} >
                Sinh Viên
            </div>
        </div >
    );
}

export default PageMain;