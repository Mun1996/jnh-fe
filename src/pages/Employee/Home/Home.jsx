import React ,{ useState }from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './Home.module.css';
import { EnvironmentOutline } from 'antd-mobile-icons';
import { Dropdown,FloatingPanel } from 'antd-mobile';

function JobPanel() {
  const anchors = [100, window.innerHeight * 0.6, window.innerHeight * 0.9];
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingJob = (
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
  );

  const recentJob = (
    <div className={styles.jobItem}>
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
    </div>
  );

  return (
    <FloatingPanel anchors={anchors}>
      <div className={styles.jobType}>
        <div
          className={styles.upcomingType}
          onClick={() => setActiveTab('upcoming')}
        >
          UPCOMING JOBS
        </div>
        <div
          className={styles.recentType}
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
}




const Home = () => {

  const anchors = [100, window.innerHeight * 0.6, window.innerHeight * 0.6]

  return (

    <div className={styles.container}>
      <div className={styles.navBar}>
        <div style={{height:'1.2rem'}}></div>
        <p style={{margin:'0',color:'white'}}>Current Location</p>
        <div className={styles.locationBar}>
          <EnvironmentOutline color='white' fontSize={40} width={50} />
          
          <Dropdown closeOnMaskClick={false} closeOnClickAway={false} className={styles.locationSelector}>
            <Dropdown.Item key='sorter' title='Location'>
              <div style={{ padding: 7 }}>
              Location 1
              <br />
              Location 2
              <br />
              Location 3
              <br />
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <JobPanel />
 {/*      <FloatingPanel anchors={anchors}>
        <dev className={styles.jobType}>
          <div className={styles.upcomingType}>UPCOMING JOBS</div>
          <div className={styles.recentType}>RECENT JOBS</div>
        </dev>

        <dev className={styles.jobMsg}>
          


          <div className={styles.jobItem}>
            <img
              className={styles.jobPic}
              src="src/assets/images/images/map.png"
              alt="job picture"
            />
            <div className={styles.jobContent}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div className={styles.jobTitle}>Office Coffee Provider 70</div>
                <div className={styles.jobDistance}>30km</div>
              </div>
              <div className={styles.jobDescription}>Offer Coffee for others and make cookies and balabalabala</div>
              <div className={styles.jobSalary}>1600 $/Month</div>
            </div>
          </div>
            


        </dev>
      </FloatingPanel>
 */}
      <TabBar />
    </div>
  );
};

export default Home; 