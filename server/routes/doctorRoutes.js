const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getDoctorInfoController, updateDoctorProfileCtrl, getDoctorByIdController } = require('../controllers/doctorController');


const router = express.Router();

//GET SINGLE DOCTOR INFO
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//pOST || UPDATE DOCTOR PROFILE
router.post('/updateDoctorProfile',authMiddleware ,updateDoctorProfileCtrl);

//POST || GET SINGLE DOCTOR INFORMATIONS
router.post('/getDoctorById',authMiddleware, getDoctorByIdController)

module.exports = router;