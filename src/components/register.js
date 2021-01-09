import React, { useState, useEffect } from 'react';
import callApi from 'api/apiCaller';
import './../components/css/dang-ky.scss'
import { Redirect, useHistory } from 'react-router-dom';
import { Alert } from 'reactstrap'
import { set } from 'date-fns';

function Register(props) {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const change = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'code') {
            setCode(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
    }
    const _reset = () => {
        setName('')
        setCode('')
        setEmail('')
    }
    const history = useHistory()
    const onRegister = () => {
        const data = {
            name,
            code,
            email
        }
        callApi('tai-khoan/register', 'POST', data).then(() => {
            setAlert(true)
            _reset()
        })
    }
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setAlert(false)
        }, 5000);
    }, [alert])
    return (
        <div className='dangky'>
            {
                alert && <Alert style={{ position: 'fixed', width: '100%' }} color="success">
                    Đăng ký thành công! vui lòng check email để nhận thông tin đăng nhập
                </Alert>
            }

            <div className='dangky-main'>
                <div className='bg'>
                    <img
                        style={{ width: '100%', height: '100%' }}
                        src='https://vio.edu.vn/tin-tuc/wp-content/uploads/2019/06/iStock-941665020-550x400.jpg' />
                </div>
                <div className='form'>
                    <div className='title'>
                        Thi Trắc nghiệm trực tuyến
                    </div>
                    <div className='title-2'>Đăng ký tài khoản</div>
                    <br />
                    <div className='form-content'>
                        <form>
                            <div className='content-control'>
                                <label>Họ tên</label>
                                <input type='text'
                                    name='name'
                                    value={name} onChange={change} />
                            </div>
                            <div className='content-control'>
                                <label>Mã giáo viên</label>
                                <input type='text'
                                    name='code'
                                    value={code} onChange={change} />
                            </div>
                            <div className='content-control'>
                                <label>Email</label>
                                <input type='text'
                                    name='email'
                                    value={email} onChange={change} />
                            </div>
                            <br />

                            <div className='button'>
                                <div className='btn btn-warning button-item' onClick={() => { history.goBack() }}>Có tài khoản</div>
                                <div className='btn btn-info button-item' onClick={onRegister}>Xác nhận</div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default Register;