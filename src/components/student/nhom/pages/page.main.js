import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import * as XLSX from 'xlsx'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import callApi from 'api/apiCaller';
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const sinhvien = JSON.parse(localStorage.getItem('userLogin'))
    const [students, setStudents] = useState([])
    const [isOpenFormAddNhom, setIsOpenFormAddNhom] = useState(false);
    const toggleAddNhom = () => setIsOpenFormAddNhom(!isOpenFormAddNhom);
    const [nhoms, setNhoms] = useState([])
    const [nhomActived, setNhomActived] = useState('')
    const [thongbaos, setThongbaos] = useState([])

    useEffect(() => {
        const LOAD_NHOM = async () => {
            let data = await callApi(`nhom/sinh-vien/${sinhvien[0]._id}`)
            if (data) {
                setNhoms(data.data)
                if (data.data[0]) {
                    setNhomActived(data.data[0])
                    setThongbaos([...data.data[0].thongbaos].reverse())
                }
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


    // create Account

    // activeNhom
    const activeNhom = (nhom) => {
        setNhomActived(nhom)
        setThongbaos([...nhom.thongbaos].reverse())
    }
    return (
        <div className='page-nhom'>
            <div className='content-page'>
                {/* <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={() => toggleAddNhom()} />
                <FontAwesomeIcon className='ic-add ic-init2' icon="plus" />
                <label htmlFor='importt' >
                    <FontAwesomeIcon className='ic-add ic-init2' style={{ top: '200px' }} icon="file-import" />
                </label> */}

                <div className='left'>
                    {
                        nhoms.length > 0 &&
                        nhoms.map(nhom => {
                            return (
                                <div className={nhom._id === nhomActived._id ? 'nhom-actived' : 'nhom'}
                                    key={nhom._id}
                                    onClick={() => activeNhom(nhom)}
                                >
                                    <div className='remove'></div>
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
                            thongbaos.length > 0 &&
                            thongbaos.map(thongbao => {
                                return (
                                    <div className='thong-bao' key={thongbao._id}>
                                        <div className='thong-bao-noi-dung'>
                                            {thongbao.noidung}
                                        </div>
                                        <div className='thong-bao-ngay-gio'>
                                            <div>{thongbao.gio}</div>
                                            <div>{thongbao.ngay}</div>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div >
    );
}

export default PageMain;