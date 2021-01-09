import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import callApi from 'api/apiCaller';
import { useHistory } from 'react-router-dom';

// import PropTypes from 'prop-types';

// PageSinhVien.propTypes = {

// };

function PageSinhVien(props) {
    /// load guao vien
    const [sinhviens, setSinhviens] = useState([])
    useEffect(() => {
        const LOAD_GIAO_VIEN = async () => {
            callApi('tai-khoan/sinh-vien').then(res => {
                setSinhviens(res.data.sinhviens)
            })
        }
        LOAD_GIAO_VIEN()
    }, [])
    /// end load giao vien
    // back
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    return (
        <div className='page-sinh-vien'>

            <FontAwesomeIcon className='ic-add ic-init ic-back' icon="arrow-left" onClick={redicect} />
            <Card>
                <CardHeader className='bg-info text-left text-white'>Danh sách sinh viên</CardHeader>
                <CardBody>
                    <table className='table'>
                        <tr>
                            <th>Stt</th>
                            <th>Mã số</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Sđt</th>
                            <th>Địa chỉ</th>
                        </tr>
                        {
                            sinhviens.length > 0 &&
                            sinhviens.map((sinhvien, idx) => {
                                return (
                                    <tr key={sinhvien._id}>
                                        <td>{idx + 1}</td>
                                        <td>{sinhvien.maso}</td>
                                        <td>{sinhvien.ten}</td>
                                        <td>{sinhvien.email}</td>
                                        <td>{sinhvien.sdt}</td>
                                        <td>{sinhvien.diachi}</td>
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
        </div>
    );
}

export default PageSinhVien;