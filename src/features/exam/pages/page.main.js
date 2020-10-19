import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouteMatch, useHistory } from 'react-router-dom';

import Exam from './../components/exam'
import PropTypes from 'prop-types';

MainPage.propTypes = {
    listExam: PropTypes.array
};

function MainPage(props) {
    const { listExam } = props
    const match = useRouteMatch()
    const history = useHistory()
    const redirect = () => {
        history.push(`${match.url}/add`)
    }
    return (
        <div className='page-main'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={redirect} />
            </div>
            <div className='col-12 head row list'>
                <div className='col-0'>#</div>
                <div className='col'>Mã</div>
                <div className='col'>Môn</div>
                <div className='col'>Thời gian</div>
                <div className='col'>Kì thi</div>
                <div className='col'>Năm học</div>
                <div className='col'>Trạng thái</div>
                <div className='col'>Action</div>
            </div>

            {
                listExam.map(item => {
                    return <Exam exam={item} key={item.id} />
                })
            }

        </div>
    );
}

export default MainPage;