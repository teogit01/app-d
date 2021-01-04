import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';

import callApi from 'api/apiCaller';
import { useHistory, useRouteMatch } from 'react-router-dom';

// import PropTypes from 'prop-types';

// PageGiaoVien.propTypes = {

// };

function PageGiaoVien(props) {
    /// load sinh vien
    const [giaoviens, setGiaoviens] = useState([])
    useEffect(() => {
        const LOAD_GIAO_VIEN = async () => {
            callApi('tai-khoan/giao-vien').then(res => {
                setGiaoviens(res.data.giaoviens)
            })
        }
        LOAD_GIAO_VIEN()
    }, [])
    /// end load sinh vien
    // back
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    //// duyet tai khoan
    const duyetTK = () => {
        const data = {
            name: 'Name',
            email: 'emb1605272@student.ctu.edu.vn'
        }
        callApi(`sendmail`, 'POST', data)
    }
    // detail
    const match = useRouteMatch()
    const _detail = (_id) => {
        history.push(`${match.url}/${_id}`)
    }
    // detail
    return (
        <div className='page-giao-vien'>

            <FontAwesomeIcon className='ic-add ic-init ic-back' icon="arrow-left" onClick={redicect} />
            <Card>
                <CardHeader className='bg-info text-left text-white'>Danh sách giáo viên</CardHeader>
                <CardBody>
                    <table className='table'>
                        <tr>
                            <th>Stt</th>
                            <th>Mã số
                                <span className='icon-sort'>
                                    <FontAwesomeIcon className='icon-init' icon="sort" />
                                </span>
                            </th>
                            <th>Họ tên
                                <span className='icon-sort'>
                                    <FontAwesomeIcon className='icon-init' icon="sort" />
                                </span>
                            </th>
                            <th>Email
                                <span className='icon-sort'>
                                    <FontAwesomeIcon className='icon-init' icon="sort" />
                                </span>
                            </th>
                            <th>Sđt
                                <span className='icon-sort'>
                                    <FontAwesomeIcon className='icon-init' icon="sort" />
                                </span>
                            </th>
                            <th>Địa chỉ
                                <span className='icon-sort'>
                                    <FontAwesomeIcon className='icon-init' icon="sort" />
                                </span>
                            </th>
                            <th>Trạng thái
                                <span className='icon-sort'>
                                    <FontAwesomeIcon className='icon-init' icon="sort" />
                                </span>
                            </th>
                        </tr>
                        {
                            giaoviens.length > 0 &&
                            giaoviens.map((giaovien, idx) => {
                                return (
                                    <tr
                                        key={giaovien._id}
                                        onClick={() => _detail(giaovien._id)}
                                    >
                                        <td>{idx + 1}</td>
                                        <td>{giaovien.maso}</td>
                                        <td>{giaovien.ten}</td>
                                        <td>{giaovien.email}</td>
                                        <td>{giaovien.sdt}</td>
                                        <td>{giaovien.diachi}</td>
                                        <td>
                                            <div
                                                onClick={duyetTK}
                                                className={giaovien.trangthai === 0 ?
                                                    'bg-warning status' : giaovien.trangthai === 1 ?
                                                        'bg-success status' : 'bg-danger status'}>
                                                {giaovien.trangthai === 0 ? 'Chờ duyệt' :
                                                    giaovien.trangthai === 1 ? 'Hoạt động' : 'Bị khoá'}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                    {/* <CardTitle tag="h5">Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button> */}
                </CardBody>
            </Card>
        </div >
    );
}

export default PageGiaoVien;