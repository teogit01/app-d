import React, { useState, useEffect } from 'react';
import './css/cauhoi.scss'
import PropTypes from 'prop-types';

CauHoi.propTypes = {
    baithi: PropTypes.object,
    getStt: PropTypes.func,
    cauhoiChoosed: PropTypes.array,
    nopbai: PropTypes.func
};
function convert_time(tgkt) {
    // 00:00        
    if (!tgkt) return -1

    const h = parseInt(tgkt.slice(0, 2))
    const m = parseInt(tgkt.slice(3, 5))

    const timeCurrent = new Date()
    const h_c = timeCurrent.getHours()
    const m_c = timeCurrent.getMinutes()
    const s_c = timeCurrent.getSeconds()

    const minute_c = h_c * 60 + m_c
    const minute_kt = h * 60 + m
    const result = minute_kt - minute_c
    const result_h = ('0' + Math.floor(result / 60)).slice(-2)
    const result_m = ('0' + result % 60).slice(-2)
    const result_s = ('0' + (60 - s_c)).slice(-2)
    if (result <= 0) {
        return 'Hết giờ!'
    }
    return `${result_h}:${result_m}:${result_s}`
}

function CauHoi(props) {
    const { baithi, getStt, cauhoiChoosed, nopbai } = props
    const cauhois = baithi.cauhois

    const [time, setTime] = useState('')
    const [check, setCheck] = useState(true)
    useEffect(() => {
        if (time !== 0 && check) {
            setTimeout(() => {
                const newTime = convert_time(baithi.tgkt)
                setTime(newTime)
            }, 1000)
        }
    }, [time])
    const handleNopbai = () => {
        setTime(0)
        setCheck(false)
        nopbai()
    }
    return (
        <div className='cauhois'>
            <div className='cauhoi-item'>
                {baithi && baithi.kithi.tieude}
                {baithi && baithi.dethi.tieude}
            </div>
            <div className='cauhoi-map'>
                {
                    cauhois && cauhois.map((cauhoi, idx) => {
                        const check = cauhoiChoosed.indexOf(cauhoi._id)
                        return (
                            <div key={cauhoi._id}
                                className={check == -1 ? 'cauhoi-map-item' : 'cauhoi-map-item selected'}
                                onClick={() => getStt(idx)}>
                                {idx + 1}
                            </div>
                        )
                    })
                }
            </div>
            <div className='thoigian-nopbai'>
                <div>
                    <div>Thoi gian</div>
                    <div>00:00:00</div>
                    <div>{time}</div>
                </div>
                <div className='btn btn-info' onClick={handleNopbai}>Nộp bài</div>
            </div>
        </div>
    );
}

export default CauHoi;  