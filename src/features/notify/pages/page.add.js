import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

PageAdd.propTypes = {

};

function PageAdd(props) {
    const history = useHistory()
    const redirect = () => {
        history.goBack()
    }
    return (
        <div className='page-add'>

            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redirect} />
            </div>
            <div className='form'>
                <form>
                    <div className='control'>
                        <label>Tiêu đề thông báo:</label>
                        <input type='text' className='form-control' />
                    </div>

                    <div className='control'>
                        <label>Nội dung thông báo:</label>
                        <textarea className='form-control' rows='4'>

                        </textarea>
                    </div>

                    <div className='control control-button'>
                        <div className='btn btn-warning button'>Huỷ</div>
                        <button className='btn btn-info button'>Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PageAdd;