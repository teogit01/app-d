import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PhuongAn from './../components/phuong-an'

Detail.propTypes = {
    listQuestion: PropTypes.array
};

function Detail(props) {
    const { listQuestion } = props
    const [questionAdd, setListQuestionAdd] = useState([])
    //handle change question    
    const handleChangeQuestion = (e) => {
        const value = e.target.value
        const valueAdd = listQuestion.find(item => item.value === value)
        setListQuestionAdd([...questionAdd, valueAdd])
    }
    return (
        <div className='detail'>
            <form>
                <div className='head'>
                    <label>Mã Đề:</label>
                    <br />
                    <label>Môn:</label>
                    <br />
                    <label>Thời gian:</label>
                    <br />
                    <label>Kì thi:</label>
                    <br />
                    <label>Tổng câu hỏi: {questionAdd.length} </label>
                    <br />

                </div>
                <hr />

                <div>
                    {
                        questionAdd.map(item => {
                            return <PhuongAn key={item.value} question={item} />
                        })
                    }
                </div>

                <div>
                    <label>Thêm câu hỏi:</label>
                    <select className='form-control' onChange={handleChangeQuestion}>
                        <option>Thêm câu hỏi</option>
                        {
                            listQuestion.map(option => {
                                return <option key={option.value} value={option.value}>{option.label}</option>
                            })
                        }
                    </select>
                </div>
                <br />
                <div className='control'>
                    <div className='btn btn-warning button'>Huỷ</div>
                    <button className='btn btn-info button'>Lưu</button>
                </div>
            </form>
        </div>
    );
}

export default Detail;