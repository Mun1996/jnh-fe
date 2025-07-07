import React, { useEffect } from 'react';
import { useRequest } from '../utils/request';
import styles from './Login.module.css';

function Login() {
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

  useEffect(() => {
    console.log(111)
    login();
  }, []);

  return (
    <div className={styles.testStyle}>
      <h2 className={styles.title}>登录</h2>
        <div className={styles.loginName}>
          <span className={styles.inputLabel}>用户</span>
          <input
            type="text"
            className={styles.username}
            placeholder="请输入用户名"  // 初始提示文字
          />
        </div>

        <div className={styles.loginPsw}>
          <span className={styles.inputLabel}>密码</span>
          <input
            type="text"
            className={styles.userpsw}
            placeholder="请输入用户密码"  // 初始提示文字
          />
        </div>
        <p className={styles.forgetpsw}>忘记密码?</p>
        <button className={styles.loginEnter}>登录</button>
    </div>
  );
}

export default Login; 