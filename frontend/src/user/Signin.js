import React,{useState} from 'react';
import Base from "../core/Base";
import {Link ,Redirect} from "react-router-dom";

import {signin ,authUser , isAuth } from  "../auth/helper/index";



const Signin = () => {

    const [values,setValues]=useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedir:false

    });



    const handleChange = name => event =>{
        setValues({...values,error:"",[name]:event.target.value})
    
    }
    const {user} = isAuth();
    const {email ,password ,error, loading, didRedir} = values;



const onSubmit = (event) =>{
    event.preventDefault();
    setValues({...values,error:"",loading:true})
    signin({email,password}).then(data =>{
        if(data.error){
            setValues({...values,error:data.error,loading:false});
        }
        else{
            authUser(data,()=>{
                setValues({...values,didRedir:true})
            })
        }

}    )
}
const performRedirect = ()=>{
    if(didRedir){
        if(user && user.role >0){
            return(
                <Redirect to ="/admin/dashboard" /> 
            )
        }
        else{return(
            <Redirect to ="/user/dashboard" /> 
        )
            
        }
    }
    
   
}
  

    



    const loadingmsg = ()=>{
if(loading){
    return(
        <div className = "alert alert-info">
            <h2>Loading....</h2>

        </div>
    )
}
    }
    
    const errormsg = ()=> (<div className="alert alert-danger"  style={{display:error ? "" : "none"}} >
     {error}
    
        </div>);






    const signinForm= ()=>{
       


        return(



     

            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input type = "email" value={email} onChange={handleChange("email")} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input type = "password" value= {password} onChange={handleChange("password")}  className="form-control" />
                    </div>
                   <button className= "btn btn-success mb-4 btn-block" onClick={onSubmit}>
                       Signin
                   </button>
                </form>
    
            </div>
        )
    }
    




    return (

        <Base title = " Sign In "  mg = {"50vh"}  discription="Try Something New">
             {loadingmsg()}
        {errormsg()}
        {signinForm()}
        {performRedirect()}
    
        </Base>
    );
}
 
export default Signin;