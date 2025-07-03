import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>欢迎来到JNH!</h1>
      <p className={styles.subtitle}>
        这是一个专为移动端设计的H5应用，提供优质的用户体验和丰富的功能。
      </p>
      <button className={styles.loginButton} onClick={handleLoginClick}>
        立即登录
      </button>
    </div>
  );
}

export default Home; 