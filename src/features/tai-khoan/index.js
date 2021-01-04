import React from 'react';
import './index.scss'
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import PageMain from './pages/page.main'
import PageGiaoVien from './pages/page.giaovien'
import PageGVChiTiet from './pages/page.gvchitiet'
import PageSinhVien from './pages/page.sinhvien'
function Index() {
    const match = useRouteMatch()
    return (
        <div className='feature-tai-khoan'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <PageMain />} />
                <Route path={`${match.url}/giao-vien`} exact component={() => <PageGiaoVien />} />
                <Route path={`${match.url}/giao-vien/:_id`} component={() => <PageGVChiTiet />} />
                <Route path={`${match.url}/sinh-vien`} component={() => <PageSinhVien />} />
            </Switch>
        </div>
    );
}

export default Index;