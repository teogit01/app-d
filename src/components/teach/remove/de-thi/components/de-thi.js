import React from 'react';
//import { Card } from 'react-bootstrap'
import './css/de-thi.scss'
import PropTypes from 'prop-types';

DeThi.propTypes = {
    dethi: PropTypes.object,
    actived: PropTypes.bool,

    getIdDethi: PropTypes.func
};

function DeThi(props) {
    const { dethi, actived, getIdDethi } = props
    const onClick = (_id) => {
        getIdDethi(_id)
    }
    return (
        <div className='de-thi'>
            <div className={actived ? 'category actived' : 'category'}>
                <div className='category-item'>

                    <div className='title'>
                        <div>
                            {dethi.tieude}
                        </div>
                        <div>
                            {actived ?
                                <div onClick={() => { onClick(dethi._id) }}>X</div>
                                : ''}
                        </div>
                    </div>

                    <div className='ct-de-thi'>
                        <div className='ct-de-thi-item'>
                            <b>Thời gian:</b> {dethi.thoigian} phút
                                </div>
                        <div className='ct-de-thi-item'>
                            <b>Năm học:</b> {dethi.namhoc}
                        </div>
                        <div className='ct-de-thi-item'>
                            <b>Môn:</b> {dethi.mon.ten}
                        </div>

                        <div className='ct-de-thi-item'>
                            <b>Trạng thái: </b> 0
                        </div>

                        <div className='ct-de-thi-item'>
                            <b>Số câu hỏi: </b> {dethi.cauhois.length}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DeThi;