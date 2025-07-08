import React from 'react';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './EmptyJobs.module.css';

const EmptyJobs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        EmptyJobs
      </div>
      <TabBar />
    </div>
  );
};

export default EmptyJobs; 