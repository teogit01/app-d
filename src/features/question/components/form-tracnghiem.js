import React from 'react';
// import PropTypes from 'prop-types';

// FormAdd.propTypes = {

// };

function FormTracNghiem(props) {
    return (
        <div className='form-trac-nghiem'>
            <form>
                <div>
                    <label>Tiêu đề câu hỏi:</label>
                    <input type='text' className='form-control' />
                </div>
                <div>
                    <label>Nội dung câu hỏi:</label>
                    <textarea className='form-control' rows='4'>
                    </textarea>
                </div>

                <div>Phương án:</div>

                <div>

                    <input type='radio' name='pa' /> &nbsp;(A)
                        <textarea className='form-control da' rows='2'>
                    </textarea>


                    <input type='radio' name='pa' /> &nbsp;(B)
                    <textarea className='form-control' rows='2'>
                    </textarea>

                    <input type='radio' name='pa' /> &nbsp;(C)
                    <textarea className='form-control' rows='2'>
                    </textarea>

                    <input type='radio' name='pa' /> &nbsp;(D)
                    <textarea className='form-control' rows='2'>
                    </textarea>

                    <br />
                    <div className='control'>
                        <div className='btn btn-warning button'>Huỷ</div>
                        <button className='btn btn-info button'>Thêm</button>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default FormTracNghiem;