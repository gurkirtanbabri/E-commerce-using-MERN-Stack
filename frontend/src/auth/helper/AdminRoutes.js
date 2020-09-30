import React from 'react';


import { Route , Redirect } from 'react-router-dom';
import { isAuth } from './index';


const  AdminRoute = ({ component : Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={props =>
          isAuth() && isAuth().user.role > 0? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/user/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  
  export default AdminRoute;