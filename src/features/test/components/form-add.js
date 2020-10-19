import React from 'react';
// import PropTypes from 'prop-types';

// FormAdd.propTypes = {

// };

function FormAdd(props) {
    return (
        <div className='form'>
            <form>

                <div className='field'>
                    <label className='col-2'>Tiêu đề:</label>
                    <input type='text' className='form-control' />
                </div>

                <div className='field'>
                    <label className='col-2'>Chọn lớp:</label>
                    <select className='form-control col-10'>
                        <option>mon 1</option>
                        <option>mon 2</option>
                    </select>
                </div>

                <div className='field'>
                    <label className='col-2'>Chọn môn thi:</label>
                    <select className='form-control col-10'>
                        <option>mon 1</option>
                        <option>mon 2</option>
                    </select>
                </div>

                <div className='field'>
                    <label className='col-2'>Chọn đề thi:</label>
                    <select className='form-control col-10'>
                        <option>De1</option>
                        <option>de 2</option>
                    </select>
                </div>

                <div className='field'>
                    <label className='col-2'>Ngày thi:</label>
                    <input type='date' className='form-control' />
                </div>

                <div className='field'>
                    <label className='col-2'>Học kì:</label>
                    <select className='form-control'>
                        <option>2019-2020</option>
                        <option>2020-2021</option>
                    </select>
                </div>

                <div className='time'>
                    <div className='field'>
                        <label className='col-4'>Thời gian bắt đầu:</label>
                        <input type='time' className='form-control col-8' />
                    </div>

                    <div className='field'>
                        <label className='col-4'>Thời gian kêt thúc:</label>
                        <input type='time' className='form-control col-8' />
                    </div>
                </div>

                <br />
                <div className='control'>
                    <div className='btn btn-warning button'>Huỷ</div>
                    <button className='btn btn-info button'>Thêm</button>
                </div>

            </form>
        </div>
    );
}

export default FormAdd;