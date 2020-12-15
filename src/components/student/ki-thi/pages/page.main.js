import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import DatePicker from "react-datepicker";
import KiThi from './../components/ki-thi.js'
import KiThiCT from './../components/ki-thi-ct.js'
import callApi from 'api/apiCaller.js';
// import Select from 'react-select'
// import { compareAsc, format } from 'date-fns'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import PropTypes from 'prop-types';

// page.main.propTypes = {

// };

function FIND_NHOM(nhom1, nhom2) {
    let result = ''
    nhom1.map(item => {
        const idx = nhom2.indexOf(item)
        if (idx !== -1)
            result = item
    })
    return result
}
function PageMain(props) {
    // LOAD_KITHi
    const [kithis, setKithis] = useState([])
    const [kithiActived, setKithiActived] = useState('')
    const userLogin = JSON.parse(localStorage.getItem('userLogin'))

    const [_idnhomActived, set_idNhomActived] = useState('')

    const LOAD_KITHI = async () => {
        let data = await callApi(`ki-thi/sinh-vien/${userLogin[0]._id}`)
        //console.log('result', data_result)
        //let data = await callApi(`ki-thi`)
        if (data) {
            //console.log('dat', data)
            let load_kithis = []
            data.data.nhoms.map(nhom => {
                nhom.kithis.map(kithi => {
                    let count = 0;
                    load_kithis.map(kt => {
                        if (kt._id === kithi._id) {
                            count++
                        }
                    })
                    if (count === 0) {
                        load_kithis.push(kithi)
                    }
                })
            })
            setKithis(load_kithis)
            if (load_kithis.length > 0) {
                setKithiActived(load_kithis[0])
                set_idNhomActived(FIND_NHOM(userLogin[0].nhoms, load_kithis[0].nhoms))
            }
        }
    }
    const [nhomActived, setNhomActived] = useState([])
    useEffect(() => {
        if (_idnhomActived !== '')
            callApi(`nhom/detail/${_idnhomActived}`).then((res) => {
                setNhomActived(res.data)
            })
    }, [_idnhomActived])

    const [mons, setMons] = useState([])
    const LOAD_MON = async () => {
        let data = await callApi('mon')
        setMons(data.data)
    }
    useEffect(() => {
        LOAD_KITHI()
        LOAD_MON()
    }, [])
    // END LOAD KI THI

    // changeKithiActived
    const changeKithiActived = (kithi) => {
        setKithiActived(kithi)
        set_idNhomActived(FIND_NHOM(userLogin[0].nhoms, kithi.nhoms))
    }
    // end changeKithiActived

    // Tao ki thi
    //const [isOpenTaoKiThi, setIsOpenTaoKiThi] = useState(true);
    const [isOpenTaoKiThi, setIsOpenTaoKiThi] = useState(false);

    const [valueDeThi, setValueDeThi] = useState('')

    const [idMonSelected, setIdMonSelected] = useState('')
    const optionsMonthi = []
    if (mons.length > 0) {
        mons.map(mon => {
            optionsMonthi.push({ label: mon.ten, value: mon._id })
        })
    }
    const [dethis, setDethis] = useState([])
    useEffect(() => {
        const LOAD_DE_CUA_MON = async () => {
            let data = await callApi(`de-thi/mon/${idMonSelected}`)
            setDethis(data.data)
            if (data.data.length > 0)
                setValueDeThi(data.data[0]._id)
        }
        if (idMonSelected != '')
            LOAD_DE_CUA_MON()
    }, [idMonSelected])

    let optionsDeThi = []
    if (dethis.length > 0) {
        dethis.map(dethi => {
            optionsDeThi.push({ value: dethi._id, label: dethi.tieude })
        })
    }
    // end tao ki thi    
    // handleRemove ki thi
    const handleRemove = (_idkithi) => {
        let newKithis = kithis.filter(x => x._id != _idkithi)
        setKithis(newKithis)
        callApi(`ki-thi/remove/${_idkithi}`, 'DELETE', null)
    }
    // end handleRemove kithi

    // Them de
    const [isOpenThemDe, setIsOpenThemDe] = useState(false);
    // const toggleThemDe = () => setIsOpenThemDe(!isOpenThemDe);
    // const onSaveThemDe = () => {
    //     const data = {
    //         _idkithi: kithiActived._id,
    //         _iddethi: dethiSelected.value
    //     }
    //     callApi('ki-thi/them-de-thi', 'POST', data).then(res => {
    //         setKithiActived(res.data)
    //     })
    // }
    // end them de
    // LOAD DE CUA MON Active
    let optionsDethiActived = []
    const [dethisActived, setDethisActived] = useState([])
    const LOAD_DE_MON_ACTIVED = async () => {
        let data = await callApi(`de-thi/mon/${kithiActived.mon}`)
        setDethisActived(data.data)
    }
    useEffect(() => {
        LOAD_DE_MON_ACTIVED()
    }, [kithiActived])
    if (dethisActived.length > 0) {
        dethisActived.map(dethi => {
            optionsDethiActived.push({ value: dethi._id, label: dethi.tieude })
        })
    }
    const [dethiSelected, setDethiSelected] = useState('')
    // const selectedDethi = (dethi) => {
    //     setDethiSelected(dethi)
    // }
    // END LOAD DE CUA MON Active    
    /// nhomm active

    ///
    return (
        <div className='page-ki-thi'>
            <div className='content-page'>
                <div className='left'>
                    {/* <FontAwesomeIcon className='ic-add ic-init' icon="plus" />
                    <FontAwesomeIcon className='ic-add ic-init2' icon="plus" /> */}
                    {
                        kithis.length > 0 &&
                        kithis.map(kithi => {
                            if (kithi.trangthai)
                                return (
                                    <div className='kithis' key={kithi._id} onClick={() => changeKithiActived(kithi)} >
                                        <KiThi kithi={kithi} kithiActived={kithiActived} remove={handleRemove} />
                                    </div>
                                )
                        })
                    }
                </div>
                <div className='right'>
                    {
                        kithiActived.trangthai && <KiThiCT
                            kithi={kithiActived}
                            //dethis={kithiActived.dethimos}
                            nhomActived={nhomActived}
                        />
                    }
                </div>
            </div>

        </div >
    );
}

export default PageMain;