import React, { useState, useEffect } from 'react';
import './css/header.scss'
import { useRouteMatch, NavLink, Redirect, useHistory } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Alert } from 'reactstrap';

import callApi from 'api/apiCaller'
// import PropTypes from 'prop-types';

// Header.propTypes = {

// };

const datas = [
    { name: 'Trang chủ', to: '/student/trang-chu', exact: true },
    { name: 'Kì thi', to: '/student/ki-thi', exact: false },
    { name: 'Nhóm', to: '/student/nhom', exact: false },
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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const logout = () => {
        localStorage.removeItem('userLogin')
        setCheckLogin(false)
    }

    /// modal 
    const [matkhaucu, setMatkhaucu] = useState('')
    const [matkhaumoi, setMatkhaumoi] = useState('')
    const [matkhaumoi2, setMatkhaumoi2] = useState('')

    const changevalue = (e) => {
        if (e.target.name === 'mkc') {
            setMatkhaucu(e.target.value)
        }
        if (e.target.name === 'mkm') {
            setMatkhaumoi(e.target.value)
        }
        if (e.target.name === 'mkm2') {
            setMatkhaumoi2(e.target.value)
        }
    }
    const [modal, setModal] = useState(false);
    const [isAlertError, setIsAlertError] = useState(false)
    const [isAlertSuccess, setIsAlertSuccess] = useState(false)
    const togglePassword = () => setModal(!modal);

    const onSave = () => {
        const data = {
            user: user[0],
            mkc: matkhaucu,
            mkm: matkhaumoi,
            mkm2: matkhaumoi2
        }
        togglePassword()
        callApi('tai-khoan/changepassword', 'POST', data).then((res) => {
            if (res.data.result === false) {
                setIsAlertError(!isAlertError)
            } else {
                setIsAlertSuccess(!isAlertSuccess)
            }
        })
    }
    /// end modal
    useEffect(() => {
        setTimeout(() => {
            if (isAlertError)
                setIsAlertError(false)
            if (isAlertSuccess)
                setIsAlertSuccess(false)
        }, 3000)
    }, [isAlertError, isAlertSuccess])
    const alertError = () => {
        return (
            <Alert color="danger">
                Mật khẩu không đúng!
            </Alert>
        )
    }
    const alertSuccess = () => {
        return (
            <Alert color="success">
                Đổi mật khẩu thành công!
            </Alert>
        )
    }

    // thong tin
    const match = useRouteMatch()
    const history = useHistory()
    const thongtin = () => {
        history.push(`${match.url}/thong-tin`)
    }
    return (
        <div className='wrap-header'>
            {
                isAlertError && alertError()
            }
            {
                isAlertSuccess && alertSuccess()
            }
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
                    <div>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                            <DropdownToggle tag="a" className="nav-link" caret>
                                {user ? user[0].ten : 'Đăng nhập'}
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem onClick={thongtin}>Thông Tin</DropdownItem>
                                <DropdownItem></DropdownItem>
                                <DropdownItem text>Dropdown Item Text</DropdownItem>
                                <DropdownItem disabled>Action (disabled)</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem >alser</DropdownItem>
                                <DropdownItem onClick={() => togglePassword()}>Đổi mật khẩu</DropdownItem>
                                <DropdownItem>Quo Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div onClick={logout}>{user ? 'Thoát' : ''}</div>
                </div>
            </div>

            <div className='notify'>
                <marquee >
                    Thông báo ...!
                </marquee>
            </div>

            {/* Modal change password*/}
            <div>
                <Modal isOpen={modal} >
                    <ModalHeader >Đổi mật khẩu</ModalHeader>
                    <ModalBody>
                        <div>
                            <div>
                                <label>Nhập mật khẩu củ:</label>
                                <input type='password' className='form-control' name='mkc' value={matkhaucu} onChange={changevalue} />
                            </div>
                            <div>
                                <label>Nhập mật khẩu mới:</label>
                                <input type='password' className='form-control' name='mkm' value={matkhaumoi} onChange={changevalue} />
                            </div>
                            <div>
                                <label>Nhập lại mật khẩu mới:</label>
                                <input type='password' className='form-control' name='mkm2' value={matkhaumoi2} onChange={changevalue} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onSave}>Đổi mật khẩu</Button>
                        <Button color="secondary" onClick={togglePassword}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div >
    );
}

export default Header;