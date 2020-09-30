import React,{ useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { API } from '../backend';
import Base from './Base';
import { removeItemFromCart } from './helper/cartHalper';
import one from "../img/one.jpg"
const CartCard = (props) => {
    let pimg = `${API}product/photo/${props.prodid}`;



    const removeItem=()=>{
        console.log(props.prodid);
       let cart = removeItemFromCart(props.prodid);
        props.setProducts(cart);
    }
    return (
        <div className = "row  bg-white m-3 p-2 shadow-lg">
            <div className="col-3">
                <img src = {pimg} style = {{height:"200px",width:"200px"}}/>

            </div>
            <div className ="col-5 p-5">
    <h5 className=" text-center">{props.name}</h5>
    <h5 className="text-center  mr-3">RS. {props.price}</h5>
            </div>
            <div className = "col-4 pt-3">
                <button className="btn btn-danger" onClick ={removeItem}>Remove From Cart</button>

            </div>
        </div>
        
    );
}
 
export default CartCard;