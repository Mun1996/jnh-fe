import React ,{ useState }from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import NavBar from '../../../components/TabBar/NavBar/NavBar';
import styles from './Home.module.css';
import { LoopOutline } from 'antd-mobile-icons';
import { FloatingPanel } from 'antd-mobile';

function JobPanel() {
  const anchors = [window.innerHeight * 0.3, window.innerHeight * 0.6, window.innerHeight * 0.85];

  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const upcomingJob = (
    <>
    <div className={styles.jobItem}>
      <img
        className={styles.jobPic}
        src="src/assets/images/images/map.png"
        alt="job picture"
      />
      <div className={styles.jobContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles.jobTitle}>Office Coffee Provider 70</div>
          <div className={styles.jobDistance}>30km</div>
        </div>
        <div className={styles.jobDescription}>
          Offer Coffee for others and make cookies and balabalabala
        </div>
        <div className={styles.jobSalary}>1600 $/Month</div>
      </div>
    </div>

    <div className={styles.jobItem}>
      <img
        className={styles.jobPic}
        src="src/assets/images/images/map.png"
        alt="job picture"
      />
      <div className={styles.jobContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles.jobTitle}>Ticket Seller</div>
          <div className={styles.jobDistance}>12.7km</div>
        </div>
        <div className={styles.jobDescription}>
          Selling movies' tickets
        </div>
        <div className={styles.jobSalary}>1300 $/Month</div>
      </div>
    </div>
    </>
  );

  const recentJob = (
    <>
    {/*<div className={styles.jobItem}>
      <img
        className={styles.jobPic}
        src="src/assets/images/images/map.png"
        alt="job picture"
      />
      <div className={styles.jobContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles.jobTitle}>Remote Home Baker</div>
          <div className={styles.jobDistance}>12km</div>
        </div>
        <div className={styles.jobDescription}>
          Make bread and cakes for nearby cafes
        </div>
        <div className={styles.jobSalary}>1200 $/Month</div>
      </div>
    </div>*/}
    
    <div className={styles.noJob}>
        <img src="src\assets\images\images\no-data.png"></img>
        <p style={{margin:'1rem 0 0.5rem 0'}}>Sorry,there's no job nearby</p>
        <button className={styles.loopBtn}><LoopOutline /></button>
    </div>

    </>
  );

  return (
    <FloatingPanel anchors={anchors}>
      <div className={styles.jobType}>
        <div
          className={`${styles.upcomingType} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          UPCOMING JOBS
        </div>
        <div
          className={`${styles.recentType} ${activeTab === 'recent' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          RECENT JOBS
        </div>
      </div>

      <div className={styles.jobMsg}>
        {activeTab === 'upcoming' ? upcomingJob : recentJob}

      </div>
    </FloatingPanel>
  );
};

const Home = () => {

  return (
    <div className={styles.container}>
      <NavBar />
      <div >
        <img src="src/assets/images/images/map.png" className={styles.map}></img>
      </div>
      <JobPanel />  
      <TabBar />
    </div>
  );
};

export default Home; 