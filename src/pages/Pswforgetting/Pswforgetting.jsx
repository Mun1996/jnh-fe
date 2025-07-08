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
    <div>
      <p style={{fontWeight:'700',fontSize:'16px',width:'80%'}}>Reset password</p>

      <div className={styles.codeSending}>
        <Input
          placeholder='Enter Email'
          value={value}
          onChange={val => {setValue(val)}}
          className={styles.enterEmail}
        />
        <div style={{ width: '10%' }}></div>
        <button className={styles.sendcode}>Send Code</button>
      </div>
        
      <Input
        placeholder='Enter veritification code'
        value={value}
        onChange={val => {setValue(val)}}
        className={styles.veritificationEmail}
      />
      
      <div style={{ position: 'relative'}}>
        <PswInput
          placeholder="Enter new password"
        />
        <PswInput
          placeholder="Confirm new password"
        />
      </div>
      

      <button className={styles.Resetpsw}>Reset password
      </button>
    </div>
  );
};

export default pswforgetting;