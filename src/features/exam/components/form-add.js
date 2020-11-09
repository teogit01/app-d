import React, { useState } from 'react';
import callApi from 'api/apiCaller';
// import { useDispatch } from 'react-redux';
// import { addExam } from './../examSlice'
import { useHistory } from 'react-router-dom';
import Select from 'react-select'

import PropTypes from 'prop-types';

FormAdd.propTypes = {
    optionsMon: PropTypes.array
};

function FormAdd(props) {
    const { optionsMon } = props
    const [ma, setMa] = useState('')
    const [tieude, setTieude] = useState('')
    const [mon, setMon] = useState('')
    const [thoigian, setThoigian] = useState('')
    const [namhoc, setNamhoc] = useState('')
    const [ghichu, setGhichu] = useState('')
    // const dispatch = useDispatch()
    const history = useHistory()
    const onChange = (e) => {
        if (e.target.name === 'ma') {
            setMa(e.target.value)
        }
        if (e.target.name === 'tieude') {
            setTieude(e.target.value)
        }
        if (e.target.name === 'thoigian') {
            setThoigian(e.target.value)
        }
        if (e.target.name === 'namhoc') {
            setNamhoc(e.target.value)
        }
        if (e.target.name === 'ghichu') {
            setGhichu(e.target.value)
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            ma: ma,
            tieude: tieude,
            mon: mon,
            thoigian: thoigian,
            namhoc: namhoc,
            ghichu: ghichu,
        }
        callApi('dethi', 'POST', data).then((res) => {
            //dispatch(addExam(res.data.data))
            history.goBack()
        })
    }

    const handleChangeMon = (value) => {
        setMon(value.value)
    }
    return (
        <div className='form-add'>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Mã đề:</label>
                    <input type='text' className='form-control' name='ma' onChange={onChange} value={ma} />
                </div>
                <div>
                    <label>Tiêu đề:</label>
                    <input type='text' className='form-control' name='tieude' onChange={onChange} value={tieude} />
                </div>
                <div>
                    <label>Chọn môn:</label>
                    <Select
                        options={optionsMon}
                        onChange={handleChangeMon}
                    />
                </div>

                <div>
                    <label>Thời gian:</label>
                    <input type='number' className='form-control' name='thoigian' onChange={onChange} value={thoigian} />
                </div>

                {/* <div>
                    <label>Kì thi:</label>
                    <input type='text' className='form-control' />
                </div> */}

                <div>
                    <label>Năm học:</label>
                    {/* <input type='text' className='form-control' name='namhoc' onChange={onChange} value={namhoc} /> */}
                    <select className='form-control' name='namhoc' onChange={onChange} value={namhoc} >
                        <option value=''></option>
                        <option value='2018-2019'>2018-2019</option>
                        <option value='2019-2020'>2019-2020</option>
                        <option value='2020-2012'>2020-2021</option>
                        <option value='2021-2022'>2021-2022</option>
                    </select>
                </div>
                <div>
                    <label>Ghi chú:</label>
                    <textarea className='form-control' rows='3' name='ghichu' onChange={onChange} value={ghichu}>

                    </textarea>
                </div>

                <br />
                <div className='control'>
                    <div className='btn btn-warning button'>Huỷ</div>
                    <button className='btn btn-info button' type='submit'>Thêm</button>
                </div>
            </form>
        </div >
    );
}

export default FormAdd;