import React, { useEffect, useState } from 'react';
import Detail from './../components/detail'
import callApi from 'api/apiCaller';
import { useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';

// PageDetail.propTypes = {
//     qu
// };

function PageDetail(props) {

    const match = useRouteMatch()
    const { _id } = match.params
    const [detail, setDetail] = useState('')
    useEffect(() => {
        const LoadDetail = async () => {
            let data = await callApi(`cauhoi/detail/${_id}`)
            setDetail(data.data)
            //console.log('data.data', data.data)
        }
        LoadDetail()
    }, [])
    return (
        <div className='page-detail'>
            <Detail detail={detail} />
        </div>
    );
}

export default PageDetail;