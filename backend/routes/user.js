var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const {isSignIn, isAuthenticated, isAdmin} = require("../controllers/auth");

const {getUser, getUserById , updateUser} = require("../controllers/user");
router.param("userid", getUserById);
router.get("/user/:userid", isSignIn,isAuthenticated,getUser);
router.put("/userupdate/:userid", isSignIn,isAuthenticated,updateUser);

//status order/


module.exports = router;