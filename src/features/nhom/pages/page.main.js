import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import callApi from 'api/apiCaller';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

PageMain.propTypes = {

};

function PageMain(props) {
    const [GVS, setGVS] = useState([])
    const [gvActived, setGvActived] = useState('')
    const [nhoms, setNhoms] = useState([])
    const [nhomActived, setNhomActived] = useState('')
    useEffect(() => {
        const LoadGiaovien = async () => {
            const data = await callApi('tai-khoan/giao-vien')
            if (data) {
                setGVS(data.data.giaoviens)
                setGvActived(data.data.giaoviens[0])
                setNhomActived(data.data.giaoviens[0].nhoms[0])
            }
        }
        LoadGiaovien()
    }, [])
    useEffect(() => {
        if (gvActived) {
            setNhoms(gvActived.nhoms)
            if (gvActived.nhoms.length > 0)
                setNhomActived(gvActived.nhoms[0])
            else
                setNhomActived('')
        }
    }, [gvActived])

    // _actived
    const _actived = (type, value) => {
        if (type === 'gv') {
            setGvActived(value)
        }
        if (type === 'nhom') {
            setNhomActived(value)
        }
    }
    // end actived


    // tabs
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    // end tabs

    // nhom detail    
    // end nhom detail
    console.log('nhom', nhomActived)
    return (
        <div className='page-main'>
            <div className='giaoviens'>
                {
                    (GVS && GVS.length > 0) &&
                    GVS.map(gv => {
                        return (
                            <div
                                key={gv._id} className={gv._id === gvActived._id ? 'giao-vien-item giao-vien-item-actived' : 'giao-vien-item'}
                                onClick={() => _actived('gv', gv)}>
                                <div>
                                    {gv.ten}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='nhoms'>
                {
                    nhoms.length > 0 &&
                    nhoms.map(nhom => {
                        return (
                            <div
                                key={nhom._id}
                                onClick={() => _actived('nhom', nhom)}
                                className={nhom._id === nhomActived._id ? 'nhom-item1 nhom-item1-actived' : 'nhom-item1'} >
                                <div>{nhom.ten}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='nhom-detail'>
                {
                    nhomActived &&
                    <div>
                        <Nav tabs>
                            <NavItem className='hover'>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    DS sinh viên
                        </NavLink>
                            </NavItem>
                            <NavItem className='hover'>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Thông báo
                            </NavLink>
                            </NavItem>
                            <NavItem className='hover'>
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}
                                >
                                    Kì thi
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <br />
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <div className='ds-sinh-vien'>
                                            <div className='ds-sinh-vien-wrap'>
                                                <div className='ds-sinh-vien-item'>
                                                    <div className='stt'><b>#</b></div>
                                                    <div className='ten'><b>Tên</b></div>
                                                    <div className='email'><b>Email</b></div>
                                                    <div className='sdt'><b>SĐT</b></div>
                                                    <div className='diachi'><b>Địa chỉ</b></div>
                                                </div>
                                                {
                                                    (nhomActived.sinhviens && nhomActived.sinhviens.length > 0) &&
                                                    nhomActived.sinhviens.map((sv, idx) => {

                                                        return (
                                                            <div key={sv._id} className='ds-sinh-vien-item'>
                                                                <div className='stt'>{idx + 1}</div>
                                                                <div className='ten'>{sv.ten}</div>
                                                                <div className='email'>{sv.email}</div>
                                                                <div className='sdt'>{sv.sdt}</div>
                                                                <div className='diachi'>{sv.diachi}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <div className='ds-thong-bao'>
                                            <div className='ds-thong-bao-wrap'>
                                                {
                                                    (nhomActived.thongbaos && nhomActived.thongbaos.length > 0) &&
                                                    nhomActived.thongbaos.reverse().map((tb, idx) => {
                                                        return (
                                                            <div key={tb._id} className='thong-bao-item'>
                                                                {/* <div className='stt'>{idx + 1}</div> */}
                                                                <div className='noidung'>{tb.noidung}</div>
                                                                <div className='ngay'>{tb.ngay}</div>
                                                                <div className='gioi'>{tb.gio}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <Col sm="12">
                                            <div className='ds-ki-thi'>
                                                <div className='ds-ki-thi-wrap'>
                                                    {
                                                        (nhomActived.kithis && nhomActived.kithis.length > 0) &&
                                                        nhomActived.kithis.map((kt, idx) => {
                                                            return (
                                                                <div key={kt._id} className='ki-thi-item'>
                                                                    {/* <div className='stt'>{idx + 1}</div> */}
                                                                    <div className='tieude'>{kt.tieude}</div>
                                                                    <div className='matkhau'>{kt.matkhau}</div>
                                                                    <div className='ngaythi'>{kt.ngaythi}</div>
                                                                    <div className='hocki'>{kt.hocki}</div>

                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                }
            </div>
        </div>
    );
}

export default PageMain;