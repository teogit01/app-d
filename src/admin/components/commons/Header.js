import React from 'react';
import 'admin/assets/css/header.scss'
 
import { DropdownButton, Dropdown } from 'react-bootstrap';

function Header() {
  return (
  	<div>

	  	<div className='header'>
		  	<div className='title'>
		  		Teacher INFOR
		  	</div> 

		  	<div className='control'>
			  	<DropdownButton variant="" className='control-dropdown' id="dropdown-basic-button" title="Dropdown button">
			  	<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
			  	<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
			  	<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
			  	</DropdownButton>                
		  	</div>

		</div>
		<hr />
	</div>
  	
  );
}

export default Header;
