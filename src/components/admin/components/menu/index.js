import React from 'react';
import './../css/menu.scss'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menus = [

    { name: 'Người dùng', to: '/admin/tai-khoan', exact: false, icon: 'user' },
    // { name: 'Nhóm', to: '/admin/nhom', exact: false, icon: 'user' },
    { name: 'Câu hỏi', to: '/admin/cau-hoi', exact: false, icon: 'user' },
    { name: 'Thống kê', to: '/admin/thong-ke', exact: false, icon: 'user' },

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
                        Admin
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
                    {/* <li className='li-dangxuat' onClick={_logout}> */}
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