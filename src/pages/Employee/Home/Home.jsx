import React from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        Home
      </div>
      <TabBar />
    </div>
  );
};

export default Home; 