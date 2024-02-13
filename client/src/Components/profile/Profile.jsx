import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from "../header/Header";
import { useDispatch } from 'react-redux';
import "./profile.css";
import Footer from "../footer/Footer"
import { fetchData } from '../../store/slices/userLoginDataSlice';
import profileImg from "../../images/profileImg/profile-img.jpg"
const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(localStorage.getItem("authorization")))
  }, [])
  const userData = useSelector((state) => state.userLoginData.userData);
 
  return (
    <div className='profile-parent'>
      <Header />
      {userData ? <div className="container-profile">
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



          <div className='reset-btn-profile'><button className="reset-button-profile">Reset Password</button></div>
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
          <button style={styles.button}>Sign In</button>
          <button style={styles.button}>Sign Up</button>
        </div>
      </div>}
      <Footer />
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
  'button:hover':{
    backgroundColor: '#0056b3',
  }
};

export default Profile
