import React from 'react';

import 'admin/assets/css/subject.scss'

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function AddSubject() {

    return (
      <form>
       <div className='control'>
         <lable className='col-12'> Mã lớp: </lable>
         <input type='text' className='form-control col-12' />
       </div>                        

       <div className='control'>
         <lable className='col-12'> Tên lớp: </lable>
         <input type='text' className='form-control col-12' />
       </div>      

       <div className='control control-button'>                            
         <button className='btn btn-primary'>Lưu</button>
         <button className='btn btn-warning'>Huỷ</button>
       </div>
      </form>
    );
}

export default AddSubject;
