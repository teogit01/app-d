import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import FormTN from '../components/form-tracnghiem'
import FormTL from '../components/form-tuluan'
// import PropTypes from 'prop-types';

// AddPage.propTypes = {

// };

function AddPage(props) {
    const [isShow, setShow] = useState('TN')
    // handleChangeType when select type question
    const handleChangeType = e => {
        const value = e.target.value
        setShow(value)
    }
    console.log(isShow)
    //redicect goBack
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }

    return (
        <div className='wrap-main   '>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <div className='type-question'>
                <label>Loại câu hỏi:</label>
                <select className='form-control' onChange={handleChangeType}>
                    <option value='TN'>Trắc Nghiệm</option>
                    <option value='TL'>Tự Luận</option>
                </select>
            </div>
            <hr />
            <div>
                <div className={isShow === 'TN' ? 'isShow' : 'isNone'}>
                    <FormTN />
                </div>
                <div className={isShow === 'TL' ? 'isShow' : 'isNone'}>
                    <FormTL />
                </div>

            </div>
        </div>
    );
}

export default AddPage;