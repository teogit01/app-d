import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import './css/nhom.scss'
Nhom.propTypes = {
    nhoms: PropTypes.array,
    subNhomChange: PropTypes.func,
    nhomActived: PropTypes.object,
    remove: PropTypes.object
};

function Nhom(props) {
    const { nhoms, subNhomChange, nhomActived, remove } = props
    return (
        <div className='nhoms'>
            {
                nhoms.map(nhom => {
                    return (
                        <div className={nhomActived && nhomActived._id === nhom._id ? 'nhom-item actived' : 'nhom-item'} key={nhom._id}>
                            <div className='remove' onClick={() => remove(nhom)}>x</div>
                            <div
                                onClick={() => subNhomChange(nhom)}>
                                {nhom.ten}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Nhom;