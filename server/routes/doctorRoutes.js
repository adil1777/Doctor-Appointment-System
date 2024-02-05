const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getDoctorInfoController, updateDoctorProfileCtrl, getDoctorByIdController, doctorAppointmentsController, updateAppointmentsStatusCtrl } = require('../controllers/doctorController');


const router = express.Router();

//GET SINGLE DOCTOR INFO
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//pOST || UPDATE DOCTOR PROFILE
router.post('/updateDoctorProfile',authMiddleware ,updateDoctorProfileCtrl);

//POST || GET SINGLE DOCTOR INFORMATIONS
router.post('/getDoctorById',authMiddleware, getDoctorByIdController)

//GET APPOINTMENTS LIST
router.get('/doctor-appointments',authMiddleware,doctorAppointmentsController);

//POST || UPDATE DOCTOR APPOINTMENTS STATUS
router.post('/update-appointments-status',authMiddleware,updateAppointmentsStatusCtrl);

module.exports = router;