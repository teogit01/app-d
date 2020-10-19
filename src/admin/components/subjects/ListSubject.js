import React from 'react';

import 'admin/assets/css/subject.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'
import FormAdd from 'admin/components/subjects/AddSubject'
function ListSubject() {

    return (
      <div className='wrap-subject'>

        <Header />
        
        <div className='subject__content'>

          <div className='subject__title'>
            
            <h4 className='bold p-l-30'>Danh sách môn thi</h4>            

          </div>          
        
          <div className='subject__main'>

          {/* form add*/}
            <div className='form'>
              <FormAdd />
            </div>
                
            <div className='list'>
              <div className='item head col-12'>
                <div className='bgw col-1 '>#</div>
                <div className='bgw col-2'>Msgv</div>
                <div className='bgw col-3'>Tên</div>                                 
                <div className='bgw col-3'>Action</div>                
              </div>                                

              <div className='item  col-12'>
                <div className='bgw col-1 '>1</div>
                <div className='bgw col-2'>ltdt</div>
                <div className='bgw col-3'>Li thuyet do thi</div>     
                <div className='bgw col-3'>edit / del</div>                           
              </div>                                

              <div className='item col-12'>
                <div className='bgw col-1 '>2</div>
                <div className='bgw col-2'>trr</div>
                <div className='bgw col-3'>Toan roi rac</div>      
                <div className='bgw col-3'>edit / del</div>                          
              </div> 
            </div>                     
                                                                                                
          </div>           

        </div>
                  
      </div>
    );
}

export default ListSubject;
