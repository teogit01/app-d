import React, { useState } from 'react';
import callApi from 'api/apiCaller';
import { Redirect, useHistory } from 'react-router-dom';

function Register(props) {
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
    const history = useHistory()
    const onRegister = () => {
        const data = {
            username,
            password
        }
        console.log('data',data)
        callApi('tai-khoan/register','POST', data).then(() => {
            history.goBack()
        })
    }
    return (
        <div className='register' style={style}>
            <form>
                <div>
                    <label>Ten dang nhap</label>
                    <input type='text' className='form-control' name='username' value={username} onChange={change} />
                    <label>Mat khau</label>
                    <input type='password' className='form-control' name='password' value={password} onChange={change} />
                </div>
                <br />
                <div className='btn btn-info' onClick={onRegister}>Dang ky</div>
            </form>
        </div>
    );
}
const style = {
    width: '40%',
    boderRadius: '10px',
    margin: '10% auto'
}

export default Register;