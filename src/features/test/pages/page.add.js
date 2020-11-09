import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';

import FormAdd from './../components/form-add'
import callApi from 'api/apiCaller';
// import PropTypes from 'prop-types';

// PageAdd.propTypes = {

// };

function PageAdd(props) {
    const history = useHistory()
    const redirect = () => {
        history.goBack()
    }
    const [dethis, setDethis] = useState([])
    const [mons, setMons] = useState([])
    useEffect(() => {
        const LoadMon = async () => {
            let data = await callApi('mon')
            //console.log(data.data)
            setMons(data.data)
        }
        LoadMon()
    }, [])

    let optionsMon = []
    if (mons.length > 0) {
        mons.map(item => {
            optionsMon.push({ value: item._id, label: `${item.ma} - ${item.ten}` })
        })
    }

    const [_idmon, setIdmon] = useState('')
    const handleChangeMon = (mon) => {
        setIdmon(mon.value)
    }
    // load deti cua mon 
    useEffect(() => {
        if (_idmon != '') {
            const LoadDethi = async () => {
                let data = await callApi(`dethi/mon/${_idmon}`)
                //console.log(data.data)
                setDethis(data.data)
            }
            LoadDethi()
        }
    }, [_idmon])
    let optionsDethi = []
    if (dethis.length > 0) {
        dethis.map(item => {
            optionsDethi.push({ value: item._id, label: `${item.ma} - ${item.tieude}`, thoigian: item.thoigian })
        })
    }
    return (
        <div className='page-add'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redirect} />
            </div>

            <div className='form-add'>
                <FormAdd optionsDethi={optionsDethi}
                    optionsMon={optionsMon}
                    receve={handleChangeMon} />
            </div>
        </div>
    );
}

export default PageAdd;