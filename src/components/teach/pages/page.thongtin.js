import React, { useEffect, useState } from 'react';
import './../components/css/page-thongtin.scss'
import PropTypes from 'prop-types';
import callApi from 'api/apiCaller'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import axios from 'axios'
import { Link } from 'react-router-dom'
PageThongtin.propTypes = {

};

function PageThongtin(props) {
    const user1 = JSON.parse(localStorage.getItem('userLogin'))
    const [user, setUser] = useState('')
    useEffect(() => {
        callApi('tai-khoan/chi-tiet', 'POST', { _idtk: user1[0]._id }).then(res => {
            setUser(res.data.result)
        })
    }, [])
    const [checkEdit, setCheckEdit] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const _onChange = e => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'name')
            setName(value)
        if (name === 'email')
            setEmail(value)
        if (name === 'phone')
            setPhone(value)
        if (name === 'address')
            setAddress(value)
    }
    const _reset = () => {
        setName('')
        setEmail('')
        setAddress('')
        setPhone('')
    }
    const _onSubmit = () => {
        const data = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            _idgv: user1[0]._id
        }
        callApi('tai-khoan/capnhat-gv', 'POST', data).then(res => {
            localStorage.setItem('userLogin', JSON.stringify([res.data.taikhoan]))
            window.location.reload()
        })
        _reset()
        setCheckEdit(false)
    }
    const changeImage = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        //setImg(file)
        reader.onloadend = () => {

            setImage(reader.result)
            //setPoster(file)    		
        }
        reader.readAsDataURL(file)
        setDataImage(file)
    }

    const [dataImage, setDataImage] = useState('')
    const [image, setImage] = useState('')
    const saveImage = async () => {
        // console.log(values)
        //console.log(dataPoster)
        const formData = new FormData();
        formData.append("image", dataImage);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let filePath
        await axios.post('http://localhost:3001/api/tai-khoan/upload-image', formData, config).then(res => {
            console.log('RES', res.data)
            filePath = res.data.split('/')[2]
        })

        let valueSubmit = { _iduser: user1[0]._id, imageName: filePath }

        callApi('tai-khoan/update-user', 'POST', valueSubmit).then((res) => {
            localStorage.setItem('userLogin', JSON.stringify([res.data]))
            window.location.reload()
            //history.goBack()
        })
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
            user: user1[0],
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
    /// end modal
    return (
        < div className='page-thongtin' >
            {
                isAlertError && alertError()
            }
            {
                isAlertSuccess && alertSuccess()
            }
            <div className='title'>
                <h5>
                    <span><i><Link to='cau-hoi'>Thông tin cá nhân</Link></i></span>
                </h5>
                <div className='chuc-nang'>
                    <div className='search'>
                        {/* <input type='text' placeholder='tìm kiếm' name='search' value={keySearch} onChange={_changeValue} /> */}
                        {/* <FontAwesomeIcon className='icon' icon="search" /> */}
                    </div>
                    <div className='import'>
                        {/* <label htmlFor='importt' >
                            <div className='button'>Import</div>
                        </label>                                                 */}
                    </div>
                </div>
            </div>
            <hr />
            <div className='thongtin-content'>
                <div className='left'>
                    <div className='avatar'>
                        {/* <img src='' /> */}
                        <img src={image ? image : (user1[0] && user1[0].hinhanh) ? `http://localhost:3001/api/image/${user1[0].hinhanh}` : ''} style={{ width: '240px', height: '300px' }} />
                    </div>

                    <div style={{ marginTop: '-80px' }}>
                        <input type='file'
                            // className='form-control'
                            name='image'
                            onChange={changeImage}
                        />
                    </div>
                    <br />
                    <br />
                    {image ? <><div className='btn btn-info' onClick={saveImage} style={{ width: '100px' }}>Lưu lại</div>
                            &nbsp;
                <div className='btn btn-info' style={{ width: '100px' }}>Huỷ bỏ</div> </>
                        : ''}
                </div>

                <div className='info'>
                    <div className='control'>
                        <label>Mã số</label>
                        <div>{user ? user.maso : ''}</div>
                    </div>
                    <div className='control'>
                        <label>Họ Tên</label>
                        <input
                            name='name'
                            value={name}
                            onChange={_onChange}
                            disabled={!checkEdit}
                            type='text' placeholder={user.ten} />
                    </div>
                    <div className='control'>
                        <label>Email</label>
                        {/* <div>{user ? user.email : ''}</div> */}
                        <input type='text'
                            onChange={_onChange}
                            name='email'
                            value={email}
                            disabled={!checkEdit}
                            placeholder={user.email} />
                    </div>
                    <div className='control'>
                        <label>Sđt</label>
                        {/* <div>{user ? user.sdt : ''}</div> */}
                        <input type='text'
                            name='phone'
                            value={phone}
                            placeholder={user.sdt}
                            onChange={_onChange}
                            disabled={!checkEdit}
                        />
                    </div>
                    <div className='control address'>
                        <label>Địa chỉ</label>
                        {/* <div>{user ? user.diachi : ''}</div> */}
                        <input
                            disabled={!checkEdit}
                            name='address'
                            onChange={_onChange}
                            value={address}
                            type='text' placeholder={user.diachi} />
                    </div>
                    <div className='control'>
                        <label>Mật khẩu</label>
                        <div className='doi-mk'
                            onClick={() => togglePassword()}
                        ><i>đổi mật khẩu</i></div>
                    </div>

                    <br />
                    {
                        !checkEdit ? <div className='button' onClick={() => setCheckEdit(true)}>Cập nhật thông tin</div>
                            : <div className='button' onClick={_onSubmit}>Lưu thông tin</div>
                    }
                </div>
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

export default PageThongtin;