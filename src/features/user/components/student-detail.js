import React from 'react';
// import PropTypes from 'prop-types';

// TeachDetail.propTypes = {

// };

function StudentDetail(props) {
    return (
        <div className='content'>
            <div className='left'>
            </div>
            <div className='right'>
                <div className='title'>
                    <h5 className='bold'>Thông tin sinh viên</h5>
                </div>

                <hr />
                <div className='infor'>
                    <div className='field'>
                        <label className='bold'>Họ Tên: &nbsp;</label>
                        <input type='text' className='' value='GIAO VIEN !' />
                    </div>
                    <div className='field'>
                        <label className='bold'>Giới tính: &nbsp;</label>
                        <input type='text' className='' />
                    </div>
                    <div className='field'>
                        <label className='bold'>Email: &nbsp;</label>
                        <input type='text' className='' />
                    </div>
                    <div className='field'>
                        <label className='bold'>Liên lạc: &nbsp;</label>
                        <input type='text' className='' />
                    </div>
                    <div className='field'>
                        <label className='bold'> Đơn vị: &nbsp;</label>
                        <input type='text' className='' />
                    </div>
                    <div className='field'>
                        <label className='bold'>Địa chỉ: &nbsp;</label>
                        <input type='text' className='' />
                    </div>
                    <div className='field'>
                        <label className='bold'>Điểm trung bình: &nbsp;</label>
                        <input type='text' className='' />
                    </div>

                    <br />
                    <div className='control'>
                        <button className='btn btn-warning'>Sửa</button>
                        <button className='btn btn-info'>Lưu</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StudentDetail;