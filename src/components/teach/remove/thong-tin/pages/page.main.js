import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import callApi from 'api/apiCaller'
import axios from 'axios'

// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    //
    const [checkEdit, setCheckEdit] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userLogin')))
    //const user = JSON.parse(localStorage.getItem('userLogin'))
    useEffect(() => {
        if (user) {
            setTen(user[0].ten)
            setNgaysinh(user[0].ngaysinh)
            setGioitinh(user[0].gioitinh)
            setEmail(user[0].email)
            setSdt(user[0].sdt)
            setDiachi(user[0].diachi)
        }
    }, [user])

    const [ten, setTen] = useState('')
    const [ngaysinh, setNgaysinh] = useState('')
    const [gioitinh, setGioitinh] = useState('')
    const [email, setEmail] = useState('')
    const [sdt, setSdt] = useState('')
    const [diachi, setDiachi] = useState('')

    const change = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'ten') {
            setTen(value)
        }
        if (name === 'ngaysinh') {
            setNgaysinh(value)
        }
        if (name === 'gioitinh') {
            setGioitinh(value)
        }
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'sdt') {
            setSdt(value)
        }
        if (name === 'diachi') {
            setDiachi(value)
        }
    }
    const submit = () => {
        setCheckEdit(!checkEdit)
        const data = {
            ten,
            ngaysinh,
            gioitinh,
            email,
            sdt,
            diachi,
            _iduser: user[0]._id
        }
        callApi('tai-khoan/cap-nhat', 'POST', data).then(res => {
            // localStorage.removeItem('userLogin')
            localStorage.setItem('userLogin', JSON.stringify(res.data))
            setUser(res.data)
        })
    }

    //// end tab thong tin
    /// tab lich su thi
    const [baithis, setBaithis] = useState([])
    useEffect(() => {
        const LOAD_LICHSUTHI = async () => {
            callApi(`tai-khoan/lich-su-thi/${user[0]._id}`).then(res => {
                setBaithis(res.data.baithis)
            })

        }
        LOAD_LICHSUTHI()
    }, [])

    const [modal, setModal] = useState(false);
    const [baithiSelected, setBaithiSelected] = useState('')
    const toggle_modal = () => setModal(!modal);
    const chitietbaithi = (baithi) => {
        setBaithiSelected(baithi)
        toggle_modal()
    }
    /// end tab lich su thi
    // console.log(baithiSelected)
    let cauhoiNotDo = []
    baithiSelected.cauhois && baithiSelected.cauhois.map(cauhoi => {
        let count = 0
        cauhoi.phuongans.map((phuongan, idx) => {
            const check = baithiSelected.phuongans.filter(pa => pa === phuongan._id)
            if (check.length > 0)
                count++
            if (idx === 3) {
                if (count == 0)
                    cauhoiNotDo.push(cauhoi._id)
            }
        })
    })

    const changeImage = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        //setImg(file)
        reader.onloadend = () => {

            setImage(reader.result)
            //setPoster(file)    		
        }
        reader.readAsDataURL(file)
        setDataImage(file)
    }

    const [dataImage, setDataImage] = useState('')
    const [image, setImage] = useState('')
    const saveImage = async () => {
        // console.log(values)
        //console.log(dataPoster)
        const formData = new FormData();
        formData.append("image", dataImage);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let filePath
        await axios.post('http://localhost:3001/api/tai-khoan/upload-image', formData, config).then(res => {
            console.log('RES', res.data)
            filePath = res.data.split('/')[2]
        })

        let valueSubmit = { _iduser: user[0]._id, imageName: filePath }

        callApi('tai-khoan/update-user', 'POST', valueSubmit).then((res) => {
            localStorage.setItem('userLogin', JSON.stringify([res.data]))
            setUser([res.data])
            //history.goBack()
        })
    }
    // end upload image    
    return (
        <div className='page-thong-tin'>
            <div className='main'>
                <div className='left'>
                    <div className='content-left'>
                        <div className='avatar'>
                            {/* <img src='' /> */}
                            <img src={image ? image : (user[0] && user[0].hinhanh) ? `http://localhost:3001/api/image/${user[0].hinhanh}` : ''} style={{ width: '240px', height: '300px' }} />
                        </div>
                    </div>
                    <div className='control'>
                        <input type='file'
                            //className='form-control'
                            name='image'
                            onChange={changeImage}
                        />
                        <br /><br />
                        {image ? <><div className='btn btn-info' onClick={saveImage} style={{ width: '100px' }}>Lưu lại</div>
                            &nbsp;
                            <div className='btn btn-info' style={{ width: '100px' }}>Huỷ bỏ</div> </>
                            : ''}
                    </div>
                </div>
                <div className='right'>
                    <div>
                        <Nav tabs >
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Thông tin cá nhân
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Lịch sử thi
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}
                                >
                                    Danh sách nhóm
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <br />
                        <TabContent activeTab={activeTab} >
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <div className='right-infor'>
                                            <div className='thong-tin-ct'>
                                                <div className='control'>
                                                    <div><label>MSSV:</label></div>
                                                    <div>{user[0].maso}</div>
                                                </div>

                                                <div className='control'>
                                                    <div><label>Họ Tên:</label></div>
                                                    <div>
                                                        <input type='text'
                                                            name='ten'
                                                            value={ten}
                                                            onChange={change}
                                                            disabled={!checkEdit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='control'>
                                                    <div><label>Ngày sinh:</label></div>
                                                    <div>
                                                        <input type='text'
                                                            name='ngaysinh'
                                                            value={ngaysinh}
                                                            onChange={change}
                                                            disabled={!checkEdit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='control'>
                                                    <div><label>Giới tính:</label></div>
                                                    <div>
                                                        <input type='text'
                                                            name='gioitinh'
                                                            value={gioitinh}
                                                            onChange={change}
                                                            disabled={!checkEdit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='control'>
                                                    <div><label>Email:</label></div>
                                                    <div>
                                                        <input type='text'
                                                            name='email'
                                                            value={email}
                                                            onChange={change}
                                                            disabled={!checkEdit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='control'>
                                                    <div><label>SĐT:</label></div>
                                                    <div>
                                                        <input type='text'
                                                            name='sdt'
                                                            value={sdt}
                                                            onChange={change}
                                                            disabled={!checkEdit}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='control'>
                                                    <div><label>Địa chỉ:</label></div>
                                                    <div>
                                                        <input type='text'
                                                            name='diachi'
                                                            value={diachi}
                                                            onChange={change}
                                                            disabled={!checkEdit}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div className='button-control'>
                                                {
                                                    !checkEdit ? <div className='btn btn-info button' onClick={() => { setCheckEdit(!checkEdit) }}>
                                                        Cập nhật thông tin</div> :
                                                        <>
                                                            <div className='btn btn-info button' onClick={submit}>Lưu lại</div>
                                                            <div className='btn btn-info button' onClick={() => { setCheckEdit(!checkEdit) }}>Huỷ</div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    {
                                        (baithis && baithis.length > 0) &&
                                        baithis.map(baithi => {
                                            return (
                                                <Col sm="6" key={baithi._id}>
                                                    <Card body>
                                                        <CardTitle>
                                                            <div>{baithi.ngay}</div>

                                                        </CardTitle>
                                                        <CardText>
                                                            <div>{baithi.kithi.tieude}</div>
                                                            <div>{baithi.dethi.tieude}</div>
                                                            <div>Số câu đúng: {baithi.dung}/{baithi.dung + baithi.sai}</div>
                                                            <div>Điêm: {(baithi.diem && baithi.diem != '') && `${baithi.diem.toString().slice(0, 4)} đ`}  </div>
                                                        </CardText>
                                                        <Button onClick={() => chitietbaithi(baithi)}>Xem chi tiết</Button>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </TabPane>


                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>Special Title Treatment</CardTitle>
                                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle_modal} size={'lg'}>
                    <ModalHeader> <b>Chi tiết bài thi</b> </ModalHeader>
                    <ModalBody>
                        <div>
                            {
                                baithiSelected && baithiSelected.cauhois.map((cauhoi, idx) => {
                                    const check = cauhoiNotDo.filter(ch => ch === cauhoi._id)
                                    return (
                                        <div key={cauhoi._id}>
                                            <div className={classnames(
                                                { 'chua-lam': check.length > 0 }
                                            )}>
                                                <b>Câu {idx + 1}</b>: {cauhoi.noidung}
                                            </div>
                                            {
                                                cauhoi.phuongans.map(phuongan => {
                                                    const _idtraloi = baithiSelected.phuongans.filter(pa => pa === phuongan._id)
                                                    return (
                                                        <div key={phuongan._id}>
                                                            <div
                                                                className={classnames(
                                                                    { 'dap-an': phuongan.dapan },
                                                                    { 'sai': _idtraloi[0] === phuongan._id && !phuongan.dapan },

                                                                )}
                                                            >
                                                                ({phuongan.ten}) &nbsp;&nbsp;
                                                            {phuongan.noidung}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle_modal}> Xong</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div >
    );
}

export default PageMain;