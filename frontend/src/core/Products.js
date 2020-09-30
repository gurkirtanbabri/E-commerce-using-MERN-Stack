import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getAllProduct } from '../admin/helper/adminapicall';

const Products = () => {

const [values,setValues] = useState({products:[]});
const {products}=values;


    
    
const preLoad = ()=>{
    getAllProduct().then(data=>{
        if(!(data.error)){
setValues({...values,products:data})
        }
    })
}
useEffect(()=>{
    preLoad();
},[]);



    return ( 
        <div className="container-fluid p-5 shadow-lg bg-white">
            
            <div className ="ProductGrid">
                {products && products.map(prod=>(
                    <Card name={prod.name} price={prod.price} product={prod} description={prod.description} key ={prod._id} prodid={prod._id}/>
                ))}
            </div>

        </div>
    );
}
 
export default Products;