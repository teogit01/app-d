import React from 'react';

import 'admin/assets/css/question.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'

function ListQuestion() {
  let history = useHistory()
  let match = useRouteMatch()

  const redirect = ()=>{
    history.push(`${match.url}/add`)
  }
  
    return (
      <div className='wrap-question'>

        <Header />
        
        <div className='question__content'>

          <div className='question__title'>
            
            <h4>Danh sách câu hỏi</h4>            

            <div className='btn-add-question'>
              {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
              <button className='btn btn-info' onClick={ redirect }>Thêm</button>
            </div>

          </div>          
        
          <div className='question__main'>          
                
            <div className='list'>
              <div className='item head col-12'>
                <div className='bgw col-1 '>#</div>
                <div className='bgw col-2'>Mã câu hỏi</div>
                <div className='bgw col-2'>Tên</div>                                 
                <div className='bgw col-5'>Nội dung</div>                                 
                <div className='bgw col-2'>Action</div>                
              </div>                                

              <div className='item col-12'>
                <div className='bgw col-1 '>1</div>
                <div className='bgw col-2'>ch2</div>
                <div className='bgw col-2'>Câu 2</div>                                 
                <div className='bgw col-5'>Đây là câu hỏi 2 nge</div>                                 
                <div className='bgw col-2'>xoá</div>                
              </div>       

               <div className='item col-12'>
                <div className='bgw col-1 '>2</div>
                <div className='bgw col-2'>ch1</div>
                <div className='bgw col-2'>Câu 1</div>                                 
                <div className='bgw col-5'>Đây là câu hỏi 1 nge</div>                                 
                <div className='bgw col-2'>xoá</div>                
              </div>       

               <div className='item col-12'>
                <div className='bgw col-1 '>3</div>
                <div className='bgw col-2'>ch1</div>
                <div className='bgw col-2'>Câu 1</div>                                 
                <div className='bgw col-5'>Đây là câu hỏi 1 nge</div>                                 
                <div className='bgw col-2'>xoá</div>                
              </div>                                

            </div>                     
                                                                                                
          </div>           

        </div>
                  
      </div>
    );
}

export default ListQuestion;
