import { useRequest } from '../../utils/request';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { Input, Toast } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';

const HeaderBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
   <div className={styles.navBar}>
      <div className={styles.returnBtn} onClick={handleClick}>
        <LeftOutline />Welcome
      </div>
      <p className={styles.navTitle}>Login by Email</p>
      <div style={{ width: '60px' }}></div>
    </div>
  )
}

const Login = () => {
  const [email, setEmail] = useState('562172940@qq.com');
  const [password, setPassword] = useState('admin123');
  const [visible, setVisible] = useState(false);
   const request = useRequest();

  const navigate = useNavigate();

  const testEmail = '562172940@qq.com';
  const testPassword = 'admin123';

  const login = async () => {
    if (email === testEmail && password === testPassword) {
      const email = "562172940@qq.com";
      const password = "admin123";
      const response = await request.post("auth/loginEmail", {
        email,
        password,
      });
      if(response) {
        Toast.show({
          content: 'Login successfully!',
        })
      }
    } else {
      Toast.show({
        content: 'Login failed. Please check your credentials.',
      })
    }
  };

  return (
    <div>
      <HeaderBar />
      <div className={styles.testStyle}>
        <h2 className={styles.title}>Login by Email</h2>

        <div className={styles.loginEmail}>
          <Input
            className={styles.useremail}
            placeholder="Email address"
            value={email}
            onChange={val => setEmail(val)}
            clearable
          />
        </div>

        <div className={styles.loginPsw}>
          <div className={styles.password}>
            <Input
              className={styles.usrpsw}
              placeholder="Password"
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={val => setPassword(val)}
              clearable
            />
            <div className={styles.eye} onClick={() => setVisible(!visible)}>
              {visible ? <EyeOutline /> : <EyeInvisibleOutline />}
            </div>
          </div>
        </div>

        <button className={styles.loginEnter} onClick={login}>Login</button>
        <p className={styles.forgetpsw}>Forget password?</p>
      </div>
    </div>
  );
};

export default Login;