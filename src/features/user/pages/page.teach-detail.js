import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TeachDetail from './../components/teach-detail'
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageTeachDetail.propTypes = {

// };

function PageTeachDetail(props) {
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (
        <div className='page-teach-detail'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <TeachDetail />
        </div>
    );
}

export default PageTeachDetail;