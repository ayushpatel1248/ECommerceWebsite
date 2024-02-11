import React, { useState } from 'react'
import './register.css'
import registerImg from '../../images/loginImg/login.svg'
import { Link, useNavigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string, number, date, InferType } from 'yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/slices/userLoginDataSlice'

import axios, { Axios } from 'axios';



let baseurl = process.env.REACT_APP_BASE_URL;

let userSchema = object({
  userName: string().min(4).max(40).required(),
  email: string().email("Invalid email").required("Email is required"),
  mobileNumber: string().matches(/^[0-9]{10}$/, "Invalid mobile number").required("Mobile number is required"),
  password: string().min(4).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain capital, small letter, special character, and number").required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [showPass, setShowPass] = useState("password")
  const [notifyMessage, setNotifyMessage] = useState("")
  const dispatch = useDispatch();
  const notify = (notifyMessage) => toast(notifyMessage);

  const handleShowPass = (value) => {
    if (value) {
      setShowPass("text")
    }
    else {
      setShowPass("password")
    }
  }

  const handleRegister = async (ev) => {
    ev.preventDefault();
    console.log("we are here in register handler")
    try {
      const validatedInfo = await userSchema.validate({
        userName,
        email,
        mobileNumber,
        password
      })

      const apiFetched = await axios.post(`${baseurl}/register`, { userName, email, mobileNumber, password })
      console.log("api answer = ", apiFetched)
      console.log(apiFetched.data.data)
      if (apiFetched.data.status == "OK" || apiFetched.data.status == "ok") {
        localStorage.setItem("authorization", apiFetched.data.data.authToken)
        // console.log("harshit data",apiFetched.data.data.userdata)
        dispatch(addData(apiFetched.data.data.userdata));
        notify(apiFetched.data.msg)
        navigate("/")
      }else{
        notify(apiFetched.data.msg)
      }

    }
    catch (err) {
      notify(err.message)
    }
  }


  return (
    <div className='resgisterBody'>
      <div class="wrapper">
        <h2>Registration</h2>
        <form className='registrationForm' onSubmit={handleRegister}>
          <div class="input-box">
            <input type="text" placeholder="Enter your userName" onChange={(e) => setUserName(e.target.value)} required />
          </div>

          <div class="input-box">
            <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div class="input-box">
            <input type="number" placeholder="enter mobile number" onChange={(e) => setMobileNumber(e.target.value)} required />
          </div>

          <div class="input-box">
            <input type={showPass} placeholder="Create password" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div class="showPassword d-flex">
            <input type="checkbox" onChange={(e) => handleShowPass(e.target.checked)} />
            <h3>show password</h3>
          </div>

          <div class="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>

          <div class="input-box button">
            <input type="Submit" />
          </div>

          <div class="text">
            <h3>Already have an account? <Link to="/login">Login now</Link></h3>
          </div>
        </form>
      </div>
      <div>
        <div className="registerImage"> <img src={registerImg} ></img></div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register
