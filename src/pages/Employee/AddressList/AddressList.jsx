import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddressList.module.css';
import { LeftOutline } from 'antd-mobile-icons';

const AddressListBar = () =>{
  const navigate = useNavigate();

  return (
    <div className={styles.addressListBar}>
      <LeftOutline className={styles.returnBtn} onClick={() => navigate('/emptyprofile')}/>
      <p className={styles.pageTitle}>Address List</p>
      <div style={{width:'27px'}}></div>
    </div>
  );
}

const AddressListItems = () => {

  return (
    <>
      
    </>
  );
}

const AddressList = () => {

  return (
   <div className={styles.container}>
    <AddressListBar />
    <div className={styles.content}>


      <button className={styles.newAddressBtn}>Add Address</button>
    </div>
   </div>
  );
}

export default AddressList; 