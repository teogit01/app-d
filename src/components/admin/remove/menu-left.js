import React from 'react';
import 'components/admin/css/menu-left.scss'
import { useRouteMatch, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import PropTypes from 'prop-types';

// MenuLeft.propTypes = {
//     listMenu: []
// };
const menus = [

    { name: 'Người dùng', to: '/admin/tai-khoan', exact: false, icon: 'user' },
    { name: 'Nhóm', to: '/admin/nhom', exact: false, icon: 'user' },
    { name: 'Câu hỏi', to: '/admin/cau-hoi', exact: false, icon: 'user' },
    // { name: 'Thông báo', to: '/admin/notify', exact: false, icon: 'user' },

]
function Li({ label, to, activeOnlyWhenExact, icon }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })

    return (
        <div className={match ? "active" : ""}>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <li className={match}>
                    <div className='control-ic-label'>
                        <div className=''> <FontAwesomeIcon className='ic' icon={icon} /> </div>
                        <div className='label'>{label}</div>
                        <div className={match ? "active-page" : ""}></div>
                    </div>
                </li>
            </Link>
        </div>
    )
}

function MenuLeft(props) {
    return (
        <div className="menu-left">
            <div className='menu__head'>
                head
                  </div>
            <hr className='width-90 op-7' />

            <div className='menu__content'>

                <ul>
                    {menus.map(item => {
                        return (
                            <Li
                                key={item.name}
                                activeOnlyWhenExact={item.exact}
                                to={item.to}
                                label={item.name}
                                icon={item.icon}
                            />
                        )
                    })}
                </ul>
            </div>

        </div>
    );
}

export default MenuLeft;