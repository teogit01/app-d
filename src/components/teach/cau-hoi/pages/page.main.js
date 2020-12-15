import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import callApi from 'api/apiCaller';
import Mon from './../components/mon'
import CauHoi from './../components/cauhoi'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    // LOAD MON
    const [mons, setMons] = useState([])
    const [monActived, setMonActived] = useState('')
    const [cauhois, setCauhois] = useState([])

    useEffect(() => {
        const LOAD_MON = async () => {
            let data = await callApi('mon')
            setMons(data.data)
            setMonActived(data.data[0])
        }
        LOAD_MON()
    }, [])
    // ENd LOAD MON
    // activeMon
    const activeMon = (mon) => {
        setMonActived(mon)
    }
    // end activeMon

    // handleThemCauHoi        
    const handleThemCauHoi = () => {
        toggleAddMon()
    }
    // end handleThemCauHoi

    // chang input 
    const [valueTen, setValueTen] = useState('')
    const [valueMa, setValueMa] = useState('')
    const changeValue = (e) => {
        if (e.target.name === 'ma') {
            setValueMa(e.target.value)
        }
        if (e.target.name === 'ten') {
            setValueTen(e.target.value)
        }
    }
    const onSave = (e) => {
        let data = {
            ma: valueMa,
            ten: valueTen
        }
        callApi('mon', 'POST', data).then((res) => {
            setMons([...mons, res.data.mon])
            setMonActived(res.data.mon)
            setValueMa('')
            setValueTen('')
            toggleAddMon()
        })
    }
    // end change input 

    // modal
    const [isOpenAddMon, setIsOpenAddMon] = useState(false);
    const [isOpenAddCauHoi, setIsOpenAddCauHoi] = useState(false);

    const toggleAddMon = () => setIsOpenAddMon(!isOpenAddMon);
    const toggleAddCauHoi = () => setIsOpenAddCauHoi(!isOpenAddCauHoi);
    // end modal
    // LOAD CAU HOI CUA MON    
    const LOAD_CAU_HOI_MON = async () => {
        const data = await callApi(`cau-hoi/mon/${monActived._id}`)
        if (data) {
            setCauhois(data.data)
        }
    }
    useEffect(() => {
        if (monActived)
        LOAD_CAU_HOI_MON()
    }, [monActived])
    // END LOAD CAU HOI CUA MON

    // on change value form them cau hoi
    const [valueNoiDung, setValueNoiDung] = useState('')
    const [valuePhuongAnA, setValuePhuongAnA] = useState('')
    const [valuePhuongAnB, setValuePhuongAnB] = useState('')
    const [valuePhuongAnC, setValuePhuongAnC] = useState('')
    const [valuePhuongAnD, setValuePhuongAnD] = useState('')
    const [dapan, setDapAn] = useState('A')

    const ChangeFormCauHoi = (e) => {
        let name = e.target.name
        if (name === 'noidung') {
            setValueNoiDung(e.target.value)
        }
        if (name === 'phuongana') {
            setValuePhuongAnA(e.target.value)
        }
        if (name === 'phuonganb') {
            setValuePhuongAnB(e.target.value)
        }
        if (name === 'phuonganc') {
            setValuePhuongAnC(e.target.value)
        }
        if (name === 'phuongand') {
            setValuePhuongAnD(e.target.value)
        }

    }
    const changeDapan = (e) => {
        setDapAn(e.target.value)
    }
    const saveCauHoi = () => {

        const data = {
            noidung: valueNoiDung,
            phuongans: [
                { ten: 'A', noidung: valuePhuongAnA, dapan: dapan === 'A' ? true : false },
                { ten: 'B', noidung: valuePhuongAnB, dapan: dapan === 'B' ? true : false },
                { ten: 'C', noidung: valuePhuongAnC, dapan: dapan === 'C' ? true : false },
                { ten: 'D', noidung: valuePhuongAnD, dapan: dapan === 'D' ? true : false },
            ],
            _idmon: monActived._id
        }
        callApi('cau-hoi/them', 'POST', data).then(res => {
            setCauhois([...cauhois, res.data.result_cauhoi])
            const idx = mons.indexOf(monActived)
            if (idx != -1) {
                let newMons = [...mons.slice(0, idx), res.data.result_mon, ...mons.slice(idx + 1, mons.length)]
                setMons(newMons)
                setMonActived(res.data.result_mon)
            }
            setValueNoiDung('')
            setValuePhuongAnA('')
            setValuePhuongAnB('')
            setValuePhuongAnC('')
            setValuePhuongAnD('')
            setDapAn('A')
            toggleAddCauHoi()
            LOAD_CAU_HOI_MON()
        })
    }
    // end them cau hoi
    // remove cau hoi
    const handleRemove = (_idcauhoi) => {
        let newCauhois = cauhois.filter(cauhoi => cauhoi._id !== _idcauhoi)
        setCauhois(newCauhois)
        const data = {
            _idmon: monActived._id,
            _idcauhoi: _idcauhoi
        }
        callApi(`cau-hoi/remove`, 'POST', data).then(res => {

            const idx = mons.indexOf(monActived)
            if (idx != -1) {
                let newMons = [...mons.slice(0, idx), res.data.result_mon, ...mons.slice(idx + 1, mons.length)]
                setMons(newMons)
                setMonActived(res.data.result_mon)
            }
        })
    }
    // end remove cau hoi
    return (
        <div className='feature-cau-hoi'>
            <div className='content-page'>
                <div className='left'>
                    <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={handleThemCauHoi} />
                    <FontAwesomeIcon className='ic-add ic-init2' icon="plus" onClick={toggleAddCauHoi} />
                    {
                        mons.length > 0 &&
                        mons.map(mon => {
                            return (
                                <div className='' onClick={() => { activeMon(mon) }}>
                                    <Mon key={mon._id} mon={mon} monActived={monActived} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right'>
                    {
                        cauhois.length > 0 &&
                        cauhois.map(cauhoi => {
                            return <CauHoi key={cauhoi._id} cauhoi={cauhoi} remove={handleRemove} />
                        })
                    }
                </div>
            </div>
            {/* Modal them mon */}
            <div>
                <Modal isOpen={isOpenAddMon} className=''>
                    <form className=''>
                        <ModalHeader>Thêm môn</ModalHeader>
                        <ModalBody className='t'>
                            <div className='form'>
                                <input type='text' placeholder='Nhập mã' value={valueMa} onChange={changeValue} name='ma' />
                                <input type='text' placeholder='Nhập tên'
                                    value={valueTen}
                                    onChange={changeValue} name='ten' />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className='btn btn-primary' color="primary" onClick={onSave} >Thêm</div>
                            <div className='btn btn-secondary' color="secondary" onClick={toggleAddMon}>Huỷ</div>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
            {/* Modal them cau hoi */}
            <div>
                <Modal isOpen={isOpenAddCauHoi} className=''>
                    <form className=''>
                        <ModalHeader>Thêm câu hỏi</ModalHeader>
                        <ModalBody className='t'>
                            <div className='form'>
                                <textarea placeholder='Nhập nội dung câu hỏi'
                                    onChange={ChangeFormCauHoi}
                                    value={valueNoiDung}
                                    name='noidung'>
                                </textarea>
                                <textarea placeholder='Phương án A'
                                    className='phuong-an'
                                    onChange={ChangeFormCauHoi}
                                    value={valuePhuongAnA}
                                    name='phuongana'>
                                </textarea>
                                <textarea placeholder='Phương án B'
                                    className='phuong-an'
                                    onChange={ChangeFormCauHoi}
                                    value={valuePhuongAnB}
                                    name='phuonganb'>
                                </textarea>
                                <textarea placeholder='Phương án C'
                                    className='phuong-an'
                                    onChange={ChangeFormCauHoi}
                                    value={valuePhuongAnC}
                                    name='phuonganc'>
                                </textarea>
                                <textarea placeholder='Phương án D'
                                    className='phuong-an'
                                    onChange={ChangeFormCauHoi}
                                    value={valuePhuongAnD}
                                    name='phuongand'>
                                </textarea>

                                <div className='dap-an'>
                                    Đán án: &nbsp;
                                    <div>
                                        <input type='radio' name='' value='A'
                                            checked={dapan === 'A'}
                                            onChange={changeDapan}
                                        />(A)
                                    </div>
                                    <div>
                                        <input type='radio' name='' value='B'
                                            checked={dapan === 'B'}
                                            onChange={changeDapan}
                                        />(B)
                                    </div>
                                    <div>
                                        <input type='radio' name='' value='C'
                                            checked={dapan === 'C'}
                                            onChange={changeDapan}
                                        />(C)
                                    </div>
                                    <div>
                                        <input type='radio' name='' value='D'
                                            checked={dapan === 'D'}
                                            onChange={changeDapan}
                                        />(D)
                                    </div>

                                </div>

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className='btn btn-primary' color="primary" onClick={saveCauHoi} >Thêm</div>
                            <div className='btn btn-secondary' color="secondary" onClick={toggleAddCauHoi}>Huỷ</div>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default PageMain;