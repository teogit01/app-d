import React from 'react';
import 'components/admin/css/menu-left.scss'
import { useRouteMatch, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import PropTypes from 'prop-types';

// MenuLeft.propTypes = {
//     listMenu: []
// };
const menus = [
    { name: 'DASHBOARD', to: '/admin', exact: true },
    { name: 'Lớp', to: '/admin/class', exact: false },
    { name: 'Môn Thi', to: '/admin/subject', exact: false },
    { name: 'Câu hỏi', to: '/admin/question', exact: false },
    { name: 'Thí sinh', to: '/admin/list', exact: false },
    { name: 'Người dùng', to: '/admin/user', exact: false },
    { name: 'Đề Thi', to: '/admin/exam', exact: false },
    { name: 'Kì Thi', to: '/admin/test', exact: false },

]
function Li({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })

    return (
        <div className={match ? "active" : ""}>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <li className={match}>
                    <div className='control-ic-label'>
                        <div className=''> <FontAwesomeIcon className='ic' icon="user" /> </div>
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
                            />
                        )
                    })}
                </ul>
            </div>

        </div>
    );
}

export default MenuLeft;