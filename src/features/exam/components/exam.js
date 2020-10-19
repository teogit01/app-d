import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Exam.propTypes = {

// };

function Exam(props) {
    const history = useHistory()
    const match = useRouteMatch()
    const { exam } = props
    // redirect detail    
    const detail = (_id) => {
        history.push(`${match.url}/detail/${_id}`)
    }
    return (
        <div className='exam'>
            <div className='col-12 row list'>
                <div className='col-0'>#</div>
                <div className='col'>{exam.code}</div>
                <div className='col'>{exam.subject}</div>
                <div className='col'>{exam.time}</div>
                <div className='col'>{exam.course}</div>
                <div className='col'>{exam.course}</div>
                <div className='col'>0</div>
                <div className='col'>
                    <FontAwesomeIcon className='ic-init' icon="eye" onClick={() => detail(exam.id)} />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon className='ic-init' icon="trash" />
                </div>
            </div>
        </div>
    );
}

export default Exam;