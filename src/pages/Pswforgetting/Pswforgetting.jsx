import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LeftOutline,EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { Input } from 'antd-mobile';
import styles from './pswforgetting.module.css';

const PswInput = ({ value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.pswinput}>
      <Input
        placeholder={placeholder}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        clearable
      />
      <div onClick={() => setVisible(!visible)}>
        {visible ? <EyeOutline /> : <EyeInvisibleOutline />}
      </div>
    </div>
  );
};

const pswforgetting = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  return (
    <>
    <div className={styles.navBar}>
      <div className={styles.returnBtn} onClick={() => navigate('/Login')}>
        <LeftOutline />Login by Email
      </div>
      <p className={styles.navTitle}>Reset Password</p>
      <div style={{width:'90px'}}> </div>
    </div>

    <div className={styles.container}>
      <p style={{fontWeight:'500',fontSize:'17px',width:'127px'}}>Reset password</p>

      <div className={styles.codeSending}>
        <Input
          placeholder='Enter Email'
          value={value}
          onChange={val => {setValue(val)}}
          className={styles.enterEmail}
        />
        <button className={styles.sendcode}>Send Code</button>
      </div>

      <div className={styles.veritification}>
        <Input
          placeholder='Enter veritification code'
          value={value}
          onChange={val => {setValue(val)}}
        />
      </div>
      
        <PswInput
          placeholder="Enter new password"
        />
        <PswInput
          placeholder="Confirm new password"
        />
            

      <button className={styles.Resetpsw}>Reset password
      </button>

    </div>
    </>
  );
};

export default pswforgetting;