import React from 'react';
import './student.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Header from 'components/student/commons/header'

// import Content from 'components/teach/commons/content'
//import TrangChu from 'components/teach/trang-chu'
// import DeThi from 'components/teach/de-thi'
// import CauHoi from 'components/teach/cau-hoi'
import KiThi from 'components/student/ki-thi'
import Nhom from 'components/student/nhom'
import Thi from 'components/student/thi'
import ThongTin from 'components/student/thong-tin'
//import SinhVien from 'components/teach/sinh-vien'

function Index() {
    const match = useRouteMatch()
    return (
        <div className='wrap-teach'>
            <div className='wrap-page'>
                {/* <div style={{ height: '150px' }}>
                    banner
                </div> */}
                <Header />

                <Switch>
                    {/* <Route path={`${match.url}/trang-chu`} exact component={() => <TrangChu />} /> */}
                    <Route path={`${match.url}/ki-thi`} exact component={() => <KiThi />} />
                    <Route path={`${match.url}/nhom`} exact component={() => <Nhom />} />
                    <Route path={`${match.url}/ki-thi/thi`} component={() => <Thi />} />
                    <Route path={`${match.url}/thong-tin`} component={() => <ThongTin />} />
                    {/* <Route path={`${match.url}/thong-tin/bai-thi/:_idbaithi`} component={() => <ThongTin />} /> */}
                </Switch>
            </div>
        </div >

    );
}

export default Index;