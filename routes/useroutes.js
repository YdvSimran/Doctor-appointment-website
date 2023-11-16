const express= require("express");
const{loginController, registerController, authController, applyDoctorController } = require("../controllers/userctr");
const authMiddleware = require("../middleware/authMiddleware");


const router =express.Router();

//login
router.post("/login",loginController);

//register
router.post("/register",registerController);

//Auth
router.post('/getUserData', authMiddleware, authController);

//Apply Doctor
router.post('/apply-doctor', authMiddleware, applyDoctorController);
module.exports=router;