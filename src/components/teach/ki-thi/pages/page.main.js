import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import KiThi from './../components/ki-thi.js'
import KiThiCT from './../components/ki-thi-ct.js'
import callApi from 'api/apiCaller.js';
import Select from 'react-select'
import { compareAsc, format } from 'date-fns'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import PropTypes from 'prop-types';

// page.main.propTypes = {

// };

function PageMain(props) {
    // LOAD_KITHi
    const [kithis, setKithis] = useState([])
    const [kithiActived, setKithiActived] = useState('')
    const LOAD_KITHI = async () => {
        let data = await callApi('ki-thi')
        setKithis(data.data)
        if (data.data.length > 0)
            setKithiActived(data.data[0])

    }
    const [mons, setMons] = useState([])
    const LOAD_MON = async () => {
        let data = await callApi('mon')
        setMons(data.data)
    }
    useEffect(() => {
        LOAD_KITHI()
        LOAD_MON()
    }, [])
    // END LOAD KI THI

    // changeKithiActived
    const changeKithiActived = (kithi) => {
        setKithiActived(kithi)
    }
    // end changeKithiActived

    // Tao ki thi
    //const [isOpenTaoKiThi, setIsOpenTaoKiThi] = useState(true);
    const [isOpenTaoKiThi, setIsOpenTaoKiThi] = useState(false);
    const toggleTaoKiThi = () => setIsOpenTaoKiThi(!isOpenTaoKiThi);

    const [valueMa, setValueMa] = useState('')
    const [valueTieuDe, setValueTieuDe] = useState('')
    const [valueNgay, setValueNgay] = useState(new Date())
    const [valueMatKhau, setValueMatKhau] = useState('')
    const [valueThoiGian, setValueThoiGian] = useState('')
    const [valueDeThi, setValueDeThi] = useState('')
    const [valueMonThi, setValueMonThi] = useState('')
    const [valueHocKi, setValueHocKi] = useState('2018-2019')

    const changeValue = (e) => {
        const name = e.target.name
        if (name === 'ma') {
            setValueMa(e.target.value)
        }
        if (name === 'tieude') {
            setValueTieuDe(e.target.value)
        }
        if (name === 'matkhau') {
            setValueMatKhau(e.target.value)
        }
        if (name === 'thoigian') {
            setValueThoiGian(e.target.value)
        }
        if (name === 'hocki') {
            setValueHocKi(e.target.value)
        }
        if (name === 'monthi') {
            setValueMonThi(e.target.value)
            setIdMonSelected(e.target.value)
        }
        if (name === 'dethi') {
            setValueDeThi(e.target.value)
        }
    }
    const changeDate = (date) => {
        setValueNgay(date)
    }
    const onSave = () => {
        const data = {
            ma: valueMa,
            tieude: valueTieuDe,
            matkhau: valueMatKhau,
            ngaythi: format(valueNgay, 'dd-MM-yyyy'),
            hocki: valueHocKi,
            mon: valueMonThi,
            thoigian: valueThoiGian,
            dethi: valueDeThi,

        }
        //console.log(data)
        callApi('ki-thi', 'POST', data).then((res) => {
            setValueMa('')
            setValueTieuDe('')
            setValueMatKhau('')
            setValueNgay(new Date())
            setValueHocKi('2018-2019')
            setValueThoiGian('')
            setValueDeThi('')
            //setValueMonThi('')
            setKithiActived(res.data)
            setKithis([...kithis, res.data])
        })
        toggleTaoKiThi()
    }
    // const [monSelected, setMonSelectd] = useState('')
    const [idMonSelected, setIdMonSelected] = useState('')
    const optionsMonthi = []
    if (mons.length > 0) {
        mons.map(mon => {
            optionsMonthi.push({ label: mon.ten, value: mon._id })
        })
    }
    const [dethis, setDethis] = useState([])
    useEffect(() => {
        const LOAD_DE_CUA_MON = async () => {
            let data = await callApi(`de-thi/mon/${idMonSelected}`)
            setDethis(data.data)
            if (data.data.length > 0)
                setValueDeThi(data.data[0]._id)
        }
        if (idMonSelected != '')
            LOAD_DE_CUA_MON()
    }, [idMonSelected])

    let optionsDeThi = []
    if (dethis.length > 0) {
        dethis.map(dethi => {
            optionsDeThi.push({ value: dethi._id, label: dethi.tieude })
        })
    }
    // end tao ki thi    
    // handleRemove ki thi
    const handleRemove = (_idkithi) => {
        let newKithis = kithis.filter(x => x._id != _idkithi)
        setKithis(newKithis)
        callApi(`ki-thi/remove/${_idkithi}`, 'DELETE', null)
    }
    // end handleRemove kithi

    // Them de
    const [isOpenThemDe, setIsOpenThemDe] = useState(false);
    const toggleThemDe = () => setIsOpenThemDe(!isOpenThemDe);
    const onSaveThemDe = () => {
        const data = {
            _idkithi: kithiActived._id,
            _iddethi: dethiSelected.value
        }
        callApi('ki-thi/them-de-thi', 'POST', data).then(res => {
            setKithiActived(res.data)
        })
    }
    // end them de
    // LOAD DE CUA MON Active
    let optionsDethiActived = []
    const [dethisActived, setDethisActived] = useState([])
    const LOAD_DE_MON_ACTIVED = async () => {
        let data = await callApi(`de-thi/mon/${kithiActived.mon}`)
        setDethisActived(data.data)
    }
    useEffect(() => {
        LOAD_DE_MON_ACTIVED()
    }, [kithiActived])
    if (dethisActived.length > 0) {
        dethisActived.map(dethi => {
            optionsDethiActived.push({ value: dethi._id, label: dethi.tieude })
        })
    }
    const [dethiSelected, setDethiSelected] = useState('')
    const selectedDethi = (dethi) => {
        setDethiSelected(dethi)
    }
    // END LOAD DE CUA MON Active
    return (
        <div className='page-ki-thi'>
            <div className='content-page'>
                <div className='left'>
                    <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={toggleTaoKiThi} />
                    <FontAwesomeIcon className='ic-add ic-init2' icon="plus" onClick={toggleThemDe} />
                    {
                        kithis.length > 0 &&
                        kithis.map(kithi => {
                            return (
                                <div className='kithis' key={kithi._id} onClick={() => changeKithiActived(kithi)} >
                                    <KiThi kithi={kithi} kithiActived={kithiActived} remove={handleRemove} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right'>
                    <KiThiCT kithi={kithiActived} dethis={kithiActived.dethis} />
                </div>
            </div>
            {/* Tao Ki thi */}
            <div>
                <Modal isOpen={isOpenTaoKiThi} toggle={toggleTaoKiThi}>
                    <form>
                        <ModalHeader toggle={toggleTaoKiThi}>Tạo Kì Thi</ModalHeader>
                        <ModalBody>
                            <div className='form'>
                                <div className='control'>
                                    <label>Mã kì thi:</label>
                                    <div>
                                        <input type='text' name='ma' onChange={changeValue} value={valueMa} />
                                    </div>
                                </div>
                                <div className='control'>
                                    <label>Tiêu đề:</label>
                                    <div>
                                        <input type='text' name='tieude' onChange={changeValue} value={valueTieuDe} />
                                    </div>
                                </div>
                                <div className='control'>
                                    <label>Mật khẩu:</label>
                                    <div>
                                        <input type='text' name='matkhau' onChange={changeValue} value={valueMatKhau} />
                                    </div>
                                </div>

                                <div className='control'>
                                    <label>Ngày thi (dự kiến):</label>
                                    <div>
                                        <DatePicker
                                            className='form-control'
                                            dateFormat="dd/MM/yyyy"
                                            //value={valueNgay}
                                            selected={valueNgay}
                                            onChange={changeDate}
                                        // strictParsing
                                        />

                                    </div>
                                </div>

                                <div className='control'>
                                    <label>Thời gian:</label>
                                    <div>
                                        <input type='number' name='thoigian' onChange={changeValue} value={valueThoiGian} />
                                    </div>
                                </div>

                                <div className='control'>
                                    <label>Học kì:</label>
                                    <div className='select-monthi'>
                                        <select className='form-control' name='hocki' onChange={changeValue} value={valueHocKi}>
                                            <option value='2018-2019'>2018-2019</option>
                                            <option value='2019-2020'>2019-2020</option>
                                            <option value='2020-2021'>2020-2021</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='control'>
                                    <label>Chọn môn:</label>
                                    <div className='select-monthi'>
                                        <select className='form-control'
                                            onChange={changeValue} name='monthi' value={valueMonThi}>
                                            {
                                                optionsMonthi.length > 0 &&
                                                optionsMonthi.map(option => {
                                                    return (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <Select
                                            options={optionsMonthi}
                                            onChange={changeMonSelectd}
                                        /> */}
                                    </div>
                                </div>

                                <div className='control'>
                                    <label>Chọn đề:</label>
                                    <div>
                                        <div className='select-dethi'>
                                            <select className='form-control'
                                                onChange={changeValue} name='dethi' value={valueDeThi}>
                                                {
                                                    optionsDeThi.length > 0 &&
                                                    optionsDeThi.map(option => {
                                                        return (
                                                            <option key={option.value} value={option.value}>{option.label}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            {/* <Select
                                                options={optionsDethi}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className='btn btn-primary' color="primary" onClick={onSave}>Tạo </div>
                            <div className='btn btn-secondary' color="secondary" onClick={toggleTaoKiThi}>Cancel</div>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>

            {/* Thêm đề */}
            <div>
                <Modal isOpen={isOpenThemDe} toggle={toggleThemDe}>
                    <form>
                        <ModalHeader toggle={toggleThemDe}>Thêm đề</ModalHeader>
                        <ModalBody>
                            <div className='form'>
                                <div className='control'>
                                    <label>Chọn đề:</label>
                                    <div>
                                        <Select
                                            className='chon-de-thi'
                                            options={optionsDethiActived}
                                            onChange={selectedDethi}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className='btn btn-primary' color="primary" onClick={onSaveThemDe}>Thêm </div>
                            <div className='btn btn-secondary' color="secondary" onClick={toggleThemDe}>Cancel</div>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>

        </div >
    );
}

export default PageMain;