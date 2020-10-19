import React from 'react';

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
    const redirect = () => {
        history.push(`${match.url}/add`)
    }
    return (
        <div className='wrap-main'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={redirect} />
            </div>
            <div className='col-12 head row list'>
                <div className='col-1'>#</div>
                <div className='col-2'>Mã</div>
                <div className='col-3'>Tên</div>
                <div className='col-4'>Nội dung</div>
                <div className='col-1'>Action</div>
            </div>
            {
                listQuestion.map(item => {
                    return <Question key={item._id} question={item} />
                })
            }

        </div>
    );
}

export default MainPage;