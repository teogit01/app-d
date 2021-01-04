import React from 'react';
import './css/ki-thi.scss'
import PropTypes from 'prop-types';

KiThi.propTypes = {
    kithi: PropTypes.object,
    kithiActived: PropTypes.object,
    remove: PropTypes.func
};

function KiThi(props) {
    const { kithi, kithiActived, remove } = props
    const getId = (_idkithi) => {
        remove(_idkithi)
    }
    return (
        <div className={kithi._id === kithiActived._id ? 'ki-thi actived' : 'ki-thi'}>
            {/* <div className='remove' onClick={() => getId(kithi._id)}>X</div> */}
            <div className='ki-thi-item'>
                <label>Mã: </label>
                <div>{kithi.ma}</div>
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
                <div>{kithi.thoigian}</div>
            </div>
            <div className='ki-thi-item'>
                <label>Trạng thái: </label>
                <div>
                    {kithi.tinhtrang === 0 ? 'Đã thi' :
                        kithi.tinhtrang === '1' ? 'Đang thi' : 'Chưa thi'
                    }
                </div>
            </div>
            <div className='ki-thi-item'>
                <label>Học kì: </label>
                <div>{kithi.hocki}</div>
            </div>
        </div>
    );
}

export default KiThi;