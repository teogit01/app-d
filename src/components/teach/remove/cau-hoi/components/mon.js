import React from 'react';
import './css/mon.scss'

import PropTypes from 'prop-types';

Mon.propTypes = {
    mon: PropTypes.object,
    monActived: PropTypes.object,
    remove: PropTypes.func,
    cauhoiImport: PropTypes.array
};

function Mon(props) {
    const { mon, monActived, remove, cauhoiImport } = props
    return (
        <div className='mon'>
            <div className={(mon && monActived && mon._id === monActived._id) ? 'mon-content actived' : 'mon-content'}>
                <div>
                    {`(${mon.ma}) ${mon.ten}`}
                </div>
                <div className='remove' onClick={() => remove(mon)}>X</div>
            </div>

            <div className={(mon && monActived && mon._id === monActived._id) ? 'mon-content actived' : 'mon-content'}>
                Số câu hỏi: {(mon && monActived && mon._id === monActived._id) ?
                    mon.cauhois.length + cauhoiImport.length : mon.cauhois.length}
            </div>
        </div>
    );
}

export default Mon;