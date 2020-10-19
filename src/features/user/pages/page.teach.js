import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';

import Teach from './../components/teach'
import PropTypes from 'prop-types';

PageTeach.propTypes = {
    listTeach: PropTypes.array
};

function PageTeach(props) {
    const { listTeach } = props
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (

        <div className='page-teach'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <div className='list-teach'>
                {
                    listTeach.map(teach => {
                        return (
                            <Teach teach={teach} key={teach._id} />
                        )
                    })
                }
            </div>

        </div>
    );
}

export default PageTeach;