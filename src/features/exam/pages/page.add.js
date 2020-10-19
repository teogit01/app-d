import React from 'react';
import FormAdd from './../components/form-add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageAdd.propTypes = {

// };

function PageAdd(props) {
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (

        <div className='page-add'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <FormAdd />
        </div>
    );
}

export default PageAdd;