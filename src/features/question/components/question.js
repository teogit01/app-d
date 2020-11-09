import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useRouteMatch } from 'react-router-dom';

import callApi from 'api/apiCaller'

Question.propTypes = {
    question: PropTypes.object, // detail question

    remove: PropTypes.func
};

function Question(props) {
    const { question, remove } = props
    const history = useHistory()
    const match = useRouteMatch()
    // detail
    const detail = (_id) => {
        history.push(`${match.url}/detail/${_id}`)
    }
    const handleRemove = (_id) => {
        //callApi
        callApi(`cauhoi/${_id}`, 'DELETE', null).then(() => {
            if (remove) {
                remove(_id)
            }
        })
    }
    return (
        <div className='question'>
            <div className='col-12 row list'>
                <div className='col-1'>#</div>
                <div className='col-3'>{question.tieude}</div>
                <div className='col-2'>{question.mon.ten}</div>
                <div className='col-4'>{question.noidung}</div>
                <div className='col-1'>
                    <FontAwesomeIcon className='ic-init' icon="eye"
                        onClick={() => detail(question._id)}
                    />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon className='ic-init' icon="eraser" onClick={() => handleRemove(question._id)} />
                </div>
            </div>
        </div>
    );
}

export default Question;