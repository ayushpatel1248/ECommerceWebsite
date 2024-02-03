import React from 'react'
import "./Login.css"
import login from "../images/loginImg/login.svg"
const Login = () => {
    return (
        <div className='container'>
            <div className='left-child'>
                <div className="login-img"> <img src={login} ></img></div>
            </div>
            <div className='right-child'>
                {/* ---- */}
                <form className="form">
                    <span className="signup">SIGN IN</span>
                    <input type="email" placeholder="Email address" className="form--input"></input>
                        <input type="password" placeholder="Password" className="form--input"></input>
                            

                                <div class="form--marketing">
                        
                                        <label for="okayToEmail" className="checkbox">
                                           Create a new account -   
                                        </label><a> Sign Up</a>
                                </div>
                                <button className="form--submit">
                                    Sign In
                                </button>
                            </form>
                            {/* ---- */}
                        </div>

                    </div>
                    )
}

                    export default Login
