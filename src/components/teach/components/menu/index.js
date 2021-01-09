import React from 'react';
import './../css/menu.scss'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menus = [

    { name: 'Câu hỏi', to: '/giao-vien/cau-hoi', exact: false, icon: 'user' },
    { name: 'Đề thi', to: '/giao-vien/de-thi', exact: false, icon: 'user' },
    { name: 'Kì thi', to: '/giao-vien/ki-thi', exact: false, icon: 'user' },
    { name: 'Nhóm', to: '/giao-vien/nhom', exact: false, icon: 'user' },

]
function Li({ label, to, activeOnlyWhenExact, icon }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })

    return (
        <div>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <li className={match ? "active" : ""} >
                    <div className='control'>
                        <div className='icon'> <FontAwesomeIcon className='ic' icon={icon} /> </div>
                        <div className='label'>{label}</div>
                        {/* <div className={match ? "active" : ""}></div> */}
                    </div>
                </li>
            </Link>
        </div>
    )
}

function MenuLeft(props) {
    const history = useHistory()
    const _logout = () => {
        localStorage.removeItem('userLogin')
        history.push('/dang-nhap')
    }
    return (
        <div className='menu-item'>
            <div className='menu-content'>
                <ul>
                    <li className='li-admin'>
                        <Link to={'thong-tin'} style={{ textDecoration: 'none' }}>
                            <li >
                                <div className='control'>
                                    <div>{JSON.parse(localStorage.getItem('userLogin'))[0].ten}</div>
                                </div>
                            </li>
                        </Link>
                    </li>
                    {
                        menus.map(item => {
                            return (
                                <Li
                                    key={item.name}
                                    activeOnlyWhenExact={item.exact}
                                    to={item.to}
                                    label={item.name}
                                    icon={item.icon}
                                />
                            )
                        })
                    }
                    <li className='li-dangxuat' style={{ borderTop: '1px solid #ddd', bottom: '-50px' }} onClick={_logout}>
                        Đăng xuất
                    </li>
                </ul>
            </div>
        </div>
        // <div className="menu-left">
        //     <div className='menu__head'>
        //         head
        //           </div>
        //     <hr className='width-90 op-7' />

        //     <div className='menu__content'>

        //         <ul>
        //             {menus.map(item => {
        //                 return (
        //                     <Li
        //                         key={item.name}
        //                         activeOnlyWhenExact={item.exact}
        //                         to={item.to}
        //                         label={item.name}
        //                         icon={item.icon}
        //                     />
        //                 )
        //             })}
        //         </ul>
        //     </div>
        // </div >
    );
}

export default MenuLeft;