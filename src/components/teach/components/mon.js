import React from 'react';
import './css/mon.scss'
import PropTypes from 'prop-types';

Mon.propTypes = {
    mon: PropTypes.object,
    monActived: PropTypes.object,
    cauhois: PropTypes.array
};

function Mon(props) {
    const { mon, monActived, cauhois } = props
    return (
        <div className='mon'>
            {
                mon &&
                <div>
                    <div>
                        <b>{mon.ten} ({mon.ma})</b>
                    </div>
                    <div>
                        {
                            (mon && monActived && monActived._id === mon._id) ?
                                <i>{cauhois.length} câu hỏi</i> :
                                <i>{mon.cauhois && mon.cauhois.length} câu hỏi</i>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Mon;