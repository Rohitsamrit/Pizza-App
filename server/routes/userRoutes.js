const express = require("express");
const {
  loginController,
  registerController,
  alluser,
  // forgotPasswordController,
} = require("../controllers/userCtrl");
//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//get all user
router.get("/getAllUser", alluser);

module.exports = router;
