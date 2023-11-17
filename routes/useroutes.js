const express= require("express");
const{loginController, registerController, authController, applyDoctorController ,getAllNotificationController,deleteAllNotificationController} = require("../controllers/userctr");
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

//notification Doctor
router.post('/get-all-notification', authMiddleware, getAllNotificationController);


//notification Doctor
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);


module.exports=router;