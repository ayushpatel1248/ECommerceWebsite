import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMobileValue } from '../../../store/slices/profileUpdattionSlice';
import { object, string, number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const MobileUpdate = () => {
  const notify = (mes) => toast.error(mes);
  const notifySucess = (mes) => toast(mes);

  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [mobileNumber, setMobileNumber] = useState("")

  const mobileNumberUpdateSchema = object({
    mobileNumber: string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Mobile number is required")
  })

  const handelMobileNumberUpdateSubmit = async () => {
    try {
    await mobileNumberUpdateSchema.validate({mobileNumber})
      const auth = localStorage.getItem("authorization")
     
      axios.post(`${BASE_URL}/user/updateUserMobileNumber`, { newMobileNumber: mobileNumber, role: "user" }, { headers: { authorization: auth } }).then((res) => {
        if (res.data.status == "OK") {
          console.log("res.data=>", res.data) 
          notifySucess(res.data.msg) 
          dispatch(setMobileValue(false))
          window.location.reload();

        } else {
          console.log(res.data)
          notify(res.data.msg)
        }
      }).catch((err) => {
        console.log("error in axios at  UpdateMobile.jsx", err)
        notify("network error")
      })


    } catch (err) {
        notify(err.message)
    }
  }

  // mobileNumber: string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Mobile number is required")
  return (
    <div className='update-email-div'>
      <div className='update-email-inner-div'>
        <div className='d-flex justify-content-center flex-column gap-5'>
          <div>
            <h1 className='text-center fw-bold'><i class="fa fa-phone" aria-hidden="true"></i></h1>
            <h2 className='text-center fw-bold'>Update Mobile Number</h2>
          </div>

          <div className="form-update-email">
            <input className="input-update-email" onChange={(e) => { setMobileNumber(e.target.value) }} placeholder="Enter New Mobile Number" type="text"></input>
            <span className="input-border-update-email"></span>
          </div>

          <div className='d-flex gap-3'>
            <button className='button-update-email' onClick={() => { dispatch(setMobileValue(false)) }}>cancle</button>
            <button className='button-update-email' onClick={handelMobileNumberUpdateSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}

export default MobileUpdate

