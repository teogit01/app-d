import React, { useState, useEffect } from 'react';

import './subject.scss'
import Switch from 'react-bootstrap/esm/Switch';
import { Route, useRouteMatch } from 'react-router-dom';
import callApi from 'api/apiCaller'

import { loadKhoi } from 'features/khoi/khoiSlice'
import { loadSubject } from 'features/subject/subjectSlice'

import MainPage from './pages/page.main'
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// SubjecIndex.propTypes = {

// };

const listSubject = [
    { id: '01', name: 'Mon 1' },
    { id: '02', name: 'Mon 2' },
    { id: '03', name: 'Mon 3' }
]
function SubjecIndex(props) {
    const match = useRouteMatch()
    const [listSubject, setListSubject] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const LoadSubject = async () => {
            let data = await callApi('mon')
            dispatch(loadSubject(data.data))
        }
        // if (branchs && branchs.length === 0) {
        LoadSubject()
        // }
    }, [])
    const subject_s = useSelector(state => state.subjects)
    useEffect(() => {
        const LoadKhoi = async () => {
            let data = await callApi('khoi')
            dispatch(loadKhoi(data.data))
        }
        LoadKhoi()
    }, [])
    const khoi_s = useSelector(state => state.khoi)

    let optionsKhoi = []
    if (khoi_s) {
        khoi_s.map(item => {
            optionsKhoi.push({ value: item._id, label: item.ten })
        })
    }

    return (
        <div className='wrap-subject'>
            <Switch>
                <Route path={`${match.url}`} exact
                    component={() => <MainPage
                        optionsKhoi={optionsKhoi}
                        listSubject={subject_s} />} />
            </Switch>
        </div>
    );
}

export default SubjecIndex;