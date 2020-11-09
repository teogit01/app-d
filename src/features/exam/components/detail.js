import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PhuongAn from './../components/phuong-an'
import callApi from 'api/apiCaller'
//import Select from 'react-select'

Detail.propTypes = {
    listQuestion: PropTypes.array,
    detail: PropTypes.object,
    questionAdd: PropTypes.array,
    questionRemove: PropTypes.array,

    resetQuestionRemove: PropTypes.func,
    resetQuestionAdd: PropTypes.func,

    remove: PropTypes.func
    //optionsQuestion: PropTypes.array
};

function Detail(props) {
    const { listQuestion,
        detail,
        questionAdd,
        remove,
        resetQuestionAdd,
        questionRemove,
        resetQuestionRemove } = props
    const onSubmit = async (e) => {
        e.preventDefault()
        if (questionAdd.length > 0) {
            questionAdd && questionAdd.map((item) => {
                data.cauhois.push(item._id)
            })
            // call api add
            callApi('dethi/add-question', 'POST', data).then(() => {
                if (resetQuestionAdd) {
                    resetQuestionAdd()
                }
            })
        }
        if (questionRemove.length > 0) {
            questionRemove && questionRemove.map((item) => {
                data.cauhois.push(item)
            })
            // call api remove
            callApi('dethi/remove-question', 'POST', data).then(() => {
                if (resetQuestionAdd) {
                    resetQuestionRemove()
                }
            })
        }
    }
    //const [questionRemove, setQuestionRemove] = useState([])
    const handleRemove = (_id) => {
        remove(_id)
    }
    let data = {
        _iddethi: detail._id,
        cauhois: [],
    }
    return (
        <div className='detail'>
            <form onSubmit={onSubmit}>
                <div className='head'>
                    <label>Mã Đề: {detail.ma}</label>
                    <br />
                    <label>Thời gian: {detail.thoigian}</label>
                    <br />
                    <label>Năm học: {detail.namhoc}</label>
                    <br />
                    <label>Tổng câu hỏi: {listQuestion.length} </label>
                    <br />
                </div>
                <hr />
                <div>
                    {
                        listQuestion && listQuestion.map((item, idx) => {
                            return <PhuongAn
                                index={idx}
                                key={item._id}
                                light={idx % 2 === 0 ? true : false}
                                question={item} remove={handleRemove} />
                        })
                    }
                </div>

                <br />
                <div className='control'>
                    <div className='btn btn-warning button'>Huỷ</div>
                    <div className='btn btn-primary button button-edit'>Chỉnh sửa</div>
                    <button className='btn btn-info button' type='submit'>Lưu</button>
                </div>
            </form>
        </div>
    );
}

export default Detail;