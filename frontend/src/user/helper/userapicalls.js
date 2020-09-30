import { API } from "../../backend"


export const getMyOrder = (userId,token)=>{
    
    return fetch(`${API}order/all/status/${userId}/`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization: `bearer ${token}`
        },
        
    }).then(res =>{ 

        return(res.json())}).catch(error => {

            console.log(error)
        })
}