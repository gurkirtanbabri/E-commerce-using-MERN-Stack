import React,{ useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import CartCard from './CartCard';
import { cartEmpty, cartProducts,totalAmount } from './helper/cartHalper';
import Base from './Base';
import Payment from './Payment';
import { isAuth } from '../auth/helper';
import { createOrder } from './helper/orderHalper';



const Cart =(props)=>{
const [values,setvalues]=useState({
    total:0,
    products:[],
    count:0,
    success:false
})
const {total,products,count,success}=values;

const preLoad=()=>{
let prods = cartProducts();
setvalues({...values,products:prods});
if(prods){
    let t=totalAmount();
    setvalues({...values,products:prods,total:t});
}


}


useEffect(()=>{preLoad()},[count]);
const setProducts =()=>{
    setvalues({...values,success:true});
}

const check = ()=>{
    var order = {};
    order.products= products;
    
    order.user = isAuth().user._id;
    order.amount = totalAmount();
    console.log(order);
    createOrder(order.user,isAuth().token,order).then(data=>{
        cartEmpty(setProducts());

       

    }).catch(err=>{
        console.log(err);
    })







    

    

}
 const checkOut = ()=>(
     <div className="bg-white container p-5 rounded shadow-lg text-dark">
<h3 className="text-left d-inline">Total amount : Rs.<span className="text-success">{total} </span></h3>
<button className="btn btn-lg btn-success float-right text-white " disabled = {parseFloat(totalAmount())>0?false:true} onClick = {check} >Checkout</button>
     </div>);
 



    return (
    
        <Base title ="Cart Page" discription ="Get All Your Proucts" className = "container-fluid bg-dark ">
            {(products.length<1)&& (<div className="alert alert-primary"><h3 className="text-dark bg-white rounded text-center d-block m-auto p-5">Please add something into cart</h3></div>)}
            <div className="cartGrid">
        
        
        {products && products.map(prod=>(
                    <CartCard name={prod.name}
                    setProducts = {setProducts} price={prod.price} product={prod} description={prod.description} key ={prod._id} prodid={prod._id}/>
                ))}</div>

                {products.length>0 && checkOut()}
                {success && <Redirect to= "/user/dashboard" />}
                
                
        </Base>
    
    
     )
}
 
export default Cart;

