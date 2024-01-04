const express = require("express");
const { loginController, registerController, AuthController, ApplyDoctorController } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

//Router object
const router = express.Router();

//LOGIN || POST
router.post('/login' , loginController);

//REGISTER || POST
router.post('/register', registerController);

//Auth || getUserData || POST
router.post('/getUserData' , authMiddleware , AuthController)

//Apply Doctor || POST
router.post('/apply-doctor' , authMiddleware ,ApplyDoctorController )

module.exports = router;