import React from 'react';
import PropTypes from 'prop-types';

MainPage.propTypes = {
    listSubject: PropTypes.array
};

function MainPage(props) {
    const { listSubject } = props
    return (
        <div className='page-main'>

            <div className='left'>
                <form>
                    <div>
                        <label>Mã Môn:</label>
                        <input type='text' className='form-control' />
                    </div>
                    <div>
                        <label>Tên môn:</label>
                        <input type='text' className='form-control' />
                    </div>
                    <br />

                    <div className='control'>
                        <button className='btn btn-info'>Thêm</button>
                    </div>

                </form>
            </div>

            <div className='right'>

                <div className='list head col-12'>
                    <div className='col-1'>#</div>
                    <div className='col-3'>Mã môn</div>
                    <div className='col-5'>Tên môn</div>
                    <div className='col-2'>Action</div>
                </div>

            </div>


        </div >

    );
}

export default MainPage;