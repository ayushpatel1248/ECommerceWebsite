import React, { useState } from 'react'
import "./Login.css"
import login from "../../images/loginImg/login.svg"
import { Link } from 'react-router-dom'
import { object, string, number, date, InferType } from 'yup';
const Login = () => {
    const [showHidePass, setShowHidePass] = useState("password")
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const loginSchema = object({
        email: string().trim().matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ , "email should be correct").required("email is required field"),
        password: string().min(4).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "password must be contain one uppercase one ower case special char and one nummber ").required("password is required field")
    })

    const sumbitLoginHandle = async () => {
        try {
            const validationResut = await loginSchema.validate({ email, password });
            console.log(validationResut)
        } catch (err) {
            console.log(err.ValidationError)
        }
    }
    return (
        <div className='container'>
            <div className='left-child'>
                <div className="login-img"> <img src={login} ></img></div>
            </div>
            <div className='right-child'>
                {/* ---- */}
                <div className="form">
                    <span className="signup">SIGN IN</span>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="form--input"
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></input>
                    <input
                        type={showHidePass}
                        placeholder="Password"
                        className="form--input"
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                    <div className='showPass'><input type="checkbox" onChange={(e) => { e.target.checked == true ? setShowHidePass("text") : setShowHidePass("password") }} /><label> show password</label></div>
                    <div className="form--marketing">
                        <label htmlFor="okayToEmail" className="checkbox">
                            Create a new account -
                        </label><Link to={"/register"} className="sign-up">Sign Up</Link>
                    </div>
                    <button
                        className="form--submit"
                        onClick={sumbitLoginHandle}
                    > Sign In </button>
                </div>
                {/* ---- */}
            </div>

        </div>
    )
}

export default Login
