import React,{useState,useEffect }from 'react';
import Base from '../core/Base';
import { Link , Redirect} from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { getAllCategory,createProductapi} from './helper/adminapicall';
import { isAuth } from '../auth/helper';
//import { createaProduct } from '../../../../../../Downloads/attachment_08_Create_a_product_and_assignment_lyst7897/src/admin/helper/adminapicall';

const CreateProduct = () => {
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
    createdProduct:"",
    getRedirect:false,
formData:""
});

const {name , description , stock , price,
category,categories,
loading,error,
createdProduct,getRedirect,formData}=values;
const preload = ()=>{

    


    getAllCategory().then(data=>{
        if(data.error){
            setvalues({...values,error:data.error})
        }
        else{
            setvalues({...values,categories:data, formData : new FormData()});
        
        }
    }).catch(error=>{
        console.log(error);
    })
}

useEffect(()=>{
preload();



},[]);


const photoHandle = (e)=>{
    if(e[0]){
formData.set("photo",e[0]);}
}

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
    style={{display:createdProduct ?"":"none"}}
> Product created successfully</div>
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
const redirectToHome = ()=>{
if(getRedirect){return(<Redirect pathname ="/"/>)}



   
}

const onSubmit =(event)=>{
    event.preventDefault();
setvalues({...values,error:"",loading:true});
createProductapi(user._id,token,formData).then(data=>{
    console.log(data);
    if(data.error){
        setvalues({...values,error:data.error,})
    }
    else{
        setvalues({
            name:"",
            price:"",
            stock:"",
            description:"",
            photo:"",
            loading:false,
            createdProduct:true,
            getRedirect:true,
            FormData:new FormData
        })
        alert("product creared")
        window.location.reload(false);

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
<ImageUploader
                withIcon={true}
                buttonText='Choose image'
                onChange={handleChange("photo")}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={524280}
                withPreview={true}
                singleImage={true}
                label = "Max SIze 500kb"
                name="photo"
                onChange = {photoHandle}
            />
       
            <div className="form-group">
<label className="text-dark ">Enter Name:</label>
            <input type="text" className="form-control" onChange={handleChange("name")} value = {name}placeholder ="Ex: G full"/>
            </div>


            <div className="form-group">
<label className="text-dark ">Enter Discription:</label>
            <input type="text" className="form-control" value={description} onChange={handleChange("description")} placeholder ="Ex: Gold"/>
            </div>

            <div className="form-group">
            <label className="text-dark ">Select Category:</label>
            <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      
  </div>

            <div className="form-group">
<label className="text-dark ">Enter Price:</label>
            <input type="text" className="form-control"  onChange={handleChange("price")} value={price} placeholder ="500"/>
            </div>
         
            <div className="form-group">
<label className="text-dark ">Enter Stock:</label>
            <input type="text" className="form-control"  onChange={handleChange("stock")} value={stock} placeholder ="500"/>
            </div>


            <button className="btn btn-md btn-info mb-3" onClick={onSubmit}>Create Product</button>
        </form>
    )
}




    return ( 
        <Base title="Create Product" discription="Welcome To Product Creation Section " 
        className="container bg-dark p-5" >
                    <div className="row bg-white rounded">
            <div className="col-md-6 offset-md-3 pt-4">
                <h3 className=" ml-2  text-info p-2 ">Enter Product Details:-</h3>
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
 
export default CreateProduct;