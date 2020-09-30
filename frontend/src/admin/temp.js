import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from '../auth/helper';
import Base from '../core/Base';
import { getAllOrder } from './helper/adminapicall';

const ManageOrder = () => {

  useEffect(()=>{
    getAllOrder(isAuth().user._id,isAuth().token,"recieved").then(res=>{
        console.log("api esult",res);
    })

  },[]);


const load = (e)=>{
  getAllOrder(isAuth().user._id,isAuth().token,"recieved").then(res=>{
    console.log("api esult",res);
})
  

}

    return (<Base title = "Manage Order" discription="manage your orders hare">
    <div className="container-fluid bg-white p-4">
    
    <button className="btn btn-lg btn-primary" onClick={load}>load</button>
    <div className="row mt-3 p-2 bg-info">
      <div className="col-1"><h3>sr</h3></div>
      
      <div className="col-3"><h3>Address</h3></div>
      <div className="col-4"><h3>Order</h3></div>
      <div className="col-2"><h3>approve</h3></div>
      <div className="col-2"><h3>cancel</h3></div>


    </div>
    
    </div>
    </Base> );
}
 
export default ManageOrder;