import React, { useEffect, useState } from 'react';
import './css/thong-ke.scss'
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import callApi from 'api/apiCaller';
import classnames from 'classnames'
import { UncontrolledCollapse } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Thongke(props) {
    const [nguoidung, setNguoidung] = useState([])
    const [mons, setMons] = useState([])
    const [nhoms, setNhoms] = useState([])
    const [kithis, setKithis] = useState([])
    useEffect(() => {
        callApi('tai-khoan').then(res => {
            setNguoidung(res.data)
        })
        callApi('mon').then(res => {
            setMons(res.data.mons)
        })
        callApi('nhom').then(res => {
            setNhoms(res.data.nhoms)
        })
        callApi('ki-thi').then(res => {
            setKithis(res.data)
        })
    }, [])

    useEffect(() => {
        if (nguoidung.length) {
            const gv = nguoidung.filter(item => item.vaitro === 1)
            console.log(gv)
        }

    }, [nguoidung])
    const mucs = [
        { name: 'Người dùng', _id: 'nd' },
        { name: 'Môn', _id: 'm' },
        { name: 'Đề thi', _id: 'dt' },
        { name: 'Nhóm', _id: 'n' },
        { name: 'Kì thi', _id: 'kt' },
    ]
    const [mucActived, setMucActived] = useState(mucs[0])
    return (
        <div className='page-thongke'>
            <div>
                {/* <h5><i><span onClick={_back}>Quản lí tài khoản</span> / giáo viên</i></h5> */}
                <h5><i>
                    <span><Link to="/admin/cau-hoi">Xem Thống kê</Link></span>
                </i></h5>
            </div>
            <hr />
            <div className='thongke-main'>
                <div className='thongke-item'>
                    <div className='thongke-item-title'>
                        Người dùng :{nguoidung.length}
                    </div>
                    <div className='thongke-item-content'>
                        <div>Giáo viên: &nbsp;
                            {
                                nguoidung.filter(item => item.vaitro === 1).length
                            }
                        </div>
                        <div>Sinh viên:&nbsp;
                            {
                                nguoidung.filter(item => item.vaitro === 2).length
                            }
                        </div>
                    </div>
                </div>

                <div className='thongke-item'>
                    <div className='thongke-item-title'>
                        Môn: {mons.length}
                    </div>
                    <div className='thongke-item-content'>
                        {
                            mons.length > 0 &&
                            mons.map((item, idx) => {
                                return (
                                    <div>
                                        <div>
                                            {item.ten} ({item.ma})
                                        </div>
                                        <div style={{ padding: '0 120px' }}>
                                            <div>Đề thi: {item.dethis.length}</div>
                                            <div>Kì thi: {item.kithis.length}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='thongke-item'>
                    <div className='thongke-item-title'>
                        Nhóm: {nhoms.length}
                    </div>
                    <div className='thongke-item-content'>
                        {
                            nhoms.length > 0 &&
                            nhoms.map((item, idx) => {
                                return (
                                    <div>
                                        <div>
                                            {item.ten} ({item.ma})
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='thongke-item'>
                    <div className='thongke-item-title'>
                        Kì thi: {kithis.length}
                    </div>
                    <div className='thongke-item-content'>
                        {
                            kithis.length > 0 &&
                            kithis.map((item, idx) => {
                                return (
                                    <div>
                                        <div>
                                            {item.tieude} ({item.ma})
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* <div className='thongke-muc'>
                    <div className='thongke-muc-title'>
                        Mục thống kê
                    </div>
                    <div className='thongke-muc-content'>
                        {
                            mucs.map(item => {
                                return (
                                    <div
                                        onClick={() => setMucActived(item)}
                                        className={item._id === mucActived._id ? 'thongke-muc-content-item actived' : 'thongke-muc-content-item'}>
                                        {item.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='thongke-chitiet'>
                    <div className='thongke-chitiet-title'>
                        Chi tiết thống kê
                    </div>
                    <div className='thongke-chitiet-content'>

                    </div>
                </div> */}
            </div>
        </div >
    );
}

export default Thongke;