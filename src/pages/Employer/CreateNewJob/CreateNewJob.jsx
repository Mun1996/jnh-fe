import React,{ useState,useEffect,useRef }from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateNewJob.module.css';
import { Input,Dropdown,Button, Modal } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';

const CreateNewJob = () => {
  const navigate = useNavigate();
  {/*保存所有信息*/}
  const [jobname,setjobname] = useState('');
  const [jobdescription,setjobdescription] = useState('');
  {/*address中的下拉表单*/}
  const [address, setaddress] = useState(''); 
  const addressList = ['Location 1', 'Location 2'];
  {/*category中的下拉表单*/}
  const [jobCategory, setJobCategory] = useState('');
  const jobCategoryList = ['Full-time', 'Part-time'];
  {/*start date && end date*/}
  const [startDate, setStartDate] = useState('');
  const startDayRef = useRef(null);
  const startMonthRef = useRef(null);
  const startYearRef = useRef(null);
  const [endDate, setEndDate] = useState('');
  const endDayRef = useRef(null);
  const endMonthRef = useRef(null);
  const endYearRef = useRef(null);
  

  const [companyName,setcompanyName] = useState('');

  const [minage,setminage] = useState('');
  const [daysInWeek,setdaysInweek] = useState('');

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.profileBar}>
          <LeftOutline onClick={() => navigate('/companydetail')}/>
          <p className={styles.pageTitle}>Create New Job</p>
          <div style={{width:'20px'}}></div>
        </div>
      </div>
      <div className={styles.pagecontainer}>

        <div className="jobName">
          <p className={styles.title}>Job Name</p>
          <Input
          placeholder='Job Name'
          value={jobname}
          onChange={(val) => setjobname(val)}
          className={styles.jobname}
          />
        </div>

        <div className="jobDescription">
          <p className={styles.title}>Job Description</p>
          <Input
          placeholder='Job Description'
          value={jobdescription}
          onChange={(val) => setjobdescription(val)}
          className={styles.jobdescription}
          />
        </div>

        <div className="Job Address">
          <p className={styles.title}>Job Address</p>
          <Dropdown
            closeOnMaskClick={false}
            closeOnClickAway={false}
            className={styles.jobAddress}
          >
            <Dropdown.Item key="sorter" title={address || 'Select an option'}>
              <div className={styles.dropdownList}>
                {addressList.map((item, index) => (
                  <div
                    key={index}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setaddress(item); // 设置选中项
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
 
        <div className="Job Category">
          <p className={styles.title}>Job Category</p>
          <Dropdown
            closeOnMaskClick={false}
            closeOnClickAway={false}
            className={styles.jobCategory}
          >
            <Dropdown.Item key="sorter" title={jobCategory || 'Select an option'}>
              <div className={styles.dropdownList}>
                {jobCategoryList.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.dropdownItem} ${
                      jobCategory === item ? styles.dropdownItemSelected : ''
                    }`}
                    onClick={() => {
                      setJobCategory(item); 
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="Company Name">
          <p className={styles.title}>Company Name</p>
          <Input
          placeholder='传入的公司名称'
          value={companyName}
          onChange={(val) => setcompanyName(val)}
          className={styles.companyName}
          />
        </div>

        <div className="Job Start Date">
          <p className={styles.title}>Job Start Date</p>
          <Button
            block
            className={styles.choseDate}
            onClick={() =>
              Modal.alert({
                content: (
                  <div className="DateInput">
                    <div className={styles.dateRow}>
                      <input
                        ref={startDayRef}
                        type="text"
                        placeholder="DD"
                      />
                      <span>/</span>
                      <input
                        ref={startMonthRef}
                        type="text"
                        placeholder="MM"
                      />
                      <span>/</span>
                      <input
                        ref={startYearRef}
                        type="text"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                ),
                confirmText: 'Confirm',
                onConfirm: () => {
                  const d = startDayRef.current?.value || '';
                  const m = startMonthRef.current?.value || '';
                  const y = startYearRef.current?.value || '';
                  if (y && m && d) {
                    setStartDate(`${y}/${m}/${d}`);
                  }
                },
              })
            }
          >
            {startDate || 'Select a date'}
          </Button>
        </div>

        <div className="Job End Date">
          <p className={styles.title}>Job End Date</p>
          <Button
            block
            className={styles.choseDate}
            onClick={() =>
              Modal.alert({
                content: (
                  <div className="DateInput">
                    <div className={styles.dateRow}>
                      <input
                        ref={endDayRef}
                        type="text"
                        placeholder="DD"
                      />
                      <span>/</span>
                      <input
                        ref={endMonthRef}
                        type="text"
                        placeholder="MM"
                      />
                      <span>/</span>
                      <input
                        ref={endYearRef}
                        type="text"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                ),
                confirmText: 'Confirm',
                onConfirm: () => {
                  const d = endDayRef.current?.value || '';
                  const m = endMonthRef.current?.value || '';
                  const y = endYearRef.current?.value || '';
                  if (y && m && d) {
                    setEndDate(`${y}/${m}/${d}`);
                  }
                },
              })
            }
          >
            {endDate || 'Select a date'}
          </Button>
        </div>

        <div className="Min Age">
          <p className={styles.title}>Min Age</p>
          <Input
          placeholder='Min Age'
          value={minage}
          onChange={(val) => setminage(val)}
          className={styles.minage}
          />
        </div>

        <div className="days in week">
          <p className={styles.title}>Days In Week</p>
          <Input
          placeholder='Days In Week'
          value={daysInWeek}
          onChange={(val) => setdaysInweek(val)}
          className={styles.daysInWeek}
          />
        </div>

        <button className={styles.addBtn}>Add job</button>
      </div>
    </>
  )
}
export default CreateNewJob;