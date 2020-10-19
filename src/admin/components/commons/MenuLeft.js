import React from 'react';
import 'admin/assets/css/menu-left.scss'
import { useRouteMatch, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menus = [
	{ name: 'DASHBOARD', to: '/admin', exact: true },
	{ name: 'Môn Thi', to: '/admin/subject', exact: false },
	{ name: 'Câu hỏi', to: '/admin/question', exact: true },
	{ name: 'Thí sinh', to: '/admin/list', exact: false },
	{ name: 'Đề thi', to: '/admin/exam', exact: false },
	{ name: 'Giáo viên', to: '/admin/teacher', exact: false },
	{ name: 'Loại câu hỏi', to: '/admin/question/type', exact: false },

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

function MenuLeft() {
	//let match = useRouteMatch()
	return (
		//<Router>
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

		//</Router>
	);
}

export default MenuLeft;
