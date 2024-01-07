const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getDoctorInfoController, updateDoctorProfileCtrl } = require('../controllers/doctorController');


const router = express.Router();

//GET SINGLE DOCTOR INFO
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//pOST || UPDATE DOCTOR PROFILE
router.post('/updateDoctorProfile',authMiddleware ,updateDoctorProfileCtrl);


module.exports = router;