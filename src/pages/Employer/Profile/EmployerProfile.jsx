import React from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './EmployerProfile.module.css';
import { ArrowDownCircleOutline,RightOutline } from 'antd-mobile-icons';

const PersonalInfo = () => {

  return (
    <div className={styles.personalInfo}>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Name:</div>
        <div className={styles.infoValue}>James Bond</div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Role:</div>
        <div className={styles.infoValue}>Employer</div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Email:</div>
        <div style={{ color: '#00C26F'}}>
          562172940@qq.com
          <RightOutline style={{ color: '#00C26F', marginLeft: 4 }} />
        </div>
      </div>
    </div>
  );
};


const EmployerProfile = () => {

  return (
    <div>
      <div className={StyleSheet.navbar}>
        <div className={styles.profileBar}>
          <div style={{width:'30px'}}></div>
          <p className={styles.pageTitle}>Profile</p>
          <ArrowDownCircleOutline className={styles.exitBtn} />
        </div>
      </div>
        <div className={styles.pageContainer}>
        <PersonalInfo />
        <div>
          <p style={{fontSize:'16px',fontWeight:'700',textAlign:'left',margin:'1rem 0 1rem 20px'}}>Company List</p>
        </div>
      </div>
    <TabBar />
    </div>
  );
}

export default EmployerProfile;