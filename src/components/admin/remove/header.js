import React from 'react';
import 'components/admin/css/header.scss'
import { DropdownButton, Dropdown } from 'react-bootstrap';
// import PropTypes from 'prop-types';

// Header.propTypes = {

// };

function Header(props) {
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