import React,{ useState }from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddressList.module.css';
import { LeftOutline,DeleteOutline } from 'antd-mobile-icons';

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
    const [addressData] = useState([
      {
        id: 1,
        name: 'Testing',
        block: '1',
        road: 'JALAN TEKAD',
        building: 'FUYONG ESTATE',
        postalcode:'010527',
      },
      {
        id: 2,
        name: 'Third Road',
        block: '4',
        road:'UPPER SERANGOON VIEW',
        building: 'HERON BAY',
        postalcode:'684320',
      },
    ]);

    const onRefresh = async () => {
      await sleep(1000); 
    };

  return (
    <>
      {addressData.map((address) => (
        <div className={styles.addressDetails} key={address.id}>
          <div className={styles.addressContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '17rem',marginBottom:'1rem'}}>
                <div className={styles.addressName}>{address.name}</div>
                <div className={styles.addressDetail}>{address.block},{address.road}</div>
                <div className={styles.addressDetail}>{address.building}</div>
                <div className={styles.addressDetail}>SINGAPORE {address.postalcode}</div>
              </div>
              <div className={styles.deleteBtn}><DeleteOutline style={{color:'red',fontSize:'1.4rem'}}/></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const AddressList = () => {
  const navigate = useNavigate();
  return (
   <div className={styles.container}>
    <AddressListBar />
    <div className={styles.content}>
      <AddressListItems />
      <AddressListItems />
      <AddressListItems />
      <button className={styles.newAddressBtn} onClick={() => navigate('/newaddress')}>Add Address</button>
    </div>
   </div>
  );
}

export default AddressList; 