import React, { useEffect } from 'react';
import callApi from 'api/apiCaller'
// import PropTypes from 'prop-types';

// ClassIndex.propTypes = {

// };
import './_class.scss'

import PageMain from './pages/page.main'
function ClassIndex(props) {

    return (
        <div className='wrap-class'>
            <PageMain />
        </div>
    );
}

export default ClassIndex;