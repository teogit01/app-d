import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';

Student.propTypes = {
    student: PropTypes.object
};

function Student(props) {
    const { student } = props
    const history = useHistory()
    const match = useRouteMatch()
    // detail
    const detail = (_id) => {
        history.push(`${match.url}/${_id}`)
    }
    return (
        <div className='student'>
            <div className='avatar'>

            </div>
            <hr />

            <div className='infor'>
                <div>
                    <label className='title'>Họ Tên:</label>
                    <label>{student.name}</label>
                </div>

                <div>
                    <label className='title'>Liên hệ:</label>
                    <label>{student.name}</label>
                </div>


                <div>
                    <label
                        className='btn btn-block btn-outline-warning'
                        onClick={() => detail(student._id)}
                    >
                        Xem thêm...
                    </label>
                </div>

            </div>
        </div >
    );
}

export default Student;