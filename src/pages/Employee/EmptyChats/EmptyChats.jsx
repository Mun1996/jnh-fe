import React, { useState } from 'react';
import { PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './EmptyChats.module.css';

const EmptyChats = () => {
  const [chatData] = useState([
    {
      id: 1,
      company: 'Time Traveller Ptd Ltd',
      job: 'test11',
      dialog: '333',
      time: '15:44',
      image: 'src/assets/images/images/map.png',
    },
    {
      id: 2,
      company: 'Super Consulting Pte Ltd',
      job: 'Office Coffee Brewer',
      dialog: 'Hi',
      time: 'Nov 6',
      image: 'src/assets/images/images/map.png',
    },
  ]);

  const onRefresh = async () => {
    await sleep(1000); 
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.PageName}>
          <p className={styles.title}>Chats</p>
        </div>

        <PullToRefresh 
          onRefresh={onRefresh}
          renderText={(status) => {
            switch (status) {
              case 'pulling':
                return <div>Pull down to refresh</div>;
              case 'canRelease':
                return <div>Release to refresh</div>;
              case 'refreshing':
                return <div>Loading...</div>;
              case 'complete':
                return <div>Refresh successful</div>;
              default:
                return null;
          }
        }}>
          <div className={styles.content}>
            {chatData.map((chat) => (
              <div className={styles.chatDetails} key={chat.id}>
                <div className={styles.chatItem}>
                  <img
                    className={styles.chatPic}
                    src={chat.image}
                    alt="job picture"
                  />
                </div>
                <div className={styles.chatContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '13rem' }}>
                      <div className={styles.companyName}>{chat.company}</div>
                      <div className={styles.position}>(Job:{chat.job})</div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '5px',
                        }}
                      >
                        <div className={styles.lstDialog}>{chat.dialog}</div>
                      </div>
                    </div>
                    <div className={styles.lstchatTime}>{chat.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PullToRefresh>

        <TabBar />
      </div>
    </>
  );
};

export default EmptyChats;
