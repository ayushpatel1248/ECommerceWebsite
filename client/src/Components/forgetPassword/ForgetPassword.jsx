import React, { useEffect } from 'react'
import "./forgetPassword.css"
import "./verifyOtp.css";
import { useState } from 'react';
import { object, string, number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState("nharshit7024@gmail.com");
  const [verify, setVerify] = useState("notverify");
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const notify = (mes) => toast.error(mes);

  //------------all logic for to handle email sumbittion
  const resetPasswordSchema = object({
    email: string().trim().matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "email should be correct").required("email is required field"),
  })
  const handleSubmitForgetPassword = async () => {
    setIsLoading(true)
    try {
      await resetPasswordSchema.validate({ email })
      const res = await axios.post(`${BASE_URL}/password/otpForPassword`, { email, role: "user" })
      console.log(res.data)
      if (res.data.status == "OK" || res.data.status == "ok") {
        setVerify("verify")
        setResendOtp(true)
        console.log("verify api required ") //to do 

      } else {
        notify(res.data.msg);
      }
    } catch (err) {
      notify(err.message)
    }
    setIsLoading(false)
  }
  //------------all logic for to handle verify otp
  const [count, setCount] = useState(30);
  const [resendOtp, setResendOtp] = useState(true)
  const [inp1, setInp1] = useState()
  const [inp2, setInp2] = useState()
  const [inp3, setInp3] = useState()
  const [inp4, setInp4] = useState()
  const [inp5, setInp5] = useState()
  const [inp6, setInp6] = useState()
  const verifyOtpSchema = object({
    inp1: number().typeError("entered field must be a number...").required("invalid OTP"),
    inp2: number().typeError("entered field must be a number...").required("invalid OTP"),
    inp3: number().typeError("entered field must be a number...").required("invalid OTP"),
    inp4: number().typeError("entered field must be a number...").required("invalid OTP"),
    inp5: number().typeError("entered field must be a number...").required("invalid OTP"),
    inp6: number().typeError("entered field must be a number...").required("invalid OTP")
  })
  const handleSubmitOtp = async () => {
    try {
      await verifyOtpSchema.validate({ inp1, inp2, inp3, inp4, inp5, inp6 })
      let otpArr = [inp1, inp2, inp3, inp4, inp5, inp6]
      let otpStr = otpArr.join("");
      axios.post(`${BASE_URL}/password/verifyOtp`, { otpToBeVerified: otpStr, email, role: "user" }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })

    } catch (err) {
      console.log(err.message)
      notify(err.message)
    }

  }

  useEffect(() => {
    let i = 30
    if (verify == "verify") {
      var interval = setInterval(() => {
        setCount(--i)
        // console.log(i)
      }, 1000)

      setTimeout(() => {
        setResendOtp(false)
        clearInterval(interval)
      }, 21000);
    }
  }, [verify])

  return (
    <div>
      {verify == "notverify" ?
        <div className='parent-div'>
          <div className="popupf">
            <div className="formf">
              <div className="iconf">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="34" width="34">
                  <path strokeLinejoin="round" strokeWidth="2.5" stroke="#115DFC" d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"></path>
                  <path strokeLinejoin="round" strokeWidth="2.5" stroke="#115DFC" d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"></path>
                  <path strokeWidth="2.5" stroke="#115DFC" d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"></path>
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#115DFC" d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"></path>
                </svg>
              </div>
              <div className="notef">
                <label className="titlef">RESET PASSWORD </label>
                <span className="subtitlef">Enter a mail from which user is registered.</span>
              </div>
              <input placeholder="Enter your e-mail"
                title="Enter your e-mail"
                name="email"
                type="email"
                className="input_fieldf"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              ></input>
              <button
                className={isLoading == false ? "submitf" : "submitf-disable"}
                onClick={handleSubmitForgetPassword}
                disabled={isLoading}>{isLoading == false ? "submit" : "submitting....."}</button>
            </div>
          </div>

        </div> :
        <div className='verify-otp'>
          <div className="form">
            <p className="heading">Verify Otp</p>
            <i className="fa fa-check-square heading icon" aria-hidden="true"></i>
            <div className="box">
              <input className="input" type="text" maxLength="1" value={inp1} onChange={(e) => { setInp1(e.target.value) }}></input>
              <input className="input" type="text" maxLength="1" value={inp2} onChange={(e) => { setInp2(e.target.value) }}></input>
              <input className="input" type="text" maxLength="1" value={inp3} onChange={(e) => { setInp3(e.target.value) }}></input>
              <input className="input" type="text" maxLength="1" value={inp4} onChange={(e) => { setInp4(e.target.value) }}></input>
              <input className="input" type="text" maxLength="1" value={inp5} onChange={(e) => { setInp5(e.target.value) }}></input>
              <input className="input" type="text" maxLength="1" value={inp6} onChange={(e) => { setInp6(e.target.value) }}></input>
            </div>
            <div className="counting"><button className={resendOtp ? "resend-otp-disable" : 'resend-otp'} disabled={resendOtp} onClick={() => { handleSubmitForgetPassword(); setVerify("verify-otp") }}>-resend Otp</button><p>OTP is valid up to : {count} sec</p></div>
            <div className='submit-back-div'>
              <button className="btn1" onClick={handleSubmitOtp} >Submit</button>
              <button className="btn2" onClick={() => { window.location.reload() }}>Back</button>
            </div>
          </div>
        </div>}
      <ToastContainer />
    </div>
  )
}

export default ForgetPassword
