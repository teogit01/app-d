import React from 'react';
import './css/dethi.scss'
import PropTypes from 'prop-types';

DeThi.propTypes = {
    cauhois: PropTypes.array,
    page: PropTypes.number,
    choose: PropTypes.func,
    phuongans: PropTypes.array
};

function DeThi(props) {
    const { cauhois, page, choose, phuongans } = props
    return (
        <div className='ct-cau-hoi'>
            {
                cauhois && cauhois.map((cauhoi, idx) => {
                    const check = phuongans.filter(phuongan => phuongan.cauhoi === cauhoi._id)
                    return (
                        <div key={cauhoi._id} className='cau-hoi-item'>
                            <div>
                                <b>Câu: {(page - 1) * 5 + idx + 1}</b>
                            </div>
                            <div>{cauhoi.noidung}</div>
                            <div className='phuong-an'>
                                {
                                    cauhoi.phuongans.map(pa => {
                                        return (
                                            <div key={pa._id}>
                                                <div className='phuong-an-item'>
                                                    <input type='radio'
                                                        className='check-phuongan'
                                                        name={cauhoi._id}
                                                        checked={(check.length > 0 && check[0].phuongan.ten) === pa.ten}
                                                        onChange={() => choose(cauhoi._id, pa)}
                                                    />
                                                    <div className='phuong-an-ten'>({pa.ten})</div>
                                                    <div>{pa.noidung}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default DeThi;