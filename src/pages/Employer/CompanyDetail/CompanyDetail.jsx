import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CompanyDetail.module.css';
import { FloatingBubble } from 'antd-mobile'
import { LeftOutline,AddressBookFill,AddOutline  } from 'antd-mobile-icons';

const CompanyDetail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.profileBar}>
          <LeftOutline onClick={() => navigate('/employerProfile')}/>
          <p className={styles.pageTitle}>Company Detail</p>
          <AddressBookFill className={styles.addressBtn} />
        </div>
      </div>
      <FloatingBubble
        axis='x'
        magnetic='x'
        style={{
          '--initial-position-bottom': '60px',
          '--initial-position-right': '30px',
          '--edge-distance': '24px',
          '--background':'black',
        }}
        onClick={() => navigate('/createnewjob')}
      >
        <AddOutline fontSize={32} />
      </FloatingBubble>
      <div className={styles.pagecontainer}>

      </div>
    </div>
  );
}

export default CompanyDetail;