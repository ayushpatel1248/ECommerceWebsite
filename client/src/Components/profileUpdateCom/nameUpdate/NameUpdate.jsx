import React from 'react'
import { setNameValue } from '../../../store/slices/profileUpdattionSlice'
import { useDispatch } from 'react-redux';
const NameUpdate = () => {
    const dispatch = useDispatch();
  return (
    <div>
         
      <input type='text' placeholder='New User Name'></input>
      <button onClick={()=>{dispatch(setNameValue(false))}}>cancle</button>  
    </div>
  )
}

export default NameUpdate
