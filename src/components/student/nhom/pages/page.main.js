import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as XLSX from 'xlsx'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import callApi from 'api/apiCaller';
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const [students, setStudents] = useState([])
    const [studentsImport, setStudentsImport] = useState([])
    const [isOpenFormAddNhom, setIsOpenFormAddNhom] = useState(false);
    const toggleAddNhom = () => setIsOpenFormAddNhom(!isOpenFormAddNhom);

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
            setStudentsImport(data)
        })
    }

    // onSave tao nhom
    const [maValue, setMaValue] = useState('')
    const [tenValue, setTenValue] = useState('')
    const [namhocValue, setNamHoc] = useState('')
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
            let data = await callApi('nhom')
            if (data) {
                setNhoms(data.data)
                setNhomActived(data.data[0])
            }
        }
        LOAD_NHOM()
    }, [])
    useEffect(() => {
        const LOAD_SV = async () => {
            let data = await callApi(`tai-khoan/nhom/${nhomActived._id}`)
            if (data.data.sinhviens) {
                //data.data.sinhviens.sort()
                setStudents(data.data.sinhviens.sort((a, b) => {
                    if (a.maso < b.maso)
                        return -1
                }))
            }
            //console.log(data.data.sinhviens)
        }
        LOAD_SV()
    }, [nhomActived])
    const giaovien = JSON.parse(localStorage.getItem('userLogin'))
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

        toggleAddNhom()
    }
    const removeNhom = (nhom) => {

        callApi(`nhom/remove/${nhom._id}`).then(res => {
            setNhoms(res.data)
        })
    }

    // create Account
    const createAccount = () => {
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
    return (
        <div className='page-nhom'>
            <div className='content-page'>
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={() => toggleAddNhom()} />
                <FontAwesomeIcon className='ic-add ic-init2' icon="plus" />
                <label htmlFor='importt' >
                    <FontAwesomeIcon className='ic-add ic-init2' style={{ top: '200px' }} icon="file-import" />
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
                <div className='left'>
                    {
                        nhoms.length > 0 &&
                        nhoms.map(nhom => {
                            return (
                                <div className={nhom._id === nhomActived._id ? 'nhom-actived' : 'nhom'}
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
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right'>
                    <div className='students'>
                        {
                            students.length > 0 &&
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ fontWeight: 'bold' }}>Danh sách sinh viên nhóm ....</h4>
                                </div>
                                <br />
                                <table className='tb'>
                                    <tr>
                                        <th>Stt</th>
                                        <th>Mssv</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>MK</th>
                                    </tr>
                                    {
                                        students.length > 0 &&
                                        students.map((student, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{student.maso}</td>
                                                    <td>{student.ten}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.matkhautam}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        studentsImport.length > 0 &&
                                        studentsImport.map((student, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{student.MSSV}</td>
                                                    <td>{student['Họ tên']}</td>
                                                    <td>{student['Email']}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                                <div className='control-cap-tai-khoan'>
                                    <div className='btn btn-info'>Cấp tài khoản</div>
                                    &nbsp;
                                    <div className='btn btn-info' onClick={createAccount}>Lưu lại</div>
                                </div>
                            </div>
                        }
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
        </div >
    );
}

export default PageMain;