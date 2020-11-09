import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Test.propTypes = {
    test: PropTypes.object
};

function Test(props) {
    const { test } = props
    console.log(test)
    return (
        <div className=''>
            <div className='col-12 row list'>
                <div className='col-0'>#</div>
                <div className='col'>{test.dethi.mon.ten}</div>
                <div className='col'>{test.dethi.thoigian}phút</div>
                <div className='col'>{test.ngaythi}</div>
                <div className='col'>{test.batdau}</div>
                <div className='col'>{test.ketthuc}</div>
                <div className='col'>{test.trangthai}</div>
                <div className='col'>{test.hocki}</div>
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