import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

Exam.propTypes = {
    exam: PropTypes.object
};

function Exam(props) {
    const { exam } = props
    const history = useHistory()
    const match = useRouteMatch()
    // redirect detail    
    const detail = (_id) => {
        history.push(`${match.url}/detail/${_id}`)
    }
    return (
        <div className='exam'>
            <div className='col-12 row list'>
                <div className='col-1'>#</div>
                <div className='col-2'>{exam.ma}</div>
                <div className='col-2'>mon</div>
                <div className='col-2'>{exam.thoigian} phút</div>
                <div className='col-2'>{exam.namhoc}</div>
                <div className='col-2'>Trạng thái</div>
                <div className='col-1'>
                    <FontAwesomeIcon className='ic-init' icon="eye" onClick={() => detail(exam._id)} />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon className='ic-init' icon="trash" />
                </div>
            </div>
        </div>
    );
}

export default Exam;