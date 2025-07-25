import React , { useState,useEffect } from 'react';
import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import TabBar from '../../../components/TabBar/TabBar';
import styles from './JobPositions.module.css';
import { Button, Modal } from 'antd-mobile';
import { DownOutline,LoopOutline } from 'antd-mobile-icons'

//    "employerName": "Fast Connect Network Solution Pte Ltd",
//    "employerUen": "2017357337G",

const InfoSelection = ({ employerList, selectedEmployer, setSelectedEmployer }) => {
  return (
    <Button
      className={styles.bubbleToast}
      block
      onClick={() => {
        Modal.show({
          content: (
            <div>
              {employerList.map((employer) => (
                <div
                  key={employer.employerId}
                  className={styles.infoItem}
                  onClick={() => {
                    setSelectedEmployer(employer);
                    Modal.clear();
                  }}
                >
                  <div className={styles.infoImgs}>
                    <img
                      src={`/${employer.logoThumbnailPath || 'src/assets/images/images/map.png'}`}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <div className={styles.name}>{employer.employerName}</div>
                    <div className={styles.uen}>UEN: {employer.employerUen}</div>
                  </div>
                </div>
              ))}
            </div>
          ),
          closeOnMaskClick: true,
        });
      }}
    >
      <div className={styles.buttonContent}>
        <span className={styles.buttonText}>
          {selectedEmployer?.employerName || 'Employer name'}
        </span>
        <DownOutline className={styles.iconRight} />
      </div>
    </Button>
  );
};



{/*navbar*/}
const NavBar = ({ employerList, selectedEmployer, setSelectedEmployer }) => {
  return (
    <div className={styles.navBar}>
      <div style={{ height: '1.2rem' }}></div>
      <p style={{ margin: '0', color: 'white' }}>Current Company</p>
      <div className={styles.locationBar}>
        <div className={styles.infoImg}>
          <img
            src={`/${selectedEmployer?.logoThumbnailPath}`}
            alt="Employer Logo"
          />
        </div>
        <div className={styles.InfoSelection}>
          <InfoSelection
            employerList={employerList}
            selectedEmployer={selectedEmployer}
            setSelectedEmployer={setSelectedEmployer}
          />
        </div>
        <div style={{ width: '10px' }}></div>
      </div>
    </div>
  );
};

{/*总page*/}
const JobPositions = () => {
  const { user } = useAuth();
  const request = useRequest();
  const [employerList, setEmployerList] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);

  useEffect(() => {
    const getEmployers = async () => {
      try {
        const res = await request.get(`/api/Employers?userId=${user.userId}`);
        if (res && res.length > 0) {
          setEmployerList(res);
          setSelectedEmployer(res[0]);
        }
      } catch (err) {
        console.error('error:', err);
      }
    };

    if (user?.userId) getEmployers();
  }, [user?.userId]);

  return (
    <div>
      <NavBar
        employerList={employerList}
        selectedEmployer={selectedEmployer}
        setSelectedEmployer={setSelectedEmployer}
      />
      <div className={styles.pageContainer}>
        <div className={styles.noDataDisplay}>
          <div className={styles.noDataPic}>
            <img src="src/assets/images/images/no-data.png" />
            <p style={{ margin: '1rem 0 0 0' }}>
              No data is available. Please add a job
            </p>
            <button className={styles.loopBtn}>
              <LoopOutline />
            </button>
          </div>
        </div>
      </div>
      <TabBar />
    </div>
  );
};


export default JobPositions;