import { useNavigate } from 'react-router-dom';
import { useState,useEffect,useRef } from 'react';
import { LeftOutline,EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { Input } from 'antd-mobile';
import styles from './pswforgetting.module.css';

const CountTimeBtn = () => {
  const [btnText, setBtnText] = useState('send code');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [time, setTime] = useState(60); 
  const timerRef = useRef(null); 

  useEffect(() => {
    if (btnDisabled && time > 0) {
      timerRef.current = setTimeout(() => {
        setTime( t => t - 1);
      }, 1000);
      setBtnText(`${time}s`);
    }

    if (btnDisabled && time === 0) {
      setBtnDisabled(false);
      setBtnText('send code');
      setTime(60); 
    }

    return () => clearTimeout(timerRef.current); 
  }, [time, btnDisabled]);

  const handleClick = () => {
    if (btnDisabled) return;
    setBtnDisabled(true);
    setTime(59); 
  };

  return (
    <button onClick={handleClick} disabled={btnDisabled} className={styles.sendcode}>
      {btnText}
    </button>
  );
};


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

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newpsw, setNewpsw] = useState('');
  const [rewritepsw, setRewritepsw] = useState('');

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
          value={email}
          onChange={val => {setEmail(val)}}
          className={styles.enterEmail}
        />
        <CountTimeBtn />
      </div>

      <div className={styles.veritification}>
        <Input
          placeholder='Enter veritification code'
          value={code}
          onChange={val => {setCode(val)}}
        />
      </div>
      
        <PswInput
          placeholder="Enter new password"
          value={newpsw}
          onChange={val => setNewpsw(val)}
        />
        <PswInput
          placeholder="Confirm new password"
          value={rewritepsw}
          onChange={val => setRewritepsw(val)}
        />
            

      <button className={styles.Resetpsw}>Reset password
      </button>

    </div>
    </>
  );
};

export default pswforgetting;