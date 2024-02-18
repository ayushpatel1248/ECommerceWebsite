import React from 'react'
import "./updateEmail.css"
import { useDispatch } from 'react-redux';
import { showEmailSection } from '../../../store/slices/showEmailUpdateProfileSlice';

const UpdateEmail = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <input type='text' placeholder='New Email'></input>
      <button onClick={()=>{dispatch(showEmailSection(false))}}>cancle</button>

    </div>
  )
}
// e.target.parentElement.className

export default UpdateEmail
