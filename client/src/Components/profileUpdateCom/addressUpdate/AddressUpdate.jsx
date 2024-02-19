import React from 'react'
import { useDispatch } from 'react-redux';
import { setAddressValue } from '../../../store/slices/profileUpdattionSlice';
const AddressUpdate = () => {
    const dispatch = useDispatch();
  return (
    <div className='update-email-div'>
    <div className='update-email-inner-div'>
      <div className='d-flex justify-content-center flex-column gap-5'>
       <div>
       <h1 className='text-center fw-bold'><i class="fa fa-map-marker" aria-hidden="true"></i></h1>
        <h2 className='text-center fw-bold'>Update Address</h2>
       </div>

        <div className="form-update-email">
          <input className="input-update-email" placeholder="Enter New Address" type="text"></input>
          <span className="input-border-update-email"></span>
        </div>

       <div className='d-flex gap-3'>
      <button  className='button-update-email' onClick={()=>{dispatch(setAddressValue(false))}}>cancle</button>
        <button className='button-update-email'>Save Changes</button>
       </div>
      </div>
    </div>
  </div>
  )
}

export default AddressUpdate
