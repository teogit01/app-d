import React from 'react';

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import TrangChu from 'components/teach/pages/trang-chu'
import DeThi from 'components/teach/de-thi'
import CauHoi from 'components/teach/pages/cau-hoi'
import KiThi from 'components/teach/ki-thi'
// import PropTypes from 'prop-types';

// Content.propTypes = {

// };

function Content(props) {
    const match = useRouteMatch()
    return (
        <>
            <Switch>
                {/* <Route path={`${match.url}/trang-chu`} exact component={() => <TrangChu />} /> */}
                {/* <Route path={`${match.url}/de-thi`} exact component={() => <DeThi />} />
                <Route path={`${match.url}/cau-hoi`} exact component={() => <CauHoi />} />
                <Route path={`${match.url}/ki-thi`} exact component={() => <KiThi />} /> */}
            </Switch>
        </>
    );
}

export default Content;