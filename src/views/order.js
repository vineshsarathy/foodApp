import React from 'react'
import Navbar from '../components/navbar/navbar'
import Layout from '../components/Layout/layout'
import FilterOrder from '../components/filter/FilterOrder'
import OrderCard from '../components/cards/OrderCard';
import NOitem from '../assets/noitem.jpg';
import { useSelector } from 'react-redux';
import "./styles.scss";

export default function Order() {
  const qty = useSelector(state=>state.qty)
  return (
    <div>
    <Navbar/>
        <Layout>
        <div className='ordersPage'>
        <FilterOrder/>
        {qty.orders?.length === 0 &&(
            <div className='noItem'>
              <img src={NOitem}  alt="" />
            </div>
          )}
        {qty.orders?.length !== 0 && <div className='orderList' >
          {qty.orders?.map(i=>(
            <OrderCard title={i.ITEMNAME} type={i.TYPE} 
            date={i.ORDER_DATE} time={i.ORDER_TIME} price={i.PRICE} rating={i.Rating}/>
          ))}
        </div>}
 
        </div>

    </Layout>
    </div>
  )
}
