import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from "../header/Header";
import { useDispatch } from 'react-redux';
import "./profile.css";
import Footer from "../footer/Footer"
import { fetchData } from '../../store/slices/userLoginDataSlice';
import { showEmailSection } from '../../store/slices/showEmailUpdateProfileSlice';
import { setNameValue, setMobileValue } from '../../store/slices/profileUpdattionSlice';
import profileImg from "../../images/profileImg/profile-img.jpg";
import { object, string, ref } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNotLogin from '../useNotLogin/UserNotLogin';
import Loader from '../Loader';
import UpdateEmail from '../profileUpdateCom/emailUpdate/UpdateEmail';
import NameUpdate from '../profileUpdateCom/nameUpdate/NameUpdate';
import MobileUpdate from '../profileUpdateCom/mobileUpdate/MobileUpdate';
import { setAddressValue } from '../../store/slices/profileUpdattionSlice';
import AddressUpdate from '../profileUpdateCom/addressUpdate/AddressUpdate';
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
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("")


  useEffect(() => {
    dispatch(fetchData(localStorage.getItem("authorization")))

  }, [])
  const userData = useSelector((state) => state.userLoginData.userData);
  const showEmailUpdateProfileSlice = useSelector((state) => state.showEmailUpdateProfile.value)
  const profileUpdattion = useSelector((state) => state.profileUpdattion.name)
  const profileUpdattionMobile = useSelector((state) => state.profileUpdattion.mobile)
  const profileUpdattionAddress = useSelector((state) => state.profileUpdattion.address)
  useEffect(() => {
    if (userData) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [userData])


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
    <div>
      {loading ? <Loader></Loader> : <div className='profile-parent'>
        <Header />
        {showEmailUpdateProfileSlice ? <UpdateEmail /> : ""}
        {profileUpdattion ? <NameUpdate /> : ""}
        {profileUpdattionMobile ? <MobileUpdate /> : ""}
        {profileUpdattionAddress ? <AddressUpdate /> : ""}

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
        </div></div> :
          <div>{userData ? <div className="container-profile">
            <h1 className='h1-profile'>User Profile</h1>
            <div className="background-photo-profile"></div>
            <div className="profile-photo animated" style={{ backgroundImage: `url(${profileImg})`}}></div>
            {/* <div className="profile-photo animated" style={{ backgroundImage: `url(https:cdn1.bigassphotos.com/84/7/8471f17ab.jpg)` }}></div> */}
            <div className='upload-profile-img-profile'>
              {/* upload profile photo starts*/}
              <span><div class="file-input">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  className="file-input__input-profile"
                  accept='image/*'
                  onChange={(e) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0])
                    reader.onload = () => {
                      console.log(reader.result)
                      setImage(reader.result)
                      console.log("typeof",typeof(reader.result))
                      const auth = localStorage.getItem("authorization")
                      axios.post(`${BASE_URL}/user/updateUserImage`, { image: reader.result, role: "user" }, { headers: { authorization: auth } }).then((res) => {
                        if (res.data.status == "OK") {
                          notifysucess(res.data.msg)
                        }
                        else {
                          console.log("err at updating profile")
                          notify(res.data.msg)
                        }
                        // console.log("in axios")
                      }).catch((err) => {
                        console.log("err in profile at uploading image ", err)
                        notify(err.message)
                      })

                    }
                    reader.onerror = (err) => {
                      console.log("err in uploadiing file=>", err)
                    }


                  }}
                />
                <label className="file-input__label-profile" for="file-input">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    class="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>Update Image Photo</span></label>
              </div></span>
            </div>
            {/* upload profile photo ends*/}
            <div className="user-info-profile">

              <div className="profile-info-div">
                <div className='d-flexx'>
                  <div htmlFor="name" className="profile-fields"><i class="fas fa-user"></i><strong> Name:</strong></div>
                  <div id="name">{userData.userName}</div>
                </div>
                <div className='btn-update-profile-div'>
                  <button className='btn-update-profile' onClick={() => { dispatch(setNameValue(true)) }}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

                </div>

              </div>

              <div className="profile-info-div">
                <div className='d-flexx'>
                  <div htmlFor="email" className="profile-fields"><i class="fas fa-envelope"></i><strong> Email:</strong></div>
                  <div id="email">{userData.email}</div>
                </div>
                <div className='btn-update-profile-div'>
                  <button className='btn-update-profile' onClick={() => { dispatch(showEmailSection(true)) }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

                </div>

              </div>

              <div className="profile-info-div">
                <div className='d-flexx'>
                  <div htmlFor="mobile" className="profile-fields"><i class="fas fa-phone"></i><strong> Mobile:</strong></div>
                  <div id="mobile">{userData.mobileNumber}</div>
                </div>
                <div className='btn-update-profile-div'>
                  <button className='btn-update-profile' onClick={() => { dispatch(setMobileValue(true)) }}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

                </div>

              </div>
              <div className="profile-info-div">
                <div className='d-flexx'>
                  <div htmlFor="address" className="profile-fields"><i class="fas fa-map-marker-alt"></i><strong> Address:</strong></div>
                  <div id="address">{`${userData.address?.street || ""}  ${userData.address?.city || ""} ${userData.address?.state || ""} ${userData.address?.postalCode || ""}`}</div>
                </div>
                <div className='btn-update-profile-div'>
                  <button className='btn-update-profile' onClick={() => { dispatch(setAddressValue(true)) }}>  <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>

                </div>

              </div>



              <div className='reset-btn-profile'>
                <button className="reset-button-profile" onClick={resetPassword}>Reset Password</button>
                <button className="reset-button-profile" onClick={() => {
                  localStorage.removeItem("authorization")
                  navigate("/")
                }

                }>Log Out</button>

              </div>
            </div>
            <div className="order-history-profile">
              <h2>Order History</h2>
              <div className="order-item-profile">
                <span>TOTAL SPEND AMOUNT :</span>
                <span>4000</span>

              </div>
            </div>
          </div> : <UserNotLogin></UserNotLogin>}</div>}

        <Footer />
        <ToastContainer />
      </div>}
    </div>
  )
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
