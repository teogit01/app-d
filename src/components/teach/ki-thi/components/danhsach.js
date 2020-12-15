import React from 'react';
import './css/danhsach.scss'
import PropTypes from 'prop-types';

DanhSach.propTypes = {
    nhom: PropTypes.object,
    demos: PropTypes.array
};

function DanhSach(props) {
    const { nhom, demos } = props
    return (
        <div className='danh-sach'>
            <table className='table'>
                <tr>
                    <th>Stt</th>
                    <th>MSSV</th>
                    <th>Họ tên</th>
                    <th>Đê thi</th>
                    <th>Điểm</th>
                </tr>
                {
                    nhom &&
                    nhom.sinhviens.sort((a, b) => {
                        if (a.maso < b.maso) {
                            return -1
                        }
                    }).map((sv, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1} </td>
                                <td>{sv.maso}</td>
                                <td>{sv.ten}</td>
                                <td>{demos.length > 0 && demos[idx % demos.length].tieude}</td>
                                <td>0.00</td>
                            </tr>
                        )
                    })

                }

            </table>
        </div>
    );
}

export default DanhSach;