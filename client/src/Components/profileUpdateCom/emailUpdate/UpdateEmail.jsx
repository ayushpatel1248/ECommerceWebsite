import React from 'react'
import "./updateEmail.css"
import { useDispatch } from 'react-redux';
import { showEmailSection } from '../../../store/slices/showEmailUpdateProfileSlice';

const UpdateEmail = () => {
  const dispatch = useDispatch();

  return (
    <div className='update-email-div'>
      <div className='update-email-inner-div'>
        <div className='d-flex justify-content-center flex-column gap-5'>
         <div>
         <h1 className='text-center fw-bold'><i class="fa fa-envelope" aria-hidden="true"></i></h1>
          <h2 className='text-center fw-bold'>Update Email</h2>
         </div>

          <div className="form-update-email">
            <input className="input-update-email" placeholder="Enter New Email" type="text"></input>
            <span className="input-border-update-email"></span>
          </div>

         <div className='d-flex gap-3'>
         <button className='button-update-email' onClick={() => { dispatch(showEmailSection(false)) }}>cancle</button>
          <button className='button-update-email'>Save Changes</button>
         </div>
        </div>
      </div>
    </div>
  )
}
// e.target.parentElement.className

export default UpdateEmail
