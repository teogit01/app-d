import React from 'react';
import PropTypes from 'prop-types';

PhuongAn.propTypes = {
    question: PropTypes.object
};

function PhuongAn(props) {
    const { question } = props
    if (question.value === 'ch1') {
        return (
            <div>
                <div>
                    <div>
                        <label className='head'>Câu hỏi 1:</label>

                        <br />
                        <label className='head'>Tiêu đề câu hỏi:</label> &nbsp;
                        <label>Tieu đề câu hỏi</label>

                        <br />
                        <label className='head'>Nội dung câu hỏi:</label>&nbsp;
                        <label>Noi dung câu hỏi</label>
                        <br />

                        <textarea className='form-control' rows='3'>

                        </textarea>

                    </div>
                </div>
            </div>
        )
    } else
        return (
            <div>
                <div>
                    <label className='head'>Câu hỏi 1:</label>

                    <br />
                    <label className='head'>Tiêu đề câu hỏi:</label> &nbsp;
                    <label>Tieu đề câu hỏi</label>

                    <br />
                    <label className='head'>Nội dung câu hỏi:</label>&nbsp;
                    <label>Noi dung câu hỏi</label>

                    <br />
                    <label className='head'>Phương án:</label>&nbsp;

                    <div className='phuong-an row'>
                        <div className='phuong-an--item col-6'>
                            <label>(A):</label>&nbsp;
                            <select className='form-control'>
                                <option>Phuowng an 1</option>
                                <option>Phuowng an 2</option>
                                <option>Phuowng an 3</option>
                                <option>Phuowng an 4</option>
                            </select>
                        </div>

                        <div className='phuong-an--item col-6'>
                            <label>(B):</label>&nbsp;
                            <select className='form-control'>
                                <option>Phuowng an 1</option>
                                <option>Phuowng an 2</option>
                                <option>Phuowng an 3</option>
                            </select>
                        </div>

                        <div className='phuong-an--item col-6'>
                            <label>(C):</label>&nbsp;
                            <select className='form-control '>
                                <option>Phuowng an 1</option>
                                <option>Phuowng an 2</option>
                            </select>
                        </div>

                        <div className='phuong-an--item col-6'>
                            <label>(D):</label>&nbsp;
                            <select className='form-control'>
                                <option>Phuowng an 1</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
}

export default PhuongAn;