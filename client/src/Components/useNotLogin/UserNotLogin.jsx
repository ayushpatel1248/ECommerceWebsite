import React from 'react'
import { Link } from 'react-router-dom';
const UserNotLogin = () => {
  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome!</h1>
        <p style={styles.text}>You are not logged in. Please sign in or sign up to continue.</p>
        <div style={styles.buttonContainer}>
          <button style={styles.button}  ><Link to={'/login'} className='sign-in-profile'>User Sign In</Link></button>
          <button style={styles.button}><Link to={'/register'} className='sign-in-profile'>User Sign Up</Link></button>
          <button style={styles.button}  ><Link to={'/loginAdmin'} className='sign-in-profile'>Admin Sign In</Link></button>
          <button style={styles.button}><Link to={'/registerAdmin'} className='sign-in-profile'>Admin Sign Up</Link></button>
        </div>
      </div>
    </div>
  )
}
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
export default UserNotLogin
