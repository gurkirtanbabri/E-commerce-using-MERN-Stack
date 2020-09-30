var express = require("express");
var router = express.Router();


const {getProductById, createProduct,deleteProduct,photo,getProduct,updateProduct,getAllProduct,allUniqueCategory} = require("../controllers/product.js");
const {getCatById, createCategory , getCategory,getAllCategory,updateCategory, deleteCategory} =  require("../controllers/category");
const {getUserById} =  require("../controllers/user");
const {isSignIn, isAuthenticated , isAdmin} =  require("../controllers/auth");

//prams
router.param("userid", getUserById);
router.param("productid",getProductById);
//routes//
router.post("/product/create/:userid",isSignIn, isAuthenticated , isAdmin,createProduct);
router.get("/product/:productid",getProduct);
router.get("/product/",getAllProduct);
router.get("/product/categories/",allUniqueCategory);
router.get("/product/photo/:productid",photo);
router.put("/product/delete/:userid/:productid",isSignIn, isAuthenticated , isAdmin,deleteProduct);
router.put("/product/update/:userid/:productid",isSignIn, isAuthenticated , isAdmin,updateProduct);

module.exports = router;