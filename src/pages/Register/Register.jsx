import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const navigate = useNavigate();

  return (
    <>
    <div className={styles.chooseIdentity}> 
      <h1 style={{fontFamily:'Aerial',fontWeight:'800'}}>I am a ...</h1>
      <button className={styles.Busniess}>
        <img src='src/assets/images/images/business.png' alt="busniss"></img>
        <p>Business</p>
      </button>
      <button className={styles.Jobseeker}>
        <img src='src/assets/images/images/jobseeker.png' alt="jobseeker"></img>
        <p>Jobseeker</p>
      </button>
    </div>

      <div className={styles.backtoLogin}>
        <p style={{color:'#00C26F',margin:'0'}}>Already registered</p>
        <button className={styles.rtlogin} onClick={() => navigate('/login')}>Return to login page</button>
      </div>

    </>
  );
}

export default Register; 