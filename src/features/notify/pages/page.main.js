import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';

PageMain.propTypes = {

};

function PageMain(props) {
    const history = useHistory()
    const match = useRouteMatch()
    const redirect = () => {
        history.push(`${match.url}/add`)
    }
    return (
        <div className='page-main'>

            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={redirect} />
            </div>

            <div className='list-notify'>
                <div className='notify head'>
                    <div className='col-1'>#</div>
                    <div className='col-2'>Ngày</div>
                    <div className='col-7'>Tiêu đề</div>
                    <div className='col-2'></div>
                </div>

                <div className='notify '>
                    <div className='col-1'>1</div>
                    <div className='col-2'>22-10-2020</div>
                    <div className='col-7'>Thông báo thi </div>
                    <div className='col-2' style={{ textAlign: 'right' }}>ctiet - xoá</div>
                </div>

                <div className='notify '>
                    <div className='col-1'>2</div>
                    <div className='col-2'>20-10-2020</div>
                    <div className='col-7'>Thông báo thi </div>
                    <div className='col-2' style={{ textAlign: 'right' }}>ctiet - xoá</div>
                </div>
            </div>
        </div>
    );
}

export default PageMain;