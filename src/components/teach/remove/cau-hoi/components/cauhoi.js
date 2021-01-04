import React from 'react';
import './css/cau-hoi.scss'
import PropTypes from 'prop-types';

CauHoi.propTypes = {
    cauhoi: PropTypes.object,
    cauhoiImport: PropTypes.object
};

function CauHoi(props) {
    const { cauhoi, remove, cauhoiImport } = props
    const getIdCauHoi = (cauhoi) => {
        remove(cauhoi._id)
    }
    return (
        <div className='cau-hoi'>
            {
                cauhoi &&
                <>
                    <div className='remove' onClick={(() => getIdCauHoi(cauhoi))}>X</div>
                    <div className='title'>
                        {cauhoi.noidung}
                    </div>
                    <div className='phuong-an'>
                        {
                            cauhoi && cauhoi.phuongans.sort(function (a, b) {
                                if (a.ten < b.ten) {
                                    return -1;
                                }
                                // if (a.ten > b.ten) {
                                //     return 1;
                                // }
                                //return 0;
                            }).map(pa => {
                                return (
                                    <div key={pa._id} className={pa.dapan ? 'phuong-an-item dap-an' : 'phuong-an-item'}>
                                        <div>
                                            ({pa.ten}) &nbsp;
                                        </div>
                                        <div>
                                            {pa.noidung}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
            {
                cauhoiImport &&
                <div>
                    {cauhoiImport['Nội dung']}
                    <div className='import-phuong-an'>
                        <div className={cauhoiImport['Đáp án'] === 'A' ?
                            'import-phuong-an-control dap-an' : 'import-phuong-an-control'}>
                            <div>
                                (A) &nbsp;
                            </div>
                            <div>
                                {cauhoiImport['Phương án A']}
                            </div>
                        </div>

                        <div className={cauhoiImport['Đáp án'] === 'B' ?
                            'import-phuong-an-control dap-an' : 'import-phuong-an-control'}>
                            <div>
                                (B) &nbsp;
                            </div>
                            <div>
                                {cauhoiImport['Phương án B']}
                            </div>
                        </div>
                        <div className={cauhoiImport['Đáp án'] === 'C' ?
                            'import-phuong-an-control dap-an' : 'import-phuong-an-control'}>
                            <div>
                                (C) &nbsp;
                            </div>
                            <div>
                                {cauhoiImport['Phương án C']}
                            </div>
                        </div>

                        <div className={cauhoiImport['Đáp án'] === 'D' ?
                            'import-phuong-an-control dap-an' : 'import-phuong-an-control'}>
                            <div>
                                (D) &nbsp;
                            </div>
                            <div>
                                {cauhoiImport['Phương án D']}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default CauHoi;