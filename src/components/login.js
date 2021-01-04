import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import callApi from 'api/apiCaller';
import { Alert } from 'reactstrap'
import './../components/css/dang-ky.scss'
function Login(props) {
    const [checkLogin, setCheckLogin] = useState(() => {
        if (localStorage.getItem('userLogin')) {
            return true
        }
        return false
    })

    const [code, setCode] = useState('')
    const [pass, setPass] = useState('')
    const change = (e) => {
        if (e.target.name === 'code') {
            setCode(e.target.value)
        }
        if (e.target.name === 'pass') {
            setPass(e.target.value)
        }
    }
    const _reset = () => {
        setCode('')
        setPass('')
    }
    const [alert, setAlert] = useState(false)
    const user = JSON.parse(localStorage.getItem('userLogin'))
    const onSubmit = () => {
        const data = {
            code,
            pass
        }
        // call api check login                
        callApi('tai-khoan/login', 'POST', data).then(res => {
            if (res.data.checked) {
                localStorage.setItem('userLogin', JSON.stringify(res.data.user))
                setCheckLogin(true)
            } else {
                setAlert(true)
            }
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }, [alert])
    return (
        <div className='dangnhap'>
            {
                checkLogin === true ?
                    user[0].vaitro === 1 ? < Redirect to='/giao-vien' /> :
                        user[0].vaitro === 2 ? <Redirect to='/sinh-vien' /> :
                            user[0].vaitro === 0 ? <Redirect to='/admin' /> : '' : ''
            }
            {
                alert && <Alert style={{ position: 'fixed', width: '100%', top: '0' }} color="danger">
                    Sai mã số hoặc mật khẩu!
                </Alert>
            }
            <div className='dangnhap-main'>
                <div className='bg'>
                    <img
                        style={{ width: '100%', height: '100%' }}
                        src='https://vio.edu.vn/tin-tuc/wp-content/uploads/2019/06/iStock-941665020-550x400.jpg' />
                </div>
                <div className='form'>
                    <div className='title'>Đăng nhập</div>
                    <br />
                    <div className='form-content'>
                        <form>
                            <div>
                                <label>Tên đăng nhập</label>
                                <input type='text' className='form-control' name='code' value={code} onChange={change} />
                            </div>
                            <div>
                                <label>Mật khẩu</label>
                                <input type='password' className='form-control' name='pass' value={pass} onChange={change} />
                            </div>
                            <br />
                            <div className='button'>
                                <div className='btn btn-info button-item' onClick={onSubmit}>
                                    Đăng nhập
                                </div>

                                <div className='btn btn-warning button-item' >
                                    <Link to='/dang-ky'>Đăng ký tài khoản</Link>
                                    {/* Đăng ký tài khoản */}
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;