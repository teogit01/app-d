import React from 'react';
import PropTypes from 'prop-types';
import './css/thongtindethi.scss'

ThongTinDeThi.propTypes = {
    nhoms: PropTypes.array
};

function ThongTinDeThi(props) {
    const { nhoms } = props
    return (
        <div>
            <div className='thongtin-dethi'>
                <div className='title'>
                    <h4>Danh sách đề thi</h4>
                    <div className='dethis'>
                        {
                            (nhoms && nhoms.length > 0) ? nhoms.map(item => {
                                return (
                                    <div>
                                        {
                                            item.kithis.length > 0 &&
                                            item.kithis.map(kithi => {
                                                return (
                                                    <div>
                                                        {
                                                            kithi.dethis.length > 0 &&
                                                            kithi.dethis.map(dethi => {
                                                                return (
                                                                    <div className='dethi-item'>
                                                                        {dethi.tieude}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                                : <div><i>Không có đề thi</i></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThongTinDeThi;