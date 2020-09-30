import React from "react";
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Menu from "./menu";
import Slider from "./Slider";
import Products from "./Products";




export default function Home() {
  console.log(`API IS `,API);



  
  return (
    <div>
      <Menu/>
      
      <Slider/>
      <Products/>
    </div>

  );
}
