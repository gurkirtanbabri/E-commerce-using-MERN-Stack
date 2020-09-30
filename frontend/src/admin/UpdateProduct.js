import React,{useState,useEffect }from 'react';
import Base from '../core/Base';
import { Link , Redirect} from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { getAllCategory,getproduct,updateProduct} from './helper/adminapicall';
import { isAuth } from '../auth/helper';


const UpdateProduct = ({match}) => {

  
const {user,token}=isAuth();

const [values,setvalues] = useState({
    name:"",
    description:"",
    stock:"",
    price:"",
    photo:'',
    category:"",
    categories:[],
    loading:false,
    error:"",
    updatedProduct:"",
    getRedirect:false,
formData:""
});

const {name , description , stock , price,
category,categories,
loading,error,photo,
updatedProduct,getRedirect,formData}=values;
const preload = ()=>{

    


getproduct(match.params.productid).then(data=>{


    let catarr = catload();
    if(data.error){
        setvalues({...values,error:data.error})
    }
    else {

        setvalues({...values, formData : new FormData(),
            name:data.name,
            description:data.description,
            stock:data.stock,
            price:data.price,
            category:data.category._id,
            photo:data.photo,
            categories:catarr
        
        
        });
        
    }
}).catch(error=>{
    console.log(error);
})







}

useEffect(()=>{
preload();



},[]);


const catload = ()=>{
    getAllCategory().then(data=>{
        if(data.error){
            setvalues({...values,error:data.error})
        }
        else{
            return(data);
        
        }
    }).catch(error=>{
        console.log(error);
    })}





const handleChange=name=>event=>{
  
      /*
let value = event[0];

formData.set(name,value);

setvalues({...values,error:"",photo:value});*/

if(name==="category"){
    console.log(event.target.value);
let value = event.target.value;
formData.set(name, value);
setvalues({...values,error:"",[name]:value});
}
else{let value = event.target.value;
    
      formData.set(name, value);
      setvalues({...values,error:"",[name]:value});
     }
  

}

const successMsg=()=>(
    <div className = "alert alert-success mt-3" 
    style={{display:updatedProduct ?"":"none"}}
>updated successfully  <Link to ="/">View Updated Product</Link></div>
)
const loadingmsg=()=>(
    <div className = "alert alert-info mt-3" 
    style={{display:loading ?"":"none"}}
>Loading....</div>
)


const errorMsg=()=>(
    <div className = "alert alert-danger mt-3" 
    style={{display:error ?"":"none"}}
>{error}</div>
)

const onSubmit =(event)=>{

let fdata = new FormData();
//fdata.set("photo",photo);
fdata.set("name",name);
fdata.set("description",description);
fdata.set("price",price);
fdata.set("stock",stock);
fdata.set("category",category);


    event.preventDefault();
setvalues({...values,error:"",loading:true});
updateProduct(match.params.productid,user._id,token,fdata).then(data=>{
    console.log(data);
    if(data.error){
        setvalues({...values,error:data.error})
    }
    else{
        setvalues({

            getRedirect:true,
            updatedProduct:data

    
        })
    
    }
})
}
const backButton = ()=>{
    return(
        <Link to ="/admin/dashboard" className="btn btn-outline-info text-white btn-dark mb-4">Admin Dashboard</Link>
        
    )
}
const createProductForm = ()=>{
    return(
<form className="p-4">

            <div className="form-group">
<label className="text-dark ">Enter Name:</label>
            <input type="text" className="form-control" onChange={handleChange("name")} value = {name}placeholder ="Ex: G full"/>
            </div>


            <div className="form-group">
<label className="text-dark ">Enter Discription:</label>
            <input type="text" className="form-control" value={description} onChange={handleChange("description")} placeholder ="Ex:amazing thsirt"/>
            </div>

            <div className="form-group">
<label className="text-dark ">Enter Price:</label>
            <input type="text" className="form-control"  onChange={handleChange("price")} value={price} placeholder ="500"/>
            </div>
         
            <div className="form-group">
<label className="text-dark ">Enter Stock:</label>
            <input type="text" className="form-control"  onChange={handleChange("stock")} value={stock} placeholder ="500"/>
            </div>


            <button className="btn btn-md btn-info mb-3" onClick={onSubmit}>Update Product</button>
        </form>
    )
}




    return ( 
        <Base title="Update Product" discription="Welcome To Product Update Section " 
        className="container bg-white p-5" >
            <Link to="/admin/products" className="btn btn-success">Manage products</Link>
            

                    <div className="row bg-white rounded">
                    
            <div className="col-md-6 offset-md-3 pt-4">
                <h3 className=" ml-2  text-info p-2 ">Update Product Details:-</h3>
        {successMsg()}
        {loadingmsg()}
        {errorMsg()}
                  {createProductForm()}
              {backButton()}

            </div>


            </div>


            
        </Base>
     );
}
 
export default UpdateProduct;