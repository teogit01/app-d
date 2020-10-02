import React from 'react';

import 'admin/assets/css/teacher.scss'

import { DropdownButton, Dropdown } from 'react-bootstrap';

function Teacher() {
    return (
      <div className='item col-12'>
        <div className='bgw col-1 '>#</div>
        <div className='bgw col-1'>Msgv</div>
        <div className='bgw col-2'>Tên</div>
        <div className='bgw col-3'>Email</div>
        <div className='bgw col-1'>Sđt</div>
        <div className='bgw col-2'>Địa chỉ</div>
        <div className='bgw col-2'>Action</div>
      </div>
    );
}

export default Teacher;
