import React from 'react'
import { useDispatch } from 'react-redux';
import { setMobileValue } from '../../../store/slices/profileUpdattionSlice';
const MobileUpdate = () => {
    const dispatch = useDispatch();
  return (
    <div>
       <input type='text' placeholder='New Mobile Number'></input>
      <button onClick={()=>{dispatch(setMobileValue(false))}}>cancle</button>
    </div>
  )
}

export default MobileUpdate
