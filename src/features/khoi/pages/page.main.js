import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import callApi from 'api/apiCaller'
import { useSelector, useDispatch } from 'react-redux';
import { loadKhoi, addKhoi, removeKhoi } from './../khoiSlice'

import { loadSubject } from 'features/subject/subjectSlice'

import Select from 'react-select'

// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const khoi_s = useSelector(state => state.khoi)
    const dispatch = useDispatch()

    const ChangeName = (e) => {
        if (e.target.name === 'name') {
            setValueName(e.target.value)
        }
        if (e.target.name === 'code') {
            setValueCode(e.target.value)
        }
    }
    const ChangeSubject = (value) => {
        setValueSubject(value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const data = { ma: valueCode, ten: valueName, mons: valueSubject }
        console.log(data)
        // call api
        callApi('khoi', 'POST', data).then((res) => {
            dispatch(addKhoi(res.data.khoi))
        })
        setValueName('')
        setValueCode('')
        setValueSubject('')

    }
    const [valueName, setValueName] = useState('')
    const [valueCode, setValueCode] = useState('')
    const [valueSubject, setValueSubject] = useState('')

    // handle remove
    const handleRemove = (_id) => {
        callApi(`khoi/${_id}`, 'DELETE', null).then(res => {
            dispatch(removeKhoi(res.data._id))
            // console.log(res.data._id)

        })
    }

    // load form api    
    useEffect(() => {
        const LoadKhoi = async () => {
            let data = await callApi('khoi')
            dispatch(loadKhoi(data.data))
        }
        LoadKhoi()
    }, [])

    const subject_s = useSelector(state => state.subjects)
    useEffect(() => {
        const LoadSubject = async () => {
            let data = await callApi('mon')
            dispatch(loadSubject(data.data))
        }
        if (subject_s.length === 0) {
            LoadSubject()
        }
    }, [])
    let optionsSubject = []
    if (subject_s) {
        subject_s.map(item => {
            optionsSubject.push({ value: item._id, label: item.ten })
        })
    }

    return (
        <div className='page-main'>
            <div className='left'>
                <form>
                    <div>
                        <label>Mã khối:</label>
                        <input type='text' className='form-control' onChange={ChangeName} value={valueCode} name='code' />
                    </div>
                    <div>
                        <label>Tên Khối:</label>
                        <input type='text' className='form-control' onChange={ChangeName} value={valueName} name='name' />
                    </div>

                    <div>
                        <label>Thêm môni:</label>
                        <Select
                            isMulti
                            options={optionsSubject}
                            onChange={ChangeSubject}
                            value={valueSubject}
                        />
                    </div>
                    <br />

                    <div className='control'>
                        <button className='btn btn-info' onClick={onSubmit}>Thêm</button>
                    </div>
                </form>

            </div>
            <div className='right'>

                <div className='list head col-12'>
                    <div className='col-1'>#</div>
                    <div className='col-2'>Mã khối</div>
                    <div className='col-2'>Tên khối</div>
                    <div className='col-4'>Môn Học</div>
                    <div className='col-2'>Action</div>
                </div>
                {
                    khoi_s.map((item, idx) => {

                        return (
                            <div className='list col-12' key={item._id}>
                                <div className='col-1'>{idx + 1}</div>
                                <div className='col-2'>{item.ma}</div>
                                <div className='col-2'>{item.ten}</div>
                                <div className='col-4'>{item.mons.map(mon => `${mon.ten}, `)}</div>
                                <div className='col-2'>
                                    <FontAwesomeIcon className='ic-init' icon="eye" />
                                    &nbsp;&nbsp;&nbsp;
                                    <FontAwesomeIcon className='ic-init' icon="eraser" onClick={() => handleRemove(item._id)} />
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default PageMain;