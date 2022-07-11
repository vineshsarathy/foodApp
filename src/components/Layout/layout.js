import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Empty from "../../assets/emptyCart.png";
import Veg from "../../assets/veg.png";
import Nveg from "../../assets/nonveg.png";
import { removeCart , deleteALl} from "../../redux/cart";
import { addQty,totalAmount } from "../../redux/quantity";
import { notification } from 'antd';
import "./layout.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const cartState = useSelector((state) => state.cart);
  const quantity = useSelector(state=>state.qty)
  const [totalValue,setTotalvalue]=useState(0)
  const dispatch =useDispatch()
  const location = window.location.href
  const navigate =useNavigate()
  useEffect(()=>{
    if(quantity.totalItem){
       const sum = cartState.map((i,index)=>(
        i.cartItem.PRICE * quantity.totalItem[i.cartItem.index]
       ))
       setTotalvalue(sum.reduce((a,b)=>(a+b),0))
    }
  },[quantity,cartState])
  useEffect(()=>{
      dispatch(totalAmount(totalValue))
  },[totalValue])
  const handleMinus = (index) => {
    const items = quantity.totalItem
    const changeData = [...items];
    if (changeData[index] !== 0) {
      changeData[index] = changeData[index] - 1;
    }
    if(changeData[index] === 0){
        dispatch(removeCart(index))
    }
    dispatch(addQty(changeData))
  };
  const handlePlus = (index) => {
    const items = quantity.totalItem
    const changeData = [...items];
    changeData[index] = changeData[index] + 1;
    dispatch(addQty(changeData))
  };
  const hanleClick =()=>{
    if(location.includes('/menu')){
      navigate('/order')
    }else{
      setTimeout(()=>{
        navigate('/')
        dispatch(deleteALl())
      },2000)
      notification.success({
        message: 'Payment Done',
        duration:3,
        description:
          'Redirecting to Home Page',
        style: {
          width: 400,
        },
      })
    }
  }
  return (
    <div className="layoutCountainer">
      <div className="partionLayout">
        <div className="childrenSection">{children}</div>
        <div className="cartSection">
          <h3>Cart Summary</h3>
          {cartState.length === 0 ? (
            <img src={Empty} alt="" />
          ) : (
            cartState.length !== 0 &&
            cartState.map((foods,index) => (
              <div className="sideCartContainer">
                <img
                  width={14}
                  src={foods.cartItem.TYPE === "Veg" ? Veg : Nveg}
                  alt=""
                />
                <p className="foodName">{foods.cartItem.NAME}</p>

                <div className="formButtons">
                  <div className="minus" onClick={() => {handleMinus(foods.cartItem.index)}}>
                    -
                  </div>
                  <div className="qtyInput">{quantity.totalItem[foods.cartItem.index]}</div>
                  <div className="plus" onClick={() => {handlePlus(foods.cartItem.index)}}>
                    +
                  </div>
                </div>
                <p className="foodPrice">₹ {foods.cartItem.PRICE * quantity.totalItem[foods.cartItem.index]}</p>
              </div>
            ))
          )}
          {totalValue !==0 && <h4>Total Amount : {totalValue}</h4>}
          {cartState.length !== 0 && <Link to={'/order'} onClick={()=>{hanleClick()}}><button className="checkout">{location.includes('/menu')?'Checkout':'Pay Now'}</button></Link>}
        </div>
      </div>
    </div>
  );
}
