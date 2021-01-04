import React, { useEffect, useState } from 'react';
import './css/giao-vien-ct.scss'
import PropTypes from 'prop-types';
import { useHistory, Link, useRouteMatch } from 'react-router-dom';
import callApi from 'api/apiCaller';
import classnames from 'classnames'
GiaoVienCT.propTypes = {

};

const TrangThai = [
    { type: 0, note: 'Chờ duyệt' }, { type: 1, note: 'Đang hoạt động' }, { type: 2, note: 'Bị khoá' },
]
function GiaoVienCT(props) {
    const match = useRouteMatch()
    const _idgv = match.params._id
    const [giaovien, setGiaovien] = useState('')
    const [nhomActived, setNhomActived] = useState('')
    const [thongbaos, setThongbaos] = useState([])
    const [kithiActived, setKithiActived] = useState('')
    const [dethis, setDethis] = useState([])
    const [tt, setTT] = useState('')
    const [tabActived, setTabActived] = useState('thongtin')
    useEffect(() => {
        if (_idgv) {
            callApi('tai-khoan/chi-tiet', 'POST', { _idtk: _idgv }).then(res => {
                setGiaovien(res.data.result)
                setTT(res.data.result.trangthai)
                if (res.data.result.nhoms.length > 0) {
                    setNhomActived(res.data.result.nhoms[0])
                }
            })
        }
    }, [])

    useEffect(() => {
        if (nhomActived.thongbaos && nhomActived.thongbaos.length > 0) {
            setThongbaos(nhomActived.thongbaos.reverse())
        } else {
            setThongbaos([])
        }
    }, [nhomActived])
    useEffect(() => {
        if (kithiActived.dethis && kithiActived.dethis.length > 0) {
            setDethis(kithiActived.dethis)
        }
    }, [kithiActived])

    const _changeActived = (type, value) => {
        if (type === 'nhom') {
            setNhomActived(value)
        }
        if (type === 'kithi') {
            setKithiActived(value)
        }
    }
    const _captk = () => {
        // const data = {
        //     _idgv: giaovien._id
        // }

        // callApi(`sendmail`, 'POST', data)
        callApi('tai-khoan/cap-mat-khau', 'POST', { _idgv: giaovien._id }).then(res => {
            const data = {
                name: 'Name',
                email: giaovien.email,
                pass: res.data.pass
            }
            setTT(1)
            callApi('sendmail', 'POST', data)
        })
        ///console.log('data', data)
    }
    console.log(tt)
    return (
        <div className='giao-vien-chi-tiet'>
            <div>
                <h5><i>
                    <span><Link to="/admin/tai-khoan">Quản lí tài khoản</Link></span> / &nbsp;
                    <span><Link to='/admin/tai-khoan/giao-vien'>giáo viên</Link></span> / &nbsp;
                    <span><Link to='/admin/tai-khoan/giao-vien'>{giaovien && giaovien.ten}</Link></span>
                </i></h5>
            </div>
            <hr />
            <div className='giaovien-content'>
                <div className='giaovien-main'>
                    <div className='giaovien-item'>
                        <div className='giaovien-item-detail'>
                            <div className='giaovien-item-detail-header'>
                                <div
                                    className={classnames(
                                        'giaovien-item-detail-header-item',
                                        { 'actived': tabActived === 'thongtin' }
                                    )}
                                    onClick={() => { setTabActived('thongtin') }}
                                >
                                    Thông tin cá nhân
                                </div>
                                <div
                                    className={classnames(
                                        'giaovien-item-detail-header-item',
                                        { 'actived': tabActived === 'nhom' }
                                    )}
                                    onClick={() => { setTabActived('nhom') }}
                                >
                                    Danh sách nhóm
                                </div>
                                <div
                                    className={classnames(
                                        'giaovien-item-detail-header-item',
                                        { 'actived': tabActived === 'kithi' }
                                    )}
                                    onClick={() => { setTabActived('kithi') }}
                                >
                                    Danh sách kì thi
                                </div>
                            </div>

                            <div className='giaovien-item-detail-content'>
                                <div
                                    className={classnames(
                                        'giaovien-item-detail-content-thongtin',
                                        { 'show': tabActived === 'thongtin' }
                                    )}>
                                    <div className='avatar'>avatae</div>
                                    <div className='thong-tin'>
                                        <div className='control'>
                                            <label>MSGV:</label>
                                            <div className='control-noidung'>{giaovien.maso}</div>
                                        </div>
                                        <div className='control'>
                                            <label>Họ Tên:</label>
                                            <div className='control-noidung'>{giaovien.ten}</div>
                                        </div>
                                        <div className='control'>
                                            <label>Email:</label>
                                            <div className='control-noidung'>{giaovien.email}</div>
                                        </div>
                                        <div className='control'>
                                            <label>SĐT:</label>
                                            <div className='control-noidung'>{giaovien.sdt}</div>
                                        </div>
                                        <div className='control'>
                                            <label>Địa Chi:</label>
                                            <div className='control-noidung'>{giaovien.diachi}</div>
                                        </div>
                                        <div className='control'>
                                            <label>Trạng thái:</label>
                                            <div className='control-noidung'>
                                                <select className=''>
                                                    <option value={tt}>
                                                        {tt === 0 ? 'Chờ duyệt' : tt === 1 ?
                                                            'Đã duyệt' : 'Bị khoá'}
                                                    </option>
                                                    {
                                                        TrangThai.filter(tt => tt.type !== giaovien.trangthai).map(item => {
                                                            return (
                                                                <option key={item.type}
                                                                    value={item.type}
                                                                >
                                                                    {item.note}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            tt && tt !== 0 ? '' :
                                                <div className='control'>
                                                    <label>Duyệt TK:</label>
                                                    <div className='control-noidung cap-mk'
                                                        onClick={_captk}
                                                    >
                                                        Cấp mật khẩu
                                                </div>
                                                </div>
                                        }
                                    </div>
                                </div>

                                {/* Danh sach nhom */}
                                <div
                                    className={classnames(
                                        'giaovien-item-detail-content-nhom',
                                        { 'show': tabActived === 'nhom' }
                                    )}>
                                    <div className='list-nhom'>
                                        {
                                            (giaovien.nhoms && giaovien.nhoms.length > 0) &&
                                            giaovien.nhoms.map(nhom => {
                                                return (
                                                    <div
                                                        key={nhom._id}
                                                        className={classnames(
                                                            'nhom-item',
                                                            { 'nhom-item-actived': nhom._id === nhomActived._id }
                                                        )}
                                                        onClick={() => _changeActived('nhom', nhom)}>
                                                        {nhom.ten}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* nhom right thong bao*/}
                                    <div className='nhom-detail thongbaos'>
                                        {
                                            (thongbaos && thongbaos.length > 0) ?
                                                thongbaos.map((tb, idx) => {
                                                    return (
                                                        <div
                                                            key={tb._id}
                                                            className='thongbao-item'
                                                        >
                                                            <div className='noidung'>
                                                                {tb.noidung}
                                                            </div>
                                                            <div className='ngay-gio'>
                                                                {tb.gio}
                                                                &nbsp;
                                                                &nbsp;
                                                                {tb.ngay}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                : <div><i>Không có thông báo</i></div>
                                        }
                                    </div>
                                </div>
                                {/* End Danh sach nhom */}
                                {/* Danh sach ki thi*/}

                                <div
                                    className={classnames(
                                        'giaovien-item-detail-content-kithi',
                                        { 'show': tabActived === 'kithi' }
                                    )}>
                                    <div className='list-kithi'>
                                        {
                                            (giaovien.kithis && giaovien.kithis.length > 0) &&
                                            giaovien.kithis.map(kithi => {
                                                return (
                                                    <div
                                                        key={kithi._id}
                                                        className={classnames(
                                                            'kithi-item',
                                                            { 'kithi-item-actived': kithi._id === kithiActived._id }
                                                        )}
                                                        onClick={() => _changeActived('kithi', kithi)}>
                                                        {kithi.tieude}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* nhom right thong bao*/}
                                    <div className='kithi-detail dethis'>
                                        {
                                            kithiActived &&
                                            <div>
                                                <div className='control'>
                                                    <label>Mã kì thi</label>
                                                    <div>{kithiActived.ma}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Tiêu đề</label>
                                                    <div>{kithiActived.tieude}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Ngày thi</label>
                                                    <div>{kithiActived.ngaythi}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Thời gian</label>
                                                    <div>{kithiActived.thoigian}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Mật khẩu</label>
                                                    <div>{kithiActived.matkhau}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Tình trạng</label>
                                                    <div>
                                                        {kithiActived.tinhtrang === 0 ? 'Đã thi' :
                                                            kithiActived.tinhtrang === 1 ? 'Đang thi' : 'Chưa thi'
                                                        }
                                                    </div>
                                                </div>
                                                <div className='control'>
                                                    <label>Đề</label>
                                                    <div>{kithiActived.dethis.length}</div>
                                                </div>
                                            </div>
                                        }
                                        {/* {
                                            (dethis && dethis.length > 0) ?
                                                dethis.map((dethi, idx) => {
                                                    return (
                                                        <div
                                                            key={dethi._id}
                                                            className='kithi-item'
                                                        >
                                                            <div className='noidung'>
                                                                {dethi.noidung}
                                                            </div>
                                                            <div className='ngay-gio'>
                                                                {dethi.gio}
                                                                &nbsp;
                                                                &nbsp;
                                                                {dethi.ngay}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                : <div><i>Không có đề thi</i></div>
                                        } */}
                                    </div>
                                </div>
                                {/* End danh sach ki thi*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default GiaoVienCT;