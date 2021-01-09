import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './css/thongtinkithi.scss'
import DeThi from 'components/teach/de-thi/components/de-thi';

ThongTinKiThi.propTypes = {
    nhoms: PropTypes.array
};


function ThongTinKiThi(props) {
    const { nhoms } = props

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modalDethi, setModalDethi] = useState(false);
    const toggleDethi = () => setModalDethi(!modalDethi);

    const [kithiSelected, setKithiSelected] = useState('')

    const _chitiet = (kithi) => {
        toggle()
        setKithiSelected(kithi)
    }
    //console.log(kithiSelected)
    const [dethiSelected, setDethiSelected] = useState('')
    const _chitietKithi = (dethi) => {
        toggleDethi()
        setDethiSelected(dethi)
    }
    console.log(dethiSelected)
    return (
        <div>
            <div className='thongtin-kithi'>
                <div className='title'>
                    <h4>Danh sách kì thi</h4>
                    <div className='kithis'>
                        {
                            (nhoms && nhoms.length > 0) ? nhoms.map(item => {
                                return (
                                    <div>
                                        {
                                            item.kithis.length > 0 &&
                                            item.kithis.map(kithi => {
                                                return (
                                                    <div className='kithi-item' onClick={() => { _chitiet(kithi) }}>
                                                        {kithi.tieude}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                                : <div><i>Không có kì thi</i></div>
                        }
                    </div>
                </div>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle} size='lg'>
                    <ModalHeader toggle={toggle}>Danh sách đề thi của <b>{kithiSelected.tieude}</b></ModalHeader>
                    <ModalBody>
                        <div className='ds-kithi'>
                            {
                                (kithiSelected.dethis && kithiSelected.dethis.length > 0) &&
                                kithiSelected.dethis.map((dethi, idx) => {
                                    return (
                                        <div className='kithi-item' onClick={() => _chitietKithi(dethi)}>
                                            <div className='control'>
                                                {idx + 1}
                                            </div>
                                            <div className='control'>
                                                {dethi.tieude}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            <div>
                <Modal isOpen={modalDethi} toggle={toggleDethi} size='lg'>
                    <ModalHeader toggle={toggleDethi}>Chi tiết đề thi <b>{kithiSelected.tieude}</b></ModalHeader>
                    <ModalBody>
                        <div className='dethi-chitiet'>
                            {
                                (dethiSelected.cauhois && dethiSelected.cauhois.length > 0) &&
                                dethiSelected.cauhois.map((cauhoi, idx) => {
                                    return (
                                        <>
                                            <div className='dethi-item' >
                                                <div className='control stt'>
                                                    Câu {idx + 1}:
                                                </div>
                                                <div className='control'>
                                                    {cauhoi.noidung}
                                                </div>
                                            </div>
                                            <div className='control'>
                                                <div className='phuongan'>
                                                    {cauhoi.phuongans.map(pa => {
                                                        return (
                                                            <div className={pa.dapan ? 'phuongan-item da' : 'phuongan-item'}>
                                                                <div className='pa-name'>({pa.ten})</div>
                                                                <div>{pa.noidung}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}

export default ThongTinKiThi;