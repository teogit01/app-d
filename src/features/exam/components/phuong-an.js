import React, { useState } from 'react';
import PropTypes from 'prop-types';

PhuongAn.propTypes = {
    question: PropTypes.object,
    light: PropTypes.bool,
    index: PropTypes.number,

    remove: PropTypes.func
};

function PhuongAn(props) {
    const { question, light, remove, index } = props
    const [phuongan, setPhuongan] = useState(question.phuongan)
    const [phuonganA, setPhuonganA] = useState(phuongan[0])
    const [phuonganB, setPhuonganB] = useState(phuongan[1])
    const [phuonganC, setPhuonganC] = useState(phuongan[2])
    const [phuonganD, setPhuonganD] = useState(phuongan[3])
    //console.log(phuongan)
    const onChange = (e) => {

        if (e.target.name === 'paA') {
            setPhuonganA(e.target.value)
        }
        if (e.target.name === 'paB') {
            setPhuonganB(e.target.value)
        }
        if (e.target.name === 'paC') {
            setPhuonganC(e.target.value)
        }
        if (e.target.name === 'paD') {
            setPhuonganD(e.target.value)
        }
    }
    const handleRemove = (_id) => {
        remove(_id)
    }
    if (question.value === 'ch1') {
        return (
            <div>
                <div>
                    <div>
                        <label className='head'>Câu hỏi 1:</label>
                        <div>{question.tieude}</div>
                        <br />
                        <label className='head'>Tiêu đề câu hỏi:</label> &nbsp;
                        <label>Tieu đề câu hỏi</label>

                        <br />
                        <label className='head'>Nội dung câu hỏi:</label>&nbsp;
                        <label>Noi dung câu hỏi</label>
                        <br />

                        <textarea className='form-control' rows='3'>

                        </textarea>

                    </div>
                </div>
            </div>
        )
    } else
        return (
            <div className={light ? 'light wrap' : 'wrap'}>
                <div>
                    <div className='title'>
                        <label className='head'>Câu hỏi {index + 1}:</label>
                        <label className='head remove' onClick={() => handleRemove(question._id)}>X</label>
                    </div>
                    <br />
                    <div >
                        <label>{question.noidung}</label>
                    </div>

                    {/* <label className='head'>Phương án:</label>&nbsp; */}

                    <div className='phuong-an row'>
                        <div className='phuong-an--item col-6'>
                            <label>(A):</label>&nbsp;
                            <select className='form-control light-sub' name='paA' onChange={onChange} value={phuonganA.phuongan}>
                                {
                                    phuongan.map((item, idx) => {
                                        return <option key={idx + 4} value={item.phuongan}>{item.noidung}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className='phuong-an--item col-6'>
                            <label>(B):</label>&nbsp;
                            <select className='form-control light-sub' name='paB' onChange={onChange} value={phuonganB.phuongan}>
                                {
                                    phuongan.map((item, idx) => {
                                        return <option key={idx + 8} value={item.phuongan}>{item.noidung}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className='phuong-an--item col-6'>
                            <label>(C):</label>&nbsp;
                            <select className='form-control light-sub' name='paC' onChange={onChange} value={phuonganC.phuongan}>
                                {
                                    phuongan.map((item, idx) => {
                                        return <option key={idx + 12} value={item.phuongan}>{item.noidung}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className='phuong-an--item col-6'>
                            <label>(D):</label>&nbsp;
                            <select className='form-control light-sub' name='paD' onChange={onChange} value={phuonganD.phuongan}>
                                {
                                    phuongan.map((item, idx) => {
                                        return <option key={idx + 16} value={item.phuongan}>{item.noidung}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            // <div>
            //     <div>
            //         <label className='head'>Câu hỏi 1:</label>
            //         <br />
            //         <label className='head'>Tiêu đề câu hỏi:</label> &nbsp;
            //         {/* <label>Tieu đề câu hỏi</label> */}
            //         <div className='content-question'>
            //             <label>{question.tieude}</label>
            //         </div>

            //         <br />
            //         <label className='head'>Nội dung câu hỏi:</label>&nbsp;
            //         <div className='content-question'>
            //             <label>{question.noidung}</label>
            //         </div>

            //         <br />
            //         <label className='head'>Phương án:</label>&nbsp;

            //         <div className='phuong-an row'>
            //             <div className='phuong-an--item col-6'>
            //                 <label>(A):</label>&nbsp;
            //                 <select className='form-control'>
            //                     <option>Phuowng an 1</option>
            //                     <option>Phuowng an 2</option>
            //                     <option>Phuowng an 3</option>
            //                     <option>Phuowng an 4</option>
            //                 </select>
            //             </div>

            //             <div className='phuong-an--item col-6'>
            //                 <label>(B):</label>&nbsp;
            //                 <select className='form-control'>
            //                     <option>Phuowng an 1</option>
            //                     <option>Phuowng an 2</option>
            //                     <option>Phuowng an 3</option>
            //                 </select>
            //             </div>

            //             <div className='phuong-an--item col-6'>
            //                 <label>(C):</label>&nbsp;
            //                 <select className='form-control '>
            //                     <option>Phuowng an 1</option>
            //                     <option>Phuowng an 2</option>
            //                 </select>
            //             </div>

            //             <div className='phuong-an--item col-6'>
            //                 <label>(D):</label>&nbsp;
            //                 <select className='form-control'>
            //                     <option>Phuowng an 1</option>
            //                 </select>
            //             </div>
            //         </div>
            //     </div>
            //     <hr />
            // </div>            
        );
}

export default PhuongAn;