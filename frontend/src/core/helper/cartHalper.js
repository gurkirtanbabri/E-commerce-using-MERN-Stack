import { useState } from "react";

export const addItemToCart=(item,next)=>{



    let cart=[];
    let alreadyExist ="";
if(typeof window !== undefined){
    if(localStorage.getItem("cart")){
cart = JSON.parse(localStorage.getItem("cart"));

    }

alreadyExist = findItemInCart(item);

if(!(alreadyExist)){
    cart.push({...item});
    localStorage.setItem("cart",JSON.stringify(cart))
    
}
if(alreadyExist){
    next("Already Exist")
}
else{
    next("Added To Cart")
}

}
}


export const findItemInCart =(item)=>{

    let cart=[];
    let alreadyExist =false;
if(typeof window !== undefined){
    if(localStorage.getItem("cart")){
cart = JSON.parse(localStorage.getItem("cart"));

    }
}
    

return(cart.find((i)=>{
    
    if(i._id== item._id){
        return(i)
    }
    else{
        return(false)
    }

}))
}



//
    

export const cartProducts=()=>{
    
    let cart=[];
if(typeof window !== undefined){
    if(localStorage.getItem("cart")){
cart = JSON.parse(localStorage.getItem("cart"));
return(cart);
    }
}
}

export const cartEmpty=(next)=>{
    
    let cart=[];
if(typeof window !== undefined){
    if(localStorage.getItem("cart")){
        localStorage.setItem("cart",JSON.stringify(cart));
next();
    }
}
}


export const removeItemFromCart =(item)=>{

    let cart=[];
    let alreadyExist =false;
if(typeof window !== undefined){
    if(localStorage.getItem("cart")){
cart = JSON.parse(localStorage.getItem("cart"));

    }
}
    console.log(item);

return(cart.map((i,index)=>{
    
    if(i._id== item){
        
        cart.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(cart))
        return(cart);
    }
    else{
        return(false)
    }

}))
}


export const totalAmount=()=>{
    let cart = []
let amount = 0;
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"));
    
        }
cart.map(product=>{
    amount = amount+product.price;
})

return(amount);
    }
}