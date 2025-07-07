import React, { useEffect } from 'react';
import { useRequest } from '../../utils/request';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { Input } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';

const HeaderBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
   <div className={styles.navBar}>
      <div className={styles.returnBtn} onClick={handleClick}>
        <LeftOutline />
      </div>
      <p className={styles.navTitle}>Login by Email</p>
      <div style={{ width: '24px' }}></div>
    </div>
  )
}

const Login = () => {
  const request = useRequest();

  const login = async () => {
    const email = "562172940@qq.com";
    const password = "admin123";
    const response = await request.post("auth/loginEmail", {
      email,
      password,
    });
    console.log(response);
  }

  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)

  return (
    <>
    <div>
      <HeaderBar />
      <div className={styles.testStyle}>
        <h2 className={styles.title}>Login by Email</h2>
        <div className={styles.loginEmail}>
        <Input
          className={styles.useremail}
          placeholder='Email address'
          value={value}
          onChange={val => {
            setValue(val)
          }}
        />
        </div>

        <div className={styles.loginPsw}>
        <div className={styles.password}>
          <Input
            className={styles.usrpsw}
            placeholder='Password'
            type={visible ? 'text' : 'password'}
          />
          <div className={styles.eye}>
          </div>
        </div>
        </div>
        <button className={styles.loginEnter} onClick={login}>Login</button>
        <p className={styles.forgetpsw}>Forget passward?</p>
      </div>
    </div>
    </>
  );
}

export default Login; 