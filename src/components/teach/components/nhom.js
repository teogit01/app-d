import React from 'react';
import './css/nhom.scss'
import PropTypes from 'prop-types';

Nhom.propTypes = {
    nhom: PropTypes.object,
};

function Nhom(props) {
    const { nhom } = props
    return (
        <div className='nhom'>
            <div className='nhom--item'>
                {
                    nhom &&
                    <div>
                        <div>
                            {nhom.ten}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Nhom;