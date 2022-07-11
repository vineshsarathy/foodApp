import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/layout";
import FoodCard from "../components/cards/foodCard";
import FilterComponent from "../components/filter/filterComponent";
import { menuData } from "../mock/menudata";
import { addToCart, removeCart } from "../redux/cart";
import { addQty } from "../redux/quantity";
import "./styles.scss";

export default function HomeMenuPage() {
  const quantity = useSelector((state) => state.qty);
  const dispatch = useDispatch();
  useEffect(() => {
    if (quantity.totalItem === undefined) {
      let array = [];
      menuData.map((i) => array.push(0));
      dispatch(addQty(array));
    }
  }, []);
  const handleMinus = (index) => {
    const items = quantity.totalItem;
    const changeData = [...items];
    if (changeData[index] !== 0) {
      changeData[index] = changeData[index] - 1;
    }
    if (changeData[index] === 0) {
      dispatch(removeCart(index));
    }
    dispatch(addQty(changeData));
  };
  const handlePlus = (index) => {
    const items = quantity.totalItem;
    const changeData = [...items];
    changeData[index] = changeData[index] + 1;
    dispatch(addQty(changeData));
    dispatch(
      addToCart({
        cartItem: { ...menuData[index]},
      })
    );
  };
  const handleAdd = (index) => {
    if (quantity.totalItem[index] === 0) {
      handlePlus(index);
      dispatch(
        addToCart({
          cartItem: { ...menuData[index]},
        })
      );
    } else {
      dispatch(
        addToCart({
          cartItem: { ...menuData[index], index },
        })
      );
    }
  };
  return (
    <div>
      <Navbar />
      <Layout>
        <FilterComponent/>
        <div className="foodList">
          {quantity?.totalItem && quantity.menu && quantity?.menu.length !== 0 &&
            quantity.menu.map((i, index) => (
              <FoodCard
                key={index}
                title={i.NAME}
                price={i.PRICE}
                type={i.TYPE}
                option={i.AVAILABILITY}
                content={i.content}
                quantity={quantity.totalItem[i.index]}
                setPlus={() => {
                  handlePlus(i.index);
                }}
                setMinus={() => {
                  handleMinus(i.index);
                }}
                handleAdd={() => {
                  handleAdd(i.index);
                }}
              />
            ))}
        </div>
      </Layout>
    </div>
  );
}
