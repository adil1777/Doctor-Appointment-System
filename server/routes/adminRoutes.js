
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllUserController, getAllDoctorController, changeAccountStatusController } = require('../controllers/adminControllers');

const router = express.Router();

// GET METHOD || USERS
router.get('/getAllUsers', getAllUserController);

// GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorController);

//POST || ACCOUNT STATUS
router.post('/changeAccountStatus' , authMiddleware,changeAccountStatusController);

module.exports = router;
