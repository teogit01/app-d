import React from 'react';
import './../components/css/dethi.scss'
import PropTypes from 'prop-types';

Dethi.propTypes = {
    dethi: PropTypes.object
};

function Dethi(props) {
    const { dethi } = props
    return (
        <div className='dethi'>
            <div className='dethi-item'>
                <div className='control'>
                    <div>{dethi.tieude} ({dethi.ma})</div>
                    <div>{dethi.mon.ten} </div>
                    <div>{dethi.cauhois && dethi.cauhois.length} câu hỏi</div>
                </div>
            </div>
        </div>
    );
}

export default Dethi;