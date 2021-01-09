import React, { useState, useRef, useEffect } from 'react';
import './css/ki-thi.scss'
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import callApi from 'api/apiCaller';
KiThi.propTypes = {
    kithi: PropTypes.object,
    kithiActived: PropTypes.object,
    remove: PropTypes.func,
    changeStatus: PropTypes.func,
    changeKithiActive: PropTypes.func
};

function KiThi(props) {
    const { kithi, kithiActived, remove, changeStatus, changeKithiActive } = props
    const getId = (_idkithi) => {
        remove(_idkithi)
    }

    const [mkdethi, setMkdethi] = useState(kithi.matkhau)
    const [isStatus, setIsStatus] = useState(kithi.trangthai)
    const handleCheckStatus = (kithi) => {
        setIsStatus(!isStatus)
        changeStatus(kithi)
    }

    // chaghe doi mat khau
    const inputRef = useRef(null);
    const [checkMk, setCheckMk] = useState(false)
    const doimatkhau = e => {
        setMkdethi(e.target.value)
    }
    useEffect(() => {
        if (checkMk) {
            inputRef.current.focus()
            setMkdethi('')
        }
    }, [checkMk])
    const luumatkhau = () => {
        if (mkdethi === '') {
            setMkdethi(kithi.matkhau)
            setCheckMk(!checkMk)
        } else {
            const data = {
                _idkithi: kithi._id,
                mkmoi: mkdethi
            }
            callApi('ki-thi/doi-mat-khau', 'POST', data).then(() => {
                setCheckMk(!checkMk)
            })
        }
    }
    const batdauthi = () => {
        // set lai dang thi
        const data = {
            _idkithi: kithiActived._id,
            tinhtrang: 1
        }
        callApi('ki-thi/tinh-trang', 'POST', data).then(res => {
            changeKithiActive(res.data)
        })
        console.log(data)
        setTimeout(() => {
            const data = {
                _idkithi: kithiActived._id,
                tinhtrang: 0
            }
            callApi('ki-thi/tinh-trang', 'POST', data).then(res => {
                changeKithiActive(res.data)
            })
        }, 3000)
    }
    return (
        <div className={kithi._id === kithiActived._id ? 'ki-thi actived' : 'ki-thi'}>
            <div className='remove' onClick={() => getId(kithi._id)}>X</div>
            <div className='ki-thi-item'>
                <label>Mã: </label>
                <div>{kithi.ma}</div>
            </div>
            <div className='ki-thi-item'>
                <label>Mật khẩu: </label>
                <div>
                    <input type='text'
                        ref={inputRef}
                        name='mk'
                        value={mkdethi}
                        disabled={!checkMk}
                        onChange={doimatkhau} />
                </div>
                {
                    kithi.tinhtrang === 2 ? !checkMk ? <div className='doi-mk' onClick={() => {
                        setCheckMk(!checkMk)
                    }}> Đổi MK</div> : <div className='doi-mk' onClick={luumatkhau}> Lưu</div> : ''
                }

            </div>
            <div className='ki-thi-item'>
                <label>Tên: </label>
                <div>{kithi.tieude}</div>
            </div>
            <div className='ki-thi-item'>
                <label>Ngày: </label>
                <div>{kithi.ngaythi}</div>
            </div>
            <div className='ki-thi-item'>
                <label>Thời lượng: </label>
                <div>{kithi.thoigian}'</div>
            </div>
            <div className='ki-thi-item'>
                <label>Tình trạng: </label>
                <div>
                    {
                        kithi.tinhtrang === 0 ? <div className='da-thi'>Đã thi</div> :
                            kithi.tinhtrang === 1 ? <div className='dang-thi'>Đang thi</div> : <div className='chua-thi'>Chưa thi</div>
                    }
                </div>
            </div>
            <div className='ki-thi-item'>
                <label>Học kì: </label>
                <div>{kithi.hocki}</div>
            </div>
            <div className='ki-thi-item'>
                <label>Trạng thái: </label>
                <div>
                    <Switch
                        checked={isStatus}
                        onChange={() => handleCheckStatus(kithi)}
                        color="primary"
                    />
                </div>
            </div>
            <div className='ki-thi-item'>
                <label></label>
                {
                    kithi.tinhtrang === 2 && <div className='btn btn-info' onClick={batdauthi}>Bắt đầu thi </div>
                }
            </div>
        </div>
    );
}

export default KiThi;