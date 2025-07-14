import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobDetail.module.css';
import { LeftOutline } from 'antd-mobile-icons';

const HeaderBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.returnBtn} onClick={handleClick}>
        <LeftOutline />
      </div>
      <p className={styles.navTitle}>Job Detail</p>
    </div>
  );
};

const JobDetailList = () => {

  const JobInfoItem = ({ title, content }) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
    );
  };

  const jobData = {
    description: 'Make Coffee for staffs using companys\'s coffee machine,only on Monday and Wdenesday every week ',
    requirements: '1.Know latte art and roast coffee',
    location: '30 TAI SENG STREET,05-01 BREADTALK IHQ,Singapore 534013',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    minAge: '18',
    ratePerHour: '51 $/h',
    daysPerWeek: '2 days',
    moreImage: 'src/assets/images/images/map.png',
  };

  return (
    <div>
      <JobInfoItem title="Job Description" content={jobData.description} />
      <JobInfoItem title="Job Requirements" content={jobData.requirements} />
      <JobInfoItem title="Job Location" content={jobData.location} />
      <JobInfoItem title="Start Date" content={jobData.startDate} />
      <JobInfoItem title="End Date" content={jobData.endDate} />
      <JobInfoItem title="Minimum Age" content={jobData.minAge} />
      <JobInfoItem title="Rate per Hour" content={jobData.ratePerHour} />
      <JobInfoItem title="Days per Week" content={jobData.daysPerWeek} />
      <JobInfoItem title="More Image" content={<img src={jobData.moreImage} alt="job" style={{ width: '100%' }} />} />
    </div>
  );
};

const ApplyBar = () => {

  return (
    <>
    <div className={styles.applyBar}>
      <button className={styles.ChatBtn}>Chat</button>
      <button className={styles.ApplyBtn}>Apply</button>
    </div>
    </>
  );
};

const JobDetail = () => {

  return(
    <div className={styles.jobDetailPage}>
    <HeaderBar />
    <div className={styles.detailContainer}>
      <div style={{marginTop:'0.5rem'}}>
        <img src="src/assets/images/images/map.png" alt="job picture" className={styles.jobImg}></img>
      </div>
      <div className={styles.jobName}>Office Coffee Brewer</div>
      <JobDetailList />
    </div>
    <ApplyBar />
    </div>
  );
};
export default JobDetail;