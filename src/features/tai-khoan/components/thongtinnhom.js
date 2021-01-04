import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './css/thongtinnhom.scss'

ThonTinNhom.propTypes = {
    nhoms: PropTypes.array
};

function ThonTinNhom(props) {
    const { nhoms } = props

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [nhomsSelected, setNhomSelected] = useState('')
    const _chitiet = (nhom) => {
        toggle()
        setNhomSelected(nhom)
    }
    //console.log(nhomsSelected)
    return (
        <div>
            <div className='thongtin-nhom'>
                <div className='title'>
                    <h4>Danh sách nhóm</h4>
                    <div className='nhoms_1'>
                        {
                            nhoms && nhoms.map(nhom => {
                                return (
                                    <div className='nhom-item' onClick={() => { _chitiet(nhom) }} >
                                        {nhom.ten}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle} size='lg'>
                    <ModalHeader toggle={toggle}>Danh sách thành viên nhóm <b>{nhomsSelected.ten}</b></ModalHeader>
                    <ModalBody>
                        <div className='ds-sinhvien'>
                            {
                                (nhomsSelected.sinhviens && nhomsSelected.sinhviens.length > 0) &&
                                nhomsSelected.sinhviens.map((sv, idx) => {
                                    return (
                                        <div className='sinhvien-item'>
                                            <div className='control'>
                                                {idx + 1}
                                            </div>
                                            <div className='control'>
                                                {sv.maso}
                                            </div>
                                            <div className='control'>
                                                {sv.ten}
                                            </div>
                                            <div className='control'>
                                                {sv.email}
                                            </div>
                                            <div className='control'>
                                                {sv.sdt}
                                            </div>
                                            <div className='control'>
                                                {sv.diachi}
                                            </div>
                                        </div>
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

export default ThonTinNhom;