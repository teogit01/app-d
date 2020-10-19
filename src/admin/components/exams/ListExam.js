import React from 'react';

import 'admin/assets/css/exam.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'

function ListExam() {
  let history = useHistory()
  let match = useRouteMatch()

  const redirect = ()=>{
    history.push(`${match.url}/add`)
  }
  const detail = ()=>{
    history.push(`${match.url}/detail`)
  }
  
    return (
      <div className='wrap-exam'>

        <Header />
        
        <div className='exam__content'>

          <div className='exam__title'>
            
            <h4 className='bold p-l-30'>Danh sách đề thi</h4>            

            <div className='btn-add-exam'>
              {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
              <button className='btn btn-info' onClick={ redirect }>Thêm</button>
            </div>

          </div>          
        
          <div className='exam__main'>          
                
            <div className='list'>
              <div className='item head col-12'>
                <div className='bgw col-1 '>#</div>
                <div className='bgw col-2'>Mã </div>
                <div className='bgw col-2'>Môn</div>                                 
                <div className='bgw col-2'>Số câu</div>
                <div className='bgw col-2'>Thời lượng</div>
                <div className='bgw col-2'>Năm</div>                
                <div className='bgw col-1'>Action</div>                
              </div>       

              <div className='item col-12'>
                <div className='bgw col-1 '>1</div>
                <div className='bgw col-2'>D1 </div>
                <div className='bgw col-2'>Toán rời rạc</div>                                 
                <div className='bgw col-2'>30</div> 
                <div className='bgw col-2'>90'</div>                                
                <div className='bgw col-2'>2019-2020</div>                
                <div className='bgw col-1'>Xoá</div>                              
              </div>                     

              <div className='item col-12'>
                <div className='bgw col-1 '>1</div>
                <div className='bgw col-2'>D1 </div>
                <div className='bgw col-2'>Toán rời rạc</div>                                 
                <div className='bgw col-2'>60'</div>
                <div className='bgw col-2'>30</div>                                 
                <div className='bgw col-2'>2019-2020</div>                
                <div className='bgw col-1'>Xoá</div>                              
              </div>                     

            </div>                     
                                                                                                
          </div>           

        </div>
                  
      </div>
    );
}

export default ListExam;
