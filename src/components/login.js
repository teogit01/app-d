import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import callApi from 'api/apiCaller';

function Login(props) {
    const [checkLogin, setCheckLogin] = useState(() => {
        if (localStorage.getItem('userLogin')) {
            return true
        }
        return false
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const change = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }
    const user = JSON.parse(localStorage.getItem('userLogin'))
    const onSubmit = () => {
        const data = {
            username,
            password
        }
        setUsername('')
        setPassword('')

        // call api check login                
        callApi('tai-khoan/login', 'POST', data).then(res => {
            if (res.data.checked) {
                localStorage.setItem('userLogin', JSON.stringify(res.data.user))
                setCheckLogin(true)
            }
        })
    }

    return (
        < div className='login' >
            {
                checkLogin === true ?
                    user[0].vaitro === 1 ? < Redirect to='/teacher' /> :
                        user[0].vaitro === 2 ? <Redirect to='/student' /> : ''
                    : ''
            }
            <form style={style}>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input type='text' className='form-control' name='username' value={username} onChange={change} />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input type='password' className='form-control' name='password' value={password} onChange={change} />
                </div>
                <br />
                <div className='btn btn-info' onClick={onSubmit}>
                    Đăng nhập
                </div>
                <br />
                <br />
                <div className='btn btn-info'>
                    <Link to='/register'>Dang ky</Link>
                </div>

            </form>
        </div >
    );
}
const style = {
    width: '40%',
    boderRadius: '10px',
    margin: '10% auto'
}

export default Login;