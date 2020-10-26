import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';

import Student from './../components/student'

PageStudent.propTypes = {
    listStudent: PropTypes.array
};

function PageStudent(props) {
    const { listStudent } = props
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (
        <div className='page-student'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <div className='list-teach'>
                {
                    listStudent.map(student => {
                        return (
                            <Student student={student} key={student._id} />
                        )
                    })
                }
            </div>

        </div>
    );
}

export default PageStudent;