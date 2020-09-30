import React, { useEffect, useState } from 'react';
import { isAuth } from '../auth/helper';
import Base from '../core/Base';
import { getMyOrder } from './helper/userapicalls';

const UserDashboard = () => {
    const [Orders, setOrders] = useState([])

    useEffect(()=>{
        getMyOrder(isAuth().user._id,isAuth().token).then(res=>{setOrders(res.reverse());})
    },[]);

    const giveDate = (date)=>{
        let d = new Date(date);
        return (""+d);
               }
    return ( 
        <Base title = "User Dashboard" discription= "view All your orders" >
        <div className="container-fluid bg-light p-3">
            <div className = "row p-2 bg-dark text-light">

            <div className="col-3 text-center"><h5>Order Id</h5></div>
            <div className="col-3 text-center"><h5>Order</h5></div>
            <div className="col-1 text-center"><h5>Status</h5></div>
            <div className="col-2 text-center"><h5>Total</h5></div>
            <div className="col-3 text-center"><h5>Created at</h5></div>

            </div>



{

Orders.map(order=>{


return(
    <div key = { order._id}className = "row p-2 bg-light text-dark">

<div className="col-3 text-center"><p>{order._id}</p></div>
            <div className="col-3 text-center">
            <ul className="list-group text-black text-center">
        {order.products.map(product=>{
           return <li key={product._id} className="list-group-item text-black text-center"  >{product.name}</li>

        })}
</ul>


            </div>
<div className="col-1 text-center"><p>{order.status}</p></div>
<div className="col-2 text-center"><p>{order.amount}</p></div>
            <div className="col-3 text-center">
            <p>{giveDate(order.createdAt)}</p>
            </div>

            </div>
)




})


}




            

        </div>
        </Base>

     );
}
 
export default UserDashboard ;