import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from "../header/Header";
import { useDispatch } from 'react-redux';
import "./profile.css";
import Footer from "../footer/Footer"
import { fetchData } from '../../store/slices/userLoginDataSlice';
import profileImg from "../../images/profileImg/profile-img.jpg";
import { Link } from 'react-router-dom';
import { object, string, ref } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const notify = (mes) => toast.error(mes);
  const notifysucess = (mes) => toast(mes);
  const dispatch = useDispatch();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [setPassword, setSetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableColor, setDisableColor] = useState("button");
  useEffect(() => {
    dispatch(fetchData(localStorage.getItem("authorization")))
  }, [])
  const userData = useSelector((state) => state.userLoginData.userData);
  const resetPassword = () => {
    setIsResetPassword(true)
  }
  const setPasswordSchema = object({
    currentPassword: string().required(),
    setPassword: string().min(4).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain capital, small letter, special character, and number").required("Password is required"),
    confirmPassword: string().label('confirm password').required().oneOf([ref('setPassword'), null], 'Passwords must match'),
  })
  const handelSubmitRestPassword = async () => {
    setIsLoading(true)
    setDisableColor("button-disabled")
    console.log("hello")
    try {


      await setPasswordSchema.validate({ currentPassword, setPassword, confirmPassword });
      axios.post(`${BASE_URL}/password/resetPassword`, { email: userData.email, oldPassword: currentPassword, newPassword: setPassword }).then((res) => {
        if (res.data.status == "OK" || res.data.status == "ok") {
          notifysucess(res.data.msg);
          setTimeout(() => [
            navigate("/login")
          ], 2000)
          setIsLoading(false)
          setDisableColor("button")
        } else {
          notify(res.data.msg)
          setIsLoading(false)
          setDisableColor("button")
        }

      }).catch((err) => {
        console.log("err in profile.jsx in axixos at handelSubmitRestPassword", err);
        setIsLoading(false)
    setDisableColor("button")
      })

    }
    catch (err) {
      notify(err.message)
      setIsLoading(false)
    setDisableColor("button")

    }
    // setIsLoading(false)
  }
  return (
    <div className='profile-parent'>
      <Header />
      {isResetPassword ? <div><div className='set-password-parent'>
        <div className="form_main">
          <p className="heading-password">Set Password</p>
          <div className="inputContainer">
            <input
              type="text"
              className="inputField"
              id="username"
              placeholder="Current Password"
              onChange={(e) => {
                setCurrentPassword(e.target.value)
              }}
            ></input>
          </div>
          <div className="inputContainer">
            <input
              type="text"
              className="inputField"
              id="username"
              placeholder="Set Password"
              onChange={(e) => {
                setSetPassword(e.target.value)
              }}
            ></input>
          </div>

          <div className="inputContainer">
            <input
              type="text"
              className="inputField"
              id="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            ></input>
          </div>

          <button
            id={disableColor}
            disabled={isLoading}
            onClick={handelSubmitRestPassword}
          >Submit</button>

        </div>
      </div></div> : <div>{userData ? <div className="container-profile">
        <h1 className='h1-profile'>User Profile</h1>
        <div className="background-photo-profile"></div>
        <div className="profile-photo animated" style={{ backgroundImage: `url(${profileImg})` }}></div>
        <div className='upload-profile-img-profile'>
          <span>update profile photo</span>
        </div>

        <div className="user-info-profile">
          <div className="profile-info-div">
            <div className='d-flexx'>
              <div htmlFor="name" className="profile-fields"><i class="fas fa-user"></i><strong> Name:</strong></div>
              <div id="name">{userData.userName}</div>
            </div>
            <div>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

            </div>

          </div>
          <div className="profile-info-div">
            <div className='d-flexx'>
              <div htmlFor="email" className="profile-fields"><i class="fas fa-envelope"></i><strong> Email:</strong></div>
              <div id="email">{userData.email}</div>
            </div>
            <div>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

            </div>

          </div>

          <div className="profile-info-div">
            <div className='d-flexx'>
              <div htmlFor="mobile" className="profile-fields"><i class="fas fa-phone"></i><strong> Mobile:</strong></div>
              <div id="mobile">{userData.mobileNumber}</div>
            </div>
            <div>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

            </div>

          </div>
          <div className="profile-info-div">
            <div className='d-flexx'>
              <div htmlFor="address" className="profile-fields"><i class="fas fa-map-marker-alt"></i><strong> Address:</strong></div>
              <div id="address">{userData.address}</div>
            </div>
            <div>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

            </div>

          </div>



          <div className='reset-btn-profile'><button className="reset-button-profile" onClick={resetPassword}>Reset Password</button></div>
        </div>
        <div className="order-history-profile">
          <h2>Order History</h2>
          <div className="order-item-profile">
            <span>TOTAL SPEND AMOUNT :</span>
            <span>4000</span>

          </div>
        </div>
      </div> : <div style={styles.container}>
        <h1 style={styles.heading}>Welcome!</h1>
        <p style={styles.text}>You are not logged in. Please sign in or sign up to continue.</p>
        <div style={styles.buttonContainer}>
          <button style={styles.button}  ><Link to={'/login'} className='sign-in-profile'>Sign In</Link></button>
          <button style={styles.button}><Link to={'/register'} className='sign-in-profile'>Sign Up</Link></button>
        </div>
      </div>}</div>}

      <Footer />
      <ToastContainer />
    </div>)
};
const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#666',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    fontSize: '1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  'button:hover': {
    backgroundColor: '#0056b3',
  }
};

export default Profile
