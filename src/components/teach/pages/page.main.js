import React from 'react';
import PropTypes from 'prop-types';
import Menu from './../components/menu'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import PageCauhoi from './page.cauhoi.js'
import PageNhom from './page.nhom.js'
import PageDethi from './page.dethi.js'
import PageKithi from './page.kithi.js'
import PageThongtin from './page.thongtin.js'
PageMain.propTypes = {

};

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
                    <Route path={`${match.url}/cau-hoi`} exact component={() => <PageCauhoi />} />
                    <Route path={`${match.url}/nhom`} exact component={() => <PageNhom />} />
                    <Route path={`${match.url}/de-thi`} exact component={() => <PageDethi />} />
                    <Route path={`${match.url}/ki-thi`} exact component={() => <PageKithi />} />
                    <Route path={`${match.url}/thong-tin`} exact component={() => <PageThongtin />} />
                </Switch>
            </div>
        </div>
    );
}

export default PageMain;