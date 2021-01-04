import React, { useState, useEffect } from 'react';
import './../components/css/page-kithi.scss'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import callApi from 'api/apiCaller';
import Kithi from './../components/kithi.js'
import KithiCT from './../components/kithi-ct.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { format, setMonth, set } from 'date-fns'
PageKithi.propTypes = {

};

function PageKithi(props) {
    // load ki thi
    const [kithis, setKithis] = useState([])
    const [mons, setMons] = useState([])
    const [giaovien, setGiaoVien] = useState('')
    const user = JSON.parse(localStorage.getItem('userLogin'))
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userLogin'))
        callApi('ki-thi/giao-vien', 'POST', { _idgv: user[0]._id }).then(res => {
            //console.log(res.data)
            if (res.data.giaovien) {
                setGiaoVien(res.data.giaovien)
            }
        })
        callApi('mon/giao-vien', 'POST', { _idgv: user[0]._id }).then(res => {
            if (res.data.mons) {
                setMons(res.data.mons)
            }
        })
    }, [])
    useEffect(() => {
        if (giaovien && giaovien.kithis && giaovien.kithis.length > 0) {
            setKithis(giaovien.kithis)
        } else {
            setKithis([])
        }
    }, [giaovien])
    // end load ki thi 
    const [kithiActived, setKithiActived] = useState('')
    useEffect(() => {
        if (kithis && kithis.length > 0) {
            setKithiActived(kithis[0])
        }
    }, [kithis])

    // modal
    const [modalKT, setModalKT] = useState(false);
    const toggleKT = () => setModalKT(!modalKT);
    // end modal
    const _add = (type) => {
        if (type === 'KT') {
            toggleKT()
        }
    }

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [mon, setMon] = useState('')
    const [namhoc, setNamhoc] = useState('')
    const [pass, setPass] = useState('')
    const _reset = () => {
        setCode('')
        setName('')
        setTime('')
        setNamhoc('')
        setPass('')
        setDate('')
        setMon('')
    }
    const _onChange = e => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'name')
            setName(value)
        if (name === 'code')
            setCode(value)
        if (name === 'time')
            setTime(value)
        if (name === 'namhoc')
            setNamhoc(value)
        if (name === 'date')
            setDate(format(new Date(value), 'dd-MM-yyyy'))
        if (name === 'pass')
            setPass(value)
        if (name == 'mon')
            setMon(value)
    }
    const _onSubmit = type => {
        if (type === 'KT') {
            const data = {
                tieude: name,
                ma: code,
                thoigian: time,
                matkhau: pass,
                ngaythi: date,
                mon: mon,
                hocki: namhoc,
                giaovien: giaovien
            }
            callApi('ki-thi/them', 'POST', data).then(res => {
                //console.log('res', res.data)
                if (res.data.kithi) {
                    const newKithis = [res.data.kithi, ...kithis]
                    setKithis(newKithis)
                }
            })
            _reset()
            toggleKT()
        }
    }
    const _actived = (type, value) => {
        if (type === 'KT') {
            setKithiActived(value)
        }
    }
    // const updateKT = kithi => {
    //     let idx = -1
    //     kithis.map((item, index) => {
    //         if (item._id === kithi._id)
    //             idx = index
    //     })
    //     if (idx !== -1) {
    //         const newKithis = [...kithis.slice(0, idx), kithi, ...kithis.slice(idx + 1, kithis.length)]
    //         setKithis(newKithis)
    //         setKithiActived(kithi)
    //     }

    // }
    return (
        <div className='page-kithi'>
            <div className='title'>
                <h5>
                    <span><i><Link to='cau-hoi'>Quản lí kì thi</Link></i></span>
                </h5>
                <div className='chuc-nang'>
                    <div className='search'>
                        {/* <input type='text' placeholder='tìm kiếm' name='search' value={keySearch} onChange={_changeValue} />
                        <FontAwesomeIcon className='icon' icon="search" /> */}
                    </div>
                </div>
            </div>
            <hr />
            <div className='kithi-content'>
                <div className='kithi-list'>
                    <div className='kithi-list-title'>
                        Danh sách kì thi
                        <FontAwesomeIcon className='icon' icon='plus' onClick={() => _add('KT')} />
                    </div>
                    <div className='kithi-list-content'>
                        <div className='kithi-list-content-item'>
                            {
                                (kithis && kithis.length > 0) ?
                                    kithis.map(kithi => {
                                        return (
                                            <div key={kithi._id}
                                                onClick={() => _actived('KT', kithi)}
                                                className={kithi._id === kithiActived._id ? 'actived' : ''}
                                            >
                                                <Kithi kithi={kithi} />
                                            </div>
                                        )
                                    })
                                    : <div><i>Không có kì thi</i></div>
                            }
                        </div>
                    </div>
                </div>
                <div className='kithi-detail'>
                    <KithiCT kithi={kithiActived} />
                    {/* <div className='kithi-detail-title'></div>
                    <div className='kithi-detail-content'>
                        <div className='kithi-detail-content-item'>

                        </div>
                    </div> */}
                </div>
                {/* MOdal kithi */}
                <div>
                    <Modal isOpen={modalKT} toggle={toggleKT} >
                        <ModalHeader toggle={toggleKT}>Tạo kì thi</ModalHeader>
                        <ModalBody>
                            <div>
                                <div>
                                    <label>Nhập mã đề</label>
                                    <input
                                        type='text'
                                        name='code'
                                        value={code}
                                        onChange={_onChange}
                                        className='form-control'
                                    />
                                </div>
                                <div>
                                    <label>Nhập tiêu đề</label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={name}
                                        onChange={_onChange}
                                        className='form-control'
                                    />
                                </div>
                                <div>
                                    <label>Nhập thời gian</label>
                                    <input
                                        type='number'
                                        name='time'
                                        value={time}
                                        onChange={_onChange}
                                        className='form-control'
                                    />
                                </div>
                                <div>
                                    <label>Nhập mật khẩu</label>
                                    <input
                                        type='text'
                                        name='pass'
                                        value={pass}
                                        onChange={_onChange}
                                        className='form-control'
                                    />
                                </div>
                                <div>
                                    <label>Chọn môn thi</label>
                                    <select className='form-control'
                                        name='mon'
                                        value={mon}
                                        onChange={_onChange}
                                    >
                                        <option></option>
                                        {
                                            (mons && mons.length > 0) &&
                                            mons.map(item => {
                                                return (
                                                    <option key={item._id} value={item._id}>{item.ten} {item.ma}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div>
                                    <label>Chọn học kì</label>
                                    <select className='form-control'
                                        name='namhoc'
                                        value={namhoc}
                                        onChange={_onChange}
                                    >
                                        <option></option>
                                        <option value='2017-2018'>2017-2018</option>
                                        <option value='2018-2019'>2018-2019</option>
                                        <option value='2019-2020'>2019-2020</option>
                                        <option value='2020-2021'>2020-2021</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Chọn ngày thi</label>
                                    <input
                                        type='date'
                                        name='date'
                                        // value={format(new Date(date), 'yyyy-MM-dd')}
                                        onChange={_onChange}
                                        className='form-control'
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => _onSubmit('KT')}>Thêm</Button>
                            <Button color="secondary" onClick={toggleKT}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                {/** End modal kithi */}
            </div>
        </div>
    );
}

export default PageKithi;