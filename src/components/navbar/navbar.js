import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Popover,Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../Layout/layout.scss";

export default function Navbar() {
  const cartState = useSelector((state) => state.cart);
  const quantity = useSelector(state=>state.qty)
  const location = window.location.href;
  const content = (
    <div>
      {cartState.length === 0 ? "cart is empty": quantity?.totalItem && cartState.map(i=>(
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <span>{i.cartItem.NAME}×{quantity?.totalItem[i.cartItem.index]}</span>
          ₹ {quantity?.totalItem[i.cartItem.index] * i.cartItem.PRICE}
          </div>
      ))}
      {quantity.amount ?
 <div style={{paddingTop:'10px'}}>subtotal: ₹ {quantity.amount}</div>:''
      }
      
    </div>
  );
  return (
    <div>
      <div className="navbarContainer">
        <div>
          <Link to={"/"} className="logo">
            {" "}
            Zingerrr..
          </Link>
        </div>
        <div className="items">
          <Link to={"/menu"}>
            {" "}
            <span
              className={
                location.includes("/menu") ? "menuItem active" : "menuItem"
              }
            >
              Menu
            </span>
          </Link>
          <Link to={"/order"}>
            {" "}
            <span
              className={
                location.includes("/menu") ? "menuItem" : "menuItem active"
              }
            >
              Orders
            </span>
          </Link>
          <Popover content={content} placement="bottomRight" title="Your cart">
            <div className="cart menuItem">
              <small>{cartState.length !== 0 && cartState.length}</small>
              <ShoppingCartOutlined className="cartSVg" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}
