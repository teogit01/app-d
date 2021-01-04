import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as XLSX from 'xlsx'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import callApi from 'api/apiCaller';
import DanhSach from './../components/danhsach.js'
import { format, getHours, getMinutes } from 'date-fns'
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const giaovien = JSON.parse(localStorage.getItem('userLogin'))
    const [students, setStudents] = useState([])
    const [studentsImport, setStudentsImport] = useState([])
    const [isOpenFormAddNhom, setIsOpenFormAddNhom] = useState(false);
    const toggleAddNhom = () => {
        setIsOpenFormAddNhom(!isOpenFormAddNhom)
    }
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
            setStudentsImport(data)
            setIsShowDanhSach(true)
        })
    }
    const [isShowDanhSach, setIsShowDanhSach] = useState(false)
    // onSave tao nhom
    const [maValue, setMaValue] = useState('')
    const [tenValue, setTenValue] = useState('')
    const [namhocValue, setNamHoc] = useState('')
    const [thongbaos, setThongbaos] = useState([])
    const [nhomRender, setNhomRender] = useState([])
    const changeValue = (e) => {
        const name = e.target.name
        if (name === 'ma') {
            setMaValue(e.target.value)
        }
        if (name === 'ten') {
            setTenValue(e.target.value)
        }
        if (name === 'namhoc') {
            setNamHoc(e.target.value)
        }
    }
    const [nhoms, setNhoms] = useState([])
    const [nhomActived, setNhomActived] = useState('')
    useEffect(() => {
        const LOAD_NHOM = async () => {
            let data = await callApi(`nhom/giao-vien/${giaovien[0]._id}`)
            if (data) {
                //console.log('data', data)
                setNhoms(data.data)
                setNhomRender(data.data)
                setNhomActived(data.data[0])
                //setThongbaos(data.data[0].thongbaos)
            }
        }
        LOAD_NHOM()
    }, [])
    useEffect(() => {
        setNhomRender(nhoms)
        if (nhoms.length > 0) {
            setNhomActived(nhoms[0])
        } else {
            setNhomActived('')
        }
    }, [nhoms])
    useEffect(() => {
        if (nhomActived === '') {
            setThongbaos('')
        }
    }, [nhomActived])
    useEffect(() => {
        const LOAD_THONGBAO = async () => {
            let data_thongbao = await callApi(`thong-bao/nhom/${nhomActived._id}`)
            setThongbaos(data_thongbao.data)
        }
        const LOAD_SV = async () => {
            let data = await callApi(`tai-khoan/nhom/${nhomActived._id}`)
            let data_thongbaos = await callApi(`thong-bao/nhom/${nhomActived._id}`)
            if (data) {
                data.data.sinhviens.sort()
                setStudents(data.data.sinhviens.sort((a, b) => {
                    if (a.maso < b.maso)
                        return -1
                }))
                setThongbaos(data_thongbaos.data)
                setIsShowDanhSach(false)
                //setStudents(data.data.sinhviens)
                //console.log('data', data.data)
            }
        }
        if (nhomActived) {
            LOAD_SV()
            LOAD_THONGBAO()
        }
    }, [nhomActived])
    const onSaveTaoNhom = () => {
        const data = {
            ma: maValue,
            ten: tenValue,
            namhoc: namhocValue,
            giaovien: giaovien[0]._id
        }
        //console.log('data', data)
        callApi('nhom/add', 'POST', data).then(res => {
            //let newNhoms = [...nhoms, res.data]            
            setNhoms(res.data)
            setNhomActived(res.data[res.data.length - 1])
        })
        setMaValue('')
        setTenValue('')
        setNamHoc('')
        toggleAddNhom()
    }
    const removeNhom = (nhom) => {

        callApi(`nhom/remove/${nhom._id}`)
        let newNhoms = nhoms.filter(x => x._id != nhom._id)
        setNhoms(newNhoms)
    }

    // create Account
    const createAccount = (students) => {
        const data = {
            students: students,
            nhomActived: nhomActived
        }
        callApi('tai-khoan/create', 'POST', data).then(res => {
            console.log('ok')
        })
    }
    // activeNhom
    const activeNhom = (nhom) => {
        setNhomActived(nhom)
    }
    //showDanhSach    
    const showDanhSach = () => {
        setIsShowDanhSach(!isShowDanhSach)
    }
    // thong bao
    const [thongbaoValue, setThongBaoValue] = useState('')
    const [isOpenThongBao, setIsOpenThongBao] = useState(false)
    const toggleThongBao = () => {
        setIsOpenThongBao(!isOpenThongBao)
        setThongBaoValue('')
    }
    const changeValueThongBao = (e) => {
        setThongBaoValue(e.target.value)
    }

    const saveTaoThongBao = () => {
        const day = new Date()
        const data = {
            noidung: thongbaoValue,
            ngay: format(day, 'dd/MM/yyyy'),
            gio: (0 + '' + getHours(day)).slice(-2) + ':' + (0 + '' + getMinutes(day)).slice(-2),
            _idnhom: nhomActived._id
        }
        toggleThongBao()
        callApi('thong-bao/them', 'POST', data).then((res) => {
            setThongbaos(res.data)
        })
    }

    // remove thong bao
    const handleRemoveThongBao = (thongbao) => {
        const newThongbaos = thongbaos.filter(tb => tb._id != thongbao._id)
        setThongbaos(newThongbaos)
        const data = {
            _idnhom: nhomActived._id,
            _idthongbao: thongbao._id
        }
        callApi(`thong-bao/remove`, 'POST', data)
    }
    // end thong bao    

    ///search
    const [isSearch, setIsSearch] = useState(false)
    const [keySearch, setKeySearch] = useState('')
    const typingTimeoutRef = useRef(null)
    const changeSearch = (e) => {
        const value = e.target.value
        setKeySearch(value)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            // callApi(`ki-thi/tim-kiem`, 'POST', { key: value }).then(res => {
            //     console.log('res', res.data)
            // })               
            const newNhoms = nhoms.filter(nhom => nhom.ma.toUpperCase().indexOf(value.toUpperCase()) !== -1)
            let result = []
            const findCode = nhoms.map(nhom => {
                nhom.sinhviens.map(sv => {
                    if (sv.maso.toUpperCase() === value.toUpperCase())
                        result.push(nhom)
                })
            })
            const dataRender = result.length > 0 ? result : newNhoms
            setNhomRender(dataRender)
            if (dataRender.length > 0) {
                setNhomActived(dataRender[0])
            } else {
                setNhomActived('')
            }
        }, 1000)
    }

    return (
        <div className='page-nhom'>
            <div className='content-page'>
                <FontAwesomeIcon className='ic-add ic-init ic-search' icon="search" onClick={() => setIsSearch(!isSearch)} />
                <input type='text'
                    className={isSearch ? 'search-input-actived' : 'search-input'}
                    value={keySearch}
                    onChange={changeSearch}
                />
                {/* <label onClick={() => setIsCN(!isCN)} className=' ic-init'>CN</label> */}

                {/* <div className={isCN ? 'show' : 'show'}> */}
                <div>
                    <FontAwesomeIcon className='ic-add ic-init ic-add-nhom' icon="plus" onClick={() => toggleAddNhom()} />
                    {/* <FontAwesomeIcon className='ic-add ic-init2 ic-' icon="plus" /> */}
                    <label htmlFor='importt' >
                        <FontAwesomeIcon className='ic-add ic-init ic-import' icon="file-import" />
                    </label>
                    <input
                        type='file'
                        id='importt'
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0]
                            readExcel(file)
                        }}
                    />
                </div>

                <div className='left'>
                    {
                        nhomRender.length > 0 &&
                        nhomRender.map(nhom => {
                            return (
                                <div className={nhomActived && nhom._id === nhomActived._id ? 'nhom-actived' : 'nhom'}
                                    key={nhom._id}
                                    onClick={() => activeNhom(nhom)}
                                >
                                    <div className='remove' onClick={() => removeNhom(nhom)}>X</div>
                                    <div className='control'>
                                        <label>Mã nhóm</label>
                                        <div>{nhom.ma}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Tên nhóm</label>
                                        <div>{nhom.ten}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Gíao viên</label>
                                        <div>{nhom.giaoviens[0].ten}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Sỉ số</label>
                                        <div>{nhom.ma}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Thành viên</label>
                                        <div onClick={showDanhSach}>Danh sách nhóm</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right'>
                    <div style={{ display: isShowDanhSach ? 'block' : 'none' }}>
                        {
                            studentsImport &&
                            <DanhSach
                                nhomActived={nhomActived}
                                students={students}
                                studentsImport={studentsImport}
                                createAccount={createAccount} />
                        }
                    </div>
                    <div className='thong-bao'>
                        <div style={{ display: !isShowDanhSach ? 'block' : 'none' }}>
                            {
                                thongbaos.length > 0 &&
                                <div className='title' onClick={toggleThongBao}>
                                    <div>Đăng thông báo mới</div>
                                </div>
                            }
                            <div className='noi-dung'>
                                {
                                    thongbaos.length > 0 &&
                                    thongbaos.sort((a, b) => {
                                        if (a._id > b._id)
                                            return -1
                                    }).map(thongbao => {
                                        return (
                                            <div key={thongbao._id} className='thong-bao-item'>
                                                <div className='remove' onClick={() => handleRemoveThongBao(thongbao)}>
                                                    x
                                                </div>
                                                <div>
                                                    {thongbao.noidung}
                                                </div>
                                                <div className='thoi-gian'>
                                                    {thongbao.gio} &nbsp;&nbsp;
                                                    {thongbao.ngay}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Modal them nhom*/}
            <div>
                <Modal isOpen={isOpenFormAddNhom}>
                    <ModalHeader>Tạo nhóm</ModalHeader>
                    <ModalBody>
                        <form className='form-add-nhom'>
                            <div className='control'>
                                <label>Mã nhóm</label>
                                <div>
                                    <input type='text' value={maValue} onChange={changeValue} name='ma' />
                                </div>
                            </div>
                            <div className='control'>
                                <label>Tên nhóm</label>
                                <div>
                                    <input type='text' value={tenValue} onChange={changeValue} name='ten' />
                                </div>
                            </div>
                            <div className='control'>
                                <label>Năm học</label>
                                <div>
                                    <select className='form-control' name='namhoc' value={namhocValue} onChange={changeValue}>
                                        <option value='2018-2019'>2017-2018</option>
                                        <option value='2018-2019'>2018-2019</option>
                                        <option value='2019-2020'>2019-2020</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className='btn btn-primary' color="primary" onClick={onSaveTaoNhom}>Tạo</div>
                        <Button color="secondary" onClick={toggleAddNhom}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            {/*thong bao*/}
            <div>
                <Modal isOpen={isOpenThongBao}>
                    <div className='dang-thong-bao'>
                        <div className='title'>
                            <h3>Tạo bài viết</h3>
                            <div className='exit' onClick={toggleThongBao}>X</div>
                        </div>
                        <hr />
                        <div className='noi-dung-thong-bao'>
                            <textarea
                                name='thongbao'
                                value={thongbaoValue}
                                onChange={changeValueThongBao}
                                className='form-control'
                                placeholder='Thông báo...' rows='10'>

                            </textarea>
                        </div>
                        <div className='button btn btn-warning btn-block' onClick={saveTaoThongBao}>Đăng</div>
                    </div>
                </Modal>
            </div>
        </div >
    );
}

export default PageMain;