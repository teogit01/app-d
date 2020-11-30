import React from 'react';
import './css/de-thi-ct.scss'
import PropTypes from 'prop-types';

CauHoi.propTypes = {
    cauhoi: PropTypes.object,
    idx: PropTypes.number,
    remove: PropTypes.func
};

function CauHoi(props) {
    const { cauhoi, idx, remove } = props
    const getIdCauhoi = (_idcauhoi) => {
        remove(_idcauhoi)
    }
    return (
        <div className='de-thi-ct'>
            <div className={idx % 2 === 0 ? 'cau-hoi even' : 'cau-hoi'}>
                <label className='remove' onClick={() => getIdCauhoi(cauhoi._id)}>X</label>
                <label><b> Câu hỏi {idx + 1}:</b></label> &nbsp;
                {cauhoi.noidung}

                <div className='tieu-de'>
                    {/* <label><b>Tiêu đề: </b></label>  */}
                    {/* {cauhoi.tieude} */}
                </div>

                {/* <label><b>Nội dung:</b></label> */}
                <div className='noi-dung-cau-hoi'>
                    {/* <textarea className={idx % 2 === 0 ? 'form-control even' : 'form-control'}>
                        {cauhoi.noidung}
                    </textarea> */}
                    {/* {cauhoi.noidung} */}
                </div>
                {/* <br /> */}
                {/* <label><b>Phuơng án:</b></label> */}
                <div className='phuong-an'>
                    {
                        cauhoi.phuongans.map(phuongan => {
                            return (
                                <div className={phuongan.dapan ? 'phuong-an-item dap-an' : 'phuong-an-item'} key={phuongan._id}>
                                    <div className='phuong-an-chon'>({phuongan.ten})</div>
                                    <div className='phuong-an-chon-noidung'>
                                        <div>
                                            {phuongan.noidung}
                                        </div>
                                        {/* <select
                                            className={idx % 2 === 0 ? phuongan.dapan ? 'form-control dap-an even' : 'form-control dap-an even' : 'form-control'}>
                                            <option>{phuongan.noidung}</option>
                                        </select> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default CauHoi;