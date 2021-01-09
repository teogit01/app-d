import React from 'react';
import PropTypes from 'prop-types';
import Header from 'admin/com/'

Type.propTypes = {

};

function Type(props) {
    return (
        <div className='wrap-question'>

            <Header />

            <div className='question__content'>

                <div className='question__title'>

                    <h4 className='bold p-l-30'>Danh sách câu hỏi</h4>

                    <div className='btn-add-question'>
                        {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
                        {/* <button className='btn btn-info' onClick={redirect}>Thêm</button> */}
                    </div>

                </div>

                <div className='question__main'>

                </div>

            </div>

        </div>
    );
}

export default Type;