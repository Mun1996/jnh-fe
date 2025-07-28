import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateNewJob.module.css';
import { LeftOutline } from 'antd-mobile-icons';

const CreateNewJob = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.profileBar}>
          <LeftOutline onClick={() => navigate('/companydetail')}/>
          <p className={styles.pageTitle}>Create New Job</p>
          <div style={{width:'20px'}}></div>
        </div>
      </div>
      <div className={styles.pagecontainer}>

      </div>
    </>
  )
}
export default CreateNewJob;