import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getAllCategory, delcategory } from './helper/adminapicall';
import { isAuth } from '../auth/helper';


const ManageCat = () => {


const [values,setvalues] = useState({
    cates:[



        
    ],
    total:0,
    error:"",
    del:""
})
const {cates ,del, total,error} = values;
const {user,token}=isAuth();
const preLoad = ()=>{
    
getAllCategory().then((data)=>{
console.log(data)
    if(data.error){
        setvalues({...values,error:data.error});

    }
    else{
        setvalues({
            ...values,
            total:data.length,
            cates:[...data]
        })
    }
})


}
const delcat = (e)=>{
    let cateid=(e.target.value);
     delcategory(cateid,user._id,token).then(data=>{
         console.log(data)
         if(data.error){
setvalues({...values,error:data.error})
         }
         else{
            setvalues({...values,del:data.msg}) 
            preLoad();
         }
     })
}

useEffect(()=>{preLoad()},[])

const successmsg =()=>{
    return(
    <h2 className="alert alert-success" style={{display:del?"":"none"}}>{del}gggggg</h2>
    )
} 





    return (

        <Base title = "Manage categories" discription = "manage your Catagories hare">
        <div className = "bg-white rounded container p-5">
            <Link to="/admin/dashboard" className="btn btn-outline-success text-white bg-dark">Admin Dashboard</Link>
    <h1 className = "text-info text-center">Total categories : {total}</h1>
    {successmsg()}
           {cates && cates.map((cat,index)=>( <div key = {index}  className="row p-4">
    <div className="col-2 text-dark"><h3>{index+1}.</h3></div>
                <div className="col-4 text-dark"><h3>{cat.name}</h3></div>
                <div className="col-3"><Link to = {`/admin/update/Catagories/${cat._id}`}
                className = "btn btn-info text-white shadow-lg">Update</Link></div>
                <div className="col-3"><button className= "btn btn-danger text-white shadow-lg"
                value={cat._id}
            onClick={delcat}
                >Delete</button></div>
            </div>
))}


        </div>
        
        
        </Base>
    );
}
 
export default ManageCat;