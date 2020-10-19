import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Test from '../components/test'
import { useRouteMatch, useHistory } from 'react-router-dom';
MainPage.propTypes = {
    listTest: PropTypes.array
};

function MainPage(props) {
    const { listTest } = props
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
                <div className='col'>Lớp</div>
                <div className='col'>Môn</div>
                <div className='col'>Thời gian</div>
                <div className='col'>Ngày thi</div>
                <div className='col'>Bắt đầu</div>
                <div className='col'>Trạng thái</div>
                <div className='col'>Năm học</div>
                <div className='col'>Action</div>
            </div>


            {
                listTest.map(item => {
                    return <Test test={item} />
                })
            }


        </div>
    );
}

export default MainPage;