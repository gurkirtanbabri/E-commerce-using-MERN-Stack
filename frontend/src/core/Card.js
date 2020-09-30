import React, { useState, useEffect } from 'react';

import { API } from '../backend';
import  { Redirect, Link }from 'react-router-dom';
import { addItemToCart,findItemInCart } from './helper/cartHalper';

const Card = (props) => {
    const [cartbtn,setCartBtn]=useState(false);
const preLoad =()=>{
let isAdded=findItemInCart(props.product);
if(isAdded){
    setCartBtn(true);
}
}
useEffect(()=>{
    preLoad();
},[]);

const addtocart = ()=>{

    addItemToCart(props.product,(cartmsg)=>{
        setCartBtn(true);
    })

}



const getredirect= (redirect)=>{
    if(redirect){
        return <Redirect to="/cart"/>
    }
}


let pimg = `${API}product/photo/${props.prodid}`;


    return ( 
        
        <div className="card pb-3 text-center gridItem shadow-lg" style={{width:"80%"}}>
            {getredirect()}
    
            <img src={pimg} alt="i" className="card-img-top"/>
    <h5 className="card-title text-left ml-3">{props.name}</h5>
    <h5 className="text-right d-inline mr-3">{props.price}</h5>
    <p className="card-text text-left ml-3">{props.description}</p>
          { !(cartbtn) && (<button className="btn btn-primary  rounded d-block m-auto text-white" onClick={addtocart} style={{width:"90%"}}>Add To Cart</button>)}
         {  cartbtn && (<Link className ="btn btn-success  rounded d-block m-auto text-white"   to="/cart">GO To Cart</Link>)}
        </div>
     );
}
 
export default Card;