import React ,{useEffect,useState}from 'react';
import { Link, Redirect } from 'react-router-dom';
import { cartEmpty, totalAmount } from './helper/cartHalper';
import { isAuth } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react";
import { getToken } from './helper/paymetHalper';
import Base from './Base';

const Payment = ({Products , setProducts = f =>(f), count = 0}) => {
const {user,token}=isAuth();
const [info, setinfo] = useState({
    loading:false,
    success:false,
    clientToken:null,
    error:"",
    instance:{}
})
const {loading,success,clientToken,error,instance}=info;
const getPtoken =(userId,token)=>{
getToken(userId,token).then(info =>{
    console.log(info);
    if(info.error){
        setinfo({...info,error:info.error});
    }else{
        const ct =info.ct;
        setinfo({clientToken:ct});
        
    }
})
}


useEffect(() => {

     getPtoken(user._id,token);
    


},[]);


const showDropin = ()=>{

    console.log(info.clientToken);
if(!(isAuth()) | totalAmount() == 0){

    return(<div className ="p-5 d-block m-auto bg-info text whitetext-center">
            <h3>Please Add products to cart <Link to="/">Add Products</Link></h3>
        </div>)
}


    if(isAuth() && totalAmount() >0 && info.clientToken !== null ){
        return(
<div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="btn btn-primary btn-lg mb-4" onClick={()=>{}}>Pay Now</button>
        </div>

        )
    }

    else{
        return(<div className="alert alert-info">
<h3>Loading....</h3>
        </div>)
    }
}




if(!(isAuth())){
return (<Redirect to ="/" /> )
}


    return (
        <Base title="Pay amount" discription="Camplete order">
            <h3 className ="text-white bg-success rounded p-4 shadow-lg text-center">Total Amount :{totalAmount()}</h3>
        <div className="bg-white row  text-center">
   

            <div className="col-6 offset-3">
{showDropin()}
</div>
        </div>
        </Base>
    );
  


}
 
export default Payment;