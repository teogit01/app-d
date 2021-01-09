import React, { useState, useEffect, useRef } from 'react';
import './../components/css/page-dethi.scss'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import callApi from 'api/apiCaller';
import Dethi from './../components/dethi.js'
import classname from 'classnames'
import Cauhoi from './../components/cauhoi.js'
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
PageDethi.propTypes = {

};

function PageDethi(props) {
    const [dethis, setDethis] = useState([])
    const [mons, setMons] = useState([])
    const [monActived, setMonAcived] = useState('')
    const [kithis, setKithis] = useState([])
    const [optionCauhoi, setOptionCauhoi] = useState([])
    const [dethiOrigin, setDethiOrigin] = useState([])
    const [dethiActived, setDethiActived] = useState('')
    const [cauhois, setCauhois] = useState([])
    const user = JSON.parse(localStorage.getItem('userLogin'))
    // useEffect(() => {
    //     callApi('de-thi').then(res => {
    //         if (res.data.dethis) {
    //             setDethis(res.data.dethis)
    //             setDethiOrigin(res.data.dethis)
    //             setDethiActived(res.data.dethis.length > 0 ? res.data.dethis[0] : '')
    //         }
    //     })
    //     callApi('mon').then(res => {
    //         if (res.data.mons) {
    //             setMons(res.data.mons)
    //         }
    //     })
    // }, [])
    useEffect(() => {
        callApi('tai-khoan/chi-tiet', 'POST', { _idtk: user[0]._id }).then(res => {
            if (res.data.result) {
                setDethis(res.data.result.dethis)
                setCauhois(res.data.result.dethis.cauhois)
                setDethiOrigin(res.data.result.dethis)
                setDethiActived(res.data.result.dethis.length > 0 ? res.data.result.dethis[0] : '')
                setKithis(res.data.result.kithis)
                setMons(res.data.result.mons)
                setMonAcived(res.data.result.mons[0])
            }
        })
    }, [])
    useEffect(() => {
        // if (dethiActived) {
        //     callApi('mon/chi-tiet', 'POST', { _idmon: dethiActived.mon }).then(res => {
        //         if (res.data.mon) {
        //             setMons(res.data.mon)
        //         }
        //     })
        // }
        //setMonAcived(dethiActived.mon._id)        
        const arr = []
        if (dethiActived.mon && dethiActived.mon.cauhois && dethiActived.mon.cauhois.length > 0) {

            dethiActived.mon.cauhois.map(item => {
                arr.push({
                    label: item.noidung,
                    value: item._id
                })
            })
            setOptionCauhoi(arr)
        }
        else {
            setOptionCauhoi([])
        }
        if (dethiActived.cauhois && dethiActived.cauhois.length > 0)
            setCauhois(dethiActived.mon.cauhois)
        else
            setCauhois([])
    }, [dethiActived])

    // useEffect(() => {
    //     if (monActived) {
    //         if (monActived.cauhois && monActived.cauhois.length > 0) {
    //             const arr = []
    //             monActived.cauhois.map(item => {
    //                 arr.push({
    //                     label: item.noidung,
    //                     value: item._id
    //                 })
    //             })

    //             setOptionCauhoi(arr)
    //         }
    //     }
    // }, [monActived])
    // useEffect(() => {

    //     if (dethiActived.cauhois && dethiActived.cauhois.length > 0) {
    //         setCauhois(dethiActived.cauhois)

    //     } else {
    //         setCauhois([])
    //     }
    //     if (dethiActived) {
    //         callApi('cau-hoi/mon', 'POST', { _idmon: dethiActived.mon._id }).then(res => {
    //             if (res.data.cauhois && res.data.cauhois.length > 0) {
    //                 const arr = []
    //                 res.data.cauhois.map(item => {
    //                     arr.push({
    //                         label: item.noidung,
    //                         value: item._id
    //                     })
    //                 })
    //                 setOptionCauhoi(arr)
    //             }
    //         })
    //         // console.log('mon', dethiActived.mon._id)
    //     }
    // }, [dethiActived])
    const _actived = (type, value) => {
        if (type === 'dethi')
            setDethiActived(value)
    }

    // modal
    const [modalDe, setModalDe] = useState(false);
    const [modalCH, setModalCH] = useState(false);
    const toggleDe = () => setModalDe(!modalDe);
    const toggleCH = () => setModalCH(!modalCH);
    // end model

    const _add = (type) => {
        if (type === 'de') {
            toggleDe()
        }
        if (type === 'cauhoi') {
            toggleCH()
        }
    }
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [namhoc, setNamhoc] = useState('')
    const [ghichu, setGhichu] = useState('')
    const [mon, setMon] = useState('')
    const [keySearch, setKeySearch] = useState('')
    const [cauhoiSelected, setCauhoiSelected] = useState([])
    const _reset = () => {
        setCode('')
        setName('')
        setNamhoc('')
        setGhichu('')
        setMon('')
        setKeySearch('')
        setCauhoiSelected([])
    }
    const typingTimeoutRef = useRef(null)
    const _onChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        if (name === 'name') {
            setName(value)
        }
        if (name === 'code') {
            setCode(value)
        }
        if (name === 'namhoc') {
            setNamhoc(value)
        }
        if (name === 'ghichu') {
            setGhichu(value)
        }
        if (name === 'mon') {
            setMon(value)
        }
        if (name === 'search') {
            setKeySearch(value)
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
            typingTimeoutRef.current = setTimeout(() => {
                const newDethis = dethiOrigin.filter(dethi => dethi.ma.toUpperCase().indexOf(value.toUpperCase()) !== -1)
                setDethis(newDethis)
                if (newDethis.length > 0) {
                    setDethiActived(newDethis[0])
                } else {
                    setDethiActived('')
                }
            }, 1000)
        }
    }
    const _onSubmit = (type) => {
        if (type === 'de') {
            const data = {
                tieude: name,
                ma: code,
                namhoc: namhoc,
                ghichu: ghichu,
                mon: mon,
                _iduser: user[0]._id
            }
            callApi('de-thi/them', 'POST', data).then(res => {
                if (res.data.dethi) {
                    const newDethis = [res.data.dethi, ...dethis]
                    setDethis(newDethis)
                }
            })
            _reset()
            toggleDe()
        }
        if (type === 'cauhoi') {
            const data = {
                _iddethi: dethiActived._id,
                cauhois: cauhoiSelected
            }
            callApi('de-thi/add-question', 'POST', data).then((res) => {
                if (res.data.dethi) {
                    let idx = -1
                    dethis.map((item, index) => {
                        if (item._id === dethiActived._id)
                            idx = index
                    })
                    if (idx !== -1) {
                        const newDethis = [...dethis.slice(0, idx), res.data.dethi, ...dethis.slice(idx + 1, dethis.length)]
                        setDethis(newDethis)
                    }
                    setDethiActived(res.data.dethi)
                }
            })
            // const newCauhois = cauhoiSelected.concat(cauhois)
            // setCauhois(newCauhois)
            _reset()
            toggleCH()
        }
    }
    const _changeSelected = (array) => {
        const getId = []
        array.map(item => {
            getId.push(item.value)
        })
        setCauhoiSelected(getId)
    }

    return (
        <div className='page-dethi'>
            <div className='title'>
                <h5>
                    <span><i><Link to='cau-hoi'>Quản lí đề thi</Link></i></span>
                </h5>
                <div className='chuc-nang'>
                    <div className='search'>
                        <input type='text' placeholder='tìm kiếm' name='search' value={keySearch} onChange={_onChange} />
                        <FontAwesomeIcon className='icon' icon="search" />
                    </div>
                    <div className='import'>
                        <label>
                            {/* {checkIP && <div className='button' onClick={() => setCheckIP(false)}>Huỷ</div>} */}
                        </label>
                    </div>
                </div>
            </div>
            <hr />

            <div className='dethi-main'>
                <div className='dethi-list'>
                    <div className='dethi-list-title'>
                        Danh sách đề
                        <FontAwesomeIcon className='icon' icon='plus' onClick={() => _add('de')} />
                    </div>
                    <div className='dethi-list-content'>
                        <div className='dethi-list-content-item'>
                            {
                                (dethis && dethis.length > 0) ?
                                    dethis.map(dethi => {
                                        return (
                                            <div
                                                onClick={() => _actived('dethi', dethi)}
                                                className={classname(
                                                    // 'actived'
                                                    { 'actived': dethi._id === dethiActived._id }
                                                )}
                                                key={dethi._id}>
                                                <Dethi dethi={dethi} />
                                            </div>
                                        )
                                    })
                                    : <div><i>Không có đề thi</i></div>
                            }
                        </div>
                    </div>
                </div>
                <div className='dethi-detail'>
                    <div className='dethi-detail-title'>
                        Đề chi tiết
                        <FontAwesomeIcon className='icon' icon='plus' onClick={() => _add('cauhoi')} />
                    </div>
                    <div className='dethi-detail-content'>
                        <div className='dethi-detail-item'>
                            {
                                (cauhois && cauhois.length > 0) ?
                                    cauhois.map((ch, idx) => {
                                        return (
                                            <div key={ch._id}>
                                                <Cauhoi cauhoi={ch} idx={idx} />
                                            </div>
                                        )
                                    })
                                    : <div><i>Không có câu hỏi</i></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal them de thi */}
            <div>
                <Modal isOpen={modalDe} toggle={toggleDe} >
                    <ModalHeader toggle={toggleDe}>Thêm đề thi</ModalHeader>
                    <ModalBody>

                        <div>
                            <div>
                                <label>Mã đề</label>
                                <div>
                                    <input type='text' className='form-control'
                                        name='code'
                                        value={code}
                                        onChange={_onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Tiêu đề</label>
                                <input type='text' className='form-control'
                                    name='name'
                                    value={name}
                                    onChange={_onChange}
                                />
                            </div>
                            <div>
                                <label>Chọn năm</label>
                                <select className='form-control'
                                    name='namhoc'
                                    onChange={_onChange}
                                    value={namhoc}
                                >
                                    <option></option>
                                    <option value='2017-2018'>2017-2018</option>
                                    <option value='2018-2019'>2018-2019</option>
                                    <option value='2019-2020'>2019-2020</option>
                                    <option value='2020-2021'>2020-2021</option>
                                </select>
                            </div>
                            <div>
                                <label>Chọn môn</label>
                                <select className='form-control'
                                    name='mon'
                                    value={mon}
                                    onChange={_onChange}
                                >
                                    <option></option>
                                    {
                                        (mons && mons.length > 0) &&
                                        mons.map((item) => {
                                            return (
                                                <option key={item._id} value={item._id}>
                                                    {item.ten} ({item.ma})
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Ghi chú</label>
                                <textarea type='text' className='form-control'
                                    name='ghichu'
                                    onChange={_onChange}
                                    value={ghichu}
                                >

                                </textarea>
                            </div>
                        </div >
                    </ModalBody >
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSubmit('de')}>Thêm đề</Button>{' '}
                        <Button color="secondary" onClick={toggleDe}>Huỷ</Button>
                    </ModalFooter>
                </Modal >
            </div >
            {/* END Modal them de thi */}
            {/* Modal them cau hoi */}
            <div>
                <Modal isOpen={modalCH} toggle={toggleCH} >
                    <ModalHeader toggle={toggleCH}>Thêm câu hỏi</ModalHeader>
                    <ModalBody>
                        <div>
                            <div>
                                <label>Chọn câu hỏi</label>
                                <Select
                                    options={optionCauhoi}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    onChange={_changeSelected}
                                />
                            </div>
                        </div >
                    </ModalBody >
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSubmit('cauhoi')}>Thêm câu hỏi</Button>{' '}
                        <Button color="secondary" onClick={toggleCH}>Huỷ</Button>
                    </ModalFooter>
                </Modal >
            </div >
            {/* END Modal them cauhoi */}
        </div >
    );
}

export default PageDethi;