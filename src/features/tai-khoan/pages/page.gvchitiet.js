import React from 'react';

import GiaoVien from './../components/giao-vien'
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

// GVChiTiet.propTypes = {

// };

function GVChiTiet(props) {
    const match = useRouteMatch()
    //console.log(match.params._id)
    return (
        <div className='page-gv-chitiet'>
            <GiaoVien _idgv={match.params._id} />
        </div>
    );
}

export default GVChiTiet;