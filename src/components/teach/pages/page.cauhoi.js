import React, { useEffect, useState, useRef } from 'react';
import './../components/css/page-cauhoi.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Mon from './../components/mon.js'
import Cauhoi from './../components/cauhoi.js'
import callApi from 'api/apiCaller';
import Select from 'react-select'
import * as XLSX from 'xlsx'

PageCauhoi.propTypes = {

};

function PageCauhoi(props) {
    const user = JSON.parse(localStorage.getItem('userLogin'))
    //import
    const [valueImport, setValueImport] = useState([])
    const [checkIP, setCheckIP] = useState(false)
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result

                const wb = XLSX.read(bufferArray, { type: 'buffer' })

                const wsname = wb.SheetNames[0]

                const ws = wb.Sheets[wsname]

                //const data = XLSX.utils.sheet_to_json(ws)
                const data = XLSX.utils.sheet_to_json(ws)
                //console.log('data', data)
                resolve(data)
            }
            fileReader.onerror = (error => {
                reject(error)
            })
        })
        promise.then((data) => {
            //console.log(data)
            setValueImport(data)
            setCheckIP(true)
        })
    }
    useEffect(() => {
        if (checkIP === false) {
            setValueImport([])
        }
    }, [checkIP])
    useEffect(() => {
        if (valueImport.length > 0) {
            const newCauhois = []
            valueImport.map(item => {
                newCauhois.push({
                    noidung: item['Nội dung'],
                    phuongans: [
                        { ten: 'A', noidung: item['Phương án A'], dapan: item['Đáp án'] === 'A' ? true : false },
                        { ten: 'B', noidung: item['Phương án B'], dapan: item['Đáp án'] === 'B' ? true : false },
                        { ten: 'C', noidung: item['Phương án C'], dapan: item['Đáp án'] === 'C' ? true : false },
                        { ten: 'D', noidung: item['Phương án D'], dapan: item['Đáp án'] === 'D' ? true : false },
                    ]
                })
            })
            setCauhois([...newCauhois, ...cauhois])
        } else {
            if (monActived && monActived.cauhois && monActived.cauhois.length > 0) {
                setCauhois(monActived.cauhois)
            }
        }
    }, [valueImport])
    // endimoprt
    // load mon
    const [mons, setMons] = useState([])
    const [monActived, setMonActived] = useState('')
    const [cauhois, setCauhois] = useState([])
    const [allCauhoi, setAllCauhoi] = useState([])
    const [monOrigin, setMonOrigin] = useState([])
    // useEffect(() => {
    //     callApi('mon').then(res => {
    //         if (res.data.mons) {
    //             setMons(res.data.mons)
    //             setMonOrigin(res.data.mons.reverse())
    //             if (res.data.mons && res.data.mons.length > 0) {
    //                 setMonActived(res.data.mons[0])
    //             }
    //         }
    //     })
    // }, [])
    useEffect(() => {
        callApi(`tai-khoan/chi-tiet`, 'POST', { _idtk: user[0]._id }).then(res => {
            if (res.data.result) {
                setMons(res.data.result.mons)
                setMonOrigin(res.data.result.mons.reverse())
                if (res.data.result.mons && res.data.result.mons.length > 0) {
                    setMonActived(res.data.result.mons[0])
                }
            }
        })
    }, [])
    useEffect(() => {
        callApi('cau-hoi').then(res => {
            if (res.data.cauhois) {
                setAllCauhoi(res.data.cauhois)
            }
        })
    }, [])
    const [options, setOptions] = useState([])
    const [optionRender, setOptionRender] = useState([])
    useEffect(() => {
        if (allCauhoi && allCauhoi.length > 0) {
            const arr = []
            allCauhoi.map(item => {
                // options.push({ label: item.noidung, value: item._id })
                arr.push({ label: item.noidung, value: item._id })
            })
            setOptions(arr)
            setOptionRender(arr)
        }
    }, [allCauhoi])
    // end load mon    
    useEffect(() => {
        if (monActived.cauhois && monActived.cauhois.length > 0)
            setCauhois(monActived.cauhois.reverse())
        else {
            setCauhois([])
        }
    }, [monActived])
    const _change = (type, value) => {
        if (type === 'mon') {
            setMonActived(value)
        }
    }
    // modal
    const [modalMon, setModalMon] = useState(false);
    const [modalCauhoi, setModalCauhoi] = useState(false);
    const toggleMon = () => setModalMon(!modalMon);
    const toggleCauhoi = () => setModalCauhoi(!modalCauhoi);
    // end modal
    const _add = (type) => {
        if (type === 'mon') {
            toggleMon()
        }
        if (type === 'cauhoi') {
            toggleCauhoi()
        }
    }
    const [keySearch, setKeySearch] = useState('')
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [dapan, setDapan] = useState('A')
    const [noidung, setNoidung] = useState('')
    const [paa, setPaa] = useState('')
    const [pab, setPab] = useState('')
    const [pac, setPac] = useState('')
    const [pad, setPad] = useState('')
    const [cauhoiSelected, setCauhoiSelected] = useState([])

    const [checkNhapCH, setCheckNhapCH] = useState(false)
    useEffect(() => {
        if (checkNhapCH === true) {
            setCauhoiSelected([])
            setCauhoiSelected([])
            setOptionRender([])
        } else {
            setOptionRender(options)
        }
    }, [checkNhapCH])
    const _reset = () => {
        setName('')
        setCode('')
        setCheckNhapCH(false)
        setDapan('A')
        setPaa('')
        setPab('')
        setPac('')
        setPad('')
        setCauhoiSelected([])
        setKeySearch('')
        setValueImport('')
    }
    const typingTimeoutRef = useRef(null)
    const _changeValue = (e) => {
        const value = e.target.value
        if (e.target.name === 'name') {
            setName(value)
        }
        if (e.target.name === 'code') {
            setCode(value)
        }
        if (e.target.name === 'dapan') {
            setDapan(value)
        }
        if (e.target.name === 'noidung') {
            setNoidung(value)
        }
        if (e.target.name === 'paa') {
            setPaa(value)
        }
        if (e.target.name === 'pab') {
            setPab(value)
        }
        if (e.target.name === 'pac') {
            setPac(value)
        }
        if (e.target.name === 'pad') {
            setPad(value)
        }
        if (e.target.name === 'search') {
            setKeySearch(value)
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
            typingTimeoutRef.current = setTimeout(() => {
                // const newCauhoi = allCauhoi.filter(cauhoi => cauhoi.noidung.toUpperCase().indexOf(value.toUpperCase() !== -1))
                //setCauhois(newCauhoi)
                const newMons = monOrigin.filter(mon => mon.ma.toUpperCase().indexOf(value.toUpperCase()) !== -1)
                setMons(newMons)
                if (newMons.length > 0) {
                    setMonActived(newMons[0])
                }
                else {
                    setMonActived('')
                    //finc cau hoi
                    // const newCauhoi = allCauhoi.filter(cauhoi => cauhoi.noidung.toUpperCase().indexOf(value.toUpperCase() !== -1))
                    // setCauhois(newCauhoi)
                }
            }, 1000)
        }
    }
    const _changeSelect = (arr) => {
        setCauhoiSelected(arr)
    }
    const _onSubmit = (type) => {
        // add mon
        if (type === 'mon') {
            const data = {
                ma: code,
                ten: name,
                _iduser: user[0]._id
            }
            callApi('mon/add', 'POST', data).then(res => {
                if (res.data.mon) {
                    const newMons = [res.data.mon, ...mons]
                    setMons(newMons)
                }
            })
            toggleMon()
            _reset()
        }
        // them cau hoi
        if (type === 'cauhoi') {
            const data = {
                phuongans: [
                    { ten: 'A', noidung: paa, dapan: dapan === 'A' ? true : false },
                    { ten: 'B', noidung: pab, dapan: dapan === 'B' ? true : false },
                    { ten: 'C', noidung: pac, dapan: dapan === 'C' ? true : false },
                    { ten: 'D', noidung: pad, dapan: dapan === 'D' ? true : false }
                ],
                noidung,
                arrCauhoi: cauhoiSelected,
                _idmon: monActived._id
            }
            _reset()
            toggleCauhoi()
            if (cauhoiSelected.length > 0) {
                callApi('cau-hoi/them-nhieu', 'POST', data).then(res => {
                    if (res.data.mon) {
                        let idx = -1
                        mons.map((item, index) => {
                            if (item._id === monActived._id) {
                                idx = index
                            }
                        })
                        if (idx !== -1) {
                            setMons([...mons.slice(0, idx), res.data.mon, ...mons.slice(idx + 1, mons.length)])
                        }
                        setMonActived(res.data.mon)
                    }
                })
            } else {
                //console.log('data', data)
                callApi('cau-hoi/them', 'POST', data).then(res => {
                    if (res.data.cauhoi) {
                        const newCauhois = [res.data.cauhoi, ...cauhois]
                        setCauhois(newCauhois)
                    }
                    if (res.data.mon) {
                        let idx = -1
                        mons.map((item, index) => {
                            if (item._id === monActived._id) {
                                idx = index
                            }
                        })
                        if (idx !== -1) {
                            setMons([...mons.slice(0, idx), res.data.mon, ...mons.slice(idx + 1, mons.length)])
                        }
                        setMonActived(res.data.mon)
                    }
                })
            }
            // callApi('cau-hoi/them', 'POST', 'data').then(res => {

            // })
        }
        if (type === 'import') {
            const data = {
                cauhois: valueImport,
                _idmon: monActived._id
            }
            console.log('import', data)
            _reset()
            setCheckIP(false)
            callApi('cau-hoi/import', 'POST', data)
        }

    }

    return (
        <div className='page-cauhoi'>
            <div className='title'>
                <h5>
                    <span><i><Link to='cau-hoi'>Quản lí câu hỏi</Link></i></span>
                </h5>
                <div className='chuc-nang'>
                    <div className='search'>
                        <input type='text' placeholder='tìm kiếm' name='search' value={keySearch} onChange={_changeValue} />
                        <FontAwesomeIcon className='icon' icon="search" />
                    </div>
                    <div className='import'>
                        <label htmlFor='importt' >
                            <div className='button button-import'>Import</div>
                        </label>
                        <label>
                            {checkIP && <div className='button button-save' onClick={() => {
                                _onSubmit('import')
                                window.location.reload()
                            }}>Lưu</div>}
                        </label>
                        <label>
                            {checkIP && <div className='button button-cancel' onClick={() => setCheckIP(false)}>Huỷ</div>}
                        </label>
                        <input
                            type='file'
                            id='importt'
                            style={{ display: 'none' }}
                            //value={valueImport}
                            onChange={(e) => {
                                const file = e.target.files[0]
                                readExcel(file)
                            }}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className='mon-cauhoi'>
                {/*mon*/}
                <div className='mons'>
                    <div className='mon-title'>
                        Danh sách môn
                        <FontAwesomeIcon className='icon' icon="plus" onClick={() => _add('mon')} />
                    </div>
                    <div className='mon-content'>
                        <div className='mon-content-item'>
                            {
                                (mons && mons.length > 0) ?
                                    mons.map(mon => {
                                        return (
                                            <div
                                                key={mon._id}
                                                className={mon._id === monActived._id ? 'mon-actived' : ''}
                                                onClick={(e) => _change('mon', mon)}
                                            >
                                                <Mon mon={mon} cauhois={cauhois} monActived={monActived} />
                                            </div>
                                        )
                                    })
                                    : <di><i>Không tìm thấy môn</i></di>
                            }
                        </div>
                    </div>
                </div>
                {/*end mon*/}
                {/*cauhoi*/}
                <div className='cauhois1'>
                    <div className='cauhoi-title'>
                        Danh sách câu hỏi
                        <FontAwesomeIcon className='icon' icon="plus" onClick={() => _add('cauhoi')} />
                    </div>
                    <div className='cauhoi-content'>
                        <div className='mon-content-item'>
                            {
                                (cauhois && cauhois.length > 0) ?
                                    cauhois.map((cauhoi, idx) => {
                                        return (
                                            <Cauhoi cauhoi={cauhoi} idx={idx} />
                                        )
                                    })
                                    : <div><i>Không có câu hỏi</i></div>
                            }
                        </div>
                    </div>
                </div>
                {/*end cauhoi*/}
            </div>

            {/*Modal them mon*/}
            <div>
                <Modal isOpen={modalMon} toggle={toggleMon} >
                    <ModalHeader toggle={toggleMon}>Thêm mới môn</ModalHeader>
                    <ModalBody>
                        <div>
                            <div className='control'>
                                <label>Mã môn:</label>
                                <div>
                                    <input type='text'
                                        className='form-control'
                                        name='code'
                                        value={code}
                                        onChange={(e) => { _changeValue(e) }}
                                    />
                                </div>
                            </div>
                            <div className='control'>
                                <label>Tên môn:</label>
                                <div>
                                    <input type='text'
                                        className='form-control'
                                        name='name'
                                        value={name}
                                        onChange={(e) => { _changeValue(e) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSubmit('mon')}>Thêm Môn</Button>
                        <Button color="secondary" onClick={toggleMon}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/*End Modal them mon*/}
            {/*Modal them cauhoi*/}
            <div>
                <Modal isOpen={modalCauhoi} toggle={toggleCauhoi} >
                    <ModalHeader toggle={toggleCauhoi}>Thêm câu hỏi cho môn {monActived.ten}</ModalHeader>
                    <ModalBody>
                        <div>
                            <div>
                                <label>Chọn câu hỏi</label>
                                <Select
                                    options={optionRender}
                                    placeholder='Chọn câu hỏi'
                                    isMulti
                                    closeMenuOnSelect={false}
                                    valueDefault={cauhoiSelected}
                                    onChange={_changeSelect}
                                />
                            </div>
                            <br />
                            <div>
                                <label className='btn btn-warning' onClick={() => { setCheckNhapCH(!checkNhapCH) }}>Nhập câu hỏi mới</label>
                            </div>
                            <div>
                                {
                                    checkNhapCH &&
                                    <div>
                                        <div>
                                            <label>Nhập nội dung câu hỏi</label>
                                            <input type='text' className='form-control' name='noidung' value={noidung} onChange={_changeValue} />
                                        </div>
                                        <div>
                                            <label>
                                                Nhập nội dung phương án A &nbsp;
                                                <input type='radio' className='' name='dapan' checked={dapan === 'A'} value='A' onChange={_changeValue} />
                                            </label>
                                            <input type='text' className='form-control' name='paa' value={paa} onChange={_changeValue} />
                                        </div>
                                        <div>
                                            <label>
                                                Nhập nội dung phương án B &nbsp;
                                                <input type='radio' className='' name='dapan' checked={dapan === 'B'} value='B' onChange={_changeValue} />
                                            </label>
                                            <input type='text' className='form-control' name='pab' value={pab} onChange={_changeValue} />
                                        </div>
                                        <div>
                                            <label>
                                                Nhập nội dung phương án C &nbsp;
                                                <input type='radio' className='' name='dapan' checked={dapan === 'C'} value='C' onChange={_changeValue} />
                                            </label>
                                            <input type='text' className='form-control' name='pac' value={pac} onChange={_changeValue} />
                                        </div>
                                        <div>
                                            <label>
                                                Nhập nội dung phương án D &nbsp;
                                                <input type='radio' className='' name='dapan' checked={dapan === 'D'} value='D' onChange={_changeValue} />
                                            </label>
                                            <input type='text' className='form-control' name='pad' value={pad} onChange={_changeValue} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSubmit('cauhoi')}>Thêm câu hỏi</Button>
                        <Button color="secondary" onClick={toggleCauhoi}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/*End Modal them cauhoi*/}
        </div>
    );
}

export default PageCauhoi;