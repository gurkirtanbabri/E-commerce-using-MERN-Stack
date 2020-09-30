var express = require("express");
var router = express.Router();

const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus,getProOrders,getDelOrders,getCanOrders,getResOrders} =  require("../controllers/order");
const {getUserById,userPurchaseList} =  require("../controllers/user");
const {isSignIn, isAuthenticated , isAdmin} =  require("../controllers/auth");
const {updateStock} = require("../controllers/product.js");


//prams
router.param("userid", getUserById)
router.param("orderid",getOrderById);


// //routes
router.post("/order/create/:userid",isSignIn,isAuthenticated,createOrder);
router.post("/order/all/:userid",isSignIn, isAuthenticated , isAdmin, getAllOrders);
router.post("/order/process/:userid",isSignIn, isAuthenticated , isAdmin, getProOrders);
router.post("/order/res/:userid",isSignIn, isAuthenticated , isAdmin, getResOrders);
router.post("/order/delivered/:userid",isSignIn, isAuthenticated , isAdmin, getDelOrders);
router.post("/order/canceled/:userid",isSignIn, isAuthenticated , isAdmin, getCanOrders);
router.post("/order/update/:userid",isSignIn, isAuthenticated , isAdmin, updateStatus);
// router.put("/orders/user/:userid", isSignIn,isAuthenticated,userPurchaseList);
// router.get("/order/all/:orderid/status/:userid",isSignIn, isAuthenticated , isAdmin,updateStatus);
 router.get("/order/all/status/:userid",isSignIn, isAuthenticated , getOrderStatus);

module.exports = router;