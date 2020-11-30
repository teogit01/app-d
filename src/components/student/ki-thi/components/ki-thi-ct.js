import React from 'react';
import './css/ki-thi-ct.scss'
import PropTypes from 'prop-types';

KiThiCT.propTypes = {
    kithi: PropTypes.object,
    dethis: PropTypes.array
};

function KiThiCT(props) {
    const { kithi, dethis } = props
    return (
        <div className='ki-thi-chi-tiet'>
            <div className='wrap-de'>
                <div className='de-this'>
                    {
                        dethis &&
                        dethis.map(dethi => {
                            return (
                                <div key={dethi._id} className='de-thi'>
                                    <div className='remove'>X</div>
                                    <div>
                                        {dethi.tieude}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* <hr /> */}
            <br />
            <div className='thi-sinh'>
                <table className='table'>
                    <tr>
                        <th>Stt</th>
                        <th>Mã TS</th>
                        <th>Tên TS</th>
                        <th>TGBD</th>
                        <th>TGKT</th>
                        <th>Kết quả</th>
                        <th>TGKT</th>
                    </tr>

                    <tr>
                        <td>01</td>
                        <td>MSST 1</td>
                        <td>Thi Sinh 1</td>
                        <td>09:30</td>
                        <td>10:20</td>
                    </tr>

                    <tr>
                        <td>01</td>
                        <td>MSST 1</td>
                        <td>Thi Sinh 1</td>
                        <td>09:30</td>
                        <td>10:20</td>
                    </tr>

                    <tr>
                        <td>01</td>
                        <td>MSST 1</td>
                        <td>Thi Sinh 1</td>
                        <td>09:30</td>
                        <td>10:20</td>
                    </tr>

                    <tr>
                        <td>01</td>
                        <td>MSST 1</td>
                        <td>Thi Sinh 1</td>
                        <td>09:30</td>
                        <td>10:20</td>
                    </tr>

                    <tr>
                        <td>01</td>
                        <td>MSST 1</td>
                        <td>Thi Sinh 1</td>
                        <td>09:30</td>
                        <td>10:20</td>
                    </tr>
                </table>
            </div>

        </div>
    );
}

export default KiThiCT;