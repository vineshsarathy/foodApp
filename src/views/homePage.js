import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { addQty } from "../redux/quantity";
import { menuData } from "../mock/menudata";
import { useDispatch, useSelector } from "react-redux";


function HomePage() {
    const navigate =useNavigate()
    const quantity = useSelector((state) => state.qty);
    const dispatch = useDispatch();
    useEffect(() => {
      if (quantity.totalItem === undefined) {
        let array = [];
        menuData.map((i) => array.push(0));
        dispatch(addQty(array));
      }
    }, []);
  return (
    <div className='home'>
        <h1>Welcome to Zinger Foods</h1>
        <div className='routeButtons'>
            <button className='menuBtn' onClick={()=>{navigate('/menu')}} >
                Menu
            </button>
            <button className='menuBtn'onClick={()=>{navigate('/order')}}>
                orders
            </button>
        </div>
    </div>
  )
}

export default HomePage