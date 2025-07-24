import { useRequest } from '../../utils/request';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { Input, Toast } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { useAuth } from "../../contexts/AuthContext";

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
  const { setAuth } = useAuth();
  // employee testEmail:songzewen1996@gmail.com
  //          testPsw:admin123       
  // employer testEmail:562172940@qq.com
  //          testPsw：admin123
  const [email, setEmail] = useState('562172940@qq.com');
  const [password, setPassword] = useState('admin123');
  const [visible, setVisible] = useState(false);
  const request = useRequest();

  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      Toast.show({
        content: 'Please enter both email and password.',
      });
      return;
    }

    // navigate('/employee')

    const response = await request.post("auth/loginEmail", {
      email,
      password,
    });
    if(response) {
      const user = {
        token: response.token,
        openId: response.openId,
        userId: response.userId,
        roleName: response.roleName,
        sessionId: response.sessionId,
        empId: response.empId,
      };
      setAuth(user);
      // console.log(user)
      const { roleName } = user;
      console.log('roleName',roleName)
      const route = roleName === "employer" ? "/employer" : "/employee";
      navigate(route, { replace: true });

      // router.replace(route);
      // Toast.show({
      //   content: 'Login successfully!',
      // });
    } else {
      Toast.show({
        content: 'Login failed. Please check your credentials.',
      });
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
        <p className={styles.forgetpsw} onClick={() => navigate('/pswforgetting')}>Forget password?</p>
      </div>
    </div>
  );
};

export default Login;