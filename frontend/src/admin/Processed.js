import React, { useEffect, useState } from 'react';
import { isAuth } from '../auth/helper';
import { getProOrder, updateOrderStatus } from './helper/adminapicall';

const Processed = () => {

    const [orders, setorders] = useState([]);
    const [count, setcount] = useState(0);
    var black = "black";
    useEffect(()=>{

        getProOrder(isAuth().user._id,isAuth().token).then(res=>{
            setorders(res);
            console.log(res)
        })
    },[count])

    const deliver=(e)=>{
     e.preventDefault();
    let id = e.target.id;
     updateOrderStatus(isAuth().user._id,isAuth().token,{orderId:id , status:"Delivered"}).then(res=>{
         setcount(count+1);
     })
    }

    const cancel=(e)=>{
        e.preventDefault();
       let id = e.target.id;
        updateOrderStatus(isAuth().user._id,isAuth().token,{orderId:id , status:"cancelled"}).then(res=>{
            setcount(count+1);
        })
       }


    return (<div> 

<div className="row mt-3 p-2 bg-dark border border-success text-light">
    <div className="col-2 text-center"><h5 className=" text-center">Order Id</h5></div>
    
    <div className="col-2  text-center"><h5>Address</h5></div>
    <div className="col-2  text-center"><h5>Order</h5></div>
    <div className="col-2  text-center"><h5>Total</h5></div>
    <div className="col-2  text-center"><h5>Deliver</h5></div>
    <div className="col-2  text-center"><h5>Cancel</h5></div>

  </div>  
<div style= {{display : orders.length==0?"":"none"}}
 className="col-4 alert text-center alert-success offset-4 my-4">No One Order Yet</div>
 

{orders&& orders.map((order)=>{
    return(
        <div className="row text-black text-center mt-3" key={order._id}>
             <div className="col-2 text-black text-center"><p className="text-center text-black text-center"  style ={{color:black}}>{order._id}</p></div>
    
    <div className="col-2 text-black text-center text-black text-center"><p className="text-center text-black text-center"  style ={{color:black}}>{order.user.adderss}</p></div>
    <div className="col-2">
    <ul className="list-group text-black text-center">
        {order.products.map(product=>{
           return <li key={product._id} className="list-group-item text-black text-center"  style ={{color:black}}>{product.name}</li>

        })}
</ul>



    </div>
    <div className="col-2"><p className="text-center text-black text-center" style ={{color:black}}>{order.amount}</p></div>
    <div className="col-2 text-black text-center mt-2" onClick={deliver}><button id={order._id} className="btn btn-lg btn-primary">Deliver</button></div>
    <div className="col-2 text-black text-center mt-2" onClick={cancel}><button id={order._id} className="btn btn-lg btn-danger">cancel</button></div>
        </div>
    )
})}


    </div>


  
  
  
  
  );
}
 
export default Processed;