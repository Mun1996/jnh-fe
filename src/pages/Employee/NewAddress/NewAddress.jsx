import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import axios from 'axios';
import React, { useEffect,useState }from 'react';
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
      <p className={styles.pageTitle}>Add Address</p>
      <div style={{width:'27px'}}></div>
    </div>
  );
}

{/*选择是否default的组件，一旦click这里就会设置数据库的isdefault的值为1*/}
function CheckBtn({ checked, onChange }) {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div className={`${styles.customBox} ${checked ? styles.checked : ''}`} onClick={handleClick}>
      {checked && <span className={styles.checkmark}><CheckOutline /></span>}
    </div>
  );
}

function BuildingDropdown({ buildings, selected, onChange }) {
  useEffect(() => {
    if (buildings && buildings.length > 0) {
      onChange(buildings[0]);
    }
  }, [buildings]);

  return (
    <Dropdown className={styles.buildingSelector}>
      <Dropdown.Item
        key='building'
        title={<div className={styles.dropdownTitle}><span>{selected || 'Building'}</span></div>}
      >
        <div className={styles.buildingList}>
          {buildings.length > 0 ? buildings.map((loc, index) => (
            <div
              key={index}
              className={styles.buildingOption}
              onClick={() => onChange(loc)}
            >
              {loc}
            </div>
          )) : (
            <div className={styles.noBuildings}>No buildings available</div>
          )}
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}


const NewAddress = () => {

/*页面原始数据*/
  const [postalcode, setpostalcode] = useState('');
  const [block,setblock] = useState('');
  const [road,setroad] = useState('');
  const [buildings, setbuildings] = useState([]);//参数名待确定

  const [unit,setunit] = useState('');
  const [addressname,setaddressname] = useState('');
  const [hasSearchResult, setHasSearchResult] = useState(false);

/*地址接口*/
  const { user } = useAuth(); 
  const request = useRequest(); 
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('user',user);

/*提交数据到数据库*/
  const [isDefault, setIsDefault] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  
  let addressType = null;

  if (user) {
    if (user.roleName === "employee") {
        addressType = "EmployeeAddresses";
    } else if (user.roleName === "employer") {
        addressType = "EmployerAddresses";
    }
  }  

  const getAddresses = async () => {
    try {
      console.log('请求地址数据');
      const res = await request.get(`/api/${addressType}?${user.role}Id=${user.empId}&pagesize=10&pagenumber=1&sortField=createdat&asc=false`);
      console.log('地址数据：', res);
      if (res) {   
        setAddressData(res);
      }
      } catch (err) {
      console.error('获取地址失败：', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getAddresses();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error: No user</div>;

/*postalcode接口*/
  const getOneMapSearch = async (userInput) => {
  const url = 'https://www.onemap.gov.sg/api/common/elastic/search';

  try {
    const response = await axios.get(url, {
      params: {
        searchVal: userInput,
        returnGeom: 'Y',
        getAddrDetails: 'Y',
        pageNum: 1
      }
    });
      return response.data; // 返回结果数据
    } catch (error) {
      console.error('请求 OneMap 地址失败:', error);
      throw error; // 向上传递错误
    }
  };
  
/**/ 
  const postalCodeChange = async (value) => {
    setpostalcode(value);

    if (value.length === 6) {
      try {
        const data = await getOneMapSearch(value);
        console.log('OneMap 返回数据：', data);

        if (data?.results && data.results.length > 0) {
          setAddressData(data);
          setHasSearchResult(true);

          const firstResult = data.results[0];
          setblock(firstResult.BLK_NO || '');
          setroad(firstResult.ROAD_NAME || '');
          setLatitude(firstResult.LATITUDE || '');
          setLongitude(firstResult.LONGITUDE || '');

          const buildingList = [...new Set(
            data.results.map(item => item.BUILDING).filter(Boolean)
          )];
          setbuildings(buildingList);
        } else {
          setHasSearchResult(false);
          setblock('');
          setroad('');
          setbuildings([]);
        }
      } catch (err) {
        console.error('请求 OneMap 地址失败:', err);
        setHasSearchResult(false);
      }
    } else {
      setHasSearchResult(false);
      setblock('');
      setroad('');
      setbuildings([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const fullAddress = `${block} ${road}, ${unit} ${selectedBuilding}, Singapore ${postalcode}`;
      const payload = {
        ownerId: user.empId,
        addressDesc: addressname,
        blk: block,
        road: road,
        unit: unit,
        building: selectedBuilding,
        postal: postalcode,
        fullAddress: fullAddress,
        isDefault: isDefault,
        longitude: longitude, 
        latitude: latitude
      };

      const res = await request.post(`/api/${addressType}`, payload);
      console.log("提交成功：", res);
    } catch (err) {
      console.error("提交失败：", err);
    }
  };

  return (
    <div>
      <AddressEditBar />
      <div className={styles.container}>
        <p className={styles.pageContext}>Add New Address</p>

        <div className={styles.postalcodeBank}>
          <p className={styles.title}>Postal code</p>
          <Input
          placeholder=''
          value={postalcode}
          className={styles.postalcode}
          onChange={postalCodeChange}/>
        </div>
        
        {hasSearchResult && (<div>
          <div className={styles.blockBank}>
            <p className={styles.title}>Block</p>
            <Input
            placeholder=''
            value={block}
            className={styles.block}
            onChange={(e) => setblock(e.target.value)}/>
          </div>
          <div className={styles.roadBank}>
            <p className={styles.title}>Road</p>
            <Input
            placeholder=''
            value={road}
            className={styles.road}
            onChange={(e) => setroad(e.target.value)}/>
          </div>
          <div className={styles.buildingBank}>
            <p className={styles.title}>Building</p>
            <BuildingDropdown 
              buildings={buildings} 
              selected={selectedBuilding} 
              onChange={setSelectedBuilding}/>
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
              <div style={{margin:'0 0.7rem 0 0.7rem'}}><CheckBtn checked={isDefault} onChange={setIsDefault}/></div>
              <p style={{margin:'0',fontSize:'15px',fontWeight:'700',textAlign:'left'}}>Set as default</p>
            </div>
          </div>

          <button className={styles.editAddressBtn} onClick={handleSubmit}>Edit Address</button>
        </div>)}
      </div>
    </div>
  );
}

export default NewAddress; 