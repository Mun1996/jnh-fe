import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import axios from 'axios';
import React, { useEffect,useState }from 'react';
import { Input } from 'antd-mobile';
import { useNavigate,useLocation } from 'react-router-dom';
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

{/*存在问题：下拉表单的信息无法显示，参考newaddress的部分再改*/}
function BuildingDropdown({ buildings = [], selected, onChange }) {
  useEffect(() => {
    if (!selected && buildings.length > 0) {
      onChange(buildings[0]);
    }
  }, [buildings]);

  return (
    <Dropdown className={styles.buildingSelector}>
      <Dropdown.Item
        key="building"
        title={
          <div className={styles.dropdownTitle}>
            <span>{selected || 'Building'}</span>
          </div>
        }
      >
        <div className={styles.buildingList}>
          {buildings.length > 0 ? 
            buildings.map((loc, index) => (
              <div
                key={index}
                className={styles.buildingOption}
                onClick={() => onChange(loc)}
              >
                {loc}
              </div>
            )
          ) : (
            <div className={styles.noBuildings}>No buildings available</div>
          )}
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}

const EditAddress = () => {
  const request = useRequest()
   const { user } = useAuth();
  const [postalcode, setpostalcode] = useState('');
  const [block,setblock] = useState('');
  const [road,setroad] = useState('');
  const [buildings, setbuildings] = useState([]);

  const [unit,setunit] = useState('');
  const [addressname,setaddressname] = useState('');

  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  /*根据传入的数据接入初始值*/
  const location = useLocation();
  const { address } = location.state || {};
  console.log('location',address)

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
    
  /*这里是传入数据*/ 
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

  useEffect(() => {
    if (address) {
      setpostalcode(address.postal || '');
      setblock(address.blk || '');
      setroad(address.road || '');
      setunit(address.unit || '');
      setaddressname(address.addressDesc || '');
      setSelectedBuilding(address.building || '');
      setIsDefault(address.isDefault || false);
      setLatitude(address.latitude || '');
      setLongitude(address.longitude || '');
    }
  }, [address]);

     
  const handleSubmit = async () => {
    try {
      const addressType ="EmployeeAddresses"
      const params = {
        addressId: address.addressId,
        ownerId: user.empId,
        addressDesc: addressname,
        blk: block,
        road: road,
        unit: unit,
        building: selectedBuilding,
        postal: postalcode,
        longitude: longitude, 
        latitude: latitude,
        isDefault: isDefault,
      }
      const res = await request.put(`/api/${addressType}/${address.addressId}`,params)
      console.log("提交成功：", res);
    } catch (err) {
      console.error("提交失败：", err);
    }
  };

  return (
    <div>
      <AddressEditBar />
      <div className={styles.container}>
        <p className={styles.pageContext}>Edit Address</p>
        <div className={styles.postalcodeBank}>
          <p className={styles.title}>Postal code</p>
          <Input
          placeholder=''
          value={postalcode}
          className={styles.postalcode}
          onChange={postalCodeChange}/>
        </div>
{/*页面模块在postal更改之后的响应更新（功能未实现）*/}
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

        <button className={styles.editAddressBtn} onClick={handleSubmit}>Edit Address</button>{/*无法执行提交之后更新数据库信息？待改*/}
      </div>
    </div>
  );
}

export default EditAddress; 