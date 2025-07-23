import { useRequest } from '../../../utils/request';
import { useAuth } from "../../../contexts/AuthContext";
import axios from 'axios';
import React,{ useState,useEffect }from 'react';
import { Input } from 'antd-mobile';
import { useNavigate,useLocation } from 'react-router-dom';
import styles from './NewAddress.module.css';
import { LeftOutline,CheckOutline } from 'antd-mobile-icons';
import { Dropdown,Toast } from 'antd-mobile';


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

/*只负责显示状态的checkBtn */
function CheckBtn({ isDefault,onCheck}) {
  return (
    <div className={`${styles.customBox} ${isDefault ? styles.checked : ''}`} onClick={onCheck}>
      {isDefault && <span className={styles.checkmark}><CheckOutline /></span>}
    </div>

  );
}

/*显示传入数据的下拉表单（基本功能不变）*/
function BuildingDropdown({buildings,selectedBuilding,onSelect}) {
  return (
    <Dropdown className={styles.buildingSelector}>
     <Dropdown.Item
        key='building'
        title={
          <div className={styles.dropdownTitle}>
            <span>{selectedBuilding}</span>
          </div>
        }
      >
        <div className={styles.buildingList}>
          {buildings.map((building, index) => (
            <div
              key={index}
              className={`${styles.buildingOption} ${selectedBuilding === building ? styles.selected : ''}`}
              onClick={() => onSelect(building)}
            >
              {building}
            </div>
          ))}
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}


/*完整page/父容器 */
const EditAddress = () => {
{/*接入employee address数据库(已成功，无报错）*/}
  const { user } = useAuth();
  const request = useRequest();
  const [addressData,setAddressData] = useState([]);
  const [loading,setLoading] = useState(true);

{/*路由传递从addresslistItem中包含的所有信息*/}
  const location = useLocation();
  const { address } = location.state || {}; 

{/*保存所有值的信息*/} 
  const [addressId, setAddressId] = useState(null);
  const [postalcode, setpostalcode] = useState('');
  const [block,setblock] = useState('');
  const [road,setroad] = useState('');
  const [buildings, setbuildings] = useState([]); //地址可能有多个，故设置为数组
  const [selectedBuilding, setSelectedBuilding] = useState('');//下拉表单中的buildings状态
  const [unit,setunit] = useState('');
  const [addressname,setaddressname] = useState('');
  const [isDefault, setIsDefault] = useState(false);//设置初始值为false，（（需要后续传入按钮根据按钮状态修改！））
  const [latitude, setLatitude] = useState('');//暗含，页面上不显示
  const [longitude, setLongitude] = useState('');//暗含，页面上不显示
//按钮切换函数
  const handleCheckDefault = () => {
    setIsDefault(prev => !prev);
    };
//buildings选项切换函数
  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
  };
{/*当 address 状态变量发生变化时，自动填充表单字段。*/}
  useEffect(() => {
    if (address) {
      //隐藏的部分（不在页面显示）
      setAddressId(address.addressId);
      setLatitude(String(address.latitude || ''));
      setLongitude(String(address.longitude || ''));
      // 填充表单字段
      setpostalcode(address.postal);
      setblock(address.blk);
      setroad(address.road);
      setbuildings(address.building);
      setunit(address.unit);
      setaddressname(address.addressDesc);
      setIsDefault(address.isDefault);
      if (address) {
        const buildingList = address.building ? [address.building] : [];

        setbuildings(buildingList);

        if (buildingList.length > 0) {
          setSelectedBuilding(buildingList[0]);
        }
      }
    }
  }, [address]);

{/*接入employee address数据库(已成功，无报错）*/}
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
      const res = await request.get(`/api/${addressType}?${user.roleName}Id=${user.empId}&pagesize=10&pagenumber=1&sortField=createdat&asc=false`);
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
{/*接入employee address数据库(已成功，无报错）*/}


{/*提交所有数据到数据库*/}
  const handleSubmit = async () => {
    const token = user?.token;

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

    try {
      // 发起 PUT 请求来更新指定地址的信息，确保添加请求体 updatedAddress
      const response = await request.put(`/api/${addressType}/${addressId}`, params);
      
      Toast.show({
        icon:'success',
        content: 'Success',
      });

    } catch (error) {
      // 如果发生错误，打印错误并给用户提示
      console.error('Error updating address:', error);
      alert('Error occurred while updating address. Please check your network connection.');
    }
  }



{/*输入六位postal code之后接入postal code的数据库 */}
{/*postalcode的接口 */}
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
{/*在postalcode输入六位就调用接口并相应更新页面对应的部分*/}
  const postalCodeChange = async (value) => {
    setpostalcode(value); // 每次输入都更新

    if (value.length === 6) {
      try {
        const data = await getOneMapSearch(value);
        const results = data?.results;

        if (!results || results.length === 0) {
          Toast.show({
            icon: 'fail',
            content: 'Postal code does not exist',
          });
          return;
        }

        const firstResult = results[0];
        setblock(firstResult.BLK_NO || '');
        setroad(firstResult.ROAD_NAME || '');
        setbuildings([firstResult.BUILDING || '']);
        setSelectedBuilding(firstResult.BUILDING || '');
        setLatitude(firstResult.LATITUDE || '');
        setLongitude(firstResult.LONGITUDE || '');

      } catch (error) {
        Toast.show({
          icon: 'fail',
          content: 'connect error',
        });
      }
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
        <div className={styles.blockBank}>
          <p className={styles.title}>Block</p>
          <Input
          placeholder=''
          value={block}
          className={styles.block}
          onChange={setblock}/>
        </div>

        <div className={styles.roadBank}>
          <p className={styles.title}>Road</p>
          <Input
          placeholder=''
          value={road}
          className={styles.road}
          onChange={setroad}/>
        </div>

        <div className={styles.buildingBank}>
          <p className={styles.title}>Building</p>
          <BuildingDropdown 
            buildings={buildings} 
            selectedBuilding={selectedBuilding}
            onSelect={handleBuildingSelect}
          />
        </div>

        <div className={styles.unitBank}>
          <p className={styles.title}>Unit</p>
          <Input
          placeholder=''
          value={unit}
          className={styles.unit}
          onChange={setunit}/>
        </div>

        <div className={styles.addressnameBank}>
          <p className={styles.title}>Name of Address</p>
          <Input
          placeholder=''
          value={addressname}
          className={styles.addressname}
          onChange={setaddressname}/>
        </div>

        <div>
          <div style={{display:'flex'}}>
            <div style={{margin:'0 0.7rem 0 0.7rem'}}>
              <CheckBtn   
                isDefault={isDefault} 
                onCheck={handleCheckDefault} />
            </div>
            <p style={{margin:'0',fontSize:'15px',fontWeight:'700',textAlign:'left'}}>Set as default</p>
          </div>
        </div>

        <button className={styles.editAddressBtn} onClick={handleSubmit}>Edit Address</button>
      </div>
    </div>
  );
}

export default EditAddress; 