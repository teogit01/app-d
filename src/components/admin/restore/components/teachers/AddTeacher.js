import React from 'react';

import 'admin/assets/css/teacher.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'

function AddTeacher() {

  let history = useHistory()
  let match = useRouteMatch()

  const redirect = ()=>{
    history.goBack()
  }
    return (
      <div className='wrap-teacher'>

        <Header />
        
        <div className='teacher__content'>

          <div className='teacher__title'>
            
            <h4>Thêm Giáo Viên</h4>

            <div className='btn-add-teacher'>
              {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
              <button className='btn btn-secondary' onClick={ redirect }>Quay lại</button>
            </div>

          </div>          
        
          <div className='wrap-form'>
              <div className='form__left'>
                  <div className='left__infor'>
                        <img className='avatar'/>
                        <hr />

                        <div className='btn-avatar'>
                            <input type='file' className='' />
                        </div>

                  </div>

                  <div className='left__more'>
                      
                  </div>
              </div>

              <div className='form__right'>
                    <form>
                        <div className='control'>
                            <lable className='col-2'> Msgv: </lable>
                            <input type='text' className='form-control col-10' />
                        </div>                        

                        <div className='control'>
                            <lable className='col-2'> Họ Tên: </lable>
                            <input type='text' className='form-control col-10' />
                        </div>

                        <div className='control'>
                            <lable className='col-2'> Giới tính: </lable>
                            Nam &nbsp;&nbsp;
                            <input type="radio" name="gender" value="male" checked='true'/> &nbsp;&nbsp;
                            Nữ &nbsp;&nbsp;
                            <input type="radio" name="gender" value="Female"/>
                        </div>

                        <div className='control'>
                            <lable className='col-2'> Email: </lable>
                            <input type='text' className='form-control col-10' />
                        </div>

                        <div className='control'>
                            <lable className='col-2'> Sđt: </lable>
                            <input type='text' className='form-control col-10' />
                        </div>

                        <div className='control'>
                            <lable className='col-2'> Đơn vị công tác: </lable>
                            <input type='text' className='form-control col-10' />
                        </div>

                        <div className='control'>
                            <lable className='col-2'> Địa chỉ: </lable>
                            {/*<input type='text' className='form-control col-10' />*/}
                            <textarea className='form-control' rows='5'>
                                
                            </textarea>
                        </div>

                        <div className='control control-button'>                            
                            <button className='btn btn-primary'>Lưu</button>
                            <button className='btn btn-warning'>Huỷ</button>
                        </div>
                        
                        
                        
                    </form>
              </div>
          </div>
        </div>
                  
      </div>
    );
}

export default AddTeacher;
