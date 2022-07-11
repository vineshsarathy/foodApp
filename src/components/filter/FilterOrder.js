import React,{ useEffect ,useState}from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { FilterOutlined } from '@ant-design/icons';
import { pastOrders } from '../../redux/quantity';
import { orderData } from '../../mock/orderData';
import { Select,DatePicker,Button } from "antd";

import moment from 'moment';
import dayjs from 'dayjs';
import _ from 'lodash'

export default function FilterOrder() {
  const [value, setValue] = useState();
  const [msg,setMsg] =useState(``)
  const qty = useSelector(state=>state.qty)
    const { Option } = Select;
    const { RangePicker } = DatePicker
    const [show,setShow] =useState(false)
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(pastOrders(orderData))
    },[])
    const handleSort =(val)=>{
      if(val === 'Ordered'){
        const cumulative = Object.values(_.groupBy(orderData, 'ITEMNAME'))
        const dt = _.orderBy(cumulative, [(i) => i.length], ['desc'])
        dispatch(pastOrders(dt.flat()))

      }else if(val === 'Rated'){
        dispatch(pastOrders(_.orderBy(orderData, ['Rating'], ['desc'])))

      }else if(val === 'week'){
        var toDate = dayjs().format('DD-MMM-YYYY');
        var fromDate = dayjs().subtract(7, "day").format('DD-MMM-YYYY');
        const filter = orderData.filter((item) => {
        return item.ORDER_DATE >= fromDate && item.ORDER_DATE <= toDate; })
         dispatch(pastOrders(filter))

      }
      else if(val === 'veg'){
        const filter = orderData.filter((item) => {
        return item.TYPE === 'Veg' })
         dispatch(pastOrders(filter))

      }
      else if(val === 'Non-veg'){
        const filter = orderData.filter((item) => {
        return item.TYPE !== 'Veg' })
         dispatch(pastOrders(filter))

      }
      else if(val === 'South'){
        const filter = orderData.filter((item) => {
        return item.CUISINE === 'South Indian' })
         dispatch(pastOrders(filter))


      }else if(val === 'North'){
        const filter = orderData.filter((item) => {
        return item.CUISINE !== 'South Indian' })
         dispatch(pastOrders(filter))

      }
    }
    const handleSearch =(e)=>{
      const value = e.target.value.toLocaleLowerCase()
      setValue(value)
      if(value.length === 0){   
        dispatch(pastOrders(orderData))
      }else{
        const data = qty?.orders.filter(i=>i.ITEMNAME.toLocaleLowerCase().includes(value))
        dispatch(pastOrders(data))
      }
    }
    const handleDateRange =(value)=>{
     
      var fromDate = new Date(value[0]);
      var toDate = new Date(value[1]);
      const filter = orderData.filter((item) => {
      return new Date(item.ORDER_DATE) >= fromDate && new Date(item.ORDER_DATE) <= toDate; })
      console.log(filter,new Date('11-Jun-2022'))
       dispatch(pastOrders(filter))
    }
  return (
    <div className='filterOrders'> 
    <div className='mainFilter'>
    <Button onClick={()=>{setShow(!show)}}><FilterOutlined/>Filters</Button>
    <input type="text" className='searchBar' placeholder='search for item' value={value} onChange={(e)=>{handleSearch(e)}} />
    </div>
    {show &&
        <div className='filterOption'>
        <Select
        style={{ width: 200 ,border: '1px solid #60b246'}}
        placeholder="Filter"
        optionFilterProp="children"
        onChange={(value)=>handleSort(value)}
      >
        <Option value="week">last week</Option>
        <Option value="veg">veg</Option>
        <Option value="Non-veg">Non-veg</Option>
        <Option value="South">South Indian </Option>
        <Option value="North">North Indian </Option>
        <Option value="Ordered">Most Ordered</Option>
        <Option value="Rated">Most Rated</Option>
      </Select>
    
      <RangePicker 
      style={{border: '1px solid #60b246'}} 
      disabledDate={(current) => current.isAfter(moment())}
      onChange={handleDateRange}/>
        </div>
    }


  </div>
  )
}
