import React from 'react'
import { Select,Checkbox } from "antd";
import "./filter.scss";
import { menuData } from '../../mock/menudata';
import { useDispatch } from 'react-redux';
import { menuItems } from '../../redux/quantity';
// import 'antd/dist/antd.css';
import { useEffect ,useState} from 'react';
import _ from 'lodash'

export default function FilterComponent() {
    const { Option } = Select;
    const dispatch =useDispatch()
  const [value, setValue] = useState();
    useEffect(()=>{
        dispatch(menuItems(menuData))
    },[])
   const handleSort =(val)=>{
    if(val === 'high'){
        const data = _.orderBy(menuData, ['PRICE'],['desc']);
         dispatch(menuItems(data))
    }else if(val === 'low'){
        const data = _.orderBy(menuData, ['PRICE'],['asc']);
        dispatch(menuItems(data))
    }else if(val === 'Breakfast'){
        const data = menuData.filter(i=>i.AVAILABILITY.includes('BREAKFAST'))
        dispatch(menuItems(data))
    }else if(val === 'Lunch'){
        const data = menuData.filter(i=>i.AVAILABILITY.includes('LUNCH'))
        dispatch(menuItems(data))
    }else if(val === 'Dinner'){
        const data = menuData.filter(i=>i.AVAILABILITY.includes('DINNER'))
        dispatch(menuItems(data))
    }
   }
   const onChange = (e) => {
    if(e.target.checked){
        const data = menuData.filter(i=>i.TYPE === 'Veg')
        dispatch(menuItems(data))
    }else{
        dispatch(menuItems(menuData))
    }
  };
  const handleSearch =(e)=>{
    const value = e.target.value.toLocaleLowerCase()
    setValue(value)
    const data = menuData.filter(i=>i.NAME.toLocaleLowerCase().includes(value))
    dispatch(menuItems(data))
  }
  return (
    <div>
        <div className="filterDiv">
        <Select
          style={{ width: 200 ,border: '1px solid #60b246'}}
          placeholder="Filter"
          optionFilterProp="children"
          onChange={(value)=>handleSort(value)}
        >
          <Option value="low">Low to High</Option>
          <Option value="high">High to Low</Option>
          <Option value="Breakfast">Breakfast</Option>
          <Option value="Lunch">Lunch</Option>
          <Option value="Dinner">Dinner</Option>
        </Select>
        <input type="text" className='searchBar' value={value} onChange={(e)=>{handleSearch(e)}} />
        <div className='checkVeg'>
        <Checkbox onChange={onChange}>Veg</Checkbox>
        </div>
        </div>
    </div>
  )
}
