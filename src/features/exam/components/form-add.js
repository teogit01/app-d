import React from 'react';
// import PropTypes from 'prop-types';

// FormAdd.propTypes = {

// };

function FormAdd(props) {
    return (
        <div className='form-add'>
            <form>
                <div>
                    <label>Mã đề:</label>
                    <input type='text' className='form-control' />
                </div>

                <div>
                    <label>Môn:</label>
                    <select className='form-control'>
                        <option>Môn 1</option>
                        <option>Môn 2</option>
                        <option>Môn 3</option>
                    </select>
                </div>
                <div>
                    <label>Thời gian:</label>
                    <input type='number' className='form-control' placeholder='' />
                </div>

                <div>
                    <label>Kì thi:</label>
                    <input type='text' className='form-control' />
                </div>

                <div>
                    <label>Năm học:</label>
                    <input type='text' className='form-control' />
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