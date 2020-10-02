import React from 'react';
import './App.scss';
import 'admin/components/commons/icon'

import {
  BrowserRouter as Router,
  Link,
  Route,  
} from 'react-router-dom'
								

import Admin from 'admin'
//import Client from 'client'

function App() {
  return (
  	  	
	    <div className="App">	
	    
		    <Router>
		    	<Link to='/admin' />		    	

		    	<Route path='/admin' component={ Admin }/>		    	

		    </Router>
	    </div>
    
  );
}

export default App;
