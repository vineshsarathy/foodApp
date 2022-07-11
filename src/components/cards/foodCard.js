import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Kfc from "../../assets/kfc.jpeg";
import meals from "../../assets/meals.jpeg";
import Briyani from "../../assets/briyani.jpeg";
import dosa from "../../assets/dosa.jpeg";
import idly from "../../assets/idly.jpeg";
import tikka from "../../assets/tikka.jpeg";
import Veg from "../../assets/veg.png";
import Nveg from "../../assets/nonveg.png";
import "./cards.scss";
import { useEffect } from "react";

export default function FoodCard({
  title,
  price,
  option,
  content,
  quantity,
  setPlus,
  setMinus,
  handleAdd,
  type,
}) {
  const [image, setImage] = useState(Kfc);
  const [veg, setVeg] = useState(Veg);
  useEffect(() => {
    if (title.includes("Briyani")) {
      setImage(Briyani);
    } else if (title.includes("Meals")) {
      setImage(meals);
    } else if (title.includes("Dosa")) {
      setImage(dosa);
    } else if (title.includes("Idly")) {
      setImage(idly);
    } else if (title.includes("Tikka")) {
      setImage(tikka);
    } else {
      setImage(Kfc);
    }

    if (type !== "Veg") {
      setVeg(Nveg);
    } else {
      setVeg(Veg);
    }
  }, [title]);
  return (
    <div className="cardContainer">
      <div className="recipe">
        <div className="Image-box">
          <img src={image} width="1500" height="1368" alt="" />
        </div>
        <div className="content">
          <div className="available">
            {option?.length !== 0 &&
              option?.map((i) => <div className="box">{i}</div>)}
          </div>

          <h3>{title}</h3>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span> ₹ {price}</span>
            <img className="vegorNv" src={veg} />
          </p>
          <p>
            <span>
              ★★★★<span>☆</span>
            </span>
            <span>(12 votes)</span>
          </p>
          <p className="desc">
            {content} {title}
          </p>
          <div className="cartsFunc">
            <div className="formButtons">
              <div
                className="minus"
                onClick={() => {
                  setMinus();
                }}
              >
                -
              </div>
              <div className="qtyInput">{quantity}</div>
              <div
                className="plus"
                onClick={() => {
                  setPlus();
                }}
              >
                +
              </div>
            </div>
            <div
              className="button"
              onClick={() => {
                handleAdd();
              }}
            >
              add
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
