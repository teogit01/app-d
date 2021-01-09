import React from 'react';
import './css/kithi.scss'
import PropTypes from 'prop-types';

Kithi.propTypes = {
    kithi: PropTypes.object
};

function Kithi(props) {
    const { kithi } = props
    return (
        <div className='kithi'>
            {
                kithi &&
                <div>
                    <div>{kithi.tieude}</div>
                </div>
            }
        </div>
    );
}

export default Kithi;