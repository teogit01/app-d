import React, { useState, useEffect } from 'react';
import './css/nhom-ct.scss'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { format, getHours, getMinutes } from 'date-fns'
import callApi from 'api/apiCaller';
import * as XLSX from 'xlsx'

NhomCT.propTypes = {
    nhomActived: PropTypes.object
};

function NhomCT(props) {
    const { nhomActived } = props
    const [dataIP, setDataIP] = useState([])
    const [thongbaos, setThongbaos] = useState([])
    const [sinhviens, setSinhviens] = useState([])
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
            //console.log('daya', data)
            setDataIP(data)
            setCheckIP(true)
            // setIsShowDanhSach(true)
        })
    }
    // console.log('sv', sinhviens)
    useEffect(() => {
        if (dataIP.length > 0) {
            const newSinhviens = []
            dataIP.map(item => {
                newSinhviens.push({
                    maso: item.MSSV,
                    ten: item['Họ tên'],
                    sdt: '',
                    email: item['Email'],
                    diachi: '',
                })
            })
            setSinhviens(newSinhviens)
        }
    }, [dataIP])
    const [tab, setTab] = useState('thongbao')
    const _change = (type, value) => {
        if (type === 'tab') {
            setTab(value)
        }
    }

    useEffect(() => {
        if (nhomActived.thongbaos && nhomActived.thongbaos.length > 0) {
            setThongbaos(nhomActived.thongbaos.reverse())
        } else {
            setThongbaos([])
        }
        if (nhomActived.sinhviens && nhomActived.sinhviens.length > 0) {
            setSinhviens(nhomActived.sinhviens)
        } else {
            setSinhviens([])
        }
    }, [nhomActived])
    const [newThongbao, setNewthongbao] = useState('')
    const _onChange = (e) => {
        setNewthongbao(e.target.value)
    }
    const _enter = (e) => {
        if (e.keyCode === 13) {
            const day = new Date()
            const data = {
                _idnhom: nhomActived._id,
                noidung: newThongbao,
                ngay: format(day, 'dd/MM/yyyy'),
                gio: (0 + '' + getHours(day)).slice(-2) + ':' + (0 + '' + getMinutes(day)).slice(-2),
            }
            callApi('thong-bao/them', 'POST', data).then(res => {
                if (res.data.thongbaos) {
                    setThongbaos(res.data.thongbaos.reverse())

                }
            })
            setNewthongbao('')
        }
    }
    const _onSave = (type) => {
        if (type === 'import') {
            const data = {
                students: dataIP,
                nhomActived: nhomActived
            }
            console.log(data)
            setDataIP([])
            setCheckIP(false)
            callApi('tai-khoan/create', 'POST', data).then(() => {
                window.location.reload()
            })
        }
    }
    return (
        <div className='nhom-chitiet'>
            <div className='nhom-chitiet-title'>
                <div
                    onClick={() => { _change('tab', 'thongbao') }}
                    className={classnames(
                        'nhom-chitiet-title-item',
                        { 'actived': tab === 'thongbao' }
                    )}
                >Thông báo</div>
                <div
                    onClick={() => { _change('tab', 'thongtin') }}
                    className={classnames(
                        'nhom-chitiet-title-item',
                        { 'actived': tab === 'thongtin' }
                    )}>Thông tin nhóm</div>
                <div
                    onClick={() => { _change('tab', 'sinhvien') }}
                    className={classnames(
                        'nhom-chitiet-title-item',
                        { 'actived': tab === 'sinhvien' }
                    )}>Danh sách sinh viên</div>

                {
                    tab === 'sinhvien' &&
                    <>
                        {
                            !checkIP ?
                                <label htmlFor='importt'>
                                    <div className='import'>
                                        import
                                </div>
                                </label> :
                                <div className='import' onClick={() => _onSave('import')}>
                                    Lưu
                            </div>
                        }

                    </>
                }
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

            <div className='nhom-chitiet-content'>
                <div className='nhom-chitiet-content-item'>
                    <div className={classnames(
                        'item-thongbao',
                        { 'show': tab === 'thongbao' }
                    )}>
                        <div className='item-thongbao-title'>
                            <input type='text'
                                value={newThongbao}
                                onChange={_onChange}
                                onKeyDown={_enter}
                                className='form-control'
                                placeholder='Thông báo mới' />
                        </div>
                        <div className='item-thongbao-content'>
                            {
                                (thongbaos && thongbaos.length > 0) ?
                                    thongbaos.map((tb, idx) => {
                                        return (
                                            <div key={tb._id}
                                                className='item-thongbao-content-item'>
                                                <div>
                                                    {tb.noidung}
                                                </div>
                                                <div className='ngay-gio'>
                                                    <div>{tb.gio}</div>
                                                &nbsp;&nbsp;
                                                <div>{tb.ngay}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <div><i>Không có thông báo</i></div>
                            }
                        </div>
                    </div>
                    {/* thong tin*/}
                    <div className={classnames(
                        'item-thongtin',
                        { 'show': tab === 'thongtin' }
                    )}>
                        <div className='item-thongtin-content'>
                            {
                                (nhomActived) &&
                                <div className='item-thongtin-content-item' >
                                    <div className='control'>
                                        <label>Mã nhóm:</label>
                                        <div>{nhomActived.ma}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Tên nhóm:</label>
                                        <div>{nhomActived.ten}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Tên môn:</label>
                                        <div>{nhomActived.mon}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Tình trạng:</label>
                                        <div>{nhomActived.tinhtrang}</div>
                                    </div>
                                    <div className='control'>
                                        <label>Sinh viên:</label>
                                        <div>{nhomActived.sinhviens && nhomActived.sinhviens.length}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* End thong tin */}
                    {/* Danh sach sinh vien */}
                    <div className={classnames(
                        'item-sinhvien',
                        { 'show': tab === 'sinhvien' }
                    )}>
                        <div className='item-sinhvien-content'>
                            {
                                (sinhviens && sinhviens.length > 0) &&
                                sinhviens.map((sv, idx) => {
                                    return (
                                        <div key={sv._id} className='item-sinhvien-content-item'>
                                            <div className='stt'>{idx + 1}</div>
                                            <div className='code'>{sv.maso}</div>
                                            <div className='name'>{sv.ten}</div>
                                            <div className='sdt'>{sv.sdt}</div>
                                            <div className='email'>{sv.email}</div>
                                            <div className='address'>{sv.diachi}</div>
                                            <div className='address'>{sv.matkhautam}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* End danh sach sinh vien */}
                </div>
            </div>
        </div >
    );
}

export default NhomCT;