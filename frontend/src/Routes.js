import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";

import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";


import manageCat from './admin/ManageCat';
import CreateProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCat";
import Cart from "./core/cart";
import Payment from "./core/Payment";
import ManageOrder from "./admin/ManageOrder";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />

       
        <Route path="/user/signin" exact component={Signin} />
        <Route path="/user/signup" exact component={Signup} />
        <PrivateRoute path = "/user/dashboard" exact component = {UserDashboard} />
        <AdminRoute path = "/admin/dashboard" exact component = {AdminDashboard} />
        <AdminRoute path = "/admin/create/category" exact component = {AddCategory} />
        <AdminRoute path = "/admin/category" exact component = {manageCat} />
        <AdminRoute path = "/admin/create/product" exact component = {CreateProduct} />
        <AdminRoute path = "/admin/products" exact component = {ManageProducts} />
        <AdminRoute path = "/admin/products" exact component = {ManageProducts} />
        <AdminRoute path = "/admin/updateproduct/:productid" exact component = {UpdateProduct} />
        <AdminRoute path = "/admin/update/Catagories/:catid" exact component = {UpdateCategory} />
        <AdminRoute path = "/admin/order" exact component = {ManageOrder} />
        <PrivateRoute path = "/cart" exact component = {Cart} />
        <PrivateRoute path = "/cart/processorder" exact component = {Payment} />

      </Switch>
    </Router>
  );
};

export default Routes;
