import React from 'react';
// import PropTypes from 'prop-types';

// FormTuLuan.propTypes = {

// };

function FormTuLuan(props) {
    return (
        <div className='form-tu-luan'>
            <form>
                <div>
                    <label>Tiêu đề câu hỏi:</label>
                    <input type='text' className='form-control' />
                </div>

                <div>
                    <label>Nội dung câu hỏi</label>
                    <textarea className='form-control' rows='4'>

                    </textarea>
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

export default FormTuLuan;