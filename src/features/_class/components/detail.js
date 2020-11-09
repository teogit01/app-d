import React from 'react';
import PropTypes from 'prop-types';

Detail.propTypes = {

};

function Detail(props) {
    return (
        <div className='detail'>
            <div>
                <div>
                    Mã lớp:
                </div>
                <div>
                    Tên lớp:
                </div>
                <div>
                    Số lượng:
                </div>
            </div>
            <br />
            <div>
                <h5>Danh sách sinh viên:</h5>
            </div>
        </div>
    );
}

export default Detail;