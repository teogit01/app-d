import React, { useState, useEffect } from 'react';
import './css/ki-thi-ct.scss'
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import callApi from 'api/apiCaller';

KiThiCT.propTypes = {
    kithi: PropTypes.object,
    dethis: PropTypes.array,
    dethidongs: PropTypes.array,
    dethimos: PropTypes.array,
    remove: PropTypes.func,
    change: PropTypes.func
};

function KiThiCT(props) {
    const { kithi, dethis, remove, dethidongs, dethimos, change } = props
    const [isControl, setIsControl] = useState(false)

    const changeDedongs = (dethi) => {
        // setIsStatus(!isStatus)        
        const check = dethiRenderDong.filter(de => de._id === dethi._id)
        let newDethiDong = []
        let newDethiMo = []

        if (check.length === 0) {
            // khong co trong de dong, => them vao de dong, => xoa o de mo
            newDethiDong = [...dethiRenderDong, dethi]
            setDethiRenderDong(newDethiDong)
            let position = -1
            dethiRenderMo.map((de, idx) => {
                if (de._id === dethi._id)
                    return position = idx
            })
            newDethiMo = [...dethiRenderMo.slice(0, position), ...dethiRenderMo.slice(position + 1, dethiRenderMo.length)]
            setDethiRenderMo(newDethiMo)
        } else {
            // xoa de dong, them de mo            
            newDethiMo = [...dethiRenderMo, dethi]
            setDethiRenderMo(newDethiMo)
            let position = -1
            dethiRenderDong.map((de, idx) => {
                if (de._id === dethi._id)
                    return position = idx
            })
            newDethiDong = [...dethiRenderDong.slice(0, position), ...dethiRenderDong.slice(position + 1, dethiRenderDong.length)]
            setDethiRenderDong(newDethiDong)
        }

        let dedong = []
        newDethiDong && newDethiDong.map(dethi => {
            dedong.push(dethi._id)
        })
        let demo = []
        newDethiMo && newDethiMo.map(dethi => {
            demo.push(dethi._id)
        })
        const data = {
            dedong,
            demo,
            _idkithi: kithi._id
        }
        change(newDethiMo)
        callApi('ki-thi/de-dong-mo', 'POST', data)
    }
    const [dethiRender, setDethiRender] = useState()
    const [dethiRenderDong, setDethiRenderDong] = useState()
    const [dethiRenderMo, setDethiRenderMo] = useState()
    useEffect(() => {
        setDethiRender(dethis)
        setDethiRenderDong(dethidongs)
        setDethiRenderMo(dethimos)
        if (kithi) {
            if (kithi.tinhtrang !== 2)
                setIsControl(false)
            else
                setIsControl(true)
        }
    }, [dethis])
    const handleRemone = (dethi) => {
        const newDethis = dethiRender.filter(x => x._id != dethi._id)
        setDethiRender(newDethis)
        remove(dethi, dethiRenderDong, dethiRenderMo)
    }

    //console.log({ dethiRenderDong, dethiRender })        
    return (
        <div className='ki-thi-chi-tiet'>
            <div className='wrap-de'>
                <div className='de-this'>
                    {
                        dethiRender &&
                        dethiRender.map(dethi => {
                            const kt = dethiRenderDong.filter(de => de._id === dethi._id)
                            //const kt = dethiRenderDong.filter(de => de._id === dethi._id)

                            return (
                                <div key={dethi._id} className='de-thi'>
                                    <div className='remove_dethi' onClick={() => handleRemone(dethi)}>X</div>
                                    <div>
                                        {dethi.tieude}
                                    </div>
                                    <div className='status'>
                                        <Switch
                                            checked={kt.length === 1 ? false : true}
                                            onChange={() => changeDedongs(dethi)}
                                            color="primary"
                                            disabled={!isControl}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            {/* <hr /> */}
            {/* <br /> */}
            {/* <div className='thi-sinh'>
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
            </div> */}

        </div>
    );
}

export default KiThiCT;