import React, { useState } from 'react';
import { SearchBar,Popup, Slider } from 'antd-mobile'
import { FilterOutline,LoopOutline } from 'antd-mobile-icons';
import TabBar from '../../../components/TabBar/TabBar';
import NavBar from '../../../components/TabBar/NavBar/NavBar';
import styles from './EmptyJobs.module.css';

function FilterPopup({ visible, onClose }) {
  const [activeButtons, setActiveButtons] = useState('');

  const pickButton = (key) => {
    setActiveButtons(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        minHeight: '50vh',
        overflow:'auto',
      }}
    >
    <div className={styles.filterContent}>
      <p className={styles.filterOptions}>Filter Options</p>
      <div className={styles.filterDistance}>
        <p style={{fontWeight:'500',fontSize:'15px',margin:'0'}}>Filter By Distance (KM)</p>
        <Slider
          style={{ '--fill-color': '#00C26F' }}
          defaultValue={40}
          className={styles.mySlider}
          popover
        />
      </div>
      <div className="Sort by">
        <p style={{fontWeight:'500',fontSize:'15px',margin:'0'}}>Sort by</p>
        <button className={`${styles.sortBtn} ${activeButtons.distance ? styles.active : ''}`} onClick={() => pickButton('distance')}>Shortest Distance</button>
        <button className={`${styles.sortBtn} ${activeButtons.value ? styles.active : ''}`} onClick={() => pickButton('value')}>Highest Value</button>
        <button className={`${styles.sortBtn} ${activeButtons.recent ? styles.active : ''}`} onClick={() => pickButton('recent')}>Most Recent</button>
      </div>
      <button className={styles.apply}>Apply</button>
    </div>
    </Popup>
  );
}



const EmptyJobs = () => {
  const [searchValue, setSearchValue] = useState('');
  const [visible5, setVisible5] = useState(false);

  return (
    <div className={styles.container}>
      <NavBar />
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <div className={styles.searchInput}>
              <SearchBar
                placeholder="Search for jobs"
                value={searchValue}
                onChange={val => setSearchValue(val)}
                onSearch={() => {}}
              />
            </div>
              <button onClick={() => {setVisible5(true)}} className={styles.filter}>
              <FilterOutline />
              </button>
              <FilterPopup visible={visible5} onClose={() => setVisible5(false)} />
          </div>
          <div className={styles.jobMsg}>
                <div className={styles.jobItem}>
                  <img
                    className={styles.jobPic}
                    src="src/assets/images/images/map.png"
                    alt="job picture"
                  />
                  <div className={styles.jobContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className={styles.jobTitle}>Remote Home Baker</div>
                      <div className={styles.jobDistance}>Open</div>
                    </div>
                    <div className={styles.jobDescription}>
                      Make bread and cakes for nearby cafes
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'5px' }}>
                      <div className={styles.jobSalary}>1200 $/Month</div>
                      <div className={styles.refreshTime}>2024-09-29 12:52:38</div>
                    </div>
                  </div>
                </div>
                
                {/* 当刷新不出新工作时
                <div className={styles.noJob}>
                    <img src="src\assets\images\images\no-data.png"></img>
                    <p style={{margin:'1rem 0 0.5rem 0'}}>Sorry,there's no job nearby</p>
                    <button className={styles.loopBtn}><LoopOutline /></button>
                </div>*/}
          </div>
          <TabBar />
        </div>
    </div>
  );
};

export default EmptyJobs; 