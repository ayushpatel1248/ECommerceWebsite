import React from 'react'
import { useDispatch } from 'react-redux';
import { setAddressValue } from '../../../store/slices/profileUpdattionSlice';
const AddressUpdate = () => {
    const dispatch = useDispatch();
  return (
    <div>
        <input type='text' placeholder='New  Address'></input>
      <button  onClick={()=>{dispatch(setAddressValue(false))}}>cancle</button>
    </div>
  )
}

export default AddressUpdate
