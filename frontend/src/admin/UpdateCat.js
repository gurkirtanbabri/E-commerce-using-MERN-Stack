import React,{useState, useEffect} from 'react';
import Base from '../core/Base';


import { isAuth } from '../auth/helper';
import {Link} from 'react-router-dom';
import { updateCategory ,getCategory} from './helper/adminapicall';

const UpdateCategory = ({match}) => {
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
    updateCategory(user._id,token,match.params.catid,{name})
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
const preload = ()=>{
    getCategory(match.params.catid).then(cat=>{
        console.log(cat);
setName(cat.name)
    })
}

useEffect(()=>{
    preload();
},[])


const successmsg=()=>{
    if(success){
      
    return(<h4 className= "alert alert-success">Category updated Successfully <Link to="/admin/category"> View</Link> </h4>);
 
    
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
    placeholder = "ex: winter"
        />
        <button className = "btn btn-outline-info " onClick = {onSubmit}>Update Category</button>

    </form>
)
}

    return (
    
        
        <Base title= "Update Category Here" discription = "update A New Category For your Products"
         className="container bg-white p-4">
             <Link to ="/admin/category" className="btn btn-outline-white bg-success text-white">Manage Categories</Link>
        <div className="row bg-white rounded p-4">

            
            <div className="col-md-6 offset-md-3">
               {MyCatForm()}
               {goBack()}
            </div>

        </div>
        
        </Base>    );
}
 
export default UpdateCategory;