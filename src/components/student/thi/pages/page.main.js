import React, { useEffect, useState } from 'react';
import Cauhoi from './../components/cauhoi'
import Dethi from './../components/dethi'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useHistory } from 'react-router-dom'
import useQuery from 'components/student/commons/queries'
import callApi from 'api/apiCaller';

// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const query = useQuery()
    const _idbaithi = query.get('_idbaithi')
    const [baithi, setBaithi] = useState('')

    useEffect(() => {
        const LOAD_BAITHI = async () => {
            const data_baithi = await callApi(`bai-thi/detail/${_idbaithi}`)
            setBaithi(data_baithi.data)
        }
        LOAD_BAITHI()
    }, [])

    const [page, setPage] = useState(1)
    const [cauhoiRender, setCauhoiRender] = useState([])
    useEffect(() => {
        if (baithi.cauhois) {
            const per = Math.ceil(baithi.cauhois.length / 5)
            //setPer(per)
            const cauhoirender = baithi.cauhois.slice(5 * (1 - 1), 5 * (1))
            setCauhoiRender(cauhoirender)
        }
    }, [baithi.cauhois])
    const getStt = (stt) => {
        if (Math.ceil((stt + 1) / 5) !== page)
            setPage(Math.ceil((stt + 1) / 5))
        //console.log()
    }
    useEffect(() => {
        if (baithi.cauhois) {
            const cauhoirender = baithi.cauhois.slice(5 * (page - 1), 5 * (page))
            setCauhoiRender(cauhoirender)
        }
    }, [page])

    //console.log(baithi)
    const [cauhoiChoosed, setCauhoiChoosed] = useState([])
    const [cauhoiChoosedCheck, setCauhoiChoosedChek] = useState([])
    const choose = (_idcauhoi, phuongan) => {
        const idx = cauhoiChoosedCheck.indexOf(_idcauhoi)
        if (idx === -1) {
            const newCauhoiChoosedCheck = [...cauhoiChoosedCheck, _idcauhoi]
            const newCauhoiChoosed = [...cauhoiChoosed, { 'cauhoi': _idcauhoi, 'phuongan': phuongan }]
            setCauhoiChoosed(newCauhoiChoosed)
            setCauhoiChoosedChek(newCauhoiChoosedCheck)
        } else {
            let position = 0
            cauhoiChoosed.filter((cauhoi, idx) => {
                if (cauhoi.cauhoi === _idcauhoi) {
                    return position = idx
                }
            })
            //console.log(position)
            const newCauhoiChoosed = [...cauhoiChoosed]
            newCauhoiChoosed[position].phuongan = phuongan
            //const newCauhoiChoosed = [...cauhoiChoosed.slice(0, position), { 'cauhoi': _idcauhoi, 'phuongan': _idphuongan }, ...cauhoiChoosed.slice((position + 1, cauhoiChoosed.length - 1))]
            setCauhoiChoosed(newCauhoiChoosed)
        }
    }

    // handle nop bai
    const [dung, setDung] = useState(0)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const nopbai = () => {
        //toggle()
        const now = new Date()
        const hour = ('0' + now.getHours()).slice(-2)
        const minute = ('0' + now.getMinutes()).slice(-2)

        const newDung = cauhoiChoosed.filter(cauhoi => cauhoi.phuongan.dapan === true)
        setDung(newDung.length)

        const data = {
            _idbaithi: _idbaithi,
            phuongans: cauhoiChoosed,
            tgnb: `${hour}:${minute}`,
            dung: newDung.length
        }

        callApi('bai-thi/nop-bai', 'POST', data)
        toggle()
        //console.log(data)
    }
    const history = useHistory()
    const redirect = () => {
        toggle()
        history.goBack()
    }
    return (
        <div className='page-thi'>
            <div className='content-page'>
                <div className='left'>
                    <Cauhoi baithi={baithi} getStt={getStt} cauhoiChoosed={cauhoiChoosedCheck} nopbai={nopbai} />
                </div>
                <div className='right'>
                    <Dethi cauhois={cauhoiRender} phuongans={cauhoiChoosed} page={page} choose={choose} />
                </div>
            </div>

            {/* Modal nop bai thanh cong!*/}
            <div>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader >Kết quả thi</ModalHeader>
                    <ModalBody>
                        {
                            baithi.cauhois &&
                            <div>{dung}/{baithi.cauhois.length}</div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={redirect}> Xác nhận</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div >
    );
}

export default PageMain;