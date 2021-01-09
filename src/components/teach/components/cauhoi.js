import React from 'react';
import './css/cauhoi.scss'
import PropTypes from 'prop-types';

Cauhoi.propTypes = {
    cauhoi: PropTypes.object,
    idx: PropTypes.number
};

function Cauhoi(props) {
    const { cauhoi, idx } = props
    return (
        <div className='cauhoi'>
            <div className={idx % 2 === 0 ? 'cauhoi-item' : 'cauhoi-item cauhoi-item-chan'}>
                <div className='cauhoi-item-title'>
                    <div className='stt'>
                        <b>Câu {idx + 1}:</b>
                    </div>
                    <div>
                        {cauhoi.noidung}
                    </div>
                </div>
                <div className='cauhoi-item-phuongan'>
                    {
                        (cauhoi.phuongans && cauhoi.phuongans.length > 0) &&
                        cauhoi.phuongans.map(pa => {
                            return (
                                <div key={pa._id} className={pa.dapan ? 'phuongan-item dap-an' : 'phuongan-item'}>
                                    <div className='pa-ten'>({pa.ten})</div>
                                    <div className='pa-noidung'>{pa.noidung}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Cauhoi;