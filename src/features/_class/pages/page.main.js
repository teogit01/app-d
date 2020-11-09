import React, { useState, useEffect } from 'react';

import callApi from 'api/apiCaller'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadClass, addClass, removeClass } from './../classSlice'
import { useHistory, useRouteMatch } from 'react-router-dom';
PageMain.propTypes = {
    listClass: PropTypes.array
};
PageMain.defaultProps = {
    listClass: []
}

function PageMain(props) {
    //const { listClass } = props
    const history = useHistory()
    const match = useRouteMatch()
    const class_s = useSelector(state => state._class)
    const dispatch = useDispatch()

    const [valueName, setValueName] = useState('')
    const [valueCode, setValueCode] = useState('')
    // onChange
    const onChange = (e) => {
        if (e.target.name === 'code') {
            setValueCode(e.target.value)
        }
        if (e.target.name === 'name') {
            setValueName(e.target.value)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const data = { ma: valueCode, ten: valueName }

        // call api
        callApi('lop', 'POST', data).then((res) => {
            dispatch(addClass(res.data.lop))
        })
        setValueName('')
        setValueCode('')
    }

    //handle remove
    const handleRemove = (_id) => {
        callApi(`lop/${_id}`, 'DELETE', null)
            .then(res => {
                dispatch(removeClass(res.data._id))
            })
    }
    // handleDetail
    const handleDetail = (_id) => {
        history.push(`${match.url}/detail/${_id}`)
    }

    // load form api    
    useEffect(() => {
        const LoadClass = async () => {
            let data = await callApi('lop')
            dispatch(loadClass(data.data))
        }
        if (class_s.length === 0) {
            LoadClass()
        }
    }, [])

    return (
        <div className='page-main'>

            <div className='left'>
                <form>
                    <div>
                        <label>Mã lóp:</label>
                        <input type='text' className='form-control' onChange={onChange} value={valueCode} name='code' />
                    </div>
                    <div>
                        <label>Tên lớp:</label>
                        <input type='text' className='form-control' onChange={onChange} value={valueName} name='name' />
                    </div>
                    <br />

                    <div className='control'>
                        <button className='btn btn-info' onClick={onSubmit} >Thêm</button>
                    </div>

                </form>
            </div>

            <div className='right'>

                <div className='list head col-12'>
                    <div className='col-1'>#</div>
                    <div className='col-3'>Mã lớp</div>
                    <div className='col-5'>Tên lớp</div>
                    <div className='col-2'>Action</div>
                </div>

                {
                    class_s.map((item, idx) => {
                        return (
                            <div className='list col-12' key={idx}>
                                <div className='col-1'>{idx + 1}</div>
                                <div className='col-3'>{item.ma}</div>
                                <div className='col-5'>{item.ten}</div>
                                <div className='col-2'>
                                    <FontAwesomeIcon className='ic-init' icon="eye" onClick={() => handleDetail(item._id)} />
                                    &nbsp;&nbsp;&nbsp;
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

export default PageMain;