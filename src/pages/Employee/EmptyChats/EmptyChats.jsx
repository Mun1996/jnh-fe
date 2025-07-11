import React from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './EmptyChats.module.css';


const EmptyChats = () => {

  return (

    //需要实现下拉刷新
    <div className={styles.container}>
      <div className={styles.PageName}>
        <p className={styles.title}>Chats</p>
      </div>
      <div className={styles.content}>

        <div className={styles.chatDetails}>
          <div className={styles.chatItem}>
            <img
              className={styles.chatPic}
              src="src/assets/images/images/map.png"
              alt="job picture"
            />
          </div>
          <div className={styles.chatContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.companyName}>Time Traveller Ptd Ltd</div>
              <div className={styles.lstchatTime}>15:44</div>
            </div>
            <div className={styles.position}>(Job:test11)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'5px' }}>
              <div className={styles.lstDialog}>333</div>{/*需要处理内容溢出，定长，多的部分用...显示，这几个都要*/ }
            </div>
          </div>
        </div>
        <div className={styles.chatDetails}>
          <div className={styles.chatItem}>
            <img
              className={styles.chatPic}
              src="src/assets/images/images/map.png"
              alt="job picture"
            />
          </div>
          <div className={styles.chatContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.companyName}>Super Consulting Pte Ltd</div>
              <div className={styles.lstchatTime}>Nov 6</div>
            </div>
            <div className={styles.position}>(Job:Office Coffee Brewer)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'5px' }}>
              <div className={styles.lstDialog}>,,</div>
            </div>
          </div>
        </div>

      </div>
        <TabBar />
      </div>
      
  );
}

export default EmptyChats; 