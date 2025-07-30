import React,{ useState,useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddCompany.module.css';
import { Input } from 'antd-mobile';
import { LeftOutline,CameraOutline } from 'antd-mobile-icons';

const AddCompany = () => {
  const navigate = useNavigate();
{/*保存所有信息*/}
  const [street, setstreet] = useState('');
  const [city, setcity] = useState('');
  const [postalcode, setpostalcode] = useState('');

  return (
    <>
    {/*NavBar*/}
      <div className={styles.navbar}>
        <div className={styles.profileBar}>
          <LeftOutline onClick={() => navigate('/employerProfile')}/>
          <p className={styles.pageTitle}>Add Company</p>
          <div style={{width:'20px'}}></div>
        </div>
      </div>
    {/*page*/}
      <div className={styles.pagecontainer}>
    {/*用户图片*/}    
        <div className={styles.personalImg}>
          <img
            className={styles.PersonalPic}
            src="src/assets/images/images/map.png"
            alt="job picture"
          />
          <div className={styles.changepic}>
            <CameraOutline style={{ fontSize: '1.4rem', color: '#00C26F' }} />
          </div>
        </div>
    {/*street*/}
        <div className={styles.streetBank}>
          <p className={styles.title}>Street</p>
          <Input
          placeholder='Street'
          value={street}
          onChange={(val) => setstreet(val)}
          className={styles.street}
          />
        </div>
    {/*city*/}
        <div className={styles.cityBank}>
          <p className={styles.title}>City</p>
          <Input
          placeholder='City'
          value={city}
          onChange={(val) => setcity(val)}
          className={styles.city}
          />
        </div>
    {/*postalcode*/}
        <div className={styles.postalCodeBank}>
          <p className={styles.title}>PostalCode</p>
          <Input
          placeholder='PostalCode'
          value={postalcode}
          onChange={(val) => setpostalcode(val)}
          className={styles.postalCode}
          />
        </div>
    {/*submit*/}
        <button className={styles.SubmitBtn}>Submit</button>
      </div>
    </>
  )
}
export default AddCompany;