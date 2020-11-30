import React from 'react';
import './teach.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Header from 'components/teach/commons/header'

// import Content from 'components/teach/commons/content'
//import TrangChu from 'components/teach/trang-chu'
import DeThi from 'components/teach/de-thi'
import CauHoi from 'components/teach/cau-hoi'
import KiThi from 'components/teach/ki-thi'
import Nhom from 'components/teach/nhom'
import SinhVien from 'components/teach/sinh-vien'

function Index() {
    const match = useRouteMatch()
    return (
        <div className='wrap-teach'>
            <div style={{ height: '150px' }}>
                banner
            </div>
            <Header />

            <Switch>
                {/* <Route path={`${match.url}/trang-chu`} exact component={() => <TrangChu />} /> */}
                <Route path={`${match.url}/de-thi`} exact component={() => <DeThi />} />
                <Route path={`${match.url}/cau-hoi`} exact component={() => <CauHoi />} />
                <Route path={`${match.url}/ki-thi`} exact component={() => <KiThi />} />
                <Route path={`${match.url}/nhom`} exact component={() => <Nhom />} />
                <Route path={`${match.url}/sinh-vien`} exact component={() => <SinhVien />} />
            </Switch>
        </div >

    );
}

export default Index;