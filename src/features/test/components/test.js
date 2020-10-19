import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Test.propTypes = {
    test: PropTypes.object
};

function Test(props) {
    const { test } = props
    return (
        <div className=''>
            <div className='col-12 row list'>
                <div className='col-0'>#</div>
                <div className='col'>Lớp</div>
                <div className='col'>{test.name}</div>
                <div className='col'>Thời gian</div>
                <div className='col'>Ngày thi</div>
                <div className='col'>Bắt đầu</div>
                <div className='col'>Trạng thái</div>
                <div className='col'>Năm học</div>
                <div className='col'>
                    <FontAwesomeIcon className='ic-init' icon="eye" />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon className='ic-init' icon="trash" />
                </div>
            </div>
        </div>
    );
}

export default Test;