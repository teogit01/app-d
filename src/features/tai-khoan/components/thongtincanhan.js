import React from 'react';
import PropTypes from 'prop-types';

ThongTin.propTypes = {
    giaovien: PropTypes.object
};

function ThongTin(props) {
    const { giaovien } = props
    return (
        <div className='thongtin'>
            {
                giaovien &&
                <div className='thongtin'>
                    <div className='thongtin-1'>
                        <div className='title'>
                            <h4>Thông tin {giaovien.ten}</h4>
                        </div>
                        <div className='thongtin-chitiet'>
                            <div className='avatar'>
                                <img src={''} />
                            </div>
                            <div className='chitiet'>
                                <div className='control'>
                                    <label>Họ tên:</label>
                                    <div>{giaovien.ten}</div>
                                </div>
                                <div className='control'>
                                    <label>Mã số:</label>
                                    <div>{giaovien.maso}</div>
                                </div>
                                <div className='control'>
                                    <label>Email:</label>
                                    <div>{giaovien.email}</div>
                                </div>
                                <div className='control'>
                                    <label>SĐT:</label>
                                    <div>{giaovien.sdt}</div>
                                </div>
                                <div className='control'>
                                    <label>Địa chỉ:</label>
                                    <div>{giaovien.diachi}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ThongTin;