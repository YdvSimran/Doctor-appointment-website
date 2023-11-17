const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../controllers/adminCtrl');
const router = express.Router()
//Get Method 
router.get('/getAllUsers', authMiddleware,getAllUsersController)

//Get method
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

//post account status
router.post('/changeAccountStatus' ,authMiddleware, changeAccountStatusController);
module.exports= router;