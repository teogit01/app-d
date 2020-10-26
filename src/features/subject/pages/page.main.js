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

                    <div>
                        <label>Khối:</label>
                        <select className='form-control'>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>A</option>
                        </select>
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
                    <div className='col-3'>Tên môn</div>
                    <div className='col-3'>Khối</div>
                    <div className='col-2'>Action</div>
                </div>

            </div>


        </div >

    );
}

export default MainPage;