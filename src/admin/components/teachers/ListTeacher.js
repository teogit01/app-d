import React from 'react';

import 'admin/assets/css/teacher.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'
function ListTeacher() {

  let history = useHistory()
  let match = useRouteMatch()

  const redirect = ()=>{
    history.push(`${match.url}/add`)
  }
    return (
      <div className='wrap-teacher'>

        <Header />
        
        <div className='teacher__content'>

          <div className='teacher__title'>
            
            <h4>Danh sách giáo viên</h4>

            <div className='btn-add-teacher'>
              {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
              <button className='btn btn-info' onClick={ redirect }>Thêm</button>
            </div>

          </div>          
        
          <div className='content__list'>
                <div className='item head col-12'>
                  <div className='bgw col-1 '>#</div>
                  <div className='bgw col-1'>Msgv</div>
                  <div className='bgw col-2'>Tên</div>
                  <div className='bgw col-3'>Email</div>
                  <div className='bgw col-1'>Sđt</div>
                  <div className='bgw col-2'>Địa chỉ</div>
                  <div className='bgw col-2'>Action</div>
                </div>                                           

                <Teacher />
                <Teacher />
                <Teacher />
                <Teacher />
                <Teacher />
                <Teacher />
                <Teacher />

                

          </div>           

        </div>
                  
      </div>
    );
}

export default ListTeacher;
