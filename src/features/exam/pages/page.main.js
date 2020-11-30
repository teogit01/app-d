import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouteMatch, useHistory } from 'react-router-dom';
import callApi from 'api/apiCaller';

import Exam from './../components/exam'
// import PropTypes from 'prop-types';

// MainPage.propTypes = {
//     exams: PropTypes.array
// };

function MainPage() {
    //const { exams } = props
    const match = useRouteMatch()
    const history = useHistory()
    const redirect = () => {
        history.push(`${match.url}/add`)
    }
    const [exams, setExams] = useState([])
    useEffect(() => {
        const LoadExam = async () => {
            let data = await callApi('de-thi')
            //dispatch(loadExam(data.data))
            setExams(data.data)
        }
        LoadExam()
    }, [])
    return (
        <div className='page-main'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={redirect} />
            </div>
            <div className='col-12 head row list'>
                <div className='col-1'>#</div>
                <div className='col-2'>Mã</div>
                <div className='col-2'>Môn</div>
                <div className='col-2'>Thời gian</div>
                <div className='col-2'>Năm học</div>
                <div className='col-2'>Trạng thái</div>
                <div className='col-1'></div>
            </div>

            {
                exams.map(item => {
                    return <Exam exam={item} key={item.id} />
                })
            }

        </div>
    );
}

export default MainPage;