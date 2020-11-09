import React, { useState } from 'react';
import PropTypes from 'prop-types';
import callApi from 'api/apiCaller';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../questionSlice';

FormTracNghiem.propTypes = {
    loai: PropTypes.string,
    optionsSubject: PropTypes.array,
    add: PropTypes.func
};

function FormTracNghiem(props) {
    const { loai, optionsSubject, add } = props
    const history = useHistory()
    const dispatch = useDispatch()
    const PHUONGAN = [
        { phuongan: "A", noidung: "", dapan: false },
        { phuongan: "B", noidung: "", dapan: false },
        { phuongan: "C", noidung: "", dapan: false },
        { phuongan: "D", noidung: "", dapan: false },
    ]

    const [tieude, setTieude] = useState('')
    const [noidung, setNoidung] = useState('')
    const [phuongan, setPhuongan] = useState(PHUONGAN)
    const [mon, setMon] = useState('')

    const change = (e) => {
        if (e.target.name === 'tieude') {
            setTieude(e.target.value)
        }
        if (e.target.name === 'noidung') {
            setNoidung(e.target.value)
        }
        if (e.target.name === 'da') {
            let newPhuongan = phuongan
            for (let i = 0; i < 4; i++) {
                newPhuongan[i] = { ...phuongan[i], dapan: false }
            }
            newPhuongan[e.target.value] = { ...phuongan[e.target.value], dapan: true }
            setPhuongan(newPhuongan)
        }
        if (e.target.name === 'paA') {
            //setPhuonganA(e.target.value)
            let newPhuongan = phuongan
            newPhuongan[0] = { ...phuongan[0], noidung: e.target.value }
            setPhuongan(newPhuongan)
        }
        if (e.target.name === 'paB') {
            let newPhuongan = phuongan
            newPhuongan[1] = { ...phuongan[1], noidung: e.target.value }
            setPhuongan(newPhuongan)
        }
        if (e.target.name === 'paC') {
            let newPhuongan = phuongan
            newPhuongan[2] = { ...phuongan[2], noidung: e.target.value }
            setPhuongan(newPhuongan)
        }
        if (e.target.name === 'paD') {
            let newPhuongan = phuongan
            newPhuongan[3] = { ...phuongan[3], noidung: e.target.value }
            setPhuongan(newPhuongan)
        }

    }
    const changeMon = (mon) => {
        setMon(mon.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const data = {
            tieude: tieude,
            noidung: noidung,
            phuongan: phuongan,
            loai: loai,
            mon: mon
        }
        //console.log(data)
        // call api
        callApi('cauhoi', 'POST', data).then((res) => {
            //console.log(res.data.data)
            //dispatch(addQuestion(res.data.data))
            if (add) {
                add(res.data.data)
            }
            history.goBack()
        })
        //console.log('ok', result)
    }

    return (
        <div className='form-trac-nghiem'>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Chọn môn:</label>
                    <Select
                        options={optionsSubject}
                        onChange={changeMon}
                    />
                </div>
                <br />
                <div>
                    <label>Tiêu đề câu hỏi:</label>
                    <input type='text' className='form-control' value={tieude} onChange={change} name='tieude' />
                </div>
                <div>
                    <label>Nội dung câu hỏi:</label>
                    <textarea className='form-control' rows='4' value={noidung} onChange={change} name='noidung'>

                    </textarea>
                </div>

                <div>Phương án:</div>

                <div>

                    <input type='radio' name='da' value='0' onChange={change} /> &nbsp;(A)
                    <textarea className={phuongan[0].dapan ? 'da form-control' : 'form-control'} rows='2' onChange={change} name='paA'>

                    </textarea>


                    <input type='radio' name='da' value='1' onChange={change} /> &nbsp;(B)
                    <textarea className={phuongan[1].dapan ? 'da form-control' : 'form-control'} rows='2' onChange={change} name='paB'>
                    </textarea>

                    <input type='radio' name='da' value='2' onChange={change} /> &nbsp;(C)
                    <textarea className={phuongan[2].dapan ? 'da form-control' : 'form-control'} rows='2' onChange={change} name='paC'>
                    </textarea>

                    <input type='radio' name='da' value='3' onChange={change} /> &nbsp;(D)
                    <textarea className={phuongan[3].dapan ? 'da form-control' : 'form-control'} rows='2' onChange={change} name='paD'>
                    </textarea>

                    <br />
                    <div className='control'>
                        <div className='btn btn-warning button'>Huỷ</div>
                        <button className='btn btn-info button' type='submit'>Thêm</button>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default FormTracNghiem;