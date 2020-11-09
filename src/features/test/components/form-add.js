import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import { format, addMinutes } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import callApi from 'api/apiCaller';
import { useHistory } from 'react-router-dom';
FormAdd.propTypes = {
    optionsDethi: PropTypes.array,
    optionsMon: PropTypes.array,

    receve: PropTypes.func
};

function FormAdd(props) {
    const history = useHistory()
    const { optionsDethi, optionsMon, receve } = props

    const [ma, setMa] = useState('')
    const [tieude, setTieude] = useState('')
    const [mon, setMon] = useState('')
    const [dethi, setDethi] = useState('')
    const [ngay, setNgay] = useState(format(new Date(), 'dd/MM/yyyy'))
    const [hocki, setHocki] = useState('')
    const [tgbd, setTgbd] = useState('')
    const [thoigian, setThoigian] = useState('')
    const [tgkt, setTgkt] = useState('')

    const changeMon = (mon) => {
        setMon(mon.value)
        receve(mon)
    }
    const changeDethi = (dethi) => {
        setDethi(dethi.value)
        setThoigian(dethi.thoigian)
    }

    const handleChange = (e) => {
        const name = e.target.name
        if (name === 'ma') {
            setMa(e.target.value)
        }
        if (name === 'tieude') {
            setTieude(e.target.value)
        }
        if (name === 'hocki') {
            setHocki(e.target.value)
        }
        if (name === 'tgbd') {
            setTgbd(e.target.value)

            let day = ngay.slice(0, 2)
            let month = ngay.slice(3, 5)
            let year = ngay.slice(6, 10)

            let timeStart = e.target.value
            let hourStart = timeStart.slice(0, 2)
            let minuteStart = timeStart.slice(3, 6)

            let timeAdd = addMinutes(new Date(year, month, day, hourStart, minuteStart), thoigian)
            let hourEnd = `0${timeAdd.getHours(timeAdd)}`.slice(-2)
            let minuteEnd = `0${timeAdd.getMinutes(timeAdd)}`.slice(-2)
            let timeEnd = `${hourEnd}:${minuteEnd}`
            //console.log('end', timeEnd)
            setTgkt(timeEnd)
        }
    }
    const changeNgay = (date) => {
        setNgay(format(date, 'dd/MM/yyyy'))
    }
    // handle submit 
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            ma,
            tieude,
            mon,
            dethi,
            ngay,
            hocki,
            batdau: tgbd,
            ketthuc: tgkt,
        }
        callApi('kithi', 'POST', data)
        history.goBack()
    }

    return (
        <div className='form'>
            <form onSubmit={onSubmit}>

                <div className='field'>
                    <label className='col-2'>Mã kì thi:</label>
                    <input type='text' className='form-control' name='ma' onChange={handleChange} value={ma} />
                </div>

                <div className='field'>
                    <label className='col-2'>Tiêu đề:</label>
                    <input type='text' className='form-control' name='tieude' value={tieude} onChange={handleChange} />
                </div>

                <div className='field'>
                    <label className='col-2'>Chọn môn thi:</label>
                    <div style={{ width: "100%" }}>
                        <Select
                            options={optionsMon}
                            onChange={changeMon}
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='col-2'>Chọn đề thi:</label>
                    <div className='' style={{ width: "100%" }}>
                        <Select
                            className=''
                            options={optionsDethi}
                            onChange={changeDethi}
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='col-2'>Ngày thi:</label>
                    {/* <input type='date' className='form-control' name='ngay' value={ngay} onChange={handleChange} /> */}
                    <DatePicker
                        className='form-control'
                        dateFormat="dd/MM/yyyy"
                        value={ngay}
                        //selected={startDate}
                        onChange={changeNgay}
                    // strictParsing
                    />

                </div>

                <div className='field'>
                    <label className='col-2'>Học kì:</label>
                    <select className='form-control' name='hocki' value={hocki} onChange={handleChange} >
                        <option>2019-2020</option>
                        <option>2020-2021</option>
                    </select>
                </div>

                <div className='time'>
                    <div className='field'>
                        <label className='col-4'>Thời gian bắt đầu:</label>
                        <input type='time' className='form-control col-8' name='tgbd' value={tgbd} onChange={handleChange} />
                    </div>

                    <div className='field'>
                        <label className='col-4'>Thời gian kêt thúc:</label>
                        <input type='time' className='form-control col-8' name='tgkt' value={tgkt} />
                    </div>
                </div>

                <br />
                <div className='control'>
                    <div className='btn btn-warning button'>Huỷ</div>
                    <button className='btn btn-info button' type='submit'>Thêm</button>
                </div>

            </form>
        </div>
    );
}

export default FormAdd;