import React from 'react';
import PropTypes from 'prop-types';
import Student from 'features/user/components/student';

DanhSach.propTypes = {
    students: PropTypes.array,
    studentsImport: PropTypes.array
};

function DanhSach(props) {
    const { students, studentsImport, createAccount } = props
    //console.log('s', studentsImport)
    return (
        <div className='students'>
            {
                students.length > 0 &&
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ fontWeight: 'bold' }}>Danh sách sinh viên nhóm ....</h4>
                    </div>
                    <br />
                    <table className='tb'>
                        <tr>
                            <th>Stt</th>
                            <th>Mssv</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>MK</th>
                        </tr>
                        {
                            students.length > 0 &&
                            students.map((student, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{student.maso}</td>
                                        <td>{student.ten}</td>
                                        <td>{student.email}</td>
                                        <td>{student.matkhautam}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            //studentsImport.length > 0 &&
                            studentsImport.map((student, idx) => {
                                console.log(student)
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{student.MSSV}</td>
                                        <td>{student['Họ tên']}</td>
                                        <td>{student['Email']}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    <div className='control-cap-tai-khoan'>
                        <div className='btn btn-info'>Cấp tài khoản</div>
                        &nbsp;
                        <div className='btn btn-info' onClick={() => createAccount()}>Lưu lại</div>
                    </div>
                </div>
            }

            {
                studentsImport.length > 0 &&
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ fontWeight: 'bold' }}>Danh sách sinh viên nhóm ....</h4>
                    </div>
                    <br />
                    <table className='tb'>
                        <tr>
                            <th>Stt</th>
                            <th>Mssv</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                        </tr>
                        {
                            //studentsImport.length > 0 &&
                            studentsImport.map((student, idx) => {
                                console.log(student)
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{student.MSSV}</td>
                                        <td>{student['Họ tên']}</td>
                                        <td>{student['Email']}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    <div className='control-cap-tai-khoan'>
                        <div className='btn btn-info'>Cấp tài khoản</div>
                        &nbsp;
                        <div className='btn btn-info' onClick={() => createAccount(studentsImport)}>Lưu lại</div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DanhSach;