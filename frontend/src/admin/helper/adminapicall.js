import {API} from "../../backend";
export const createCategory = (userId,token,category)=>{
    return fetch(`${API}category/create/${userId}`,
    {
        method:"POST",
      headers:{  Accept:"application/json",
      "content-Type":"application/json",
      Authorization: `bearer ${token}`
    },
    body : JSON.stringify(category)

    })
    .then(res=>{console.log(res);
        return(res.json());
    })
    .catch(error=> console.log(error));

}
export const updateCategory = (userId,token,catId,category)=>{
    return fetch(`${API}category/update/${userId}/${catId}`,
    {
        method:"PUT",
      headers:{  Accept:"application/json",
      "content-Type":"application/json",
      Authorization: `bearer ${token}`
    },
    body : JSON.stringify(category)

    })
    .then(res=>{console.log(res);
        return(res.json());
    })
    .catch(error=> console.log(error));

}
export const getAllCategory = ()=>{
    return fetch(`${API}categories`,{
        method:"GET"
    }).then(res =>{ 
        
        console.log(res)
        
        return(res.json())}).catch(error => {

            console.log(error)
        })
}

export const getCategory = (catid)=>{
    return fetch(`${API}category/${catid}`,{
        method:"GET"
    }).then(res =>{ 
        
        console.log(res)
        
        return(res.json())}).catch(error => {

            console.log(error)
        })
}



export const delcategory = (catId,userId,token)=>{
    return fetch(`${API}/category/delete/${userId}/${catId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res=>{
        return res.json();
        console.log(res);
    }).catch(err=>{
        console.log(err)
    })
}


//product crud calls calls
export const getAllProduct = ()=>{
    return fetch(`${API}product/`,{
        method:"GET"

    }).then(res =>{ return(res.json())}).catch(error=> console.log(error))
}


export const getproduct = (productId)=>{
    return fetch(`${API}product/${productId}`,{
        method:"GET"
    }).then(res =>{ return(res.json())}).catch(error=> console.log(error))

}






export const createProductapi= (userId,token,product)=>{
    console.log(product);
    return fetch(`${API}product/create/${userId}`,{
        method:"POST",
        headers:{  Accept:"application/json",
        Authorization: `bearer ${token}`
      },
        body:product
    })
    .then(res =>{
        console.log(res.json)
        return(res.json());
    }).catch(error=>console.log(error.json()));

}
/*
export const createProductapi = (userId, token, product) => {
    return fetch(`${API}product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
*/
export const updateProduct= (productId,userId,token,product)=>{
   return fetch(`${API}product/update/${userId}/${productId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        },
        body:product
    })
    .then(res =>{
        return(res.json());
    }).catch(error=>console.log(error.json()));

}



export const deleteProduct =  (productId,userId,token)=>{
   return fetch(`${API}product/delete/${userId}/${productId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        }
        
    }).then(res =>{
        return(res.json());
    }).catch(error=>console.log(error));

}






// orders //

export const getAllOrder = (userId,token,typeOfOrder)=>{
    console.log("apicaalled",typeOfOrder);
    return fetch(`${API}order/all/${userId}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`,
            
        },
        body:typeOfOrder
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}

export const getResOrder = (userId,token)=>{
    
    return fetch(`${API}order/res/${userId}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        },
    
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}

export const getProOrder = (userId,token)=>{
    
    return fetch(`${API}order/process/${userId}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        },
    
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}


export const getCanOrder = (userId,token)=>{
    
    return fetch(`${API}order/canceled/${userId}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        },
        
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}

export const getDelOrder = (userId,token,typeOfOrder)=>{
    
    return fetch(`${API}order/delivered/${userId}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        },
        body:typeOfOrder
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}



export const updateOrderStatus = (userId,token,obj)=>{
    console.log(obj);
    return fetch(`${API}order/update/${userId}/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `bearer ${token}`
        },
        body:JSON.stringify(obj)
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}
