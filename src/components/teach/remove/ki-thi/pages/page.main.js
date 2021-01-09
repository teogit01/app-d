import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import KiThi from './../components/ki-thi.js'
import KiThiCT from './../components/ki-thi-ct.js'
import Nhom from './../components/nhom'
import DanhSach from './../components/danhsach'
import callApi from 'api/apiCaller.js';
import Select from 'react-select'
import { format } from 'date-fns'


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import PropTypes from 'prop-types';

// page.main.propTypes = {

// };

function PageMain(props) {
    // LOAD_KITHi
    const [kithis, setKithis] = useState([])
    const [kithiActived, setKithiActived] = useState('')
    const [kithiRender, setKithiRender] = useState([])
    const [nhomActived, setNhomActived] = useState('')
    const [demos, setDemos] = useState([])
    const [nhoms, setNhoms] = useState('')
    const user = JSON.parse(localStorage.getItem('userLogin'))
    const LOAD_KITHI = async () => {
        let data = await callApi('ki-thi')
        if (data) {
            setKithis(data.data)
            if (data.data[0]) {
                setKithiActived(data.data[0])
            setDemos(data.data[0].dethimos)
                setNhoms(data.data[0].nhoms)
                setNhomActived(data.data[0].nhoms[0])
            }
        }
    }
    useEffect(() => {
        setKithiRender(kithis)
    }, [kithis])
    const [mons, setMons] = useState([])
    const LOAD_MON = async () => {
        let data = await callApi('mon')
        if (data) {
            setMons(data.data)
        }
    }
    useEffect(() => {
        LOAD_KITHI()
        LOAD_MON()
    }, [])
    // END LOAD KI THI
    // changeKithiActived
    const changeKithiActived = (kithi) => {
        setKithiActived(kithi)
        setNhoms(kithi.nhoms)
        setNhomActived(kithi.nhoms[0])
        setDemos(kithi.dethimos)
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
            user: user[0]
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
            setKithis([res.data, ...kithis])
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
            toggleThemDe()
        })
    }
    // end them de
    // LOAD DE CUA MON Active
    let optionsDethiActived = []
    const [dethisActived, setDethisActived] = useState([])
    const LOAD_DE_MON_ACTIVED = async () => {
        let data = await callApi(`de-thi/mon/${kithiActived.mon}`)
        if (data) {
            setDethisActived(data.data)
        }
    }
    useEffect(() => {
        if (kithiActived)
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

    // remove Dethi
    const removeDethi = (dethi, dethiRenderDong, dethiRenderMo) => {
        const newDethiDong = dethiRenderDong.filter(de => de._id === dethi._id)
        const newDethiMo = dethiRenderMo.filter(de => de._id === dethi._id)

        let dethirenderdong = []
        newDethiDong.map(item => {
            dethirenderdong.push(item._id)
        })
        let dethirendermo = []
        newDethiMo.map(item => {
            dethirendermo.push(item._id)
        })
        const data = {
            _iddethi: dethi._id,
            _idkithi: kithiActived._id,
            dethirenderdong: dethirenderdong,
            dethirendermo: dethirendermo
        }
        callApi(`ki-thi/remove-de-thi`, 'POST', data)
    }
    const handleChange = (dethiRenderMo) => {
        setDemos(dethiRenderMo)
    }
    // end remove Dethi

    // them  nhom    
    const [isOpenNhom, setIsOpenNhom] = useState(false);
    const toggleThemNhom = () => setIsOpenNhom(!isOpenNhom);
    const [nhomAll, setNhomAll] = useState([])
    useEffect(() => {
        const LOAD_NHOM = async () => {
            let data = await callApi('nhom')
            setNhomAll(data.data)
        }
        LOAD_NHOM()
    }, [])
    let optionsNhom = []
    if (nhomAll.length > 0) {
        nhomAll.map(nhom => {
            optionsNhom.push({ label: nhom.ten, value: nhom._id })
        })
    }
    const [nhomSelected, setNhomSelected] = useState('')
    const selectedNhom = (nhom) => {
        setNhomSelected(nhom.value)
    }
    const onSaveThemNhom = () => {
        const data = {
            _idkithi: kithiActived._id,
            _idnhom: nhomSelected
        }
        callApi('ki-thi/them-nhom', 'POST', data).then(res => {
            //setKithiActived(res.data)         
            setNhoms(res.data.nhoms)
            setNhomActived(res.data.nhoms[res.data.nhoms.length - 1])
        })

        toggleThemNhom()
    }
    ///////////////////////subNhomChange
    const subNhomChange = (nhom) => {
        setNhomActived(nhom)
    }
    /////////////////////// removeNhom
    const removeNhom = (nhom) => {
        const newNhoms = nhoms.filter(n => n._id != nhom._id)
        const data = {
            _idkithi: kithiActived._id,
            _idnhom: nhom._id
        }
        callApi('ki-thi/remove-nhom', 'POST', data)
        setNhoms(newNhoms)
        setNhomActived(newNhoms[0])
    }
    ////////////////////// changeStatus
    const changeStatus = (kithi) => {
        const idx = kithis.indexOf(kithi)
        let newKithis = kithis
        newKithis[idx].trangthai = !newKithis[idx].trangthai
        setKithis(newKithis)
        callApi(`ki-thi/trang-thai/${kithi._id}`)
    }
    //console.log('data', kithiActived)        
    //changeKithiActive
    const changeKithiActive = (kithi) => {

        const newKithis = kithis.filter(kt => kt._id !== kithi._id)

        setKithis([...newKithis, kithi])
        setKithiActived(kithi)
    }
    const [isSearch, setIsSearch] = useState(false)
    const [keySearch, setKeySearch] = useState('')

    const typingTimeoutRef = useRef(null)
    const changeSearch = (e) => {
        const value = e.target.value
        setKeySearch(value)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            // callApi(`ki-thi/tim-kiem`, 'POST', { key: value }).then(res => {
            //     console.log('res', res.data)
            // })
            const newKithis = kithis.filter(kithi => kithi.ma.toUpperCase().indexOf(value.toUpperCase()) !== -1)
            if (newKithis.length > 0) {
                setKithiRender(newKithis)
                setKithiActived(newKithis[0])
                if (newKithis[0].nhoms.length > 0) {
                    setNhoms(newKithis[0].nhoms)
                    setNhomActived(newKithis[0].nhoms[0])
                } else {
                    setNhomActived('')
                    setNhoms('')
                }
            } else {
                setKithiRender([])
                setKithiActived('')
                setNhomActived('')
                setNhoms('')
            }
        }, 1000)
    }
    //console.log('kihia', kithiActived)
    return (
        <div className='page-ki-thi'>
            <div className='content-page'>
                <div className='left'>
                    <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={toggleTaoKiThi} />
                    <FontAwesomeIcon className='ic-add ic-init search' icon="search" onClick={() => setIsSearch(!isSearch)} />

                    <input type='text'
                        className={isSearch ? 'search-input-actived' : 'search-input'}
                        value={keySearch}
                        onChange={changeSearch}
                    />

                    {
                        (kithiActived && kithiActived.tinhtrang === 2) && <FontAwesomeIcon className='ic-add ic-init2' icon="plus" onClick={toggleThemDe} />
                    }
                    {
                        kithiRender.length > 0 ?
                            kithiRender.map(kithi => {
                                return (
                                    <div className='kithis' key={kithi._id} onClick={() => changeKithiActived(kithi)} >
                                        <KiThi
                                            changeStatus={changeStatus}
                                            kithi={kithi}
                                            kithiActived={kithiActived}
                                            remove={handleRemove}
                                            changeKithiActive={changeKithiActive}
                                        />
                                    </div>
                                )
                            }) : <div>Không tìm thấy: <i><b>"{keySearch}"</b></i></div>
                    }
                </div>
                <div className='right'>
                    <KiThiCT
                        kithi={kithiActived}
                        dethis={kithiActived ? kithiActived.dethis : ''}
                        dethidongs={kithiActived ? kithiActived.dethidongs : ''}
                        dethimos={kithiActived ? kithiActived.dethimos : ''}
                        remove={removeDethi}
                        change={handleChange}
                    />
                    {/* <KiThiCT kithi={kithiActived} /> */}
                    {/* <hr /> */}
                    <br />
                    {/* <Nhoms /> */}
                    <div style={{ display: 'flex' }}>
                        {
                            nhoms.length > 0 && <Nhom
                                remove={removeNhom}
                                nhoms={nhoms}
                                subNhomChange={subNhomChange}
                                nhomActived={nhomActived} />
                        }
                        {
                            (kithiActived && kithiActived.tinhtrang === 2) && <FontAwesomeIcon className='ic-add' style={{ opacity: '0.5', fontSize: '18px' }} icon="plus" onClick={toggleThemNhom} />
                        }
                    </div>
                    {/* <hr /> */}
                    <br />

                    <div>
                        {
                            nhomActived && <DanhSach nhom={nhomActived} demos={demos} />
                        }
                    </div>
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


            {/* Thêm đề */}
            <div>
                <Modal isOpen={isOpenNhom} toggle={toggleThemNhom}>
                    <form>
                        <ModalHeader toggle={toggleThemNhom}>Thêm nhóm</ModalHeader>
                        <ModalBody>
                            <div className='form'>
                                <div className='control'>
                                    <label>Chọn nhóm:</label>
                                    <div>
                                        <Select
                                            className='chon-de-thi'
                                            options={optionsNhom}
                                            onChange={selectedNhom}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className='btn btn-primary' color="primary" onClick={onSaveThemNhom}>Thêm </div>
                            <div className='btn btn-secondary' color="secondary" onClick={toggleThemNhom}>Cancel</div>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>

        </div >
    );
}

export default PageMain;