import React, { useEffect } from 'react';
import './App.scss';
import 'components/icon.js'

import {
	BrowserRouter as Router,
	Route,
	Redirect,
} from 'react-router-dom'


import Admin from 'components/admin'
import Teacher from 'components/teach'
import Student from 'components/student'
import Login from 'components/login.js'
import Register from 'components/register.js'

//import { addUser } from 'components/userSlice'
//import Client from 'client'

function App() {
	//const checkLogin = false
	const user = localStorage.getItem('userLogin')
	//console.log('user login', user)
	return (
		<div className="App">

			<Router>
				{
					!user ? <Redirect to='/dang-nhap' /> : ''
				}
				<Route path='/dang-ky' component={Register} />
				<Route path='/dang-nhap' component={Login} />
				<Route path='/giao-vien' component={Teacher} />
				<Route path='/sinh-vien' component={Student} />
				<Route path='/admin' component={Admin} />
			</Router>

		</div>

	);
}

export default App;
