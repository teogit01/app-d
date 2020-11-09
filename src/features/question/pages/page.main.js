import React, { useState } from 'react';

import Question from '../components/question'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';

MainPage.propTypes = {
    listQuestion: PropTypes.array
};

MainPage.defaultProps = {
    listQuestion: []
}

function MainPage(props) {
    const { listQuestion } = props
    const match = useRouteMatch()
    const history = useHistory()
    const [questions, setQuestions] = useState(listQuestion)

    const redirect = () => {
        history.push(`${match.url}/add`)
    }
    const handleRemove = (_id) => {
        let newQuestions = questions.filter(item => item._id != _id)
        setQuestions(newQuestions)
    }
    return (
        <div className='wrap-main'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={redirect} />
            </div>
            <div className='col-12 head row list'>
                <div className='col-1'>#</div>
                <div className='col-3'>Tên</div>
                <div className='col-2'>Môn</div>
                <div className='col-4'>Nội dung</div>
                <div className='col-1'>Action</div>
            </div>
            {
                questions.map(item => {
                    return <Question key={item._id} question={item} remove={handleRemove} />
                })
            }

        </div>
    );
}

export default MainPage;