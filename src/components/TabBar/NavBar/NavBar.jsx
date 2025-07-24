import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import React, { useState,useEffect } from 'react';
import styles from './NavBar.module.css';
import { Dropdown } from 'antd-mobile';
import { EnvironmentOutline } from 'antd-mobile-icons';

function LocationDropdown() {
   /*保存所有状态信息*/
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  /*接入location数据库*/
  const { user } = useAuth();
  const request = useRequest();

  const getLocation = async () => {
    if (!user) return;

    try {
      console.log('请求员工位置信息');
      const res = await request.get(`/api/Employees/${user.empId}`);
      console.log('员工信息数据：', res);

      if (res) {
        setLocationList(res.addresses || []);
        setSelectedLocation(res.defaultAddress || null);
      }
    } catch (err) {
      console.error('获取员工位置失败：', err);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <Dropdown className={styles.locationSelector}>
     <Dropdown.Item
        key='location'
        title={
          <div className={styles.dropdownTitle}>
            <span>{selectedLocation?.fullAddress || 'Location'}</span>
          </div>
        }
      >
        <div className={styles.locationList}>
          {locationList.map((loc, index) => (
            <div
              key={loc.addressId || index}
              className={styles.locationOption}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc.fullAddress}
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