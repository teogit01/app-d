import React from 'react';
import Detail from './../components/detail.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageDetail.propTypes = {

// };

function PageDetail(props) {
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (
        <div className='page-detail'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <Detail />
        </div>
    );
}

export default PageDetail;