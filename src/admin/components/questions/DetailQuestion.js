import React from 'react';

import 'admin/assets/css/question.scss'

import { useRouteMatch, useHistory } from "react-router-dom";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import Teacher from './Teacher'
import Header from 'admin/components/commons/Header'

function DetailQuestion() {
  let history = useHistory()
  let match = useRouteMatch()

  const redirect = ()=>{
    history.goBack()
  }
  
    return (
      <div className='wrap-question'>

        <Header />
        
        <div className='question__content'>

          <div className='question__title'>
            
            <h4 className='bold p-l-30'>Chi tiết câu hỏi</h4>            

            <div className='btn-add-question'>
              {/*<FontAwesomeIcon className='ic ic-add' icon="user-plus" />*/}
              <button className='btn btn-info' onClick={ redirect }>Quay lại</button>
            </div>

          </div>          
        
          <div className='question__main'>          
                
            <div className='question__main--form-add'>
              <form>
                <div className='fill-control'>
                  <label>
                    Tiêu đề câu hỏi:
                  </label>
                  <input type='text' className='form-control' value='Tiêu đề câu hỏi' />
                </div>

                <div className='fill-control'>
                  <label>
                    Loại câu hỏi:
                  </label>
                  <select className='form-control'>
                    <option>Trắc nghiệm</option>
                  </select>
                </div>

                <div className='fill-control'>
                  <label>
                    Nội dung câu hỏi:
                  </label>
                  <textarea className='form-control' rows='5' value='Nội dung câu hỏi'>
                    
                  </textarea>
                </div>

                <div className='dapan'>
                  <label>
                    Phương án A: &nbsp;&nbsp;
                    <input type='radio' name='dapan' value="A" checked className='' />
                  </label>                             
                  <div className='dapan__item'>
                    <select className='form-control'>                      
                      <option>Phương an 1</option>
                    </select>    
                    <textarea className='form-control'>                      
                    </textarea>              
                  </div>                       
                </div>

                <div className='dapan'>
                  <label>
                    Phương án B: &nbsp;&nbsp;
                    <input type='radio' name='dapan' value="B" className='' />
                  </label>                             
                  <div className='dapan__item'>
                    <select className='form-control'>                      
                      <option>Phương an 1</option>
                    </select>    
                    <textarea className='form-control'>                      
                    </textarea>              
                  </div>                       
                </div>

                <div className='dapan'>
                  <label>
                    Phương án C: &nbsp;&nbsp;
                    <input type='radio' name='dapan' value="C" className='' />
                  </label>                             
                  <div className='dapan__item'>
                    <select className='form-control'>                      
                      <option>Phương an 1</option>
                    </select>    
                    <textarea className='form-control'>                      
                    </textarea>              
                  </div>                       
                </div>

                <div className='dapan'>
                  <label>
                    Phương án D: &nbsp;&nbsp;
                    <input type='radio' name='dapan' value="D" className='' />
                  </label>                             
                  <div className='dapan__item'>
                    <select className='form-control'>      
                      <option>Phương an 1</option>                
                    </select>    
                    <textarea className='form-control'>                      
                    </textarea>              
                  </div>                       
                </div>

                <div className='button'>
                  <button className=' w120 btn btn-danger'>Huỷ</button>
                  <button className='w120 btn btn-info'>Lưu</button>                  
                </div>

              </form>

            </div>                     
                                                                                                
          </div>           

        </div>
                  
      </div>
    );
}

export default DetailQuestion;
