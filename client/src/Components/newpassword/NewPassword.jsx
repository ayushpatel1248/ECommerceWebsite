import React, { useEffect, useState } from 'react'
import { object, string, ref } from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./newPassword.css";
import { ToastContainer, toast } from 'react-toastify';
const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const notify = (mes) => toast.error(mes);

    useEffect(() => {
        let verifier = localStorage.getItem("verifier")
        if (!verifier) {
            navigate("/")
        }
    }, [])
    //---------------------------------validation Schema-----------------------------
    const setPasswordSchema = object({
        password: string().min(4).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain capital, small letter, special character, and number").required("Password is required"),
        confirmPassword: string().label('confirm password').required().oneOf([ref('password'), null], 'Passwords must match'),
    })

    const handleSubmitSetPassword = async () => {
        console.log(password, " ", confirmPassword)
        try {
            await setPasswordSchema.validate({ password, confirmPassword })
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            axios.post(`${BASE_URL}/password/SetPassword`, { newPassword: password, role: "user" }, { headers: { "verifier": localStorage.getItem("verifier") } }).then((res) => {
                console.log(res)
                if (res.data.status == "OK") {
                        notify(res.data.msg)
                        navigate("/login")
                } else {
                    notify(res.data.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log("err", err)
            notify(err.message)
        }
    }
    return (
        <div className='set-password-parent'>
            <div className="form_main">
                <p className="heading-password">Set Password</p>
                <div className="inputContainer">
                    <input
                        type="text"
                        className="inputField"
                        id="username"
                        placeholder="Set Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></input>
                </div>

                <div className="inputContainer">
                    <input
                        type="text"
                        className="inputField"
                        id="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                    ></input>
                </div>


                <button
                    id="button"
                    onClick={handleSubmitSetPassword}
                >Submit</button>

            </div>
            <ToastContainer />
        </div>
    )
}

export default NewPassword
