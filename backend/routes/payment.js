const express = require("express");
const router = express.Router();
const {isSignIn, isAuthenticated} =  require("../controllers/auth");
const {gettoken,processPayment} =  require("../controllers/payment");

const {getUserById,userPurchaseList} =  require("../controllers/user");
router.param("userid", getUserById)
router.get("/payment/gettoken/:userid",isSignIn, isAuthenticated,gettoken);
router.post("/payment/braintree/:userid",isSignIn, isAuthenticated,processPayment);


module.exports  = router