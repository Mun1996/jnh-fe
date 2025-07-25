import React , { useState,useEffect } from 'react';
import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import TabBar from '../../../components/TabBar/TabBar';
import styles from './JobPositions.module.css';
import { Button, Modal,Toast } from 'antd-mobile';
import { DownOutline,LoopOutline } from 'antd-mobile-icons'

//    "employerName": "Fast Connect Network Solution Pte Ltd",
//    "employerUen": "2017357337G",

function InfoSelection() {
   /*保存所有状态信息*/
  const { user } = useAuth();
  const request = useRequest();
  const [employerInfo,setemployerInfo] = useState(null);
  const [loading,setLoading] = useState(true);
  console.log('user',user);
  
{/*button接口*/}
  const getUser = async () => {
    try {
      const res = await request.get(`/api/Employers/${user.empId}`);
      if(res) {
        setemployerInfo(res);
      }
    } catch (err) {
      console.error('获取用户资料失败：',err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser()
  },[]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>error</div>;

  return (
    <Button
      className={styles.bubbleToast}
      block
      onClick={() => {
      Modal.show({
      content:  (
        <div>
        <div className={styles.infoItem}>
          <div className={styles.infoImgs}>
            <img src="src/assets/images/images/map.png"></img>
          </div>
          <div>
            <div className={styles.name}>Super Consulting Pte Ltd</div>
            <div className={styles.uen}>UEN:2011411221E</div>
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoImgs}>
            <img src="src/assets/images/images/map.png"></img>
          </div>
          <div>
            <div className={styles.name}>Super Consulting Pte Ltd</div>
            <div className={styles.uen}>UEN:2011411221E</div>
          </div>
        </div>
        </div>
      ),
      closeOnMaskClick: true,})
      }}>
      <div className={styles.buttonContent}>
        <span className={styles.buttonText}>Information 11111111111111111111111111111111111111111111111111111111111111111111</span>
        <DownOutline className={styles.iconRight} />
      </div>
    </Button>
  );
}


const NavBar = () => {

  return (
    <div className={styles.navBar}>
    <div style={{height:'1.2rem'}}></div>
    <p style={{margin:'0',color:'white'}}>Current Company</p>
    <div className={styles.locationBar}>
        <div className={styles.infoImg}>
          <img src="src/assets/images/images/map.png"></img>
        </div>
        <div className={styles.InfoSelection}>
            <InfoSelection />
        </div>
        <div style={{width:'10px'}}></div>
    </div>
  </div>
  );
}

const JobPositions = () => {

  return (
    <div>
    <NavBar />
    <div className={styles.pageContainer}>
      <div className={styles.noDataDisplay}>
        <div className={styles.noDataPic}>
          <img src="src\assets\images\images\no-data.png"></img>
          <p style={{margin:'1rem 0 0 0'}}>No data is available.Please add a job</p>
          <button className={styles.loopBtn}><LoopOutline /></button>
        </div>
      </div>
    </div>
    <TabBar />
    </div>
  );
}

export default JobPositions;