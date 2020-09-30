import React,{useState} from 'react';
import Base from '../core/Base';


import { isAuth } from '../auth/helper';
import {Link} from 'react-router-dom';
import { createCategory } from './helper/adminapicall';
const AddCategory = () => {
    const [name,setName]= useState("") ; 
    const [error,setError]= useState(false) ; 
    const [success,setSuccess]= useState(false) ; 
const {user , token } = isAuth();


const hendleChange = (event) =>{
setError(false);
setName(event.target.value)
}

const onSubmit = (event)=>{
    event.preventDefault();
    setError(false);
    setSuccess(false);
    createCategory(user._id,token,{name})
    .then(data=>{
        if(data.error){
            setError(true)
        }
        if(!data.error){
            setError(false);
            setSuccess(true);
          setName("");
        }
    })

}
const successmsg=()=>{
    if(success){
      
    return(<h4 className= "text-success">Category Created Successfully</h4>);
 
    
    }

}

const warningmsg=()=>{
    if(error){

        return(<h4 className= "text-danger">Category already exist</h4>);
        
    }
}

const goBack = ()=>{
    return(
        <div className= "mt-5 ">
            <Link className="btn btn-sm btn-dark mb-3" to ="/admin/dashboard"> Admin Home
            </Link>
        </div>
    )
}
const MyCatForm = ()=>{ return(
    <form className= "form-group">
        <p className = "lead">Enter Category</p>

        {successmsg()}
        {warningmsg()}
        <input type="text" className= "form-control my-3" 
        onChange = {hendleChange}
        value= {name}
    autoFocus
    required
    placeholder = "ex: Ring"
        />
        <button className = "btn btn-outline-info " onClick = {onSubmit}>Create Category</button>

    </form>
)
}

    return (
    
        
        <Base title= "Create Category Here" discription = "Add A New Category For New Products"
         className="container p-4">
        <div className="row bg-white rounded p-4">
            <div className="col-md-6 offset-md-3">
               {MyCatForm()}
               {goBack()}
            </div>

        </div>
        
        </Base>    );
}
 
export default AddCategory;