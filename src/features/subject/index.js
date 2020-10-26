import React, { useState, useEffect } from 'react';

import './subject.scss'
import Switch from 'react-bootstrap/esm/Switch';
import { Route, useRouteMatch } from 'react-router-dom';
import callApi from 'api/apiCaller'

import MainPage from './pages/page.main'
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
    useEffect(() => {
        const LoadSubject = async () => {
            let data = await callApi('mon')
            //setListSubject(data.data)
            //console.log('data', data)
            console.log('data', data)
            //dispatch(action.loadClass(data.data))
            //console.log('called Api branch')
        }
        // if (branchs && branchs.length === 0) {
        LoadSubject()
        // }
    })
    console.log(listSubject)

    return (
        <div className='wrap-subject'>
            <Switch>
                <Route path={`${match.url}`} exact component={() => <MainPage listSubject />} />
            </Switch>
        </div>
    );
}

export default SubjecIndex;