import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Detail.propTypes = {

// };

function Detail(props) {
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (
        <div className='detail-question'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <div className='content'>
                <h4>Chi tiết câu hỏi</h4>
                <br />
                <div className='infor'>
                    <div className='control'>
                        <label className='bold'>Loại câu hỏi: &nbsp;</label>
                        <select className='form-control'>
                            <option>Trắc nghiệm</option>
                        </select>

                    </div>

                    <div className='control'>
                        <label className='bold'>Tiêu đề câu hỏi: &nbsp;</label>
                        <textarea className='form-control' rows='2'>
                            Tiêu đề câu hởi
                        </textarea>
                    </div>

                    <div className='control'>
                        <label className='bold'>Nội dung câu hỏi: &nbsp;</label>
                        <textarea className='form-control' rows='3'>
                            Nội dung...........
                        </textarea>
                    </div>


                    <div className='control'>
                        <label className='bold'>Phương án: &nbsp;</label>
                        <br />
                        <lable>(A)</lable>
                        <input type='text' className='form-control da' placeholder=' Phương á A' />
                        <br />
                        <lable>(B)</lable>
                        <input type='text' className='form-control' placeholder=' Phương á B' />
                        <br />
                        <lable>(C)</lable>
                        <input type='text' className='form-control' placeholder=' Phương á A' />
                        <br />
                        <lable>(D)</lable>
                        <input type='text' className='form-control' placeholder=' Phương á D' />
                    </div>
                </div>
                <div className='button'>
                    <button className='btn btn-warning left-0'>Chỉnh sửa</button>
                </div>
            </div>
        </div>
    );
}

export default Detail;