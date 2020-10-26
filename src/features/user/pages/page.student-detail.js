import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StudentDetail from './../components/student-detail'
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageStudentDetail.propTypes = {

// };

function PageStudentDetail(props) {
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (
        <div className='page-student-detail'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <StudentDetail />
        </div>
    );
}

export default PageStudentDetail;