import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useRouteMatch } from 'react-router-dom';

Question.propTypes = {
    question: PropTypes.object // detail question
};
Question.defaultProps = {
    question: {}
}

function Question(props) {
    const { question } = props
    const history = useHistory()
    const match = useRouteMatch()
    // detail
    const detail = (_id) => {
        history.push(`${match.url}/detail/${_id}`)
    }
    return (
        <div className='question'>
            <div className='col-12 row list'>
                <div className='col-1'>#</div>
                <div className='col-2'>Mã</div>
                <div className='col-3'>Tên</div>
                <div className='col-4'>Nội dung</div>
                <div className='col-1'>
                    <FontAwesomeIcon className='ic-init' icon="eye"
                        onClick={() => detail(question._id)}
                    />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon className='ic-init' icon="eraser" />
                </div>
            </div>
        </div>
    );
}

export default Question;