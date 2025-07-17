import React,{ useState }from 'react';
import { Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import styles from './NewAddress.module.css';
import { LeftOutline,CheckOutline } from 'antd-mobile-icons';
import { Dropdown } from 'antd-mobile';


const AddressEditBar = () =>{
  const navigate = useNavigate();

  return (
    <div className={styles.addressListBar}>
      <LeftOutline className={styles.returnBtn} onClick={() => navigate('/addresslist')}/>
      <p className={styles.pageTitle}>Edit Address</p>
      <div style={{width:'27px'}}></div>
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

function BuildingDropdown() {
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const buildingOptions = ['Building 1', 'Building 2', 'Building 3'];

  return (
    <Dropdown className={styles.buildingSelector}>
     <Dropdown.Item
        key='building'
        title={
          <div className={styles.dropdownTitle}>
            <span>{selectedBuilding || 'BuildingBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuilding'}</span>
          </div>
        }
      >
        <div className={styles.buildingList}>
          {buildingOptions.map((loc, index) => (
            <div
              key={index}
              className={styles.buildingOption}
              onClick={() => setSelectedBuilding(loc)}
            >
              {loc}
            </div>
          ))}
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}

const NewAddress = () => {
    const [postalcode, setpostalcode] = useState('');
    const [block,setblock] = useState('');
    const [road,setroad] = useState('');

    const [unit,setunit] = useState('');
    const [addressname,setaddressname] = useState('');

  return (
    <div>
      <AddressEditBar />
      <div className={styles.container}>
        <p className={styles.pageContext}>Edit Your Address</p>
        <div className={styles.postalcodeBank}>
          <p className={styles.title}>Postal code</p>
          <Input
          placeholder=''
          value={postalcode}
          className={styles.postalcode}
          onChange={pstcode => {setpostalcode(pstcode)}}/>
        </div>

        <div className={styles.blockBank}>
          <p className={styles.title}>Block</p>
          <Input
          placeholder=''
          value={block}
          className={styles.block}
          onChange={blk => {setblock(blk)}}/>
        </div>

        <div className={styles.roadBank}>
          <p className={styles.title}>Road</p>
          <Input
          placeholder=''
          value={road}
          className={styles.road}
          onChange={rd => {setroad(rd)}}/>
        </div>

        <div className={styles.buildingBank}>
          <p className={styles.title}>Building</p>
          <BuildingDropdown />
        </div>

        <div className={styles.unitBank}>
          <p className={styles.title}>Unit</p>
          <Input
          placeholder=''
          value={unit}
          className={styles.unit}
          onChange={u => {setunit(u)}}/>
        </div>

        <div className={styles.addressnameBank}>
          <p className={styles.title}>Name of Address</p>
          <Input
          placeholder=''
          value={addressname}
          className={styles.addressname}
          onChange={an => {setaddressname(an)}}/>
        </div>

        <div>
          <div style={{display:'flex'}}>
            <div style={{margin:'0 0.7rem 0 0.7rem'}}><CheckBtn /></div>
            <p style={{margin:'0',fontSize:'15px',fontWeight:'700',textAlign:'left'}}>Set as default</p>
          </div>
        </div>

        <button className={styles.editAddressBtn}>Edit Address</button>
      </div>
    </div>
  );
}

export default NewAddress; 