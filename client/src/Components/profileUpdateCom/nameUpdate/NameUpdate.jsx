import React, { useState } from 'react'
import { setNameValue } from '../../../store/slices/profileUpdattionSlice'
import { useDispatch } from 'react-redux';
import { object, string, number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const NameUpdate = () => {
  const notify = (mes) => toast.error(mes);
  const notifySucess = (mes) => toast(mes);
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [userName, setUserName] = useState("")


  const userNameUpdateSchema = object({
    userName: string().min(4).max(40).required()
  })
  const handelNameUpdateSubmit = async () => {
    try {
      await userNameUpdateSchema.validate({ userName })
      const auth = localStorage.getItem("authorization")

      axios.post(`${BASE_URL}/user/updateUserName`, {newUserName: userName, role: "user" } ,{headers:{authorization:auth}}).then((res)=>{
        if(res.data.status=="OK"){
          console.log("res.data=>",res.data)
          notifySucess(res.data.msg)
          dispatch(setNameValue(false))
          window.location.reload();
        
        }else{
          console.log(res.data)
          notify(res.data.msg)
        }
            }).catch((err)=>{
              console.log("error in axios at  UpdateEmail.jsx",err)
              notify("network error")
            })

    } catch (err) {
      notify(err.message)
    }
  }
  // updateUserName
  return (
    <div className='update-email-div'>
      <div className='update-email-inner-div'>
        <div className='d-flex justify-content-center flex-column gap-5'>
          <div>
            <h1 className='text-center fw-bold'><i class="fa fa-user" aria-hidden="true"></i></h1>
            <h2 className='text-center fw-bold'>Update Name</h2>
          </div>

          <div className="form-update-email">
            <input className="input-update-email" onChange={(e) => { setUserName(e.target.value) }} placeholder="Enter New Name" type="text"></input>
            <span className="input-border-update-email"></span>
          </div>

          <div className='d-flex gap-3'>
            <button className='button-update-email' onClick={() => { dispatch(setNameValue(false)) }}>cancle</button>
            <button className='button-update-email' onClick={handelNameUpdateSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}

export default NameUpdate
