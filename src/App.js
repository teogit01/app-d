import React, { useEffect } from 'react';
import './App.scss';
import 'admin/components/commons/icon'
import 'components/userSlice'

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
					!user ? <Redirect to='/login' /> : ''
				}
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<Route path='/teacher' component={Teacher} />
				<Route path='/student' component={Student} />
				<Route path='/admin' component={Admin} />
			</Router>

		</div>

	);
}

export default App;
