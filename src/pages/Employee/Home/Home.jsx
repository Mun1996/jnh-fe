import React ,{ useState }from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './Home.module.css';
import { EnvironmentOutline,DownOutline } from 'antd-mobile-icons';
import { Dropdown,FloatingPanel } from 'antd-mobile';

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


function LocationDropdown() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationOptions = ['Location 1', 'Location 2', 'Location 3'];

  return (
    <Dropdown className={styles.locationSelector}>
     <Dropdown.Item
        key='location'
        title={
          <div className={styles.dropdownTitle}>
            <span>{selectedLocation || 'LocationLocationLocationLocationLocationLocationLocationLocationLocationLocation'}</span>
          </div>
        }
      >
        <div className={styles.locationList}>
          {locationOptions.map((loc, index) => (
            <div
              key={index}
              className={styles.locationOption}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </div>
          ))}
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}

const Home = () => {

  /*const anchors = [100, window.innerHeight * 0.6, window.innerHeight * 0.6]*/

  return (

    <div className={styles.container}>
      <div className={styles.navBar}>
        <div style={{height:'1.2rem'}}></div>
        <p style={{margin:'0',color:'white'}}>Current Location</p>
        <div className={styles.locationBar}>
            <div className={styles.locationIcon}>
                <EnvironmentOutline color='white' fontSize={30} />
            </div>
            <div className={styles.locationDropdown}>
                <LocationDropdown />
            </div>
        </div>
      </div>
      <div >
        <img src="src/assets/images/images/map.png" className={styles.map}></img>
      </div>
      <JobPanel />  
      <TabBar />
    </div>
  );
};

export default Home; 