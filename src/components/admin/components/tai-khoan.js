import React from 'react';
import './css/tai-khoan.scss'
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';

Index.propTypes = {

};

function Index(props) {
    const match = useRouteMatch()
    const history = useHistory()
    const _detail = (type) => {
        history.push(`${match.url}/${type}`)
    }
    return (
        <div className='page-taikhoan'>
            <div>
                <h5><i>Quản lí tài khoản</i></h5>
            </div>
            <hr />

            <div className='taikhoan-content'>
                <div className='taikhoan-main'>
                    <div className='taikhoan-gv'>
                        <div
                            onClick={() => { _detail('giao-vien') }}
                        >
                            <p>Loại người dùng: Giáo viên</p>
                            <p>Tổng số tài khoản: 40</p>
                            <p>Tài khoản đang hoạt động: 20</p>
                        </div>
                    </div>
                    <div className='taikhoan-sv'
                        onClick={() => { _detail('sinh-vien') }}
                    >

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;