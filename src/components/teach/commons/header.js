import React, { useState } from 'react';
import './css/header.scss'
import { useRouteMatch, NavLink, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

// Header.propTypes = {

// };

const datas = [
    { name: 'Trang chủ', to: '/teacher/trang-chu', exact: true },
    { name: 'Đề thi', to: '/teacher/de-thi', exact: false },
    { name: 'Câu hỏi', to: '/teacher/cau-hoi', exact: false },
    { name: 'Kì thi', to: '/teacher/ki-thi', exact: false },
    { name: 'Nhóm', to: '/teacher/nhom', exact: false },
    { name: 'Sinh viên', to: '/teacher/sinh-vien', exact: false },
]
function Li({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })

    return (
        <div className={match ? "actived" : ""}>
            <NavLink to={to} style={{ textDecoration: 'none' }}>
                <li className={match}>
                    <div className='control-ic-label'>
                        <div className=''> </div>
                        <div className='label'>{label}</div>
                        <div className={match ? "active-page" : ""}></div>
                    </div>
                </li>
            </NavLink>
        </div>
    )
}
function Header() {
    const user = JSON.parse(localStorage.getItem('userLogin'))
    const [checkLogin, setCheckLogin] = useState(user ? true : false)
    const logout = () => {
        localStorage.removeItem('userLogin')
        setCheckLogin(false)
    }
    return (
        <div className='wrap-header'>
            {!checkLogin ? <Redirect to='/login' /> : ''}
            <div className='teach-header'>
                <div className='menu-top'>
                    <ul>
                        {datas.map(item => {
                            return (
                                <Li
                                    key={item.name}
                                    activeOnlyWhenExact={item.exact}
                                    to={item.to}
                                    label={item.name}
                                />
                            )
                        })}
                    </ul>
                </div>

                {/* <div className='search'><input type='text' className='' placeholder='Tìm kiếm...' /></div> */}
                <div className='login'>
                    <div>{user ? user[0].ten : 'Đăng nhập'}</div>
                    <div onClick={logout}>{user ? 'Thoát' : ''}</div>
                </div>
            </div>

            <div className='notify'>
                <marquee >
                    Thông báo ...!
                </marquee>
            </div>
        </div>
    );
}

export default Header;