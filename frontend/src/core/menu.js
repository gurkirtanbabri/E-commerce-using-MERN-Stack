import React , {Fragment} from 'react';
import { Link , withRouter } from 'react-router-dom';
import { signout, isAuth } from '../auth/helper';

const currentTab= (history,path)=>{
    if(history.location.pathname === path){
        return {color:"#2ecc7"}
    }
    else{
        return {color:"#ffffff"}
    }
}

const Menu = ({history}) =>  (
   
        <div className="nav  bg-dark ">
            <div className="nav-item ">
            <Link style = {currentTab(history,"/")} className="nav-link " to = "/"> Home</Link>
            </div>
            <div className="nav-item ">
            <Link style = {currentTab(history,"/cart")} className="nav-link" to = "/cart"> Cart</Link>
            </div>
        {isAuth() && isAuth().user.role > 0 && (
        <Fragment>
             <div className="nav-item ">
            <Link style = {currentTab(history,"/admin/dashboard")} className="nav-link" to = "/admin/dashboard"> Admin Dashboard</Link>
            </div>
        
            </Fragment>)}
           


{isAuth() && (
    <div className="nav-item ">
    <Link style = {currentTab(history,"/user/dashboard")} className="nav-link" to = "/user/dashboard"> User Dashboard</Link>
    </div>
)}

            
            
            
       { !isAuth() && ( <Fragment>
            <div className="nav-item ">
            <Link className="nav-link " style = {currentTab(history,"/user/signup")} to = "/user/signup"> Signup</Link>
            </div>
            <div className="nav-item ">
            <Link className="nav-link" style = {currentTab(history,"/user/signin")} to = "/user/signin"> Signin</Link>
            </div>
            </Fragment>)}
            {isAuth() && (
                <div className="nav-item" >
                    <span className="nav-link text-warning" style ={{cursor:"pointer"}}
                    onClick = {()=>{
                        signout(()=>{
                            history.push("/");
                        })
                    }} >
                        Signout
                    </span>

                </div>
            )}
         
            
        
        </div>
        
  
);

 
export default withRouter(Menu);