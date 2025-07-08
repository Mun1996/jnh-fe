import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './TabBar.module.css';
import { HomeOutlined, CompassOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <HomeOutlined />,
      path: '/employee'
    },
    {
      key: 'jobs',
      title: '职位',
      icon: <CompassOutlined />,
      path: '/emptyJobs'
    },
    {
      key: 'chats',
      title: '消息',
      icon: <MessageOutlined />,
      path: '/emptyChats'
    },
    {
      key: 'profile',
      title: '我的',
      icon: <UserOutlined />,
      path: '/emptyProfile'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.tabBar}>
      {tabs.map(tab => (
        <div
          key={tab.key}
          className={`${styles.tabItem} ${pathname === tab.path ? styles.active : ''}`}
          onClick={() => handleTabClick(tab.path)}
        >
          <div className={styles.tabIcon}>{tab.icon}</div>
          <div className={styles.tabTitle}>{tab.title}</div>
        </div>
      ))}
    </div>
  );
};

export default TabBar; 