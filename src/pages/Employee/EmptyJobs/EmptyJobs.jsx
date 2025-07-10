import React, { useRef } from 'react';

import TabBar from '../../../components/TabBar/TabBar';
import NavBar from '../../../components/TabBar/NavBar/NavBar';
import styles from './EmptyJobs.module.css';

const EmptyJobs = () => {

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        EmptyJobs
      </div>
      <TabBar />
    </div>
  );
};

export default EmptyJobs; 