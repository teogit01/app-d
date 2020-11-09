import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'

import callApi from 'api/apiCaller'
import { addSubject } from 'features/subject/subjectSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux';

MainPage.propTypes = {
    listSubject: PropTypes.array,
    optionsKhoi: PropTypes.array
};

function MainPage(props) {
    const { listSubject, optionsKhoi } = props
    const dispatch = useDispatch()
    //console.log(optionsKhoi)

    const handleRemove = (_id) => {
        console.log(_id)
    }
    const [valueName, setValueName] = useState('')
    const [valueCode, setValueCode] = useState('')
    const onChange = (e) => {
        if (e.target.name === 'name') {
            setValueName(e.target.value)
        }
        if (e.target.name === 'code') {
            setValueCode(e.target.value)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const data = { ma: valueCode, ten: valueName }
        // call api
        callApi('mon', 'POST', data).then((res) => {
            dispatch(addSubject(res.data.mon))
        })
        setValueName('')
        setValueCode('')
    }
    return (
        <div className='page-main'>

            <div className='left'>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Mã Môn:</label>
                        <input type='text' className='form-control' onChange={onChange} value={valueCode} name='code' />
                    </div>
                    <div>
                        <label>Tên môn:</label>
                        <input type='text' className='form-control' onChange={onChange} value={valueName} name='name' />
                    </div>
                    <br />

                    <div className='control'>
                        <button type='submit' className='btn btn-info'>Thêm</button>
                    </div>
                </form>
            </div>

            <div className='right'>

                <div className='list head col-12'>
                    <div className='col-1'>#</div>
                    <div className='col-3'>Mã môn</div>
                    <div className='col-4'>Tên môn</div>
                    <div className='col-2'>Action</div>
                </div>
                {
                    listSubject && listSubject.map((item, index) => {
                        // console.log(item)
                        return (
                            <div className='list col-12'>
                                <div className='col-1'>{index + 1}</div>
                                <div className='col-3'>{item.ma}</div>
                                <div className='col-4'>{item.ten}</div>
                                <div className='col-2'>
                                    <FontAwesomeIcon className='ic-init' icon="eraser" onClick={() => handleRemove(item._id)} />
                                </div>
                            </div>
                        )
                    })
                }

            </div>


        </div >

    );
}

export default MainPage;