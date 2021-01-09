import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './css/giao-vien.scss'
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
    const [giaoviens, setGiaoviens] = useState([])
    const [GV, setGV] = useState([])
    useEffect(() => {
        callApi('tai-khoan/giao-vien').then(res => {
            if (res.data.giaoviens) {
                setGiaoviens(res.data.giaoviens)
                setGV(res.data.giaoviens)
            }
        })
    }, [])

    // const match = useRouteMatch()
    const _detail = (gv) => {
        history.push(`${match.url}/${gv._id}`)
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
                const newGV = GV.filter(gv => gv.maso.toUpperCase().indexOf(value.toUpperCase()) !== -1)
                setGiaoviens(newGV)

            }, 1000)
        }
    }
    return (
        <div className='giao-vien'>
            <div>
                {/* <h5><i><span onClick={_back}>Quản lí tài khoản</span> / giáo viên</i></h5> */}
                <h5><i>
                    <span><Link to="/admin/tai-khoan">Quản lí tài khoản</Link></span> / &nbsp;
                    <span><Link to='/admin/tai-khoan/giao-vien'>giáo viên</Link></span>
                </i></h5>
            </div>
            <hr />

            <div className='giaovien-content'>
                <div className='giaovien-main'>
                    <div className='giaovien-item'>
                        <div className='giaovien-item-detail'>
                            <div className='giaovien-item-detail-header'>
                                <div className='giaovien-item-detail-header-item actived'>
                                    Danh sách giáo viên
                                </div>
                                <div className='giaovien-item-detail-header-item search '>
                                    <input type='text' placeholder='Tìm giáo viên'
                                        onChange={_onChange}
                                        value={keySearch}
                                        name='search'
                                    />
                                    <FontAwesomeIcon className='' icon="search" />
                                </div>
                            </div>

                            <div className='giaovien-item-detail-content'>
                                <div className='giaovien-item-detail-content-danhsach'>
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
                                        <div className='head status'>
                                            Trạng thái
                                        </div>
                                    </div>

                                    {
                                        giaoviens.length > 0 &&
                                        giaoviens.map((gv, idx) => {
                                            return (
                                                <div className='control' key={gv._id} onClick={() => _detail(gv)}>
                                                    <div className=' stt'>
                                                        {idx + 1}
                                                    </div>
                                                    <div className=' code'>
                                                        {gv.maso}
                                                    </div>
                                                    <div className=' name'>
                                                        {gv.ten}
                                                    </div>
                                                    <div className=' email'>
                                                        {gv.email}
                                                    </div>
                                                    <div
                                                        className={classnames(
                                                            'status',
                                                            { 'bg-danger': gv.trangthai === 2 },
                                                            { 'bg-success': gv.trangthai === 1 },
                                                            { 'bg-warning': gv.trangthai === 0 }
                                                        )
                                                        }
                                                    >
                                                        {
                                                            gv.trangthai === 0 ? 'Chờ duyệt' :
                                                                gv.trangthai === 1 ? 'Đang hoạt động' : 'Bị Khoá'
                                                        }
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
            </div>
        </div >
    );
}

export default GiaoVien;