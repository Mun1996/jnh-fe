import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import React, { useEffect,useState }from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddressList.module.css';
import { LeftOutline,DeleteOutline } from 'antd-mobile-icons';
import { Button, Dialog, Space, Toast, Divider } from 'antd-mobile';

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
  const navigate = useNavigate();

  const { user } = useAuth(); 
  const request = useRequest(); 
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('user',user);

  let addressType = null;

  if (user) {
    if (user.roleName === "employee") {
        addressType = "EmployeeAddresses";
    } else if (user.roleName === "employer") {
        addressType = "EmployerAddresses";
    }
  }  

  const getAddresses = async () => {
    try {
      console.log('请求地址数据');
      const res = await request.get(`/api/${addressType}?${user.role}Id=${user.empId}&pagesize=10&pagenumber=1&sortField=createdat&asc=false`);
      console.log('地址数据：', res);
      if (res) {   
        setAddressData(res);
      }
      } catch (err) {
      console.error('获取地址失败：', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getAddresses();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error: No user</div>;

  return (
    <>
      {addressData.map((address) => (
        <div className={styles.addressDetails} key={address.id} onClick={() => navigate('/editaddress')}>
          <div className={styles.addressContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '17rem',marginBottom:'1rem'}}>
                <div className={styles.addressName}>{address.addressDesc}</div>
                <div className={styles.addressDetail}>{address.blk},{address.road}</div>
                <div className={styles.addressDetail}>{address.building}</div>
                <div className={styles.addressDetail}>SINGAPORE {address.postal}</div>
                <div className={styles.addressDefault}>{address.isDefault && 'Default'}</div>
              </div>
              <div className={styles.deleteBtn}>
                <Button
                  className={styles.antdDeleteBtn}
                  block
                  onClick={(e) => {
                    e.stopPropagation();

                    Dialog.confirm({
                      content: 'Are you sure you want to delete this address?',
                      cancelText: 'Cancel',
                      confirmText: 'confirm',
                      onConfirm: async () => {
                        try {
                          await request.delete(`/api/${addressType}/${address.addressId}`);
                          setAddressData(prev => prev.filter(item => item.addressId !== address.addressId));

                          Toast.show({
                            icon: 'success',
                            content: 'Deletion successful',
                            position: 'bottom',
                          });
                        } catch (err) {
                          console.error('删除失败：', err);
                          Toast.show({
                            icon: 'fail',
                            content: 'Deletion failed',
                            position: 'bottom',
                          });
                        }
                      },
                    });
                  }}
                ><DeleteOutline style={{ color: 'red', fontSize: '1.4rem' }} /></Button>
              </div>
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
      <button className={styles.newAddressBtn} onClick={() => navigate('/newaddress')}>Add Address</button>
    </div>
   </div>
  );
}

export default AddressList; 