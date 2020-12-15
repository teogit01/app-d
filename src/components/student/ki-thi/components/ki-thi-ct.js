import React, { useState, useEffect } from 'react';
import './css/ki-thi-ct.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getHours, getMinutes, format } from 'date-fns'
import callApi from 'api/apiCaller'
import { useHistory, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types';

KiThiCT.propTypes = {
    kithi: PropTypes.object,
    //dethis: PropTypes.array,
    nhomActived: PropTypes.array
};

function convert(minute) {
    const gethour = `0${Math.floor(minute / 60)}`.slice(-2)
    const getminute = `0${minute % 60}`.slice(-2)
    return `${gethour}:${getminute}`
}
function convert_tgkt(tgbd, minute) {

    const gethouradd = Math.floor(minute / 60)
    const getminuteadd = minute % 60

    const minute_total = (parseInt(tgbd.slice(3, 5)) + parseInt(getminuteadd))
    const minute_kt = minute_total % 60
    const hour_kt = parseInt(tgbd.slice(0, 2)) + parseInt(gethouradd) + Math.floor(minute_total / 60)
    return `0${hour_kt}`.slice(-2) + ':' + `0${minute_kt}`.slice(-2)
}

function KiThiCT(props) {
    const { kithi, nhomActived } = props
    //const [dethiActived, setDethiActved] = useState(kithi.dethimos[0])
    const [dethisRender, setDethisRender] = useState([])
    const user = JSON.parse(localStorage.getItem('userLogin'))
    //console.log('de', dethiActived)
    //console.log('de', dethis)    
    //console.log('kithi ', kithi)
    useEffect(() => {
        if (kithi && nhomActived) {

            const load_dethi = async () => {
                const data = {
                    iddethis: kithi.dethimos
                }
                const result = await callApi('ki-thi/load-de', 'POST', data)

                if (nhomActived.sinhviens) {
                    nhomActived.sinhviens.sort((a, b) => {
                        if (a.maso < b.maso) {
                            return -1
                        }
                    }).map((sv, idx) => {
                        if (sv.maso === user[0].maso) {
                            //setDethisRender([dethisRender[idx % dethisRender.length]])                        
                            setDethisRender([result.data[idx % result.data.length]])
                            //setDethiActved([result.data[idx % result.data.length]])
                        }
                    })
                }
                //setDethisRender(result.data)
                //setDethiActved(result.data[0])
            }
            load_dethi()
        }
    }, [kithi, nhomActived])

    //console.log('nhomAc',nhomA)
    const [modalMk, setModalMk] = useState(false);
    const toggleMk = () => setModalMk(!modalMk);

    const [modalXacNhan, setModalXacNhan] = useState(false);
    const toggleXacNhan = () => setModalXacNhan(!modalXacNhan);

    const [idDethi, setIdDethi] = useState('')
    const selectDethi = (dethi) => {
        setIdDethi(dethi._id)
        //setDethiActved(dethi)
        setTgbd(`0${getHours(new Date())}`.slice(-2) + ':' + `0${getMinutes(new Date())}`.slice(-2))
        toggleMk()
    }
    const [error, setError] = useState('')
    const enterMatKhau = () => {
        if (kithi.matkhau === password) {
            toggleMk()
            toggleXacNhan()
            setError('')
            const data = {
                dethi: dethisRender[0],
                kithi: kithi,
                sinhvien: user[0]._id,
            }
            callApi(`bai-thi/check`, 'POST', data).then(res => {
                setDathi(res.data.result)
            })
        } else {
            setError('Mật khẩu không đúng!')
        }
    }

    ////// change password de thi
    const [password, setPassword] = useState('')
    const onChange = (e) => {
        setPassword(e.target.value)
    }
    ////// end change password de thi

    ///// redirect
    const history = useHistory()
    const match = useRouteMatch()
    const [tgbd, setTgbd] = useState('')
    const [dathi, setDathi] = useState(false)
    const redirect = () => {
        //history.push(`${match.url}/thi/${kithi._id}/${idDethi}`)             
        const data = {
            dethi: dethisRender[0],
            kithi: kithi,
            thoigian: kithi.thoigian,
            tgbd: tgbd,
            //tgkt: convert_tgkt(tgbd, kithi.thoigian),
            tgkt: convert_tgkt(tgbd, kithi.thoigian),
            sinhvien: user[0]._id,
            ngay: format(new Date(), 'dd/MM/yyyy')
        }
        //console.log(data)
        callApi(`bai-thi/create`, 'POST', data).then(res => {
            //console.log('data', res.data.result_baithi)
            history.push(`${match.url}/thi?_idbaithi=${res.data.result_baithi._id}`)
        })
    }

    //// end redirect
    return (
        <div className='ki-thi-chi-tiet'>
            <div className='wrap-de'>
                <div className='de-this'>
                    {
                        dethisRender.length > 0 &&
                        dethisRender.map(dethi => {
                            return (
                                <div key={dethi._id} className='de-thi' onClick={() => selectDethi(dethi)}>
                                    {/* <div className='remove'>X</div> */}
                                    <div>
                                        {dethi.tieude}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* <hr /> */}
            <br />
            <div className='thi-sinh'>
            </div>

            {/* modal select de thi */}
            <div>
                <Modal isOpen={modalMk}>
                    <ModalHeader toggle={toggleMk}>Nhập mật khẩu kì thi {dethisRender.length > 0 && dethisRender[0].tieude}</ModalHeader>
                    <ModalBody>
                        <input type='password' className='form-control' name='password' onChange={onChange} />
                        {error != '' && error}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={enterMatKhau}>Xác nhận</Button>
                        <Button color="secondary" onClick={toggleMk}>Huỷ</Button>
                    </ModalFooter>
                </Modal>
            </div>

            {/* modal xac nhan thi de thi */}
            <div>
                <Modal isOpen={modalXacNhan}>
                    <ModalHeader toggle={toggleXacNhan}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {
                                dathi ? <div style={{ width: '350px' }}>Bạn đã làm bài thi này!</div> :
                                    <div style={{ width: '350px' }}>Bắt đầu tính giờ làm bài</div>
                            }
                            <b>{!dathi ? tgbd : ''}</b>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ margin: '0 auto', marginLeft: '200px' }}>
                            {
                                dathi ? <Button color="primary" onClick={() => toggleXacNhan()}>Thoát</Button> :
                                    <Button color="primary" onClick={redirect}>Bắt đầu thi</Button>
                            }

                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div >
    );
}

export default KiThiCT;