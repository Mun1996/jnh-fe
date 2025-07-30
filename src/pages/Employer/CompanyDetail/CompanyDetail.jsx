import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CompanyDetail.module.css';
import { FloatingBubble,Rate } from 'antd-mobile'
import { LeftOutline,AddressBookFill,AddOutline,CameraOutline,RightOutline,LoopOutline } from 'antd-mobile-icons';

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
      <div className={styles.pagecontainer}>
        <div className={styles.companyInfo}>
      {/*用户图片*/}    
          <div className={styles.personalImg}>
            <img
              className={styles.PersonalPic}
              src="src/assets/images/images/map.png"
              alt="job picture"
            />
            <div className={styles.changepic}>
              <CameraOutline style={{ fontSize: '1.4rem', color: '#00C26F' }} />
            </div>
          </div>
      {/*用户信息*/}
          <div className={styles.companyName}>Super Consulting Pte Ltd</div>
          <div className={styles.employerUen}>UEN:2011411221E</div>
          <div className={styles.reviewCount}>Review Count:0</div>
          <div className={styles.rating}>
            <div style={{ fontSize: '15px', fontWeight: '600', marginRight: '10px' }}>Rating:</div>
            <Rate readOnly value='4' style={{ marginRight: '10px' }} />
            <div style={{ fontSize: '17px' }}>4.0</div>
            <div className={styles.setRate}>
              <RightOutline style={{ color: '#00C26F' }} />
            </div>
          </div> 
        </div>

        <div className={styles.jobInfo}>
          <div className={styles.noDataDisplay}>
            <div className={styles.noDataPic}>
              <img src="src/assets/images/images/no-data.png" style={{fontSize:'20px'}}/>
              <p style={{ margin: '1rem 0 0 0' }}>
                No data is available. Please add a job
              </p>
              <button className={styles.loopBtn}>
                <LoopOutline />
              </button>
            </div>
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
      </div>
    </div>
  );
}

export default CompanyDetail;