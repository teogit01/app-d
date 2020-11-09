import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

Detail.propTypes = {
    detail: PropTypes.object
};

function Detail(props) {
    const { detail } = props
    const history = useHistory()
    const redicect = () => {
        history.goBack()
    }
    // detail.phuongan.map(item => {
    //     console.log(item)
    // })
    //console.log(Array.isArray(detail.phuongan))
    //let noidung = detail.phuongan
    // if (detail) {
    //     console.log(detail.phuongan[0].noidung)
    // }
    return (
        <div className='detail-question'>
            <div className='press-add'>
                <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} />
            </div>
            <div className='content'>
                <h4>Chi tiết câu hỏi</h4>
                <br />
                <div className='infor'>
                    <div className='control'>
                        <label className='bold'>Loại câu hỏi: &nbsp;</label>
                        <select className='form-control'>
                            <option>Trắc nghiệm</option>
                        </select>

                    </div>

                    <div className='control'>
                        <label className='bold'>Tiêu đề câu hỏi: &nbsp;</label>
                        <textarea className='form-control' rows='2' value={detail.tieude}>

                        </textarea>
                    </div>

                    <div className='control'>
                        <label className='bold'>Nội dung câu hỏi: &nbsp;</label>
                        <textarea className='form-control' rows='3' value={detail.noidung}>

                        </textarea>
                    </div>


                    <div className='control'>
                        <label className='bold'>Phương án: &nbsp;</label>
                        <br />
                        <lable>(A)</lable>
                        <input type='text'
                            className={detail && detail.phuongan[0].dapan ? 'form-control da' : 'form-control'}
                            value={detail && detail.phuongan[0].noidung}
                            placeholder=' Phương á A' />
                        <br />
                        <lable>(B)</lable>
                        <input type='text'
                            className={detail && detail.phuongan[1].dapan ? 'form-control da' : 'form-control'}
                            value={detail && detail.phuongan[1].noidung}
                            placeholder=' Phương á B' />
                        <br />
                        <lable>(C)</lable>
                        <input type='text'
                            className={detail && detail.phuongan[2].dapan ? 'form-control da' : 'form-control'}
                            value={detail && detail.phuongan[2].noidung}
                            placeholder=' Phương á A' />
                        <br />
                        <lable>(D)</lable>
                        <input type='text'
                            className={detail && detail.phuongan[3].dapan ? 'form-control da' : 'form-control'}
                            value={detail && detail.phuongan[3].noidung}
                            placeholder=' Phương á D' />
                    </div>
                </div>
                <div className='button'>
                    <button className='btn btn-warning left-0'>Chỉnh sửa</button>
                </div>
            </div>
        </div>
    );
}

export default Detail;