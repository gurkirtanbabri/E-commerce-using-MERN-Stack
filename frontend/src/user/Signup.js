import React,{useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { signup } from '../auth/helper';

const Signup = () => {
    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        adderss:"",
        success:false
    });


const {name ,email ,adderss,password,error,success}=values;
const handleChange = name => event =>{
    setValues({...values,error:false,[name]:event.target.value})

}
const onSubmit = event=>{
    event.preventDefault();
    console.log("submit");
    setValues({...values,error:false});
    signup({name,email,password,adderss}).then(data=>{
        if(data.error){
            setValues({...values,error:data.error,success:false})
        }
        else{
        setValues({
            name:"",
            email:"",
            password:"",
            adderss:"",
            error:"",
            success:true
        })
        }
    }
    ).catch(error=>{console.log(error)});

}

   
    const signupForm= ()=>{
        return(
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input type = "text" className="form-control" onChange={handleChange("name")} value={name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input type = "email"  className="form-control" value={email} onChange={handleChange("email")}/>
                    </div>

                   


                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input type = "password" className="form-control" value={password} onChange={handleChange("password")}/>
                    </div>
                     
                    <div className="form-group">
                        <label className="text-light">address</label>
                        <input type = "email"  className="form-control" value={adderss} onChange={handleChange("adderss")}/>
                    </div>




                   <button className= "btn btn-success btn-block"   onClick= {onSubmit}>
                       Signup
                   </button>
                </form>
    
            </div>
        )
    }
const successmsg = ()=>{

    return(
    <div className="alert alert-success" style={{display:success ? "" : "none"}}>
        Account Created Log In Here .. <Link to="/user/signin">Log In</Link>

    </div>)
}

const errormsg = ()=> (<div className="alert alert-danger"  style={{display:error ? "" : "none"}} >
 {error}

    </div>)




    return (

        <Base title = "Sign Up" discription= "Become part of our family" >
   {errormsg()}
   {successmsg()}
        {signupForm()}
    
        </Base>
    );


  
}
 
export default Signup;