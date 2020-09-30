import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getAllProduct , deleteProduct} from './helper/adminapicall';
import { isAuth } from '../auth/helper';

const ManageProducts = () => {

const {user,token}=isAuth();



const [values,setValues]=useState({
    total:0,
    products:[],
    msg:"",
    error:''
})


const {total,products,error,msg}=values;



const preload =()=>{
    getAllProduct().then(data=>{
        
        setValues({...values,products:data,total:data.length

        })
    })
}
useEffect(()=>{
    preload();
},[])



const delProduct =(event)=>{
event.preventDefault();
let prodId = event.target.value;
deleteProduct(prodId,user._id,token).then(data =>{
    console.log(data);
    if(data.error){
setValues({...values,error:data.error})

    }
    if(data.msg){
        
        setValues({...values,msg:data.msg});
        preload();
    }
}

)
}



const successMsg =()=>(
<div className ="alert alert-info" style ={{display:msg?"":"none"}}>{msg}</div>
)

const errorMsg =()=>(
    <div className ="alert alert-info" style ={{display:error?"":"none"}}>{error}</div>
    )
    


    return ( 
    <Base title="Manage Product " discription="Manage All Your Product Hare">
        <div className="container p-5 bg-white shadow-lg">
            <div className="col-12">
            <Link to="/admin/dashboard" className="btn btn-outline-info  btn-dark"><span className="text-white">Admin Dashboard</span></Link>
    <h1 className="text-success  mt-4  text-center">Total Products : {total}</h1></div>

{successMsg()}
{errorMsg()}

        {products && products.map((prod,index)=>(
  <div className="row  p-2 mt-4" key ={index}>


  <div className= "col-2 text-dark  text-center">
        <h3 className="text-center">{index+1} .</h3>
      </div>

     <div className= "col-4 text-dark  text-center">
        <h3 className="text-center">{prod.name}</h3>
         </div>
     <div className= "col-3  text-center">
<Link to={`/admin/updateproduct/`+prod._id} className="btn btn-info">Update</Link>
         
            

     </div>
     <div className= "col-3  text-center"><button className="btn btn-danger" value={prod._id} onClick={
delProduct
     }>  Delete</button>        

     </div>

 </div>
        )
        )}
          
        </div>
    </Base>
        );
}
 
export default ManageProducts;