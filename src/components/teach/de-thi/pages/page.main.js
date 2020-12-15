import React, { useEffect, useState } from 'react';
import DeThi from './../components/de-thi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CauHoi from './../components/cau-hoi'
import callApi from 'api/apiCaller'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select'
// import PropTypes from 'prop-types';

// DeThi.propTypes = {

// };

function PageDeThi(props) {
    const [dethis, setDethis] = useState([])
    const [dethiSelected, setDethiSelected] = useState('')
    useEffect(() => {
        const LOAD_DETHI = async () => {
            const data = await callApi('de-thi')
            setDethis(data.data)
            setDethiSelected(data.data[0])
        }
        LOAD_DETHI()
    }, [])
    // handleSelectDeThi
    const handleSelectDeThi = (dethi) => {
        setDethiSelected(dethi)
    }
    // load cau hoi cua de thi
    const [cauhois, setCauhois] = useState([])
    useEffect(() => {
        const LOAD_CAUHOI_CUA_DE = async () => {
            let data = await callApi(`cau-hoi/de-thi/${dethiSelected._id}`)
            if (data.data.length > 0) {
                setCauhois(data.data[0].cauhois)
            }
        }
        if (dethiSelected) {
            LOAD_CAUHOI_CUA_DE()
        }
    }, [dethiSelected])

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    //--- handle----- them de thi
    const [ma, setMa] = useState('')
    const [tieude, setTieude] = useState('')
    const [mon, setMon] = useState('')
    const [thoigian, setThoigian] = useState('')
    const [namhoc, setNamhoc] = useState('')
    const [ghichu, setGhichu] = useState('')
    // const dispatch = useDispatch()    
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
    // submit them de
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
        callApi('de-thi/them', 'POST', data).then((res) => {
            //let newDethis = [...dethis]
            //newDethis.push(res.data.data)
            if (data) {
                setDethis([...dethis, res.data])
                setDethiSelected(res.data)
            }
            setMa('')
            setTieude('')
            setMon('')
            setThoigian('')
            setNamhoc('')
            setGhichu('')
            toggle()
        })
    }

    // load Mon thi
    let optionsMon = []
    const [mons, setMons] = useState([])
    useEffect(() => {
        const LOAD_MON = async () => {
            let data = await callApi('mon')
            setMons(data.data)
        }
        LOAD_MON()
    }, [])
    if (mons.length > 0) {
        mons.map(mon => {
            optionsMon.push({ value: mon._id, label: mon.ten })
        })
    }
    const handleChangeMon = (value) => {
        setMon(value.value)
    }
    // ---- end handel ----- them de thi
    const remove = (_iddethi) => {
        callApi(`de-thi/remove/${_iddethi}`)
        let newDethis = dethis.filter(dethi => `${dethi._id}` !== _iddethi)
        setDethis(newDethis)
    }

    const [isOpenCauhoi, setIsOpenCauhoi] = useState(false)
    const toggleCauhoi = () => {
        setIsOpenCauhoi(!isOpenCauhoi)
    }
    // load cau hoi cua de
    const [cauhoiCuaMon, setCauHoiCuaMon] = useState([])
    useEffect(() => {
        const LOAD_CAUHOI_MON = async () => {
            let data = await callApi(`cau-hoi/mon/${dethiSelected.mon._id}`)
            setCauHoiCuaMon(data.data)
        }
        if (dethiSelected && (dethiSelected.mon) && dethis.length > 0)
            LOAD_CAUHOI_MON()
    }, [dethiSelected])
    let optionsCauhoiCuaMon = []
    if (cauhoiCuaMon.length > 0) {
        cauhoiCuaMon.map(cauhoi => {
            optionsCauhoiCuaMon.push({ value: cauhoi, label: cauhoi.noidung })
        })
    }
    // add cau hoi
    const [questionSelected, setQuestionSelected] = useState([]) // list question when select
    const [questionAdd, setQuestionAdd] = useState([])
    const handleChangeQuestion = (value) => {
        let newValue = []
        value.map(item => {
            newValue.push(item.value)
        })
        setQuestionSelected(newValue)
    }
    //resectQuestionSelect
    const resectQuestionSelect = () => {
        setQuestionSelected([])
        toggleCauhoi();
    }
    //saveQuestionSelect
    const saveQuestionSelect = () => {
        let newCauhois = cauhois.concat(questionSelected)
        let newQuestionAdd = questionAdd.concat(questionSelected)
        let params_cauhois = []
        newQuestionAdd.map((item) => {
            params_cauhois.push(item._id)
        })
        let data = { _iddethi: dethiSelected._id, cauhois: params_cauhois }
        callApi('de-thi/add-question', 'POST', data).then((res) => {

            setCauhois(newCauhois)
            setQuestionAdd([])
            setQuestionSelected([])

            //console.log('questionSelect', questionSelect)

            let idx = dethis.indexOf(dethiSelected)
            if (idx != -1) {
                let newDethis = [...dethis.slice(0, idx), res.data.result_dethi, ...dethis.slice(idx + 1, dethis.length)]
                setDethis(newDethis)
                setDethiSelected(res.data.result_dethi)
            }
            toggleCauhoi()
        })
    }

    //handleRemove remove cau hoi cua de
    const handleRemove = (_idcauhoi) => {
        let newCauhois = cauhois.filter(cauhoi => cauhoi._id !== _idcauhoi)
        let data = {
            _iddethi: dethiSelected._id,
            _idcauhoi: _idcauhoi
        }
        callApi('de-thi/remove-cauhoi', 'POST', data).then((res) => {
            //const idx = dethis.indexOf(dethiSelected)
            // if (idx != -1) {
            //     let newDethis = [...dethis.slice(0, idx), res.data.result_dethi, ...dethis.slice(idx + 1, dethis.length)]
            //     setDethis(newDethis)
            //     setDethiSelected(res.data.result_dethi)
            // }
            const newCauhois = cauhois.filter(x => x._id != _idcauhoi)
            setCauhois(newCauhois)
        })
    }
    return (
        <div className='page-de-thi'>
            <div className='content-page'>
                <div className='left'>
                    <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={toggle} />
                    <FontAwesomeIcon className='ic-add ic-init2' icon="plus" onClick={toggleCauhoi} />
                    {
                        dethis.map(dethi => {
                            return (
                                <div key={dethi._id} onClick={() => handleSelectDeThi(dethi)} >
                                    <DeThi
                                        getIdDethi={remove}
                                        dethi={dethi}
                                        actived={dethiSelected && dethi._id === dethiSelected._id ? true : false}
                                    />
                                </div>
                            )
                        })
                    }
                    {/* <div onClick={toggle}>
                        Tạo đề thi
                    </div> */}
                </div>
                <div className='right'>
                    <div className='btn-them-cau-hoi'>
                        {/* <div className='btn' onClick={toggleCauhoi}>Thêm câu hỏi</div> */}
                    </div>
                    {
                        cauhois.map((cauhoi, idx) => {
                            return <CauHoi key={cauhoi._id} idx={idx} cauhoi={cauhoi} remove={handleRemove} />
                        })
                    }
                </div>
            </div>


            {/* Modal them de */}
            <div>
                <Modal isOpen={modal} toggle={toggle} size=''>
                    <form onSubmit={onSubmit}>
                        <ModalHeader toggle={toggle}>Tạo đề thi</ModalHeader>
                        <ModalBody>
                            <div>
                                <label><b>Mã đề</b></label>
                                <input type='text' className='form-control' name='ma' onChange={onChange} value={ma} />
                            </div>

                            <div>
                                <label><b>Tiêu đề</b></label>
                                <input type='text' className='form-control' name='tieude' onChange={onChange} value={tieude} />
                            </div>

                            <div>
                                <label><b>Chọn môn</b></label>
                                <Select
                                    options={optionsMon}
                                    onChange={handleChangeMon}
                                />
                            </div>

                            <div>
                                <label><b>Thời gian</b></label>
                                <input type='text' className='form-control' name='thoigian' onChange={onChange} value={thoigian} />
                            </div>

                            <div>
                                <label><b>Năm học</b></label>
                                <select className='form-control' name='namhoc' onChange={onChange} value={namhoc} >
                                    <option value=''></option>
                                    <option value='2018-2019'>2018-2019</option>
                                    <option value='2019-2020'>2019-2020</option>
                                    <option value='2020-2012'>2020-2021</option>
                                    <option value='2021-2022'>2021-2022</option>
                                </select>
                            </div>

                            <div>
                                <label><b>Ghi chú</b></label>
                                <input type='text' className='form-control' name='ghichu' onChange={onChange} value={ghichu} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type='submit'>Tạo</Button>
                            <div color="secondary" onClick={toggle}>Huỷ</div>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
            <div>
                <Modal isOpen={isOpenCauhoi} toggle={toggleCauhoi} size=''>
                    <ModalHeader toggle={toggleCauhoi}>Thêm câu hỏi</ModalHeader>
                    <ModalBody>
                        <div>
                            <label><b>Chọn câu hỏi</b></label>
                            <Select
                                options={optionsCauhoiCuaMon}
                                onChange={handleChangeQuestion}
                                isMulti
                                closeMenuOnSelect={false}
                            />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveQuestionSelect}>Thêm</Button>
                        <Button color="secondary" onClick={resectQuestionSelect}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div >
    );
}

export default PageDeThi;