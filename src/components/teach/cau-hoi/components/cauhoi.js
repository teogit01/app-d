import React from 'react';
import './css/cau-hoi.scss'
import PropTypes from 'prop-types';

CauHoi.propTypes = {
    cauhoi: PropTypes.object
};

function CauHoi(props) {
    const { cauhoi, remove } = props
    const getIdCauHoi = (cauhoi) => {
        remove(cauhoi._id)
    }
    return (
        <div className='cau-hoi'>
            <div className='remove' onClick={(() => getIdCauHoi(cauhoi))}>X</div>
            <div className='title'>
                {cauhoi.noidung}
            </div>
            <div className='phuong-an'>
                {
                    cauhoi.phuongans.sort(function (a, b) {
                        if (a.ten < b.ten) {
                            return -1;
                        }
                        // if (a.ten > b.ten) {
                        //     return 1;
                        // }
                        //return 0;
                    }).map(pa => {
                        return (
                            <div key={pa._id} className={pa.dapan ? 'phuong-an-item dap-an' : 'phuong-an-item'}>
                                <div>
                                    ({pa.ten}) &nbsp;
                                </div>
                                <div>
                                    {pa.noidung}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CauHoi;