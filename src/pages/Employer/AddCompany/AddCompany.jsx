import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddCompany.module.css';
import { LeftOutline } from 'antd-mobile-icons';

const AddCompany = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.profileBar}>
          <LeftOutline onClick={() => navigate('/employerProfile')}/>
          <p className={styles.pageTitle}>Add Company</p>
          <div style={{width:'20px'}}></div>
        </div>
      </div>
      <div className={styles.pagecontainer}>

      </div>
    </>
  )
}
export default AddCompany;