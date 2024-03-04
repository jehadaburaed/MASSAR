const jwt =require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const router = require("express").Router();
const UserController = require('../controller/user.controller');

router.post("/registration",UserController.register);

router.post("/login", UserController.login);

router.get("/getUserById",auth() , UserController.getUserById);

router.get("/getAnyUserById",auth() , UserController.getAnyUserById);
 
router.get("/getCompanies",auth() , UserController.getCompanies);

router.put("/updateUserInfo",auth() , UserController.updateUserInfo);

router.put("/updateUserPassword",auth() , UserController.updateUserPassword);
module.exports = router;