import React,{useState,useEffect} from 'react'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Briyani from "../../assets/briyani.jpeg";
import Kfc from "../../assets/kfc.jpeg";
import meals from "../../assets/meals.jpeg";
import dosa from "../../assets/dosa.jpeg";
import idly from "../../assets/idly.jpeg";
import tikka from "../../assets/tikka.jpeg";
import Veg from "../../assets/veg.png";
import Nveg from "../../assets/nonveg.png";
import './cards.scss'

export default function OrderCard({title,type,date,time,price,rating}) {
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
  const history =useNavigate()
  
  return (
    <div className="cardContainer2">
    <div className="recipe2">
      <div className="Image-box">
        <img src={image} width="1500" height="1368" alt="" />
      </div>
      <div className="content2">
      <div>Order Placed  <span className='contentSpan'>{date}</span></div>
        <div>Delivery Time  <span className='contentSpan'>{time}</span> </div>
        <h3>{title}</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>₹ {price}</span>
          <img className="vegorNv" src={veg} />
        </div>
        <div>
          
          <span style={{fontSize:'15px'}}>
            {'★'.repeat(rating)}
          </span>
          <span> ({rating}/5 votes)</span>
        </div>
        <Button type="primary" danger onClick={()=>{history('/menu')}}>
      Order Again
    </Button>
      </div>
    </div>
  </div>
  )
}


