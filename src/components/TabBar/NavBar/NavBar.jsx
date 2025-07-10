import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Dropdown } from 'antd-mobile';
import { EnvironmentOutline } from 'antd-mobile-icons';

function LocationDropdown() {
  const [selectedLocation, setSelectedLocation] = useState('');

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


const NavBar = () =>{

  return (
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
  );
};

export default NavBar;