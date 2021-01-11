import React, { useState, useEffect } from 'react';
import './css/kithi-ct.scss'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Select from 'react-select'
import callApi from 'api/apiCaller';
KiThiCt.propTypes = {
    kithi: PropTypes.object,
    result: PropTypes.func
};

function KiThiCt(props) {
    const { kithi, updateKT, result } = props
    const [tab, setTab] = useState('thongtin')
    const [optionDT, setOptionDT] = useState([])
    const [optionN, setOptionN] = useState([])
    const [dethis, setDethis] = useState([])
    const [nhoms, setNhoms] = useState([])
    const [tt, setTT] = useState(false)
    const [ttr, setTTR] = useState('')
    const user = JSON.parse(localStorage.getItem('userLogin'))
    //console.log(kithi)
    useEffect(() => {
        if (kithi) {
            callApi('de-thi/mon', 'POST', { _idmon: kithi.mon }).then(res => {
                if (res.data.dethis) {
                    const arr = []
                    res.data.dethis.map(item => {
                        arr.push({
                            label: `${item.tieude} (${item.ma})`,
                            value: item._id
                        })
                    })
                    setOptionDT(arr)
                }
            })
            callApi('nhom/giao-vien', 'POST', { _idgv: user[0]._id }).then(res => {
                if (res.data.taikhoan) {
                    const arr = []
                    res.data.taikhoan.nhoms.map(item => {
                        arr.push({
                            label: `${item.ten} (${item.ma})`,
                            value: item._id
                        })
                    })
                    setOptionN(arr)
                }
            })
        }
        if (kithi && kithi.dethis && kithi.dethis) {
            setDethis(kithi.dethis)
        }
        if (kithi && kithi.nhoms) {
            setNhoms(kithi.nhoms)
        }
        if (kithi) {
            setTT(kithi.trangthai)
            setTTR(kithi.tinhtrang)
        }
    }, [kithi])
    // toggle
    const [modalDT, setModalDT] = useState(false);
    const toggleDT = () => setModalDT(!modalDT);
    const [modalN, setModalN] = useState(false);
    const toggleN = () => setModalN(!modalN);
    const _add = type => {
        if (type === 'DT') {
            toggleDT()
        }
        if (type === 'N') {
            toggleN()
        }
    }
    const _onSubmit = type => {
        if (type === 'DT') {
            const data = {
                dethis: dethiSelected,
                _idkithi: kithi._id
            }
            callApi('ki-thi/them-de', 'POST', data).then(res => {
                if (res.data.kithi) {
                    result(res.data.kithi)
                }
            })
            toggleDT()
        }
        if (type === 'N') {
            const data = {
                nhoms: nhomSelected,
                _idkithi: kithi._id
            }
            callApi('ki-thi/them-nhom', 'POST', data).then(res => {
                if (res.data.kithi) {
                    result(res.data.kithi)
                }
            })
            toggleN()
        }
    }
    const [dethiSelected, setDethiSelected] = useState([])
    const [nhomSelected, setnhomSelected] = useState([])
    const _changeDT = (arr) => {
        setDethiSelected(arr)
    }
    const _changeN = (arr) => {
        setnhomSelected(arr)
    }
    const [checkMK, setCheckML] = useState(false)
    const [mk, setMk] = useState('')
    const changeMk = e => {
        setMk(e.target.value)
    }
    const _saveMK = () => {
        if (mk === '') {
            setMk(kithi.matkhau)
        }
        else {
            const data = {
                _idkithi: kithi._id,
                mkmoi: mk
            }
            callApi('ki-thi/doi-mat-khau', 'POST', data)
        }
        setCheckML(false)
    }

    const _doitrangthai = () => {
        setTT(!tt)
        callApi(`ki-thi/trang-thai/${kithi._id}`)
    }
    const _batdauthi = () => {
        // set lai dang thi
        const data = {
            _idkithi: kithi._id,
            tinhtrang: 1
        }
        callApi('ki-thi/tinh-trang', 'POST', data).then(res => {
            setTTR(1)
        })
        console.log(data)
        setTimeout(() => {
            const data = {
                _idkithi: kithi._id,
                tinhtrang: 0
            }
            callApi('ki-thi/tinh-trang', 'POST', data).then(res => {
                setTTR(0)
            })
        }, 3000)
    }
    return (
        <div className='kithi-chitiet'>
            <div className='title'>
                <div
                    onClick={() => setTab('thongtin')}
                    className={classnames(
                        'title-item',
                        { 'actived': tab === 'thongtin' }
                    )}
                >
                    Thông tin kì thi
                </div>
                <div
                    onClick={() => setTab('nhom')}
                    className={classnames(
                        'title-item',
                        { 'actived': tab === 'nhom' }
                    )}
                >
                    Các nhóm thi
                    {
                        tab === 'nhom' &&
                        <FontAwesomeIcon className='icon' style={{ marginLeft: '5px' }} icon='plus' onClick={() => _add('N')} />
                    }
                </div>
                <div
                    onClick={() => setTab('dethi')}
                    className={classnames(
                        'title-item',
                        { 'actived': tab === 'dethi' }
                    )}
                >
                    Đề thi
                    {
                        tab === 'dethi' &&
                        <FontAwesomeIcon className='icon' style={{ marginLeft: '5px' }} icon='plus' onClick={() => _add('DT')} />
                    }
                </div>
            </div>
            <div className='detail'>
                <div className='detail-content'>
                    <div className={classnames(
                        'thongtin',
                        { 'show': tab === 'thongtin' }
                    )}>
                        {
                            kithi ? <div className='thongtin-item'>
                                <div className='control'>
                                    <label>Môn</label>
                                    <div>{kithi && kithi.mon.ten}</div>
                                </div>
                                <div className='control'>
                                    <label>Mã kì thi</label>
                                    <div>{kithi && kithi.ma}</div>
                                </div>
                                <div className='control'>
                                    <label>Tiêu đề kì thi</label>
                                    <div>{kithi && kithi.tieude}</div>
                                </div>
                                <div className='control'>
                                    <label>Ngày thi (dự kiến)</label>
                                    <div>{kithi && kithi.ngaythi}</div>
                                </div>
                                <div className='control'>
                                    <label>Thời gian làm bài</label>
                                    <div>{kithi && kithi.thoigian}</div>
                                </div>
                                <div className='control'>
                                    <label>Mật khẩu đề</label>
                                    <div>
                                        <input type='text' value={mk} onChange={changeMk} placeholder={kithi.matkhau} disabled={!checkMK} />
                                    </div>
                                    <div className='doi-mk'>
                                        {
                                            checkMK ?
                                                <i onClick={_saveMK} > Lưu</i> : <i onClick={() => setCheckML(true)}>Đổi mật khẩu</i>
                                        }
                                    </div>
                                </div>
                                <div className='control'>
                                    <label>Tình trạng </label>
                                    <div
                                        className={
                                            ttr === 2 ? 'chuathi' :
                                                ttr === 1 ? 'dangthi' : 'dathi'
                                        }
                                    >
                                        {ttr === 2 ? 'Chưa thi' :
                                            ttr === 1 ? 'Đang thi' : 'Đã thi'}
                                    </div>
                                </div>
                                <div className='control'>
                                    <label>Trạng thái</label>
                                    <div className='trang-thai' onClick={_doitrangthai}>{tt ? 'Đang mở' : 'Đã tắt'}</div>
                                </div>
                                <div className='control'>
                                    <label></label>
                                    {
                                        ttr !== 0 && <div className='batdau' onClick={_batdauthi}>Bắt đầu</div>
                                    }
                                </div>
                            </div>
                                : <div><i>Không có thông tin</i></div>
                        }
                    </div>

                    {/*de thi*/}
                    <div className={classnames(
                        'dethi',
                        { 'show': tab === 'dethi' }
                    )}>
                        <div className='dethi-item'>
                            {
                                (dethis && dethis.length > 0) ?
                                    dethis.map((dethi, idx) => {
                                        return (
                                            <div className='dethi-item1'
                                            >
                                                <div className='control'>
                                                    <label>Mã đề</label>
                                                    <div>{dethi.ma}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Tiêu đề</label>
                                                    <div>{dethi.tieude}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Câu hỏi</label>
                                                    <div>{dethi.cauhois.length}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <div><i>Không có đề thi</i></div>
                            }
                        </div>
                    </div>
                    {/* end de thi*/}

                    {/*nhom thi*/}
                    <div className={classnames(
                        'nhom',
                        { 'show': tab === 'nhom' }
                    )}>
                        <div className='nhom-item'>
                            {
                                (nhoms && nhoms.length > 0) ?
                                    nhoms.map((nhom, idx) => {
                                        return (
                                            <div className='nhom-item1'
                                            >
                                                <div className='control'>
                                                    <label>Mã nhóm</label>
                                                    <div>{nhom.ma}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Tên nhóm</label>
                                                    <div>{nhom.ten}</div>
                                                </div>
                                                <div className='control'>
                                                    <label>Sinh viên</label>
                                                    <div>{nhom.sinhviens.length}</div>
                                                </div>

                                            </div>
                                        )
                                    })
                                    : <div><i>Không có nhóm thi</i></div>
                            }
                        </div>
                    </div>
                    {/* end nhom thi*/}
                </div>
            </div>
            {/* modal de thi*/}
            <div>
                <Modal isOpen={modalDT} toggle={toggleDT} >
                    <ModalHeader toggle={toggleDT}>Thêm đề thi</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Chọn đề</label>
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                options={optionDT}
                                onChange={_changeDT}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSubmit('DT')}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={toggleDT}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/* end modal de thi*/}
            <div>
                <Modal isOpen={modalN} toggle={toggleN} >
                    <ModalHeader toggle={toggleN}>Thêm nhóm thi</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Chọn nhóm</label>
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                options={optionN}
                                onChange={_changeN}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => _onSubmit('N')}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={toggleN}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div >
    );
}

export default KiThiCt;