import React from 'react';
//import 'admin/assets/css/menu-left.scss'
import { Switch, Route } from 'react-router-dom'

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ListTeacher from 'admin/components/teachers/ListTeacher'
import AddTeacher from 'admin/components/teachers/AddTeacher'
import ListSubject from 'admin/components/subjects/ListSubject'
import ListQuestion from 'admin/components/questions/ListQuestion'


function User1(){
	return <h1>User1</h1>
}

function RouteOfMenu(props) {
	let { match } = props
	
		return (
						
			<Switch>
				
				<Route path={`${match.url}/teacher`} exact component={ ListTeacher }/>
				<Route path={`${match.url}/teacher/add`} component={ AddTeacher }/>

				<Route path={`${match.url}/subject`} component={ ListSubject }/>
				<Route path={`${match.url}/question`} component={ ListQuestion }/>				
				<Route path={`${match.url}/list`} exact component={ User1 }/>
				

			</Switch>
			
		);
}

export default RouteOfMenu;
