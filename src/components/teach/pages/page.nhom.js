import React, { useEffect, useState } from 'react';
import './../components/css/page-nhom.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Nhom from './../components/nhom.js'
import NhomCT from './../components/nhom-ct.js'
import PropTypes from 'prop-types';
import callApi from 'api/apiCaller';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

PageNhom.propTypes = {

};

function PageNhom(props) {

    // load nhom
    const [user, setUser] = useState([])
    const [nhoms, setNhoms] = useState([])
    const [nhomActived, setNhomActived] = useState('')
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('userLogin'))
        callApi('tai-khoan/chi-tiet', 'POST', { _idtk: userLogin[0]._id }).then(res => {
            if (res.data.result) {
                setUser(res.data.result)
                if (res.data.result.nhoms && res.data.result.nhoms.length > 0) {
                    setNhoms(res.data.result.nhoms.reverse())
                    setNhomActived(res.data.result.nhoms[0])
                } else {
                    setNhoms([])
                }
            }
        })
    }, [])
    // end load nhom
    const _actived = (type, value) => {
        if (type === 'nhom') {
            setNhomActived(value)
        }
    }
    // modal
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [namhoc, setNamhoc] = useState('')
    const _reset = () => {
        setName('')
        setCode('')
        setNamhoc('')
    }
    const _onChange = (e) => {
        const value = e.target.value
        if (e.target.name === 'name') {
            setName(value)
        }
        if (e.target.name === 'code') {
            setCode(value)
        }
        if (e.target.name === 'namhoc') {
            setNamhoc(value)
        }
    }
    const _onSave = (type) => {
        if (type === 'nhom') {
            const data = {
                ten: name,
                ma: code,
                namhoc: namhoc,
                giaovien: user._id
            }
            _reset()
            toggle()
            callApi('nhom/add', 'POST', data).then(res => {
                window.location.reload()
            })
        }
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    // end modal
    const _add = (type) => {
        if (type === 'nhom') {
            toggle()
        }
    }

    console.log('', nhoms)
    return (
        <div className='page-nhom'>
            <div className='title'>
                <h5>
                    <span><i><Link to='cau-hoi'>Quản lí nhóm</Link></i></span>
                </h5>
                <div className='chuc-nang'>
                    <div className='search'>
                        {/* <input type='text' placeholder='tìm kiếm' name='search' value={keySearch} onChange={_changeValue} /> */}
                        {/* <FontAwesomeIcon className='icon' icon="search" /> */}
                    </div>
                    <div className='import'>
                        <label>
                            {/* {checkIP && <div className='button' onClick={() => setCheckIP(false)}>Huỷ</div>} */}
                        </label>
                    </div>
                </div>
            </div>
            <hr />
            <div className='nhoms'>
                <div className='nhom-content'>

                    <div className='nhom-list'>
                        <div className='nhom-list-content'>
                            <div className='nhom-list-content-title'>
                                Danh sách nhóm
                                <FontAwesomeIcon className='icon' icon="plus" onClick={() => _add('nhom')} />
                            </div>

                            <div className='nhom-list-content-item'>
                                {
                                    (nhoms && nhoms.length > 0) ?
                                        nhoms.map(nhom => {
                                            return (
                                                <div
                                                    className={nhom._id === nhomActived._id ? 'nhom-actived' : ''}
                                                    key={nhom._id} onClick={() => _actived('nhom', nhom)}
                                                >
                                                    <Nhom nhom={nhom} />
                                                </div>
                                            )
                                        })
                                        : <div><i>Không có nhóm</i></div>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='nhom-detail'>
                        <div className='nhom-list-title'>
                            <NhomCT nhomActived={nhomActived} />
                        </div>
                    </div>
                </div>
            </div>
            <div>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Tạo nhóm</ModalHeader>
                    <ModalBody>
                        <div>
                            <div>
                                <label>Nhập mã nhóm:</label>
                                <input
                                    type='text' className='form-control'
                                    name='code'
                                    onChange={_onChange}
                                />
                            </div>
                            <div>
                                <label>Nhập tên nhóm:</label>
                                <input
                                    type='text' className='form-control'
                                    name='name'
                                    onChange={_onChange}
                                />
                            </div>
                            <div>
                                <label>Chọn năm học:</label>
                                <select className='form-control' name='namhoc' value={namhoc} onChange={_onChange}>
                                    <option value=''></option>
                                    <option value='2017-2018'>2017-2018</option>
                                    <option value='2018-2019'>2018-2019</option>
                                    <option value='2019-2020'>2019-2020</option>
                                    <option value='2020-2021'>2020-2021</option>
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSave('nhom')}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

export default PageNhom;