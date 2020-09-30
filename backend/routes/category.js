var express = require("express");
var router = express.Router();
const {getCatById, createCategory , getCategory,getAllCategory,updateCategory, deleteCategory} =  require("../controllers/category");
const {getUserById} =  require("../controllers/user");
const {isSignIn, isAuthenticated , isAdmin} =  require("../controllers/auth");
const { check, validationResult } = require("express-validator");
//prams
router.param("userid", getUserById);
router.param("categoryId",getCatById);

//router//

router.post("/category/create/:userid",[check("name", "category should be at least 2 char").isLength({ min:1 })], isSignIn ,isAuthenticated ,isAdmin,createCategory);
router.get("/category/:categoryId", getCategory);
router.get("/categories/",getAllCategory);
router.put("/category/update/:userid/:categoryId", isSignIn ,isAuthenticated ,isAdmin,updateCategory);
router.put("/category/delete/:userid/:categoryId", isSignIn ,isAuthenticated ,isAdmin,deleteCategory);
module.exports = router;

