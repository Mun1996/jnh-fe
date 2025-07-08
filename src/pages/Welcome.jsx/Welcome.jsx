import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.css';

function Welcome() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div> 
      <img className={styles.logo}src="src\assets\images\images\jnh-logo.png" alt="jnh-logo"></img>

      <h1 className={styles.title}>JOB NEAR HOME</h1>
        <p className={styles.subtitle}>
          WELCOME!
        </p>
      
      <div className={styles.footerlogin}>
        <button className={styles.loginButton} onClick={handleLoginClick}>Login By Email
        </button>
        <div className={styles.registerSign}>
          <p>Not yet registered?</p>
          <p className={styles.clickRegister}  onClick={() => navigate('/register')}>Please register here</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome; 