import React from 'react';

import 'admin/assets/css/exam.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'

function AddExam() {
  let history = useHistory()
  let match = useRouteMatch()

  const redirect = ()=>{
    history.goBack()
  }
  
    return (
      <div className='wrap-exam'>

        <Header />
        
        <div className='exam__content'>

          <div className='exam__title'>
            
            <h4 className='bold p-l-30'>Tạo Đề Thi</h4>            

            <div className='btn-add-exam'>
              {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
              <button className='btn btn-info' onClick={ redirect }>Quay lại</button>
            </div>

          </div>          
        
          <div className='exam__main'>          
                
            <div className='exam__main--form-add'>
              <form>
                <div className='fill-control'>
                  <label>
                    Mẫ đề thi:
                  </label>
                  <input type='text' className='form-control' />
                </div>

                <div className='fill-control'>
                  <label>
                    Môn thi:
                  </label>
                  <select className='form-control'>
                    <option>Toán rời </option>
                  </select>
                </div>   

                 <div className='fill-control'>
                  <label>
                    Thời lượng:
                  </label>
                  <input type='number' className='form-control' />
                </div>                              

                <div className='fill-control'>       
                  <label className='cauhoi'>Câu hỏi:</label>           
                  <label className='number_question number_question_first'>                    
                    1                    
                  </label>                  
                  <select className='form-control'>
                    <option>Câu hỏi 1</option>
                    <option>Câu hỏi 2</option>
                  </select>                  
                </div>

                <div className='fill-control'>
                  <label className='number_question'>
                    2
                  </label>
                  <select className='form-control'>
                    <option>Câu hỏi 2</option>
                    <option>Câu hỏi 3</option>
                  </select>                  
                </div>

                <div className='fill-control'>
                  <a className=' btn add_question'><u><i>Thêm câu hỏi</i></u></a>
                  
                </div>

                <div className='button'>
                  <button className=' w120 btn btn-danger'>Huỷ</button>
                  <button className='w120 btn btn-info'>Tạo</button>                  
                </div>

              </form>

            </div>                     
                                                                                                
          </div>           

        </div>
                  
      </div>
    );
}

export default AddExam;
