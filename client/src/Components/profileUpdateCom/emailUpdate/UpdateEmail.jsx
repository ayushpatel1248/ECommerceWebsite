import React, { useState } from 'react'
import "./updateEmail.css"
import { useDispatch } from 'react-redux';
import { showEmailSection } from '../../../store/slices/showEmailUpdateProfileSlice';
import { object, string, number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const UpdateEmail = () => {
  const notify = (mes) => toast.error(mes);
  const notifySucess = (mes) => toast(mes);

  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState("")

  const emailUpdateSchema = object({
    email: string().trim().matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "email should be correct").required("email is required field"),
  })
  const handelEmailUpdateSubmit = async () => {
    try {
      await emailUpdateSchema.validate({ email })
      const auth = localStorage.getItem("authorization")

      axios.post(`${BASE_URL}/user/updateUserEmail`, { newEmail: email, role: "user" }, { headers: { authorization: auth } }).then((res) => {
        if (res.data.status == "OK") {
          console.log("res.data=>", res.data)
          notifySucess(res.data.msg)
          dispatch(showEmailSection(false))
          window.location.reload();

        } else {
          console.log(res.data)
          notify(res.data.msg)
        }
      }).catch((err) => {
        console.log("error in axios at  UpdateEmail.jsx", err)
        notify("network error")
      })

    } catch (err) {
      notify(err.message)
    }
  }
  return (
    <div className='update-email-div'>
      <div className='update-email-inner-div'>
        <div className='d-flex justify-content-center flex-column gap-5'>
          <div>
            <h1 className='text-center fw-bold'><i class="fa fa-envelope" aria-hidden="true"></i></h1>
            <h2 className='text-center fw-bold'>Update Email</h2>
          </div>

          <div className="form-update-email">
            <input className="input-update-email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter New Email" type="text"></input>
            <span className="input-border-update-email"></span>
          </div>

          <div className='d-flex gap-3'>
            <button className='button-update-email' onClick={() => { dispatch(showEmailSection(false)) }}>cancle</button>
            <button className='button-update-email' onClick={handelEmailUpdateSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}
// e.target.parentElement.className

export default UpdateEmail
