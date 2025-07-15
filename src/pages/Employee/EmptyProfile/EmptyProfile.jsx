import React,{ useState }from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../../../components/TabBar/TabBar';
import styles from './EmptyProfile.module.css';
import { AddressBookFill,ArrowDownCircleOutline,RightOutline,CameraOutline,CheckOutline } from 'antd-mobile-icons';
import { Rate } from 'antd-mobile';


const ProfileBar = () =>{
  const navigate = useNavigate();

  return (
    <div className={styles.profileBar}>
      <AddressBookFill className={styles.addressBtn} onClick={() => navigate('/addresslist')}/>
      <p className={styles.pageTitle}>Profile</p>
      <ArrowDownCircleOutline className={styles.exitBtn}/>
    </div>
  );
}

const PersonalInfo = () => {
  return (
    <div className={styles.personalInfo}>
      <div className={styles.PersonalPlate}>
        <div className={styles.personalImg}>
          <img
            className={styles.PersonalPic}
            src="src/assets/images/images/map.png"
            alt="job picture"
          />
          <div className={styles.changepic}>
            <CameraOutline style={{fontSize:'1.4rem',color:'#00C26F'}}/>
          </div>
        </div>
        <div className={styles.personalities}>
          <div className={styles.name}>Landon Anderson</div>
          <div className={styles.nricID}>
            NRIC:S3117370Y
          </div>
          <div className={styles.role}>
            Role:Employee
          </div>
          <div className={styles.reviewCount}>
            Review Count:0
          </div>   
        </div>
      </div>
      <div className={styles.emailAdress}>
        <div style={{ fontSize: '15px',fontWeight:'600',marginRight:'10px'}}>Email:</div>
        <div className={styles.personalEmail}>eddie.khor@gmail.com</div>
        <div className={styles.setEmailAddress}><RightOutline style={{color:'#00C26F'}}/>Bound</div>
      </div>
      <div className={styles.rating}>
        <div style={{ fontSize: '15px',fontWeight:'600',marginRight:'10px'}}>
          Rating:
        </div>
        <Rate readOnly value={4} style={{marginRight:'10px'}}/>
        <div style={{fontSize:'17px'}}>
          4.0
        </div>
        <div className={styles.setRate}>
          <RightOutline style={{color:'#00C26F'}}/>
          </div>
      </div>
    </div>
  );
}

function CheckBtn() {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(prev => !prev);
  };

  return (
    <div className={`${styles.customBox} ${checked ? styles.checked : ''}`} onClick={handleClick}>
      {checked && <span className={styles.checkmark}><CheckOutline /></span>}
    </div>

  );
}

function AcceptedJobs(){

  return (
    <>
    <div className={styles.jobItem} onClick={() => navigate('/jobdetail')}>
          <img
            className={styles.jobPic}
            src="src/assets/images/images/map.png"
            alt="job picture"
          />
          <div className={styles.jobContent}>
            <div className={styles.jobTitle}>Office Coffee Provider 70</div>
            <div className={styles.jobDescription}>
              Offer Coffee for others and make cookies and balabalabala
            </div>
            <div className={styles.jobSalary}>1600 $/Month</div>
          </div>
        </div>
    </>
  );
};

const EmptyProfile = () => {

  return (
   <div className={styles.container}>
    <ProfileBar />
    <div className={styles.content}>
      <PersonalInfo />
      <div className={styles.appliedJob}>
        <p style={{fontSize:'16px',fontWeight:'700',textAlign:'left',margin:'1rem 0 1rem 20px'}}>Applied Jobs</p>
        <div style={{display:'flex'}}>
          <div style={{margin:'0 0.7rem 0 0.7rem'}}><CheckBtn /></div>
          <p style={{margin:'0',fontSize:'16px',fontWeight:'700',textAlign:'left'}}>Accepted Application</p>
        </div>
        <AcceptedJobs />
      </div>
    </div>
    <TabBar />
   </div>
  );
}

export default EmptyProfile; 