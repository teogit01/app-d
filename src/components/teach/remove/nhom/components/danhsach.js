import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//import Student from 'features/user/components/student';

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

DanhSach.propTypes = {
    students: PropTypes.array,
    studentsImport: PropTypes.array,
    nhomActived: PropTypes.object
};

function DanhSach(props) {
    const { students, studentsImport, createAccount, nhomActived } = props
    //console.log('s', studentsImport)
    const [dataExport, setDataExport] = useState([])
    useEffect(() => {
        let data = []
        students.map(sv => {
            data.push({
                'MSSV': sv.maso,
                'Họ tên': sv.ten,
                'Giới tính': sv.gioitinh,
                'Email': sv.email,
                'matkhau': sv.matkhautam
            })
        })
        setDataExport(data)
    }, [students])
    let fileName = ''
    useEffect(() => {
        if (nhomActived)
            fileName = nhomActived.ten
    },[nhomActived])
    // console.log({ dataExport })
    // console.log({ students })    

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);

    }
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
                                //console.log(student)
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
                        <div className='btn btn-info' onClick={(e) => exportToCSV(dataExport, fileName)}  >Xuất file</div>
                        &nbsp;
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
                                //console.log(student)
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
                        &nbsp;
                        <div className='btn btn-info' >Xuất file</div>
                    </div>
                </div>
            }
        </div >
    );
}

export default DanhSach;