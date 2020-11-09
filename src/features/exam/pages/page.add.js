import React, { useEffect, useState } from 'react';
import FormAdd from './../components/form-add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
import callApi from 'api/apiCaller';
// import PropTypes from 'prop-types';

// PageAdd.propTypes = {

// };

function PageAdd(props) {
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }

    const [mon, setMon] = useState([])
    useEffect(() => {
        const LoadMon = async () => {
            let data = await callApi('mon')
            setMon(data.data)
        }
        LoadMon()
    }, [])
    let optionsMon = []
    if (mon.length > 0) {
        mon.map(item => {
            optionsMon.push({ value: item._id, label: item.ten })
        })
    }

    // add
    const handleAdd = (_id) => {

    }
    return (

        <div className='page-add'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <FormAdd optionsMon={optionsMon} add={handleAdd} />
        </div>
    );
}

export default PageAdd;