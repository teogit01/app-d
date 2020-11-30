import React from 'react';
import './css/mon.scss'

import PropTypes from 'prop-types';

Mon.propTypes = {
    mon: PropTypes.object,
    monActived: PropTypes.object,
};

function Mon(props) {
    const { mon, monActived } = props
    return (
        <div className='mon'>
            <div className={mon._id === monActived._id ? 'mon-content actived' : 'mon-content'}>
                {`(${mon.ma}) ${mon.ten}`}
            </div>
            <div className={mon._id === monActived._id ? 'mon-content actived' : 'mon-content'}>
                Số câu hỏi: {mon.cauhois.length}
            </div>
        </div>
    );
}

export default Mon;