import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';

Teach.propTypes = {
    teach: PropTypes.object
};

function Teach(props) {
    const { teach } = props
    const history = useHistory()
    const match = useRouteMatch()
    // detail
    const detail = (_id) => {
        history.push(`${match.url}/${_id}`)
    }
    return (
        <div className='teach'>
            <div className='avatar'>

            </div>
            <hr />

            <div className='infor'>
                <div>
                    <label className='title'>Họ Tên:</label>
                    <label>{teach.name}</label>
                </div>

                <div>
                    <label className='title'>Liên hệ:</label>
                    <label>{teach.name}</label>
                </div>

                <div>
                    <label className='title'>Email:</label>
                    <label>{teach.name}</label>
                </div>

                <div>
                    <label className='title'>Đơn vị:</label>
                    <label>{teach.name}</label>
                </div>

                <div>
                    <label className='title'>Trình độ:</label>
                    <label>{teach.name}</label>
                </div>

                <div>
                    <label
                        className='btn btn-block btn-outline-warning'
                        onClick={() => detail(teach._id)}
                    >
                        Xem thêm...
                    </label>
                </div>

            </div>
        </div >
    );
}

export default Teach;