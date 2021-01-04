import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './css/sinh-vien.scss'
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import callApi from 'api/apiCaller';
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

GiaoVien.propTypes = {

};

function GiaoVien(props) {
    const match = useRouteMatch()
    const history = useHistory()
    // load tai khoan giao vien
    const [sinhviens, setSinhviens] = useState([])
    const [SV, setSV] = useState([])
    useEffect(() => {
        callApi('tai-khoan/sinh-vien').then(res => {
            if (res.data.sinhviens) {
                //setSinhviens(res.data.sinhviens)
                setSV(res.data.sinhviens)
            }
        })
    }, [])

    // const match = useRouteMatch()
    const _detail = (sv) => {
        history.push(`${match.url}/${sv._id}`)
    }
    const typingTimeoutRef = useRef(null)
    const [keySearch, setKeySearch] = useState('')
    const _onChange = e => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'search') {
            setKeySearch(value)
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
            typingTimeoutRef.current = setTimeout(() => {
                const newSV = SV.filter(sv => sv.maso.toUpperCase().indexOf(value.toUpperCase()) !== -1)
                setSinhviens(newSV)
                if (value === '') {
                    setSinhviens([...SV.slice(0, 10)])
                }
            }, 1000)
        }
    }

    const [pageMax, setPageMax] = useState('')
    const [pagin, setPagin] = useState([])
    const [paginActied, setPaginActived] = useState(1)
    useEffect(() => {
        setPageMax(Math.ceil(SV.length / 10))
        const arr = []
        for (let i = 1; i <= Math.ceil(SV.length / 10); i++) {
            arr.push({ i })
        }
        setPagin(arr)
        setSinhviens([...SV.slice(0, 10)])
    }, [SV])

    useEffect(() => {
        const newSinhviens = [...SV.slice((paginActied - 1) * 10, ((paginActied - 1) * 10) + 10)]
        setSinhviens(newSinhviens)
    }, [paginActied])
    return (
        <div className='sinh-vien'>
            <div>
                {/* <h5><i><span onClick={_back}>Quản lí tài khoản</span> / giáo viên</i></h5> */}
                <h5><i>
                    <span><Link to="/admin/tai-khoan">Quản lí tài khoản</Link></span> / &nbsp;
                    <span><Link to='/admin/tai-khoan/sinh-vien'>sinh viên</Link></span>
                </i></h5>
            </div>
            <hr />

            <div className='sinhvien-content'>
                <div className='sinhvien-main'>
                    <div className='sinhvien-item'>
                        <div className='sinhvien-item-detail'>
                            <div className='sinhvien-item-detail-header'>
                                <div className='sinhvien-item-detail-header-item actived'>
                                    Danh sách sinh viên
                                </div>
                                <div className='sinhvien-item-detail-header-item search '>
                                    <input type='text' placeholder='Tìm sinh viên'
                                        onChange={_onChange}
                                        value={keySearch}
                                        name='search'
                                    />
                                    <FontAwesomeIcon className='' icon="search" />
                                </div>
                            </div>

                            <div className='sinhvien-item-detail-content'>
                                <div className='sinhvien-item-detail-content-danhsach'>
                                    <div className='control'>
                                        <div className='head stt'>
                                            #
                                        </div>
                                        <div className='head code'>
                                            Mã số
                                        </div>
                                        <div className='head name'>
                                            Tên
                                        </div>
                                        <div className='head email'>
                                            Email
                                        </div>
                                        <div className='head email'>
                                            Sdt
                                        </div>
                                        <div className='head email'>
                                            Địa chỉ
                                        </div>
                                        {/* <div className='head status'>
                                            Trạng thái
                                        </div> */}
                                    </div>

                                    {
                                        sinhviens.length > 0 &&
                                        sinhviens.map((sv, idx) => {
                                            return (
                                                <div className='control' key={sv._id} onClick={() => _detail(sv)}>
                                                    <div className=' stt'>
                                                        {idx + 1 + (paginActied - 1) * 10}
                                                    </div>
                                                    <div className=' code'>
                                                        {sv.maso}
                                                    </div>
                                                    <div className=' name'>
                                                        {sv.ten}
                                                    </div>
                                                    <div className=' email'>
                                                        {sv.email}
                                                    </div>
                                                    <div className=' email'>
                                                        {sv.sdt}
                                                    </div>
                                                    <div className=' address'>
                                                        {sv.diachi}
                                                    </div>
                                                    {/* <div
                                                        className={classnames(
                                                            'status',
                                                            { 'bg-danger': sv.trangthai === 2 },
                                                            { 'bg-success': sv.trangthai === 1 },
                                                            { 'bg-warning': sv.trangthai === 0 }
                                                        )
                                                        }
                                                    >
                                                        {
                                                            sv.trangthai === 0 ? 'Chờ duyệt' :
                                                                sv.trangthai === 1 ? 'Đang hoạt động' : 'Bị Khoá'
                                                        }
                                                    </div> */}
                                                </div>
                                            )
                                        })
                                    }

                                    <div className='pagin'>
                                        {
                                            pagin.length > 0 &&
                                            <>
                                                <div className='pagin-item'
                                                    onClick={() => setPaginActived(paginActied === 1 ? paginActied : paginActied - 1)}
                                                >
                                                    {`<`}
                                                </div>
                                                {
                                                    pagin.map((item, idx) => {
                                                        return (

                                                            <div
                                                                onClick={() => setPaginActived(idx + 1)}
                                                                className={paginActied === idx + 1 ? 'pagin-item actived' : 'pagin-item'}>
                                                                {idx + 1}
                                                            </div>
                                                        )
                                                    })
                                                }
                                                < div className='pagin-item'
                                                    onClick={() => setPaginActived(paginActied === pageMax ? paginActied : paginActied + 1)}
                                                >
                                                    >
                                                </div>

                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default GiaoVien;