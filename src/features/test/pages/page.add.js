import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';

import FormAdd from './../components/form-add'
// import PropTypes from 'prop-types';

// PageAdd.propTypes = {

// };

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

            <div className='form-add'>
                <FormAdd />
            </div>
        </div>
    );
}

export default PageAdd;