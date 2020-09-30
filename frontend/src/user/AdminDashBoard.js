import React from 'react';
import Base from '../core/Base';
import { isAuth } from '../auth/helper/index';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {

const {user:{
    name,email,role
}} = isAuth();
const adminLeftSide = ()=>{
return(
    <div className = "card">
        <h5 className="card-header bg-dark text-white text-center">Admin Dashboard</h5>
        <ul className="list-group">
          <li className="list-group-item text-center"><Link to= "/admin/create/category" className="nav-items font-weight-bold text-success">Create Category</Link></li>
          <li className="list-group-item  text-center"><Link to= "/admin/category" 
          className="nav-items font-weight-bold text-success">Manage Category</Link></li>
          <li className="list-group-item text-center"><Link to= "/admin/create/product" className="nav-items font-weight-bold text-success">Create Product</Link></li>
          <li className="list-group-item  text-center"><Link  to= "/admin/products" className="nav-items font-weight-bold text-success">Manage Product</Link></li>
          <li className="list-group-item text-center"><Link to= "/admin/order" className="nav-items font-weight-bold text-success">Manage Order</Link></li>
      
          </ul>
        
    </div>
)
}

const adminRightSide = ()=>{
    return(
        <div className="card mb-4">
            <h4 className= " card-header">Admin Info</h4>
            <ul className="list-group">
              <li className="list-group-item"><h5>
    <span className="badge badge-success mr-4 " >Name: </span>{name}</h5>
              </li>

              
              <li className="list-group-item"><h5>
    <span className="badge badge-success mr-4 " >Email: </span>{email}</h5>
              </li>
              <li className="list-group-item"><h5>
    <span className="badge badge-danger mr-4 " >Admin Area </span></h5>
              </li>
            </ul>
            
        </div>
    )
}

    return ( 
        <Base title = " Welcome To Admin Dashboard " discription = "Manage All Your Products Here" className="bg-success container p-4">
          <div className = " container-fluid row ">
             <div className="col-3  ">
             {adminLeftSide()}
             </div>
             <div className="col-9 ">
             {adminRightSide()}
             </div>
          </div>
    
     
    
        </Base>

     );
}
 
export default AdminDashboard ;