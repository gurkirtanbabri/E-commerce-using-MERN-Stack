import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from '../auth/helper';
import Base from '../core/Base';
import { getAllOrder } from './helper/adminapicall';
import Recived from './Recived';
import Processed from './Processed';
import Deliverd from './Delived';
import CancelOrders from './Cancel';
import { render } from '@testing-library/react';

const ManageOrder = () => {
  const [value, setvalue] = useState("Recieved");
  const changeOrder = (e)=>{
    e.preventDefault();
    setvalue(e.target.value);
  }
  const render =()=>{

if(value=="Recieved"){
return < Recived/>

}
else if(value=="Processing"){
return <Processed/>

}
else if(value=="Delivered"){
return <Deliverd/>

}
else{
return <CancelOrders/>

}


  }

    return (<Base title = "Manage Order" discription="manage your orders hare">
    <div className="container-fluid bg-white p-4">
    <div className="d-flex justify-content-around align-items-center bg-dark">
      <div>
      <Link to="/admin/dashboard" className="btn btn-outline-light text-white bg-dark">Admin Dashboard</Link>
      </div>
   <div className="p-1">
     
    <div className="form-group m-0 ">
    
    <select className="form-control m-0 "  onChange={changeOrder} id="exampleFormControlSelect1">
      <option>Recieved</option>
      <option>Processing</option>
      <option>Delivered</option>
      <option>Cancelled</option>
      
    </select>
  </div>
   </div>
    </div>
    
    <div className="p-3">
    {render()}
    </div>
      


  
    
    </div>
    </Base> );
}
 
export default ManageOrder;