import React, { useEffect, useState } from 'react';
import './css/giao-vien.scss'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ThongTinCaNhan from './../components/thongtincanhan'
import ThongTinNhom from './../components/thongtinnhom'
import ThongTinKiThi from './../components/thongtinkithi'
import ThongTinDeThi from './../components/thongtindethi'
import PropTypes from 'prop-types';
import callApi from 'api/apiCaller';

GiaoVien.propTypes = {
    _idgv: PropTypes.string
};

function GiaoVien(props) {
    const { _idgv } = props
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const [giaovien, setGiaoVien] = useState('')
    useEffect(() => {
        if (_idgv) {
            callApi('tai-khoan/chi-tiet', 'POST', { _idgv }).then(res => {
                setGiaoVien(res.data.result)
            })
        }
    }, [_idgv])
    return (
        <div className='giao-vien'>
            <div>
                <Nav tabs>
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
                            Danh sách nhóm
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Danh sách kì thi
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Danh sách đề thi
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <br />
                                <ThongTinCaNhan giaovien={giaovien} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <br />
                                <ThongTinNhom nhoms={giaovien.nhoms} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <br />
                                <ThongTinKiThi nhoms={giaovien.nhoms} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="12">
                                <br />
                                <ThongTinDeThi nhoms={giaovien.nhoms} />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
}

export default GiaoVien;