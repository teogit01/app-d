import React from 'react';
import './../components/css/page-main.scss'
import Menu from './../components/menu'

import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TaiKhoan from './../components/tai-khoan'
import GiaoVien from './../components/giao-vien'
import GiaoVienCT from './../components/giao-vien-ct'
import SinhVien from './../components/sinh-vien'
import Thongke from './../components/thong-ke'

import Cauhoi from './../components/cau-hoi.js'
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const match = useRouteMatch()
    return (
        <div className='page-main'>
            <div className='header'>
                {/* <marquee>Hệ thống hỗ trợ thi trắc nghiệm trực tuyến</marquee> */}
                Hệ thống hỗ trợ thi trắc nghiệm trực tuyến
            </div>
            <div className='menu'>
                <Menu />
            </div>
            <div className='page-content'>
                <Switch>
                    <Route path={`${match.url}/tai-khoan`} exact component={() => <TaiKhoan />} />
                    <Route path={`${match.url}/tai-khoan/giao-vien`} exact component={() => <GiaoVien />} />
                    <Route path={`${match.url}/tai-khoan/giao-vien/:_id`} component={() => <GiaoVienCT />} />

                    <Route path={`${match.url}/tai-khoan/sinh-vien`} exact component={() => <SinhVien />} />
                    {/* <Route path={`${match.url}/tai-khoan/sinh-vien/:_id`} component={() => <GiaoVienCT />} /> */}
                    <Route path={`${match.url}/cau-hoi/`} exact component={() => <Cauhoi />} />
                    <Route path={`${match.url}/thong-ke/`} exact component={() => <Thongke />} />
                </Switch>
            </div>
        </div>
    );
}

export default PageMain;