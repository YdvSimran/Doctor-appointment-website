const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getDoctorInfoController,
               doctorAppointmentController,
               updateStatusController,updateProfileController, getDoctorByIdController } = require('../controllers/doctorCtrl');
const router = express.Router()
 
router.post('/getDoctorInfo', authMiddleware,getDoctorInfoController);

router.post('/updateProfile',authMiddleware,updateProfileController);

router.post('/getDoctorById',authMiddleware,getDoctorByIdController);

router.get('/doctor-appointments',authMiddleware,doctorAppointmentController);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);
 module.exports =router;