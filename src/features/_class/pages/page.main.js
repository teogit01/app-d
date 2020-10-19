import React from 'react';
import PropTypes from 'prop-types';

PageMain.propTypes = {
    listClass: PropTypes.array
};
PageMain.defaultProps = {
    listClass: []
}

function PageMain(props) {
    const { listClass } = props
    return (
        <div className='page-main'>

            <div className='left'>
                <form>
                    <div>
                        <label>Mã lóp:</label>
                        <input type='text' className='form-control' />
                    </div>
                    <div>
                        <label>Tên lớp:</label>
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
                    <div className='col-3'>Mã lớp</div>
                    <div className='col-5'>Tên lớp</div>
                    <div className='col-2'>Action</div>
                </div>

            </div>


        </div >
    );
}

export default PageMain;