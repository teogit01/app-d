import React from 'react';
import Detail from './../components/detail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageDetail.propTypes = {

// };

const listQuestion = [
    { value: 'ch1', label: 'cau hoi 1 (tu luan)' },
    { value: 'ch2', label: 'cau hoi 2' },
    { value: 'ch3', label: 'cau hoi 3' }
]
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
            <div>
                <Detail listQuestion={listQuestion} />
            </div>

        </div>
    );
}

export default PageDetail;