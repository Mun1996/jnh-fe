import React , { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import TabBar from '../../../components/TabBar/TabBar';
import styles from './EmployerProfile.module.css';
import { FloatingBubble } from 'antd-mobile';
import { ArrowDownCircleOutline,RightOutline,AddOutline } from 'antd-mobile-icons';

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
    const navigate = useNavigate();
    
    const { user } = useAuth();
    const request = useRequest();
    const [employerList, setEmployerList] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState(null);

    const [offset, setOffset] = useState({ x: -24, y: -24 })

    useEffect(() => {
      const getEmployers = async () => {
        try {
          const res = await request.get(`/api/Employers?userId=${user.userId}`);
          if (res && res.length > 0) {
            setEmployerList(res);
            setSelectedEmployer(res[0]);
          }
        } catch (err) {
          console.error('error:', err);
        }
      };
  
      if (user?.userId) getEmployers();
    }, [user?.userId]);

  return (
    <div>
      <div className={styles.navbar}>
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
          <div className={styles.list1} onClick={() => navigate('/companydetail')}>
            <div className='img'>
              <img className={styles.companyImg} src="src/assets/images/images/map.png"/>
            </div>
            <div className={styles.text}>
              <div className={styles.companyName}>Super Consulting Pte Ltd</div>
              <div className={styles.companyUen}>UEN:2011411221E</div>
            </div>
          </div>
          <div className={styles.list1} onClick={() => navigate('/companydetail')}>
            <div className='img'>
              <img className={styles.companyImg} src="src/assets/images/images/map.png"/>
            </div>
            <div className={styles.text}>
              <div className={styles.companyName}>Super Consulting Pte Ltd</div>
              <div className={styles.companyUen}>UEN:2011411221E</div>
            </div>
          </div>
        </div>
        <FloatingBubble
          axis='x'
          magnetic='x'
          style={{
            '--initial-position-bottom': '70px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
            '--background':'black',
          }}
          onClick={() => navigate('/addcompany')}
        >
          <AddOutline fontSize={32} />
        </FloatingBubble>
      </div>
    <TabBar />
    </div>
  );
}

export default EmployerProfile;