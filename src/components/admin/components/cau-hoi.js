import React, { useEffect, useState } from 'react';
import './css/cau-hoi.scss'
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import callApi from 'api/apiCaller';
import classnames from 'classnames'
import { UncontrolledCollapse } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Cauhoi.propTypes = {

};

function Cauhoi(props) {
    const [mons, setMons] = useState([])
    const [monActived, setMonActived] = useState('')
    const [cauhois, setCauhois] = useState([])
    const [CAUHOI, setCAUHOI] = useState([])
    useEffect(() => {
        callApi('mon').then(res => {
            setMons(res.data.mons)
            if (res.data.mons.length > 0)
                setMonActived(res.data.mons[0])
        })
    }, [])

    useEffect(() => {
        if (monActived) {
            setCauhois(monActived.cauhois)
            setCAUHOI(monActived.cauhois)
        }
    }, [monActived])

    return (
        <div className='page-cauhoi'>
            <div>
                {/* <h5><i><span onClick={_back}>Quản lí tài khoản</span> / giáo viên</i></h5> */}
                <h5><i>
                    <span><Link to="/admin/cau-hoi">Quản lí câu hỏi</Link></span>
                </i></h5>
            </div>
            <hr />
            <div className='cauhoi-main'>
                <div className='cauhoi-mon'>
                    <div className='cauhoi-mon-title'>
                        Danh sách môn
                    </div>
                    <div className='cauhoi-mon-content'>
                        {
                            (mons && mons.length > 0) ?
                                mons.map(mon => {
                                    return (
                                        <div
                                            onClick={() => setMonActived(mon)}
                                            className={
                                                monActived && monActived._id === mon._id ?
                                                    'cauhoi-mon-content-item actived' : 'cauhoi-mon-content-item'
                                            }>
                                            <div>
                                                {mon.ten} ({mon.ma})
                                            </div>
                                        </div>
                                    )
                                })
                                : <div><i>Không có môn</i></div>
                        }
                    </div>
                </div>
                <div className='cauhoi-cauhoi'>
                    <div className='cauhoi-cauhoi-title'>
                        Danh sách câu hỏi
                    </div>
                    <div className='cauhoi-cauhoi-content'>
                        {
                            (cauhois && cauhois.length > 0) ?
                                cauhois.map((ch, idx) => {
                                    return (
                                        <div
                                            id={`id-${ch._id}`}
                                            className={
                                                idx % 2 == 0 ? 'cauhoi-cauhoi-content-item chan' : 'cauhoi-cauhoi-content-item'
                                            }
                                            key={ch._id} >
                                            <div className='cauhoi-cauhoi-content-item-title'>
                                                <div className='stt'>Câu {idx + 1}:</div>
                                                <div>
                                                    {ch.noidung}
                                                </div>
                                            </div>

                                            <div className='cauhoi-cauhoi-content-item-content'>
                                                <UncontrolledCollapse toggler={`#id-${ch._id}`}>
                                                    <div className='noidung'>
                                                        {
                                                            ch.phuongans.map(pa => {
                                                                return (
                                                                    <div className={pa.dapan ? 'phuongan-item da' : 'phuongan-item'}>
                                                                        <div className='pa-ten'>
                                                                            ({pa.ten})
                                                                        </div>
                                                                        <div className='pa-noidung'>
                                                                            {pa.noidung}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </UncontrolledCollapse>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div><i>Không có câu hỏi</i></div>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Cauhoi;