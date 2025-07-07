import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <h1 className={styles.title}>JOB NEAR HOME</h1>
      <p className={styles.subtitle}>
        WELCOME!
      </p>
      <button className={styles.loginButton} onClick={handleLoginClick}>
        Login By Email
      </button>
    </>
  );
}

export default Home; 